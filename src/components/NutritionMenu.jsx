import React, { useState } from 'react';
import foodsData from '../data/foods.json';
import { Search, Plus } from 'lucide-react';

const NutritionMenu = ({ onAddToLog }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [amounts, setAmounts] = useState({});

  const filteredFoods = foodsData.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAmountChange = (id, val) => {
    setAmounts(prev => ({ ...prev, [id]: val }));
  };

  const handleAdd = (food) => {
    const gram = Number(amounts[food.id]) || 100;
    onAddToLog(food, gram);
    // Reset amount
    setAmounts(prev => ({ ...prev, [food.id]: '' }));
    // Remove alert for better flow or replace with a non-blocking toast
    // alert(`${food.name} günlüğe eklendi!`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Besin Değerleri Menüsü</h2>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Besin ara..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-sm text-gray-600">
              <th className="py-2 px-4">Besin (100g)</th>
              <th className="py-2 px-4">Kalori</th>
              <th className="py-2 px-4">Protein</th>
              <th className="py-2 px-4">Karbonhidrat</th>
              <th className="py-2 px-4">Yağ</th>
              <th className="py-2 px-4 text-right">Günlüğe Ekle</th>
            </tr>
          </thead>
          <tbody>
            {filteredFoods.map(food => (
              <tr key={food.id} className="hover:bg-gray-50 border-b border-gray-100">
                <td className="py-3 px-4 font-medium">{food.name}</td>
                <td className="py-3 px-4 font-semibold text-blue-600">{food.calories} kcal</td>
                <td className="py-3 px-4 text-sm">{food.protein}g</td>
                <td className="py-3 px-4 text-sm">{food.carbs}g</td>
                <td className="py-3 px-4 text-sm">{food.fat}g</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <input
                      type="number"
                      placeholder="100"
                      className="w-16 p-1 border border-gray-300 rounded text-sm food-amount-input"
                      value={amounts[food.id] || ''}
                      onChange={(e) => handleAmountChange(food.id, e.target.value)}
                    />
                    <span className="text-xs text-gray-400">g</span>
                    <button
                      onClick={() => handleAdd(food)}
                      aria-label={`${food.name} ekle`}
                      className="bg-green-600 text-white p-1 rounded hover:bg-green-700 add-to-log-btn"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NutritionMenu;
