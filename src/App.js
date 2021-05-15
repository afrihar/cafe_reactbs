import logo from './logo.svg';
import {BrowserRouter as Router, Redirect, Route, Switch, NavLink, Link} from 'react-router-dom'
import NavbarCafe from "./containers/NavbarCafe";
// routes config
import routes from './helpers/routes';
import {Component, Suspense} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class App extends Component{
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  render() {
      return (
          <div className="App">
              <Router>
                  <NavbarCafe/>
                  <Suspense fallback={this.loading()}>
                  <Switch>
                      {routes.map((route, idx) => {
                          return route.component ? (
                              <Route
                                  key={idx}
                                  path={route.path}
                                  exact={route.exact}
                                  name={route.name}
                                  render={props => (
                                      <route.component {...props} />
                                  )}/>
                          ) : (null);
                      })}
                  </Switch>
                  </Suspense>
              </Router>
          </div>
      );
  }


}

export default App;
