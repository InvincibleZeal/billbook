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
    fetchItems: () => {
        return instance.get(URL.Items);
    },
    fetchInvoices: () => {
        return instance.get(URL.Invoices);
    },
};

export default api;
