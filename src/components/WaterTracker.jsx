import React from 'react';
import { Droplets, Plus, Minus } from 'lucide-react';

const WaterTracker = ({ amount, onUpdate }) => {
  const goal = 2000; // 2 Liters in ml
  const percentage = Math.min(Math.round((amount / goal) * 100), 100);

  return (
    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-blue-700">
          <Droplets className="mr-2" />
          <h3 className="text-xl font-bold">Su Takibi</h3>
        </div>
        <span className="text-blue-600 font-semibold">{amount} / {goal} ml</span>
      </div>

      <div className="w-full bg-blue-100 rounded-full h-6 mb-6 overflow-hidden">
        <div
          className="bg-blue-500 h-full transition-all duration-700 ease-out flex items-center justify-center text-xs text-white font-bold"
          style={{ width: `${percentage}%` }}
        >
          {percentage > 10 ? `%${percentage}` : ''}
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => onUpdate(-250)}
          className="flex items-center px-4 py-2 bg-white border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-100 transition"
        >
          <Minus size={18} className="mr-1" /> 250ml
        </button>
        <button
          onClick={() => onUpdate(250)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          <Plus size={18} className="mr-1" /> 250ml
        </button>
      </div>

      <p className="text-center text-blue-500 text-sm mt-4 italic">
        {percentage >= 100 ? "Harika! Günlük su hedefine ulaştın." : "Su içmeyi unutma!"}
      </p>
    </div>
  );
};

export default WaterTracker;
