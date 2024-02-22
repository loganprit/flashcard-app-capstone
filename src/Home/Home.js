/* 

Path: "/"
Description: Shows a list of decks with options to create, study, view, or delete a deck

*/

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

const Home = () => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal).then(setDecks);

    // Cleanup function to abort any pending requests
    return () => abortController.abort();
  }, []);

  const handleDelete = async (deckId) => {
    const confirmDelete = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );

    if (confirmDelete) {
      const abortController = new AbortController();

      try {
        await deleteDeck(deckId, abortController.signal);

        // Filter out the deleted deck and update state
        const updatedDecks = decks.filter((deck) => deck.id !== deckId);
        setDecks(updatedDecks);
      } catch (error) {
        // Handle the error
        console.error("Failed to delete the deck:", error);
      }
    }
  };

  return (
    <div>
      {/* Button to create a new deck */}
      <Link to="/decks/new" className="btn btn-secondary">
        <span className="oi oi-plus"></span> Create Deck{" "}
      </Link>

      {/* List of decks */}
      <div className="row">
        {decks.map((deck) => (
          <div key={deck.id} className="col-sm-12 col-md-6 col-lg-4 mt-4">
            <div className="card mb-3">
              {" "}
              {/* mb-3 adds margin to the bottom of the card */}
              <div className="card-body">
                <h5 className="card-title">{deck.name}</h5>
                <p className="card-text">{deck.description}</p>
                <p className="card-text">
                  <small className="text-muted">
                    {deck.cards.length} cards
                  </small>
                </p>
                <div className="d-flex justify-content-between mt-3">
                  {" "}
                  {/* Align buttons */}
                  <div>
                    <Link
                      to={`/decks/${deck.id}`}
                      className="btn btn-secondary mr-2"
                    >
                      <span className="oi oi-eye"></span> {/* For View icon */}
                      View
                    </Link>
                    <Link
                      to={`/decks/${deck.id}/study`}
                      className="btn btn-primary"
                    >
                      <span className="oi oi-book"></span>{" "}
                      {/* For Study icon */}
                      Study
                    </Link>
                  </div>
                  <button
                    onClick={() => handleDelete(deck.id)}
                    className="btn btn-danger" // This button is aligned right by the flex container
                  >
                    <span className="oi oi-trash"></span>{" "}
                    {/* For Delete button */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
