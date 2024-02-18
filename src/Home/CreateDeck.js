/* 

Path: "/decks/new"
Description: Allows the user to create a new deck

*/

import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
    const history = useHistory();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    
    const handleNameChange = (event) => setName(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const newDeck = { name, description };
            const response = await createDeck(newDeck);
            history.push(`/decks/${response.id}`);
        } catch (error) {
            console.error("Error creating deck:", error);
            setSubmitError("Failed to create deck. Please try again.");
            setIsSubmitting(false);
        }
    };
    
    return (
<div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Create Deck
                </li>
            </ol>
        </nav>
        <h2>Create Deck</h2>
        
        {submitError && <div className="alert alert-danger">{submitError}</div>}
        
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    className="form-control"
                    placeholder="Deck Name"
                    onChange={handleNameChange}
                    value={name}
                    disabled={isSubmitting}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    className="form-control"
                    placeholder="Brief description of the deck"
                    onChange={handleDescriptionChange}
                    value={description}
                    disabled={isSubmitting}
                />
            </div>
            <button
                className="btn btn-secondary mr-2"
                onClick={() => history.push("/")}
                disabled={isSubmitting}
            >
                Cancel
            </button>
            <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting || name === "" || description === ""}
            >
                {isSubmitting ? "Creating..." : "Submit"}
            </button>
        </form>
    </div>
    );
}

export default CreateDeck;