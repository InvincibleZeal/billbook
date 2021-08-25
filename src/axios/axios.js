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
    let config, params, data;
    switch (method) {
        case methods.POST:
        case methods.PATCH:
        case methods.PUT:
            [data, config] = args;
            config.body = JSON.stringify(data);
            break;
        case methods.DELETE:
        case methods.HEAD:
        case methods.OPTIONS:
            [config] = args;
            break;
        case methods.GET:
            [params, config] = args;
            config = { ...config, params };
            break;
    }
    url = new URL(url);

    config.params = config.params || {};
    Object.keys(config.params).forEach((key) =>
        url.searchParams.append(key, config.params[key])
    );
    config.method = method;
    config.headers["Content-Type"] =
        config.headers["Content-Type"] || "application/json";

    return { url, config };
};

Object.keys(methods).forEach((method) => {
    axios[method.toLowerCase()] = async (url, ...args) => {
        const formatted = formatPayload(url, method, ...args);
        let error, response;
        try {
            response = await fetch(...formatted).then((res) => res.json());
        } catch (e) {
            error = e;
        }
        return { error, response };
    };
});

export default axios;
