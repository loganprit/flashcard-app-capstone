import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "../Home/Home";
import Study from "../Home/Study";
import CreateDeck from "../Home/CreateDeck";
import Deck from "../Home/Deck";
import EditDeck from "../Home/EditDeck";
import AddCard from "../Home/AddCard";
import EditCard from "../Home/EditCard";
import NotFound from "./NotFound";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* Implemented screen starting */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;