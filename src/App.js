import { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route path="/" exact>
            I am Customer's page
          </Route>
          <Route path="/inventory">I am Inventory page</Route>
          <Route path="/invoice">I am Invoice page</Route>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
