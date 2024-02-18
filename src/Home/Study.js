/* 

Path: "/decks/:deckId/study"
Description: Allows the user to study the cards from a specified deck

*/

import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ cards: [] });
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId, abortController.signal);
        setDeck(loadedDeck);
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    }

    loadDeck();

    return () => abortController.abort();
  }, [deckId]);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    if (currentCard < deck.cards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    } else {
      // If the user reaches the end of the deck, ask if they want to restart
      if (
        window.confirm(
          'Restart cards? Click "cancel" to return to the home page.'
        )
      ) {
        setCurrentCard(0);
        setIsFlipped(false);
      } else {
        history.push("/");
      }
    }
  };

  // Breadcrumb navigation
  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Study
        </li>
      </ol>
    </nav>
  );

    // Content to display when there are not enough cards
    const notEnoughCardsContent = (
      <div>
        <h3>Not enough cards.</h3>
        <p>
          You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.
        </p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          <span className="oi oi-plus"></span> Add Cards
        </Link>
      </div>
    );

  // Card content
  const cardContent = deck.cards && deck.cards.length > 2 && (
    <div className="card">
      <div className="card-body">
        <p className="card-text">
          Card {currentCard + 1} of {deck.cards.length}
        </p>
        <p className="card-text">
          {isFlipped
            ? deck.cards[currentCard].back
            : deck.cards[currentCard].front}
        </p>
        <button className="btn btn-secondary" onClick={flipCard}>
          Flip
        </button>
        {isFlipped && (
          <button className="btn btn-primary" onClick={nextCard}>
            Next
          </button>
        )}
      </div>
    </div>
  );

  let content;
  if (deck.cards.length > 2) {
    content = cardContent;
  } else {
    content = notEnoughCardsContent;
  }

  return (
    <div>
    {/* Breadcrumb navigation is always rendered */}
    {breadcrumb}
    <h2>Study: {deck.name}</h2>

    {/* Conditional rendering based on the number of cards */}
    {content}
  </div>
  );
}

export default Study;