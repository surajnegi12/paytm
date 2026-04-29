import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../assets/url';
function CheckBalance() {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${URL}/api/v1/user/userinfo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBalance(res.data.account.balance); 
      } catch (err) {
        console.error('Failed to fetch balance:', err);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[22rem] text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">💰 Account Balance</h2>
        <p className="text-3xl font-semibold text-indigo-600 mb-2">
          ₹{balance !== null ? balance.toFixed(2) : 'Loading...'}
        </p>
        <p className="text-gray-500 text-sm">This is your current available balance.</p>
      </div>
    </div>
  );
}

export default CheckBalance;
