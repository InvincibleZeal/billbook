import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ListCustomers } from "./pages/customers";
import { ListItems } from "./pages/inventory";
import { ListInvoices } from "./pages/invoice";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <ListCustomers />
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
