import axios from "axios";
import config from "./config";

const instance = axios.config({ ...config.razorpay });

const URL = {
    Customers: "customers",
    Items: "items",
    Invoices: "invoices",
};
const api = {
    fetchCustomers: () => {
        return instance.get(URL.Customers);
    },
    createCustomer: (data) => {
        return instance.post(URL.Customers, data);
    },
    fetchItems: () => {
        return instance.get(URL.Items);
    },
    createItem: (data) => {
        return instance.post(URL.Items, data);
    },
    fetchInvoices: () => {
        return instance.get(URL.Invoices);
    },
    createInvoice: (data) => {
        return instance.post(URL.Invoices, data);
    },
};

export default api;
