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
            [data, config] = args;
            config = { ...config, data };
            break;
        case methods.DELETE:
            [config] = args;
            break;
        case methods.PUT:
            [data, config] = args;
            config = { ...config, data };
            break;
        case methods.PATCH:
            [data, config] = args;
            config = { ...config, data };
            break;
        case methods.HEAD:
            [config] = args;
            break;
        case methods.OPTIONS:
            [config] = args;
            break;
        case methods.GET:
            [params, config] = args;
            config = { ...config, params };
            break;
    }
    url = new URL(url);
    Object.keys(config.params).forEach((key) =>
        url.searchParams.append(key, config.params[key])
    );

    config.body = JSON.stringify(config.data);
    delete config.data;
    config.method = method;
    config.headers["Content-Type"] =
        config.headers["Content-Type"] || "application/json";

    return { url, config };
};

Object.keys(methods).forEach((method) => {
    axios[method.toLowerCase] = async (url, ...args) => {
        const formatted = formatPayload(url, method, ...args);
        let error, response;
        try {
            response = await fetch(...formatted);
        } catch (e) {
            error = e;
        }
        return { error, response };
    };
});

axios.get = (url, params = {}, config = {}) => {
    const formatted = formatPayload(url, methods.GET, { ...config, params });
    return fetch(...formatted);
};

axios.post = (url, data = {}, config = {}) => {
    const formatted = formatPayload(url, methods.POST, { ...config, data });
    return fetch(...formatted);
};

axios.delete = (url, config = {}) => {
    const formatted = formatPayload(url, methods.DELETE, { ...config });
    return fetch(...formatted);
};

axios.put = (url, data = {}, config = {}) => {
    const formatted = formatPayload(url, methods.PUT, { ...config, data });
    return fetch(...formatted);
};

axios.patch = (url, data, config = {}) => {
    const formatted = formatPayload(url, methods.PATCH, { ...config, data });
    return fetch(...formatted);
};

axios.head = (url, config = {}) => {
    const formatted = formatPayload(url, methods.HEAD, { ...config });
    return fetch(...formatted);
};

axios.options = (url, config = {}) => {
    const formatted = formatPayload(url, methods.OPTIONS, { ...config });
    return fetch(...formatted);
};

export default axios;
