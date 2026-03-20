import React, { useState } from 'react';
import foodsData from '../data/foods.json';
import { Search } from 'lucide-react';

const NutritionMenu = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFoods = foodsData.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4">Besin (100g/ml)</th>
              <th className="py-2 px-4">Kalori</th>
              <th className="py-2 px-4">Protein</th>
              <th className="py-2 px-4">Karbonhidrat</th>
              <th className="py-2 px-4">Yağ</th>
            </tr>
          </thead>
          <tbody>
            {filteredFoods.map(food => (
              <tr key={food.id} className="hover:bg-gray-50 border-b border-gray-100">
                <td className="py-2 px-4">{food.name}</td>
                <td className="py-2 px-4 font-semibold text-blue-600">{food.calories} kcal</td>
                <td className="py-2 px-4">{food.protein}g</td>
                <td className="py-2 px-4">{food.carbs}g</td>
                <td className="py-2 px-4">{food.fat}g</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NutritionMenu;
