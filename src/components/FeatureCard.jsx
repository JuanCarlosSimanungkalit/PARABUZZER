import React from 'react';

const FeatureCard = ({ icon: Icon, title, description, color }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm text-center">
      <div className="flex justify-center mb-4">
        <Icon className={`w-12 h-12 ${color}`} />
      </div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;