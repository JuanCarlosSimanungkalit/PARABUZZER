import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const LoginPage = ({ setCurrentPage, goBack }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', formData);
    setCurrentPage('campaign');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-12 rounded-lg shadow-sm w-full max-w-md relative">
        {/* Tombol Kembali */}
        <button
          onClick={goBack}
          className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft size={20} />
          <span>Kembali</span>
        </button>

        <h1 className="text-3xl font-bold text-center mb-12 mt-8">Login</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Masukkan email
            </label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-200 rounded border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Masukkan Password
            </label>
            <input 
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-200 rounded border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="text-sm">
            <span className="text-gray-600">Belum memiliki akun? </span>
            <button 
              type="button"
              onClick={() => setCurrentPage('register')}
              className="text-blue-600 hover:underline"
            >
              Daftar
            </button>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-gray-300 text-black py-3 rounded font-medium hover:bg-gray-400 transition mt-8"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;