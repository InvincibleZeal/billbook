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

function App() {
    return (
        <>
            <Router>
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
        </>
    );
}

export default App;
