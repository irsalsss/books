import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes as ReactRoutes,
  Route,
} from 'react-router-dom';
import loadable from '@loadable/component';

const Home = loadable(() => import('pages/home'));
const Detail = loadable(() => import('pages/detail'));
const Bookmark = loadable(() => import('pages/bookmark'));
const NotFound = loadable(() => import('pages/not-found'));
const Layout = loadable(() => import('layout'));

const Routes = () => {
  return (
    <Router>
      <ReactRoutes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='detail/:id' element={<Detail />} />
          <Route path='bookmark' element={<Bookmark />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </ReactRoutes>
    </Router>
  );
};

export default Routes;
