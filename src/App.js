import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ListCustomers, AddCustomer } from "./pages/Customers";
import { ListItems } from "./pages/Inventory";
import { ListInvoices } from "./pages/Invoice";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <ListCustomers />
                </Route>
                <Route path="/add-customer">
                    <AddCustomer />
                </Route>
                <Route path="/inventory">
                    <ListItems />
                </Route>
                <Route path="/invoice">
                    <ListInvoices />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
