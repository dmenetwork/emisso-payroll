import { describe, expect, it } from 'vitest';
import { calculateEmployeePayroll } from '../src/calculator.js';
import { DEFAULT_REFERENCE_DATA } from '../src/reference-data.js';
import { calculateUnemployment } from '../src/rules/unemployment.js';
import type { EmployeePayrollInput, ReferenceData } from '../src/types.js';

// Legal values passed as reference data (caps, unemployment rates, reform rate, mandatory AFP rate,
// legal gratification). Without them the engine keeps its built-in values.

const employee: EmployeePayrollInput = {
  employeeId: 'e-1',
  rut: '11111111-1',
  firstName: 'Ana',
  lastName: 'Pérez',
  baseSalary: 4_000_000,
  gratificationType: 'none',
  colacion: 0,
  movilizacion: 0,
  afpCode: 'habitat',
  afpFund: 'c',
  healthPlan: 'fonasa',
  familyAllowanceLoads: 0,
  contractType: 'indefinido',
  earnings: [],
  deductions: [],
};

const period = new Date('2026-03-01');
const ref: ReferenceData = { ...DEFAULT_REFERENCE_DATA, uf: 39_000 };

describe('legal parameters in reference data', () => {
  it('without the new fields the result is the same as before (defaults)', () => {
    const r = calculateEmployeePayroll(employee, ref, period);
    // 81.6 UF * 39,000 = 3,182,400 cap for AFP, SIS and reform; health and unemployment uncapped.
    expect(r.deductions.afp).toBe(Math.round((3_182_400 * 11.27) / 100));
    expect(r.deductions.health).toBe(280_000);
    expect(r.deductions.unemployment).toBe(24_000);
    expect(r.employerCosts.unemployment).toBe(96_000);
    expect(r.employerCosts.pensionReform).toBe(Math.round((3_182_400 * 2) / 100));
  });

  it('imponibleCapUF caps AFP, health, SIS and reform: 90 UF with UF 39,000 is 3,510,000', () => {
    const r = calculateEmployeePayroll(employee, { ...ref, imponibleCapUF: 90 }, period);
    expect(r.deductions.afp).toBe(Math.round((3_510_000 * 11.27) / 100));
    expect(r.deductions.health).toBe(245_700);
    expect(r.employerCosts.sis).toBe(Math.round((3_510_000 * 1.54) / 100));
    expect(r.employerCosts.pensionReform).toBe(70_200);
  });

  it('unemploymentCapUF and unemploymentRates set the unemployment base and rates by contract type', () => {
    const unemploymentRates = {
      indefinido: { employee: 0.6, employer: 2.4 },
      plazo_fijo: { employee: 0, employer: 3 },
      por_obra: { employee: 0, employer: 3 },
    };
    const data = { ...ref, unemploymentCapUF: 50, unemploymentRates };
    const indefinido = calculateEmployeePayroll(employee, data, period);
    // 50 UF * 39,000 = 1,950,000
    expect(indefinido.deductions.unemployment).toBe(11_700);
    expect(indefinido.employerCosts.unemployment).toBe(46_800);
    const plazoFijo = calculateEmployeePayroll({ ...employee, contractType: 'plazo_fijo' }, data, period);
    expect(plazoFijo.deductions.unemployment).toBe(0);
    expect(plazoFijo.employerCosts.unemployment).toBe(58_500);
  });

  it('pensionReformRate replaces the built-in schedule', () => {
    const r = calculateEmployeePayroll(employee, { ...ref, imponibleCapUF: 90, pensionReformRate: 3.5 }, period);
    expect(r.employerCosts.pensionReform).toBe(122_850);
  });

  it('mandatoryPensionRate, fonasaRate and gratification parameters are used', () => {
    const base = { ...employee, baseSalary: 1_000_000, gratificationType: 'legal' as const };
    const r = calculateEmployeePayroll(
      base,
      { ...ref, mandatoryPensionRate: 11, fonasaRate: 8, gratificationRate: 20, gratificationCapIMM: 10 },
      period,
    );
    expect(r.earnings.gratification).toBe(200_000);
    expect(r.deductions.afp).toBe(Math.round((1_200_000 * 12.27) / 100));
    expect(r.deductions.health).toBe(96_000);
  });

  it('the cap in CLP is round(capUF * uf), also with a UF with decimals, and Isapre keeps its plan cost', () => {
    // 81.6 UF * 39,597.67 = 3,231,169.872 → cap 3,231,170.
    const data = { ...ref, uf: 39_597.67, imponibleCapUF: 81.6 };
    const r = calculateEmployeePayroll(employee, data, period);
    expect(r.deductions.afp).toBe(Math.round((3_231_170 * 11.27) / 100));
    expect(r.deductions.health).toBe(Math.round(3_231_170 * 0.07));
    // Isapre: 7 % of the capped base (226,182) vs a 6.5 UF plan (257,385): the plan wins.
    const isapre = calculateEmployeePayroll({ ...employee, healthPlan: 'isapre', isapreAmount: 6.5 }, data, period);
    expect(isapre.deductions.health).toBe(Math.round(6.5 * 39_597.67));
    const cheap = calculateEmployeePayroll({ ...employee, healthPlan: 'isapre', isapreAmount: 1 }, data, period);
    expect(cheap.deductions.health).toBe(Math.round(3_231_170 * 0.07));
  });

  it('calculateUnemployment rejects a cap without UF', () => {
    expect(() => calculateUnemployment(1_000_000, 'indefinido', { capUF: 10 })).toThrow('capUF requires uf');
  });
});
