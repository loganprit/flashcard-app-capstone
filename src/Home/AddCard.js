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
    const initialCard = { front: "", back: "" };

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

    const handleSubmit = async (card) => {
        await createCard(deckId, card);
        history.push(`/decks/${deckId}`);
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
                initialCard={initialCard}
                onSubmit={handleSubmit}
                onCancel={() => history.push(`/decks/${deckId}`)}
            />
        </div>
    );
}

export default AddCard;