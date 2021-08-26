import axios from "axios";
import config from "./config";

const api = {
    fetchCustomers: () => {
        return axios.get(`${config.razorpay.url}/customers`, {
            headers: config.razorpay.headers,
        });
    },
    fetchCustomer: (id) => {
        return axios.get(`${config.razorpay.url}/customers/${id}`, {
            headers: config.razorpay.headers,
        });
    },
};

export default api;
