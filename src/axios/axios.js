const methods = {
    GET: "GET",
    PUT: "PUT",
    HEAD: "HEAD",
    POST: "POST",
    PATCH: "PATCH",
    DELETE: "DELETE",
    OPTIONS: "OPTIONS",
};

const axios = function (config) {
    config = config || {};
    const { url, method, data, params } = config;
    switch (method) {
        case methods.POST:
            return axios.post(url, data, config);
        case methods.DELETE:
            return axios.delete(url, config);
        case methods.PUT:
            return axios.put(url, data, config);
        case methods.PATCH:
            return axios.patch(url, data, config);
        case methods.HEAD:
            return axios.head(url, config);
        case methods.OPTIONS:
            return axios.options(url, config);
        case methods.GET:
        default:
            return axios.get(url, params, config);
    }
};

axios.request = function (...args) {
    return axios(...args);
};

const formatPayload = (url, method, ...args) => {
    let config, data;
    switch (method) {
        case methods.POST:
        case methods.PATCH:
        case methods.PUT:
            [data, config = {}] = args;
            config.body = JSON.stringify(data);
            break;
        case methods.DELETE:
        case methods.HEAD:
        case methods.OPTIONS:
        case methods.GET:
            [config = {}] = args;
            break;
    }
    url = new URL(url);

    config.params = config.params || {};
    Object.keys(config.params).forEach((key) =>
        url.searchParams.append(key, config.params[key])
    );
    config.method = method;
    config.headers = {
        "Content-Type": "application/json",
        ...(config.headers || {}),
    };
    return { url, config };
};

const construct = async (url, method, ...args) => {
    const formatted = formatPayload(url, method, ...args);
    let error, response;
    try {
        response = await fetch(formatted.url, formatted.config)
            .then(async (res) => {
                return { res, text: await res.text() };
            })
            .then(({ res, text }) => {
                return text ? JSON.parse(text) : res;
            })
            .catch((err) => {
                error = err;
            });
    } catch (e) {
        error = e;
    }
    return { error, response };
};

Object.keys(methods).forEach((method) => {
    axios[method.toLowerCase()] = async (url, ...args) => {
        return construct(url, method, ...args);
    };
});

axios.config = ({ baseUrl, headers }) => {
    return new Axios({ baseUrl, headers });
};

class Axios {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;

        Object.keys(methods).forEach((method) => {
            this[method.toLowerCase()] = async (url, ...args) => {
                try {
                    url = new URL(url);
                } catch (e) {
                    if (!this.baseUrl.endsWith("/")) {
                        baseUrl = this.baseUrl + "/";
                    }
                    if (url.startsWith("/")) {
                        url = url.slice(1);
                    }
                    url = baseUrl + url;
                }
                let config, data;
                switch (method) {
                    case methods.POST:
                    case methods.PATCH:
                    case methods.PUT:
                        [data, config = {}] = args;
                        config.body = JSON.stringify(data);
                        break;
                    case methods.DELETE:
                    case methods.HEAD:
                    case methods.OPTIONS:
                    case methods.GET:
                        [config = {}] = args;
                        break;
                }
                if (Object.keys(this.headers).length) {
                    config.headers = {
                        ...this.headers,
                        ...config.headers,
                    };
                }
                args.pop();
                args.push(config);
                return construct(url, method, ...args);
            };
        });
    }
}

export default axios;
