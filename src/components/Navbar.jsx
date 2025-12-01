import React from 'react';

const Navbar = ({ setCurrentPage }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div 
            className="text-xl font-bold cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            ParaBuzzer
          </div>
          <div className="flex gap-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className="text-gray-700 hover:text-gray-900"
            >
              Home
            </button>
            <button className="text-gray-700 hover:text-gray-900">
              Tentang
            </button>
            <button 
              onClick={() => setCurrentPage('login')}
              className="text-gray-700 hover:text-gray-900"
            >
              Masuk
            </button>
            <button 
              onClick={() => setCurrentPage('register')}
              className="text-gray-700 hover:text-gray-900"
            >
              Gabung sekarang
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;