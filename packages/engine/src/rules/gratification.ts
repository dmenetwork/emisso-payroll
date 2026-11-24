/**
 * Gratification (bonus) calculation rules
 *
 * Legal: min(baseSalary * 25%, 4.75 * IMM / 12)
 * Convenida: fixed monthly amount from contract
 * None: 0
 */

import { roundCLP } from '../money.js';

/**
 * Calculate monthly gratification.
 *
 * @param baseSalary - Monthly base salary in CLP
 * @param gratificationType - Type of gratification
 * @param gratificationAmount - Fixed amount for 'convenida' type (CLP)
 * @param imm - Ingreso Minimo Mensual (minimum wage) in CLP
 * @param rate - Legal gratification percentage of base salary (default 25)
 * @param capIMM - Yearly cap in IMM, paid monthly as capIMM * imm / 12 (default 4.75)
 * @returns Monthly gratification in integer CLP
 */
export function calculateGratification(
  baseSalary: number,
  gratificationType: 'legal' | 'convenida' | 'none',
  gratificationAmount: number,
  imm: number,
  rate: number = 25,
  capIMM: number = 4.75,
): number {
  switch (gratificationType) {
    case 'legal': {
      const option25 = (baseSalary * rate) / 100;
      const cap = (capIMM * imm) / 12;
      return roundCLP(Math.min(option25, cap));
    }
    case 'convenida':
      return roundCLP(gratificationAmount);
    case 'none':
      return 0;
  }
}
