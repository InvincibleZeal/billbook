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
    const { url, method } = config;
    switch (method) {
        case methods.POST:
            return axios.post(url, config);
        case methods.DELETE:
            return axios.delete(url, config);
        case methods.PUT:
            return axios.put(url, config);
        case methods.PATCH:
            return axios.patch(url, config);
        case methods.HEAD:
            return axios.head(url, config);
        case methods.OPTIONS:
            return axios.options(url, config);
        case methods.GET:
        default:
            return axios.get(url, config);
    }
};

axios.request = function (...args) {
    return axios(...args);
};

axios.get = (url, config = {}) => {
    config.method = methods.GET;
    return fetch(url, config);
};

axios.post = (url, config = {}) => {
    config.method = methods.POST;
    return fetch(url, config);
};

axios.delete = (url, config = {}) => {
    config.method = methods.DELETE;
    return fetch(url, config);
};

axios.put = (url, config = {}) => {
    config.method = methods.PUT;
    return fetch(url, config);
};

axios.patch = (url, config = {}) => {
    config.method = methods.PATCH;
    return fetch(url, config);
};

axios.head = (url, config = {}) => {
    config.method = methods.HEAD;
    return fetch(url, config);
};

axios.options = (url, config = {}) => {
    config.method = methods.OPTIONS;
    return fetch(url, config);
};

export default axios;
