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
    args = args.reverse();
    let config, params, data;
    switch (method) {
        case methods.POST:
        case methods.PATCH:
        case methods.PUT:
            [config = {}, data] = args;
            config.body = JSON.stringify(data);
            break;
        case methods.DELETE:
        case methods.HEAD:
        case methods.OPTIONS:
            [config = {}] = args;
            break;
        case methods.GET:
            [config = {}, params = {}] = args;
            config = { ...config, params };
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

Object.keys(methods).forEach((method) => {
    axios[method.toLowerCase()] = async (url, ...args) => {
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
});

export default axios;
