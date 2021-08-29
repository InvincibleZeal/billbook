import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import { ListCustomers, AddCustomer } from "pages/Customers";
import { ListItems, AddItem } from "pages/Inventory";
import { ListInvoices, CreateInvoice } from "pages/Invoice";
import { NotificationProvider } from "notification";
import withWrapper from "common/withWrapper";
import Navbar from "common/Navbar";
import ErrorBoundary from "common/ErrorBoundary";
import { Provider } from "react-redux";
import store from "redux/store.js";

function App() {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <NotificationProvider>
                    <Router>
                        <Navbar />
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
                    </Router>
                </NotificationProvider>
            </Provider>
        </ErrorBoundary>
    );
}

export default withWrapper(App);
