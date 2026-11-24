/**
 * AFP (Pension Fund) calculation rules
 *
 * Calculates the employee AFP deduction based on imponible income,
 * the AFP provider's commission rate, and the tope imponible (default 81.6 UF).
 */

import { AFP_CAP_UF, cappedPercentage } from '../money.js';

/** Mandatory pension contribution rate (10%) — default when the caller does not pass one */
const MANDATORY_PENSION_RATE = 10;

/**
 * Calculate AFP pension fund deduction for an employee.
 *
 * The total AFP deduction is the mandatory pension contribution (10% by default)
 * plus the AFP provider's commission rate (e.g. 1.27% for Habitat),
 * applied to imponible income capped at the tope imponible.
 *
 * @param imponibleIncome - Imponible income in CLP
 * @param afpCode - AFP provider code (e.g. 'capital', 'habitat')
 * @param afpRates - Map of AFP codes to their commission and SIS rates
 * @param uf - Current UF value in CLP
 * @param capUF - Tope imponible in UF (default 81.6)
 * @param mandatoryRate - Mandatory contribution percentage (default 10)
 * @returns AFP deduction amount in integer CLP
 */
export function calculateAFP(
  imponibleIncome: number,
  afpCode: string,
  afpRates: Record<string, { commissionRate: number; sisRate: number }>,
  uf: number,
  capUF: number = AFP_CAP_UF,
  mandatoryRate: number = MANDATORY_PENSION_RATE,
): number {
  const rates = afpRates[afpCode];
  if (!rates) {
    throw new Error(`AFP provider not found: ${afpCode}`);
  }

  return cappedPercentage(imponibleIncome, uf, mandatoryRate + rates.commissionRate, capUF);
}
