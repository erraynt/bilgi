/**
 * Simulates a food recognition API.
 * In a real-world app, this would send an image to a backend
 * that uses AI (like Google Vision, Clarifai, or Edamam) to identify the food.
 */
export const analyzeFoodImage = async (imageFile) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mocked response logic: In a real app, this would be an actual API call
  // We'll return a random food from our list as a simulation.
  const mockFoods = [
    { name: "Tavuk Göğsü", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: "Elma", calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
    { name: "Yumurta", calories: 155, protein: 13, carbs: 1.1, fat: 11 },
    { name: "Pirinç", calories: 130, protein: 2.7, carbs: 28, fat: 0.3 }
  ];

  const randomIndex = Math.floor(Math.random() * mockFoods.length);
  return {
    success: true,
    data: mockFoods[randomIndex],
    confidence: (Math.random() * 20 + 80).toFixed(2) // 80-100% confidence
  };
};
