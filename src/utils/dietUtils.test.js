import { describe, it, expect } from 'vitest';
import { calculateBMR, calculateTDEE, getNutrientGoals } from './dietUtils';

describe('Diet calculation utilities', () => {
  it('calculates BMR for male correctly', () => {
    const bmr = calculateBMR(70, 175, 25, 'male');
    expect(bmr).toBeCloseTo(1724.05, 1);
  });

  it('calculates BMR for female correctly', () => {
    const bmr = calculateBMR(70, 175, 25, 'female');
    expect(bmr).toBeCloseTo(1528.8, 1);
  });

  it('calculates TDEE correctly for sedentary', () => {
    const tdee = calculateTDEE(1700, 'sedentary');
    expect(tdee).toBe(2040);
  });

  it('calculates nutrient goals correctly for maintain', () => {
    const goals = getNutrientGoals(2000, 'maintain');
    expect(goals.targetCalories).toBe(2000);
    expect(goals.protein).toBe(150); // 2000 * 0.3 / 4
    expect(goals.carbs).toBe(200);   // 2000 * 0.4 / 4
    expect(goals.fat).toBe(67);      // 2000 * 0.3 / 9
  });
});
