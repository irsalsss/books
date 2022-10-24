import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes as ReactRoutes,
  Route,
} from 'react-router-dom';
import loadable from '@loadable/component';

const Home = loadable(() => import('pages/home'));
const NotFound = loadable(() => import('pages/not-found'));
const Layout = loadable(() => import('layout'));

const Routes = () => {
  return (
    <Router>
      <ReactRoutes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </ReactRoutes>
    </Router>
  );
};

export default Routes;
