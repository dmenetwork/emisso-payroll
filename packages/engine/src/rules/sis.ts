/**
 * SIS (Seguro de Invalidez y Sobrevivencia) calculation rules
 *
 * SIS is an employer cost (not deducted from the employee).
 * Rate comes from the AFP provider. Capped at the tope imponible (default 81.6 UF).
 */

import { AFP_CAP_UF, cappedPercentage } from '../money.js';

/**
 * Calculate SIS employer cost.
 *
 * @param imponibleIncome - Imponible income in CLP
 * @param afpCode - AFP provider code
 * @param afpRates - Map of AFP codes to their commission and SIS rates
 * @param uf - Current UF value in CLP
 * @param capUF - Tope imponible in UF (default 81.6)
 * @returns SIS employer cost in integer CLP
 */
export function calculateSIS(
  imponibleIncome: number,
  afpCode: string,
  afpRates: Record<string, { commissionRate: number; sisRate: number }>,
  uf: number,
  capUF: number = AFP_CAP_UF,
): number {
  const rates = afpRates[afpCode];
  if (!rates) {
    throw new Error(`AFP provider not found: ${afpCode}`);
  }

  return cappedPercentage(imponibleIncome, uf, rates.sisRate, capUF);
}
