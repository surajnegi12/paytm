import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { URL } from '../assets/url';

export default function TransectionHistory() {
  const [historyTransection, setHistoryTransection] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    async function getHistory() {
      try {
        const response = await axios.get(`${URL}/api/v1/account/transection/history`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHistoryTransection(response.data.history);
      } catch (error) {
        console.error("Failed to fetch transaction history", error);
      }
    }
    getHistory();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Transaction History</h2>

      {historyTransection.length === 0 ? (
        <p className="text-center text-gray-500">No transactions found.</p>
      ) : (
        <div className="space-y-4">
          {historyTransection.map((transaction, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 hover:shadow-lg transition duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div className="text-gray-700 dark:text-gray-200">
                  <span className="font-semibold">{transaction.from.firstName}</span> paid to <span className="font-semibold">{transaction.to.firstName}</span>
                </div>
                <div className="text-green-600 font-semibold text-lg">
                  ₹{transaction.amount}
                </div>
                <div className="text-gray-500 text-sm">
                  {new Date(transaction.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
