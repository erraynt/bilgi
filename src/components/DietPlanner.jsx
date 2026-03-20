import React, { useState } from 'react';
import { calculateBMR, calculateTDEE, getNutrientGoals } from '../utils/dietUtils';
import { User, Activity, Target } from 'lucide-react';

const DietPlanner = () => {
  const [formData, setFormData] = useState({
    weight: 70,
    height: 175,
    age: 25,
    gender: 'male',
    activityLevel: 'sedentary',
    goal: 'maintain',
  });
  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    const bmr = calculateBMR(
      Number(formData.weight),
      Number(formData.height),
      Number(formData.age),
      formData.gender
    );
    const tdee = calculateTDEE(bmr, formData.activityLevel);
    const goals = getNutrientGoals(tdee, formData.goal);
    setResults({ bmr, tdee, goals });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mb-10">
      <h2 className="text-2xl font-bold mb-6 text-green-700">Diyet Programlayıcı</h2>
      <form onSubmit={handleCalculate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="gender" className="text-gray-700 mb-1">Cinsiyet</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
            >
              <option value="male">Erkek</option>
              <option value="female">Kadın</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="age" className="text-gray-700 mb-1">Yaş</label>
            <input
              id="age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="height" className="text-gray-700 mb-1">Boy (cm)</label>
            <input
              id="height"
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="weight" className="text-gray-700 mb-1">Kilo (kg)</label>
            <input
              id="weight"
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="activityLevel" className="text-gray-700 mb-1">Hareketlilik Seviyesi</label>
            <select
              id="activityLevel"
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
            >
              <option value="sedentary">Hareketsiz (Masa başı iş)</option>
              <option value="light">Az Hareketli (1-3 gün egzersiz)</option>
              <option value="moderate">Orta Hareketli (3-5 gün egzersiz)</option>
              <option value="active">Çok Hareketli (6-7 gün egzersiz)</option>
              <option value="veryActive">Aşırı Hareketli (Ağır antrenman)</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="goal" className="text-gray-700 mb-1">Hedef</label>
            <select
              id="goal"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
            >
              <option value="lose">Kilo Ver</option>
              <option value="maintain">Kiloyu Koru</option>
              <option value="gain">Kilo Al</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Programı Hesapla
          </button>
        </div>
      </form>

      {results && (
        <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4 text-center">Günlük İhtiyacınız</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white p-4 rounded shadow">
              <span className="block text-2xl font-bold text-green-600">{results.goals.targetCalories}</span>
              <span className="text-sm text-gray-500 uppercase">Kalori</span>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <span className="block text-2xl font-bold text-blue-600">{results.goals.protein}g</span>
              <span className="text-sm text-gray-500 uppercase">Protein</span>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <span className="block text-2xl font-bold text-yellow-600">{results.goals.carbs}g</span>
              <span className="text-sm text-gray-500 uppercase">Karbonhidrat</span>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <span className="block text-2xl font-bold text-red-600">{results.goals.fat}g</span>
              <span className="text-sm text-gray-500 uppercase">Yağ</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietPlanner;
