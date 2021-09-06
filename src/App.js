import React, { useEffect, useCallback, Suspense, lazy } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";

import { NotificationProvider } from "notification";
import withWrapper from "common/withWrapper";
import Navbar from "common/Navbar";
import ErrorBoundary from "common/ErrorBoundary";
import { useDispatch } from "react-redux";
import { fetchCustomersList, fetchItemsList } from "redux/actions/index";
const AddCustomer = lazy(() => import("./pages/Customers/AddCustomer.js"));
const ListCustomers = lazy(() => import("./pages/Customers/ListCustomers"));
const ListItems = lazy(() => import("./pages/Inventory/ListItems"));
const AddItem = lazy(() => import("./pages/Inventory/AddItem"));
const ListInvoices = lazy(() => import("./pages/Invoice/ListInvoices"));
const CreateInvoice = lazy(() => import("./pages/Invoice/CreateInvoice"));

function App() {
    // State Variables
    const dispatch = useDispatch();

    // useEffect Hook
    useEffect(() => {
        fetchData();
    }, []);

    // Function to Fetch Data
    const fetchData = useCallback(() => {
        dispatch(fetchCustomersList());
        dispatch(fetchItemsList());
    }, []);

    return (
        <ErrorBoundary>
            <NotificationProvider>
                <Router>
                    <Navbar />
                    <Suspense fallback={<h1>Loading components</h1>}>
                        <Switch>
                            {/* Customer Module */}
                            <Route path="/" exact>
                                <Redirect to="/customers" />
                            </Route>
                            <Route path="/customers" exact>
                                <ListCustomers />
                            </Route>
                            <Route path="/customers/add">
                                <AddCustomer />
                            </Route>
                            {/* Inventory Module */}
                            <Route path="/inventory" exact>
                                <ListItems />
                            </Route>
                            <Route path="/inventory/add">
                                <AddItem />
                            </Route>
                            {/* Invoice Module */}
                            <Route path="/invoice" exact>
                                <ListInvoices />
                            </Route>
                            <Route path="/invoice/add">
                                <CreateInvoice />
                            </Route>
                            <Route component={ListCustomers} />
                        </Switch>
                    </Suspense>
                </Router>
            </NotificationProvider>
        </ErrorBoundary>
    );
}

export default withWrapper(App);
