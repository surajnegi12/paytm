import React from 'react';
import { Appbar } from '../components/Appbar';
import { Balance } from '../components/Balance';
import { Users } from '../components/Users';
import { useSelector } from 'react-redux';
import CheckHistory from '../components/CheckHistory';
import Footer from '../components/Footer';

function Dashboard() {
  const user = useSelector(state => state.userDetails);

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen flex flex-col">
      <Appbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        <Users />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 animate-fade-in">
          <Balance />
          <CheckHistory />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;