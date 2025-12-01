import React from 'react';
import { Lightbulb, Target, TrendingUp, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';

const HomePage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar setCurrentPage={setCurrentPage} />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-16">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold mb-4">
              Kelola Kampanye Buzzer dengan Mudah
            </h1>
            <p className="text-gray-600 mb-8">
              Atur tugas, pantau, dan targetkan hasil yang efektif dalam satu platform.
            </p>
            <button 
              onClick={() => setCurrentPage('register')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Mulai sekarang
            </button>
          </div>
          <div className="flex items-center gap-4">
            <Lightbulb className="w-24 h-24 text-yellow-400" strokeWidth={1.5} />
            <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center">
              <div className="text-white text-6xl">👨‍💼</div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-8">Fitur</h2>
          <div className="grid grid-cols-3 gap-6">
            <FeatureCard 
              icon={Target}
              title="Atur Kampanye"
              description="Rencanakan kampanye dengan mudah"
              color="text-blue-600"
            />
            <FeatureCard 
              icon={TrendingUp}
              title="Laporan Otomatis"
              description="Dapatkan insight real-time dan otomatis"
              color="text-green-600"
            />
            <FeatureCard 
              icon={Zap}
              title="Kelola Buzzer"
              description="Atur dan kelola buzzer Anda dengan efisien"
              color="text-purple-600"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;