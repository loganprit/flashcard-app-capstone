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

        async function loadedDeckAndCard() {
            try {
                const loadedDeck = await readDeck(deckId, abortController.signal);
                setDeck(loadedDeck);
                const loadedCard = await readCard(cardId, abortController.signal);
                setCard(loadedCard);
            } catch (error) {
                console.error("Error loading deck or card:", error);
            }
        }

        loadedDeckAndCard();
        return () => abortController.abort();
    }, [deckId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateCard(event);
            history.push(`/decks/${deckId}`);
        } catch (error) {
            console.error("Error updating card:", error);
        }
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
                onSubmit={(cardData) => handleSubmit({ ...cardData, id: cardId, deckId })}
                onCancel={handleCancel}
            />
        </div>
    );
}

export default EditCard;