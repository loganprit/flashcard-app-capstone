import React, { useEffect } from "react";

function CardForm({
  card,
  onChange,
  onSave,
  onDone,
  onCancel,
  showDoneButton = true,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(card);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="front" className="form-label">
          Front
        </label>
        <textarea
          id="front"
          name="front"
          className="form-control"
          value={card.front}
          onChange={onChange}
          rows="3"
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="back" className="form-label">
          Back
        </label>
        <textarea
          id="back"
          name="back"
          className="form-control"
          value={card.back}
          onChange={onChange}
          rows="3"
          required
        ></textarea>
      </div>
      <button
        type="button"
        onClick={onCancel}
        className="btn btn-secondary mr-2"
      >
        Cancel
      </button>
      <button type="submit" onClick={onChange} className="btn btn-primary mr-2">
        Save
      </button>
      {showDoneButton && (
        <button type="button" onClick={onDone} className="btn btn-secondary">
          Done
        </button>
      )}
    </form>
  );
}

export default CardForm;
