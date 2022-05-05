/* Web-Spider assignment created by bar polyak for ActiveFence interview */
import AppHeader from "../Common/AppHeader";
import { Router, Switch, Route } from "react-router";
import history from "../../util/history";
import { HOME, CRAWLER } from "../../util/route";
import Crawler from "../Pages/Crawler";
import Home from "../Pages/Home";

const App = () => {
  return (
    <div className="App" data-testid="app">
      <AppHeader />
      <div className="center">
        <Router history={history}>
          <Switch>
            <Route exact path={HOME} component={Home} />
            <Route exact path={CRAWLER} component={Crawler} />
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default App;
