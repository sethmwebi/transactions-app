import PropTypes from "prop-types";
import { useState } from "react";
import "./Search.css";

const Search = ({ transactions, setFilteredTransactions }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.trim()) {
      const filtered = transactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(value),
      );
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        onChange={handleSearch}
        value={searchTerm}
        placeholder="Search transaction by description"
      />
    </div>
  );
};

export default Search;

Search.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  ).isRequired,
  setFilteredTransactions: PropTypes.func.isRequired,
};
