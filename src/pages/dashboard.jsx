import React from 'react';
import { FaCheckSquare, FaBox } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="p-35 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Task Manager Card */}
        <Link to="/taskmanager" className="no-underline text-current">
          <div className="bg-white rounded-2xl shadow transition-shadow duration-300 hover:shadow-xl p-8 flex flex-col items-center text-center gap-4 hover:bg-gray-100 cursor-pointer">
            <FaCheckSquare className="text-indigo-500 text-4xl mb-5" />
            <h2 className="text-3xl font-bold mb-2 text-gray-700">Task Manager</h2>
            <p className="text-gray-600 font-semibold">Manage your daily tasks and stay organized</p>
          </div>
        </Link>

        {/* Products Card */}
        <Link to="/products" className="no-underline text-current">
          <div className="bg-white rounded-2xl shadow transition-shadow duration-300 hover:shadow-xl p-8 flex flex-col items-center text-center gap-4 hover:bg-gray-100 cursor-pointer">
            <FaBox className="text-indigo-500 text-4xl mb-4" />
            <h2 className="text-3xl font-bold text-gray-700">Products</h2>
            <p className="text-gray-600 font-semibold">Browse our collection of amazing products</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
