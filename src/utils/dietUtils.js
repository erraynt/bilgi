/**
 * Harris-Benedict Equation for BMR
 * @param {number} weight kg
 * @param {number} height cm
 * @param {number} age years
 * @param {string} gender 'male' or 'female'
 */
export const calculateBMR = (weight, height, age, gender) => {
  if (gender === 'male') {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
};

/**
 * Total Daily Energy Expenditure (TDEE)
 * @param {number} bmr
 * @param {string} activityLevel sedentary, light, moderate, active, veryActive
 */
export const calculateTDEE = (bmr, activityLevel) => {
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };
  return bmr * (multipliers[activityLevel] || 1.2);
};

export const getNutrientGoals = (tdee, goal) => {
  let targetCalories = tdee;
  if (goal === 'lose') targetCalories -= 500;
  if (goal === 'gain') targetCalories += 500;

  // Standard macros: 30% protein, 40% carbs, 30% fat
  const protein = (targetCalories * 0.3) / 4;
  const carbs = (targetCalories * 0.4) / 4;
  const fat = (targetCalories * 0.3) / 9;

  return { targetCalories: Math.round(targetCalories), protein: Math.round(protein), carbs: Math.round(carbs), fat: Math.round(fat) };
};
