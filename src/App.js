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
import './styles/style.css'

export default function App() {


  return (
    <ContextProvider>
      <Router>
        <Header />
        <Switch>
          <Route path="/details/:userId/:productId" render={(props) => (
            <Details key={props.match.params.pageid} {...props} />)
          } />
          <Route path="/listing/:name/:id/:publicToken" render={(props) => (
            <Listing key={props.match.params.pageid} {...props} />)
          } />
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </ContextProvider>
  );
}

