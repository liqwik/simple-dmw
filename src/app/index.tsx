/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';
import { useTranslation } from 'react-i18next';

import LoginPage from './pages/AuthPage';
import AppRoute from 'utils/AppRoute';
import PrivateRoute from './PrivateRoute';
import MainLayout from './MainLayout';
import NotFoundPage from './pages/ErrorPage/NotFoundPage';
import { HomePage } from './pages/HomePage/Loadable';

export function App() {
  const { i18n } = useTranslation();

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - ប្រព័ន្ធគ្រប់គ្រងចរន្តឯកសារ ការិយាល័យក្រុមជំនួយការ"
        defaultTitle="ប្រព័ន្ធគ្រប់គ្រងចរន្តឯកសារ ការិយាល័យក្រុមជំនួយការ"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="ប្រព័ន្ធគ្រប់គ្រងចរន្តឯកសារ ការិយាល័យក្រុមជំនួយការ" />
      </Helmet>

      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />

        <PrivateRoute path={AppRoute.baseUrl}>
          <MainLayout />
        </PrivateRoute>

        <Redirect exact from="/" to={AppRoute.baseUrl} />

        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
