import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ListCustomers, AddCustomer } from "./pages/Customers";
import { ListItems, AddItem } from "./pages/Inventory";
import { ListInvoices, CreateInvoice } from "./pages/Invoice";

function App() {
    return (
        <Router>
            <Switch>
                {/* Customer Module */}
                <Route path="/" exact>
                    <ListCustomers />
                </Route>
                <Route path="/add-customer">
                    <AddCustomer />
                </Route>
                {/* Inventory Module */}
                <Route path="/inventory">
                    <ListItems />
                </Route>
                <Route path="/add-item">
                    <AddItem />
                </Route>
                {/* Invoice Module */}
                <Route path="/invoice">
                    <ListInvoices />
                </Route>
                <Route path="/create-invoice">
                    <CreateInvoice />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
