import React, { useState, useEffect } from 'react';
import DietPlanner from './components/DietPlanner';
import NutritionMenu from './components/NutritionMenu';
import ImageUploader from './components/ImageUploader';
import DailyLog from './components/DailyLog';
import { Apple, Calculator, Camera, ClipboardList } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('planner');

  // Load initial state from localStorage
  const [dailyLog, setDailyLog] = useState(() => {
    const saved = localStorage.getItem('dailyLog');
    return saved ? JSON.parse(saved) : [];
  });

  const [userGoals, setUserGoals] = useState(() => {
    const saved = localStorage.getItem('userGoals');
    return saved ? JSON.parse(saved) : null;
  });

  const [waterIntake, setWaterIntake] = useState(() => {
    const saved = localStorage.getItem('waterIntake');
    return saved ? Number(saved) : 0;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('dailyLog', JSON.stringify(dailyLog));
  }, [dailyLog]);

  useEffect(() => {
    localStorage.setItem('userGoals', JSON.stringify(userGoals));
  }, [userGoals]);

  useEffect(() => {
    localStorage.setItem('waterIntake', waterIntake.toString());
  }, [waterIntake]);

  const addToLog = (foodItem, grams) => {
    const newItem = {
      ...foodItem,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      amount: grams,
      calories: Math.round((foodItem.calories * grams) / 100),
      protein: Math.round(((foodItem.protein || 0) * grams) / 100),
      carbs: Math.round(((foodItem.carbs || 0) * grams) / 100),
      fat: Math.round(((foodItem.fat || 0) * grams) / 100),
    };
    setDailyLog(prev => [...prev, newItem]);
  };

  const removeFromLog = (id) => {
    setDailyLog(prev => prev.filter(item => item.id !== id));
  };

  const updateGoals = (goals) => {
    setUserGoals(goals);
  };

  const updateWater = (amount) => {
    setWaterIntake(prev => Math.max(0, prev + amount));
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-green-600 text-white p-6 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Apple size={32} />
            <h1 className="text-3xl font-extrabold tracking-tight">Diyet Asistanım</h1>
          </div>

          <nav className="flex flex-wrap gap-2 bg-green-700 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('planner')}
              className={`flex items-center px-4 py-2 rounded-md transition ${
                activeTab === 'planner' ? 'bg-white text-green-700 shadow' : 'text-white hover:bg-green-800'
              }`}
            >
              <Calculator size={18} className="mr-2" />
              Programlayıcı
            </button>
            <button
              onClick={() => setActiveTab('log')}
              className={`flex items-center px-4 py-2 rounded-md transition ${
                activeTab === 'log' ? 'bg-white text-green-700 shadow' : 'text-white hover:bg-green-800'
              }`}
            >
              <ClipboardList size={18} className="mr-2" />
              Günlük
            </button>
            <button
              onClick={() => setActiveTab('scanner')}
              className={`flex items-center px-4 py-2 rounded-md transition ${
                activeTab === 'scanner' ? 'bg-white text-green-700 shadow' : 'text-white hover:bg-green-800'
              }`}
            >
              <Camera size={18} className="mr-2" />
              Tarayıcı
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`flex items-center px-4 py-2 rounded-md transition ${
                activeTab === 'menu' ? 'bg-white text-green-700 shadow' : 'text-white hover:bg-green-800'
              }`}
            >
              <Apple size={18} className="mr-2" />
              Besinler
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-10 px-4">
        {activeTab === 'planner' && <DietPlanner onUpdateGoals={updateGoals} currentGoals={userGoals} />}
        {activeTab === 'log' && <DailyLog log={dailyLog} goals={userGoals} onRemove={removeFromLog} water={waterIntake} onUpdateWater={updateWater} />}
        {activeTab === 'scanner' && <ImageUploader onAddToLog={addToLog} />}
        {activeTab === 'menu' && <NutritionMenu onAddToLog={addToLog} />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-10">
        <div className="container mx-auto text-center text-gray-500">
          <p>&copy; 2024 Diyet Asistanım. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
