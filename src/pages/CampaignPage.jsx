import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const CampaignPage = ({ setCurrentPage, goBack }) => {
  const [formData, setFormData] = useState({
    namaEvent: '',
    deskripsi: '',
    penyelenggara: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Campaign:', formData);
    setCurrentPage('report');
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

        <h1 className="text-3xl font-bold text-center mb-12 mt-8">Atur Kampanye</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Nama Event
            </label>
            <input 
              type="text"
              name="namaEvent"
              value={formData.namaEvent}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-200 rounded border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Deskripsi
            </label>
            <input 
              type="text"
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-200 rounded border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Penyelenggara
            </label>
            <input 
              type="text"
              name="penyelenggara"
              value={formData.penyelenggara}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-200 rounded border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-gray-300 text-black py-3 rounded font-medium hover:bg-gray-400 transition mt-8"
          >
            Tambahkan
          </button>
        </form>
      </div>
    </div>
  );
};

export default CampaignPage;