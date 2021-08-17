import { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Customers from "./pages/Customers";
import Inventory from "./pages/Inventory";
import Invoice from "./pages/Invoice";

function App() {
  return (
    <Fragment>
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
    </Fragment>
  );
}

export default App;
