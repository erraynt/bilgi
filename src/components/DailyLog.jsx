import React from 'react';
import { Trash2, AlertCircle } from 'lucide-react';

const DailyLog = ({ log, goals, onRemove }) => {
  const totals = log.reduce(
    (acc, item) => ({
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fat: acc.fat + item.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const getPercentage = (current, goal) => {
    if (!goal) return 0;
    return Math.min(Math.round((current / goal) * 100), 100);
  };

  const getBarColor = (current, goal) => {
    if (!goal) return 'bg-gray-300';
    const percent = (current / goal) * 100;
    if (percent > 100) return 'bg-red-500';
    if (percent > 85) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Summary Cards */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-green-700">Günlük Özet</h2>

        {!goals && (
          <div className="flex items-center p-4 mb-6 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700">
            <AlertCircle className="mr-2" />
            <span>Henüz bir hedef belirlemediniz. Programlayıcı sekmesinden hedefinizi oluşturun.</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex justify-between items-end mb-1">
              <span className="text-gray-700 font-medium">Kalori</span>
              <span className="text-sm text-gray-500">
                {totals.calories} / {goals?.targetCalories || 0} kcal
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all duration-500 ${getBarColor(totals.calories, goals?.targetCalories)}`}
                style={{ width: `${getPercentage(totals.calories, goals?.targetCalories)}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-end mb-1">
              <span className="text-gray-700 font-medium">Protein</span>
              <span className="text-sm text-gray-500">
                {totals.protein} / {goals?.protein || 0}g
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${getPercentage(totals.protein, goals?.protein)}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end mb-1">
              <span className="text-gray-700 font-medium">Karbonhidrat</span>
              <span className="text-sm text-gray-500">
                {totals.carbs} / {goals?.carbs || 0}g
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-yellow-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${getPercentage(totals.carbs, goals?.carbs)}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-end mb-1">
              <span className="text-gray-700 font-medium">Yağ</span>
              <span className="text-sm text-gray-500">
                {totals.fat} / {goals?.fat || 0}g
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-red-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${getPercentage(totals.fat, goals?.fat)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Log List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Tüketilen Besinler</h3>
        {log.length === 0 ? (
          <p className="text-center py-8 text-gray-500 italic">Bugün henüz bir şey eklemediniz.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-gray-600 text-sm">
                  <th className="py-2 px-4">Besin</th>
                  <th className="py-2 px-4">Miktar</th>
                  <th className="py-2 px-4 text-center">Kalori</th>
                  <th className="py-2 px-4 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {log.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 border-b border-gray-100">
                    <td className="py-3 px-4 font-medium">{item.name}</td>
                    <td className="py-3 px-4 text-gray-600">{item.amount}g</td>
                    <td className="py-3 px-4 text-center font-semibold text-green-600">{item.calories} kcal</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-red-400 hover:text-red-600 p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyLog;
