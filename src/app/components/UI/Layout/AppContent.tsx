import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import AppRoute from 'utils/AppRoute';
import routes from 'app/routeData';

export function AppContent() {
  return (
    <Switch>
      {routes.map((route: any, index) => (
        <Route key={index} path={route.path} exact={route.exact || false} component={route.component} />
      ))}

      <Route exact path={AppRoute.baseUrl}>
        <Redirect to={AppRoute.dashboard} />
      </Route>
    </Switch>
  );
}
