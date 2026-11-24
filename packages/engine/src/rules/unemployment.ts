/**
 * Unemployment insurance (Seguro de Cesantia) calculation rules
 *
 * Default rates (when the caller does not pass them):
 * Employee portion: 0.6% of imponible income
 * Employer portion: 2.4% (indefinido) or 3.0% (plazo_fijo/por_obra)
 *
 * With `rates` and `capUF` the caller supplies the legal values of the period
 * (rates by contract type and tope imponible in UF).
 */

import { cappedPercentage, percentage } from '../money.js';

const EMPLOYEE_RATE = 0.6;
const EMPLOYER_RATE_INDEFINIDO = 2.4;
const EMPLOYER_RATE_PLAZO_FIJO = 3.0;

type ContractType = 'indefinido' | 'plazo_fijo' | 'por_obra';

export interface UnemploymentOptions {
  /** Rates by contract type, as percentages. */
  rates?: Record<ContractType, { employee: number; employer: number }>;
  /** Tope imponible in UF. Requires `uf`. Without it the base is not capped. */
  capUF?: number;
  /** Current UF value in CLP. */
  uf?: number;
}

/**
 * Calculate unemployment insurance for employee and employer.
 *
 * @param imponibleIncome - Imponible income in CLP
 * @param contractType - Type of employment contract
 * @param options - Rates by contract type and tope imponible of the period
 * @returns Object with employee and employer portions in integer CLP
 */
export function calculateUnemployment(
  imponibleIncome: number,
  contractType: ContractType,
  options: UnemploymentOptions = {},
): { employee: number; employer: number } {
  const { employee: employeeRate, employer: employerRate } = options.rates?.[contractType] ?? {
    employee: EMPLOYEE_RATE,
    employer: contractType === 'indefinido' ? EMPLOYER_RATE_INDEFINIDO : EMPLOYER_RATE_PLAZO_FIJO,
  };

  const { capUF, uf } = options;
  if (capUF !== undefined && uf === undefined) {
    throw new Error('calculateUnemployment: capUF requires uf');
  }
  const apply = (rate: number) =>
    capUF === undefined ? percentage(imponibleIncome, rate) : cappedPercentage(imponibleIncome, uf!, rate, capUF);

  return { employee: apply(employeeRate), employer: apply(employerRate) };
}
