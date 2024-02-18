function CardForm({ initialCard, onSubmit, onCancel }) {
    const [card, setCard] = useState(initialCard);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setCard({ ...card, [name]: value });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSubmit(card);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">Front</label>
          <textarea id="front" name="front" className="form-control" value={card.front} onChange={handleChange} rows="3" required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">Back</label>
          <textarea id="back" name="back" className="form-control" value={card.back} onChange={handleChange} rows="3" required></textarea>
        </div>
        <button type="button" onClick={onCancel} className="btn btn-secondary mr-2">Cancel</button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }

  export default CardForm;