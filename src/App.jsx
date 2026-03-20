import React, { useState } from 'react';
import DietPlanner from './components/DietPlanner';
import NutritionMenu from './components/NutritionMenu';
import ImageUploader from './components/ImageUploader';
import { Apple, Calculator, Camera } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('planner');

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-green-600 text-white p-6 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Apple size={32} />
            <h1 className="text-3xl font-extrabold tracking-tight">Diyet Asistanım</h1>
          </div>

          <nav className="flex space-x-4 bg-green-700 p-1 rounded-lg">
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
              Besin Değerleri
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-10 px-4">
        {activeTab === 'planner' && <DietPlanner />}
        {activeTab === 'scanner' && <ImageUploader />}
        {activeTab === 'menu' && <NutritionMenu />}
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
