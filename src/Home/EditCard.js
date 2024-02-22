/* 

Path: "/decks/:deckId/cards/:cardId/edit"
Description: Allows the user to modify information on an existing card

*/

import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import CardForm from "./CardForm";

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ name: "", description: "" });
  const [card, setCard] = useState({ front: "", back: "" });

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeckAndCard() {
      try {
        // Load the deck
        const loadedDeck = await readDeck(deckId, abortController.signal);
        setDeck(loadedDeck);

        // Load the card
        const loadedCard = await readCard(cardId, abortController.signal);
        setCard(loadedCard);
      } catch (error) {
        console.error("Error loading deck or card:", error);
      }
    }

    loadDeckAndCard();
    return () => abortController.abort();
  }, [deckId, cardId]);

  const handleChange = ({ target }) => {
    setCard({ ...card, [target.name]: target.value });
  };

  const handleSave = async (cardData) => {
    await updateCard(cardData);
    history.push(`/decks/${deckId}`);
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      {/* Breadcrumb navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>

      <h2>Edit Card</h2>

      <CardForm
        card={card}
        onChange={handleChange}
        onSave={handleSave}
        onCancel={handleCancel}
        showDoneButton={false}
      />
    </div>
  );
}

export default EditCard;
