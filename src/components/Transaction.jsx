import PropTypes from "prop-types";
const Transaction = ({ id, date, description, category, amount }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
    </tr>
  );
};

export default Transaction;

Transaction.propTypes = {
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};
