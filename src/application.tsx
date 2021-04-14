import React, { useEffect } from "react";
import { Route, Switch, RouteComponentProps, NavLink } from "react-router-dom";
import ReactNotifications from "react-notifications-component";
import logging from "./config/logging";
import routes from "./config/routes";
import "sanitize.css/sanitize.css";
import "./css/index.css";
// @ts-ignore
import { Content } from "reactbulma";

const Application: React.FunctionComponent<{}> = (props) => {
  useEffect(() => {
    logging.info(`Loading application.`);
  }, []);

  return (
    <div>
      <ReactNotifications />
      <header>
        <nav className="navbar has-shadow">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item" href="../">
                <img src="images/logo.png" alt="Basic Billing"></img>
                <span className="header-nav-legend">
                  <Content html={`Basic Billing`} />
                </span>
              </a>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div className="columns">
          <aside className="column is-2 aside hero is-fullheight">
            <div>
              <div className="main">
                {routes.map((route, index) => {
                  return (
                    <NavLink
                      key={index}
                      exact={route.exact}
                      className="item"
                      activeClassName="active"
                      to={route.path}
                    >
                      <span className="name">
                        <route.icon /> {route.name}
                      </span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </aside>
          <div className="column is-9 messages hero is-fullheight">
            <Switch>
              {routes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    render={(props: RouteComponentProps<any>) => (
                      <route.component
                        name={route.name}
                        {...props}
                        {...route.props}
                      />
                    )}
                  />
                );
              })}
            </Switch>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Application;
