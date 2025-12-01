import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <div className="font-bold">ParaBuzzer</div>
          <div className="flex gap-8">
            <button className="text-gray-600 hover:text-gray-900">
              Tentang kami
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              Guideline
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              Kontak
            </button>
          </div>
          <div className="flex gap-4">
            <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600">f</span>
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600">@</span>
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600">in</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;