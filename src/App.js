import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Customers from "./Pages/Customers";
import Inventory from "./Pages/Inventory";
import Invoice from "./Pages/Invoice";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Customers />
                </Route>
                <Route path="/inventory">
                    <Inventory />
                </Route>
                <Route path="/invoice">
                    <Invoice />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
