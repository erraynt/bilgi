import React, { useState } from 'react';
import { Camera, Upload, Loader2, CheckCircle } from 'lucide-react';
import { analyzeFoodImage } from '../services/calorieApi';

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setAnalyzing(true);
    try {
      const response = await analyzeFoodImage(image);
      setResult(response);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mb-10 text-center">
      <h2 className="text-2xl font-bold mb-6 text-green-700">Yemek Fotoğrafı Analizörü</h2>

      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-10 mb-6 bg-gray-50 hover:bg-gray-100 transition-all">
        {image ? (
          <img src={image} alt="Yemek" className="max-h-64 rounded-lg shadow-sm mb-4" />
        ) : (
          <div className="flex flex-col items-center">
            <Camera size={64} className="text-gray-400 mb-2" />
            <p className="text-gray-600 mb-4">Bir fotoğraf seçin veya kameranızı kullanın</p>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          id="food-upload"
          className="hidden"
          onChange={handleFileChange}
        />
        <label
          htmlFor="food-upload"
          className="bg-green-600 text-white font-semibold py-2 px-6 rounded-full cursor-pointer hover:bg-green-700 transition"
        >
          {image ? 'Değiştir' : 'Fotoğraf Yükle'}
        </label>
      </div>

      {image && !result && (
        <button
          onClick={handleAnalyze}
          disabled={analyzing}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex justify-center items-center"
        >
          {analyzing ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Analiz Ediliyor...
            </>
          ) : (
            'Kalori Hesapla'
          )}
        </button>
      )}

      {result && (
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-center mb-4 text-blue-700">
            <CheckCircle className="mr-2" />
            <h3 className="text-xl font-bold">Analiz Tamamlandı!</h3>
          </div>
          <p className="text-lg mb-4 text-gray-700">
            Tespit edilen yemek: <span className="font-bold text-blue-800">{result.data.name}</span> (%{result.confidence} doğruluk)
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white p-3 rounded shadow">
              <span className="block text-xl font-bold text-green-600">{result.data.calories}</span>
              <span className="text-xs text-gray-500 uppercase">Kalori</span>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <span className="block text-xl font-bold text-blue-600">{result.data.protein}g</span>
              <span className="text-xs text-gray-500 uppercase">Protein</span>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <span className="block text-xl font-bold text-yellow-600">{result.data.carbs}g</span>
              <span className="text-xs text-gray-500 uppercase">Karbonhidrat</span>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <span className="block text-xl font-bold text-red-600">{result.data.fat}g</span>
              <span className="text-xs text-gray-500 uppercase">Yağ</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
