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

axios.get = (url, params = {}, config = {}) => {
    config.method = methods.GET;
    config.headers["Content-Type"] =
        config.headers["Content-Type"] || "application/json";
    url = new URL(url);
    Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
    );
    return fetch(url, config);
};

axios.post = (url, data = {}, config = {}) => {
    config.method = methods.POST;
    config.headers["Content-Type"] =
        config.headers["Content-Type"] || "application/json";
    config.body = JSON.stringify(data);
    url = new URL(url);
    Object.keys(config.params).forEach((key) =>
        url.searchParams.append(key, config.params[key])
    );
    return fetch(url, config);
};

axios.delete = (url, config = {}) => {
    config.method = methods.DELETE;
    config.headers["Content-Type"] =
        config.headers["Content-Type"] || "application/json";
    url = new URL(url);
    Object.keys(config.params).forEach((key) =>
        url.searchParams.append(key, config.params[key])
    );
    return fetch(url, config);
};

axios.put = (url, data = {}, config = {}) => {
    config.method = methods.PUT;
    config.headers["Content-Type"] =
        config.headers["Content-Type"] || "application/json";
    config.body = JSON.stringify(data);
    url = new URL(url);
    Object.keys(config.params).forEach((key) =>
        url.searchParams.append(key, config.params[key])
    );
    return fetch(url, config);
};

axios.patch = (url, data, config = {}) => {
    config.method = methods.PATCH;
    config.headers["Content-Type"] =
        config.headers["Content-Type"] || "application/json";
    config.body = JSON.stringify(data);
    url = new URL(url);
    Object.keys(config.params).forEach((key) =>
        url.searchParams.append(key, config.params[key])
    );
    return fetch(url, config);
};

axios.head = (url, config = {}) => {
    config.method = methods.HEAD;
    config.headers["Content-Type"] =
        config.headers["Content-Type"] || "application/json";
    url = new URL(url);
    Object.keys(config.params).forEach((key) =>
        url.searchParams.append(key, config.params[key])
    );
    return fetch(url, config);
};

axios.options = (url, config = {}) => {
    config.method = methods.OPTIONS;
    config.headers["Content-Type"] =
        config.headers["Content-Type"] || "application/json";
    url = new URL(url);
    Object.keys(config.params).forEach((key) =>
        url.searchParams.append(key, config.params[key])
    );
    return fetch(url, config);
};

export default axios;
