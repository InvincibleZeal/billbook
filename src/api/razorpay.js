import axios from "axios";
import config from "./config";

const api = {
    fetchCustomers: () => {
        return axios.get(`${config.razorpay.url}/customers`, {
            headers: { ...config.razorpay.headers },
        });
    },
    fetchCustomer: (id) => {
        return axios.get(`${config.razorpay.url}/customers/${id}`, {
            headers: { ...config.razorpay.headers },
        });
    },

    fetchItems: () => {
        return axios.get(`${config.razorpay.url}/items`, {
            headers: { ...config.razorpay.headers },
        });
    },
    fetchItem: (id) => {
        return axios.get(`${config.razorpay.url}/items/${id}`, {
            headers: { ...config.razorpay.headers },
        });
    },
    fetchInvoices: () => {
        return axios.get(`${config.razorpay.url}/invoices`, {
            headers: { ...config.razorpay.headers },
        });
    },
    fetchInvoice: (id) => {
        return axios.get(`${config.razorpay.url}/invoices/${id}`, {
            headers: { ...config.razorpay.headers },
        });
    },
};

export default api;
