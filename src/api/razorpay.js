import axios from "axios";
import config from "./config";

const instance = axios.config({ ...config.razorpay });
const Url = {
    Customers: "customers",
    Items: "items",
    Invoices: "invoices",
};
const api = {
    fetchCustomers: () => {
        return instance.get(Url.Customers);
    },
    fetchItems: () => {
        return instance.get(Url.Items);
    },
    fetchInvoices: () => {
        return instance.get(Url.Invoices);
    },
};

export default api;
