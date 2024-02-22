/* 

Path: "/decks/:deckId/cards/new"
Description: Allows the user to add a new card to an existing deck

*/

import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import CardForm from "./CardForm";

function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ name: "", description: "" });
  const [card, setCard] = useState({ front: "", back: "" });

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

  const handleChange = ({ target }) => {
    setCard({ ...card, [target.name]: target.value }); // Update the card state
  };

  const handleSave = async (newCard) => {
    await createCard(deckId, newCard);
    setCard({ front: "", back: "" }); // Reset the form to initial state for a new card
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`); // Redirect to the Deck screen
  };

  const handleDone = async () => {
    // If there's content in either the front or back of the card, save it before exiting.
    if (card.front.trim() || card.back.trim()) {
      await handleSave(card);
    }

    // After saving, redirect to the Deck screen
    handleCancel();
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>

      <h2>{deck.name}: Add Card</h2>

      <CardForm
        card={card}
        onChange={handleChange}
        onSave={handleSave}
        onDone={handleDone}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default AddCard;
