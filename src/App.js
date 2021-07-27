import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Landing from "./Landing";
import Listing from "./Listing";
import Details from './Detail'
import Header from './Header'
import { ContextProvider } from './contextProvider';

export default function App() {


  return (
    <ContextProvider>
      <Router>
        <Header />
        <Switch>
          <Route path="/detail">
            <Details />
          </Route>
          <Route path="/listing">
            <Listing />
          </Route>
          <Route path="/landing">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </ContextProvider>
  );
}

