import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import "./Form.css";

const Form = ({ transactions, setTransactions, setFilteredTransactions }) => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(undefined);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const availableTransactions = await axios(
        "http://localhost:4000/transactions",
      );

      const userData = {
        id: availableTransactions.data.length + 1,
        date: new Date().toISOString().split("T")[0],
        description: description,
        category: category,
        amount: amount,
      };

      await axios.post("http://localhost:4000/transactions", userData);
      setDescription("");
      setCategory("");
      setAmount("");
      const updatedTransactions = [...transactions, userData];
      setTransactions(updatedTransactions);
      setFilteredTransactions(updatedTransactions);
    } catch (error) {
      setError("something went wrong");
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <span>{error}</span>
      <div>
        <label htmlFor="description">Description</label>
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          id="description"
          type="text"
        />
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <input
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          type="text"
          id="category"
        />
      </div>
      <div>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          step="0.01"
          id="amount"
          value={amount}
        />
      </div>
      <button type="submit">submit</button>
    </form>
  );
};

export default Form;

Form.propTypes = {
  setTransactions: PropTypes.func.isRequired,
  setFilteredTransactions: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
