import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./components/Form";

import Search from "./components/Search";
import "./App.css";
import Transaction from "./components/Transaction";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios("http://localhost:4000/transactions");
        setTransactions(response.data);
        setFilteredTransactions(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Something went wrong");
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="app">
      <Form
        transactions={transactions}
        setTransactions={setTransactions}
        setFilteredTransactions={setFilteredTransactions}
      />
      <div className="transactions">
        <Search
          transactions={transactions}
          setFilteredTransactions={setFilteredTransactions}
        />
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Date</td>
              <td>Description</td>
              <td>Category</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(
              ({ id, date, category, description, amount }) => (
                <Transaction
                  key={id}
                  id={id}
                  category={category}
                  date={date}
                  description={description}
                  amount={amount}
                />
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
