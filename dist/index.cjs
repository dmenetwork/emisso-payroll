"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AFPRateSchema: () => AFPRateSchema,
  AFP_CAP_UF: () => AFP_CAP_UF,
  AFP_PREVIRED_CODES: () => AFP_PREVIRED_CODES,
  CalculationInputSchema: () => CalculationInputSchema,
  DEFAULT_REFERENCE_DATA: () => DEFAULT_REFERENCE_DATA,
  DeductionSchema: () => DeductionSchema,
  EarningSchema: () => EarningSchema,
  EarningTypeSchema: () => EarningTypeSchema,
  EmployeePayrollInputSchema: () => EmployeePayrollInputSchema,
  FamilyAllowanceBracketSchema: () => FamilyAllowanceBracketSchema,
  HEALTH_PREVIRED_CODES: () => HEALTH_PREVIRED_CODES,
  ReferenceDataSchema: () => ReferenceDataSchema,
  TaxBracketSchema: () => TaxBracketSchema,
  calcular: () => calculatePayroll,
  calcularEmpleado: () => calculateEmployeePayroll,
  calculateEmployeePayroll: () => calculateEmployeePayroll,
  calculateFiniquito: () => calculateFiniquito,
  calculateOvertime: () => calculateOvertime,
  calculatePayroll: () => calculatePayroll,
  cappedPercentage: () => cappedPercentage,
  clamp: () => clamp,
  cleanRut: () => cleanRut,
  clearIndicatorCache: () => clearIndicatorCache,
  divide: () => divide,
  formatCLP: () => formatCLP,
  formatRut: () => formatRut,
  generatePreviredFile: () => generatePreviredFile,
  multiply: () => multiply,
  parseRut: () => parseRut,
  percentage: () => percentage,
  resolveEarningFlags: () => resolveEarningFlags,
  resolveReferenceData: () => resolveReferenceData,
  roundCLP: () => roundCLP,
  simulate: () => calculatePayroll,
  simulateEmployee: () => calculateEmployeePayroll,
  solveNetToGross: () => solveNetToGross,
  subtract: () => subtract,
  sum: () => sum,
  validatePreviredData: () => validatePreviredData,
  validateRut: () => validateRut
});
module.exports = __toCommonJS(index_exports);

// src/types.ts
var import_zod = require("zod");
var EarningTypeSchema = import_zod.z.enum([
  "bonus",
  "commission",
  "overtime",
  "allowance",
  "viatico",
  "reimbursement",
  "aguinaldo",
  "loss_of_cash",
  "other"
]);
var EarningSchema = import_zod.z.object({
  type: EarningTypeSchema,
  description: import_zod.z.string(),
  amount: import_zod.z.number(),
  isTaxable: import_zod.z.boolean().optional(),
  isImponible: import_zod.z.boolean().optional()
});
var DeductionSchema = import_zod.z.object({
  type: import_zod.z.string(),
  description: import_zod.z.string(),
  amount: import_zod.z.number()
});
var EmployeePayrollInputSchema = import_zod.z.object({
  employeeId: import_zod.z.string(),
  rut: import_zod.z.string(),
  firstName: import_zod.z.string(),
  lastName: import_zod.z.string(),
  baseSalary: import_zod.z.number().describe("CLP"),
  gratificationType: import_zod.z.enum(["legal", "convenida", "none"]),
  gratificationAmount: import_zod.z.number().optional().describe("For convenida type"),
  colacion: import_zod.z.number().describe("Lunch allowance (CLP)"),
  movilizacion: import_zod.z.number().describe("Transportation allowance (CLP)"),
  afpCode: import_zod.z.string(),
  afpFund: import_zod.z.enum(["a", "b", "c", "d", "e"]),
  healthPlan: import_zod.z.enum(["fonasa", "isapre"]),
  isapreAmount: import_zod.z.number().optional().describe("Total Isapre plan cost in UF (e.g. 6.55 UF). The deduction will be max(7%, plan cost)."),
  apvAmount: import_zod.z.number().optional().describe("Voluntary pension savings"),
  familyAllowanceLoads: import_zod.z.number().int().min(0),
  contractType: import_zod.z.enum(["indefinido", "plazo_fijo", "por_obra"]).optional().default("indefinido"),
  earnings: import_zod.z.array(EarningSchema),
  deductions: import_zod.z.array(DeductionSchema)
});
var AFPRateSchema = import_zod.z.object({
  commissionRate: import_zod.z.number(),
  sisRate: import_zod.z.number()
});
var TaxBracketSchema = import_zod.z.object({
  from: import_zod.z.number().describe("UF"),
  to: import_zod.z.number().nullable().describe("UF, null for last bracket"),
  rate: import_zod.z.number().describe("Percentage"),
  deduction: import_zod.z.number().describe("UF")
});
var FamilyAllowanceBracketSchema = import_zod.z.object({
  from: import_zod.z.number().describe("CLP"),
  to: import_zod.z.number().nullable().describe("CLP"),
  amount: import_zod.z.number().describe("CLP per load")
});
var ReferenceDataSchema = import_zod.z.object({
  uf: import_zod.z.number().describe("UF value in CLP"),
  utm: import_zod.z.number().describe("UTM value in CLP"),
  uta: import_zod.z.number().describe("UTA value in CLP"),
  imm: import_zod.z.number().describe("Ingreso M\xEDnimo Mensual (minimum wage)"),
  afpRates: import_zod.z.record(import_zod.z.string(), AFPRateSchema),
  fonasaRate: import_zod.z.number().describe("Percentage (typically 7%)"),
  taxBrackets: import_zod.z.array(TaxBracketSchema),
  familyAllowanceBrackets: import_zod.z.array(FamilyAllowanceBracketSchema),
  unemploymentRate: import_zod.z.number().describe("Percentage"),
  mutualRate: import_zod.z.number().describe("Percentage (variable by company)")
});
var CalculationInputSchema = import_zod.z.object({
  employees: import_zod.z.array(EmployeePayrollInputSchema),
  referenceData: ReferenceDataSchema.optional(),
  periodYear: import_zod.z.number().int(),
  periodMonth: import_zod.z.number().int().min(1).max(12),
  periodDate: import_zod.z.date().optional().describe("Date for which calculation is performed (affects reform rate)")
});

// src/money.ts
function roundCLP(amount) {
  return Math.round(amount);
}
function percentage(amount, rate) {
  return roundCLP(amount * rate / 100);
}
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
function sum(...amounts) {
  return amounts.reduce((acc, val) => acc + roundCLP(val), 0);
}
function subtract(a, b) {
  return roundCLP(a) - roundCLP(b);
}
function multiply(amount, factor) {
  return roundCLP(amount * factor);
}
function divide(amount, divisor) {
  if (divisor === 0) {
    throw new Error("Divisi\xF3n por cero");
  }
  return roundCLP(amount / divisor);
}
function formatCLP(amount) {
  return roundCLP(amount).toLocaleString("es-CL");
}
var AFP_CAP_UF = 81.6;
function cappedPercentage(imponibleIncome, uf, rate) {
  const cap = roundCLP(AFP_CAP_UF * uf);
  const base = Math.min(imponibleIncome, cap);
  return percentage(base, rate);
}

// src/fetch-indicators.ts
var import_zod2 = require("zod");

// src/reference-data.ts
var DEFAULT_REFERENCE_DATA = {
  uf: 38500,
  utm: 65967,
  uta: 791604,
  imm: 539e3,
  afpRates: {
    capital: { commissionRate: 1.44, sisRate: 1.54 },
    cuprum: { commissionRate: 1.44, sisRate: 1.54 },
    habitat: { commissionRate: 1.27, sisRate: 1.54 },
    planvital: { commissionRate: 1.16, sisRate: 1.54 },
    provida: { commissionRate: 1.45, sisRate: 1.54 },
    modelo: { commissionRate: 0.58, sisRate: 1.54 },
    uno: { commissionRate: 0.49, sisRate: 1.54 }
  },
  fonasaRate: 7,
  taxBrackets: [
    { from: 0, to: 13.5, rate: 0, deduction: 0 },
    { from: 13.5, to: 30, rate: 4, deduction: 0.54 },
    { from: 30, to: 50, rate: 8, deduction: 1.74 },
    { from: 50, to: 70, rate: 13.5, deduction: 4.49 },
    { from: 70, to: 90, rate: 23, deduction: 11.14 },
    { from: 90, to: 120, rate: 30.4, deduction: 17.8 },
    { from: 120, to: 310, rate: 35.5, deduction: 23.92 },
    { from: 310, to: null, rate: 40, deduction: 37.87 }
  ],
  familyAllowanceBrackets: [
    { from: 0, to: 481698, amount: 14872 },
    { from: 481698, to: 703347, amount: 9108 },
    { from: 703347, to: 1093554, amount: 2876 },
    { from: 1093554, to: null, amount: 0 }
  ],
  unemploymentRate: 0.6,
  mutualRate: 0.93
};

// src/fetch-indicators.ts
var ResponseSchema = import_zod2.z.object({
  uf: import_zod2.z.object({ valor: import_zod2.z.number().min(3e4).max(6e4) }),
  utm: import_zod2.z.object({ valor: import_zod2.z.number().min(5e4).max(12e4) })
});
var MINDICADOR_API_URL = "https://mindicador.cl/api";
var cachedData = null;
var inflightPromise = null;
async function resolveReferenceData() {
  if (cachedData) return cachedData;
  if (inflightPromise) return inflightPromise;
  inflightPromise = doFetch();
  return inflightPromise;
}
async function doFetch() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5e3);
  try {
    const response = await fetch(MINDICADOR_API_URL, {
      headers: { Accept: "application/json", "User-Agent": "EmissoPayroll/1.0" },
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    const parsed = ResponseSchema.parse(json);
    cachedData = {
      ...DEFAULT_REFERENCE_DATA,
      uf: parsed.uf.valor,
      utm: parsed.utm.valor,
      uta: parsed.utm.valor * 12
    };
    return cachedData;
  } catch (err) {
    console.warn("[emisso-payroll] Failed to fetch live indicators, using defaults:", err);
    cachedData = DEFAULT_REFERENCE_DATA;
    return DEFAULT_REFERENCE_DATA;
  } finally {
    clearTimeout(timeoutId);
    inflightPromise = null;
  }
}
function clearIndicatorCache() {
  cachedData = null;
  inflightPromise = null;
}

// src/rules/afp.ts
var MANDATORY_PENSION_RATE = 10;
function calculateAFP(imponibleIncome, afpCode, afpRates, uf) {
  const rates = afpRates[afpCode];
  if (!rates) {
    throw new Error(`AFP provider not found: ${afpCode}`);
  }
  return cappedPercentage(imponibleIncome, uf, MANDATORY_PENSION_RATE + rates.commissionRate);
}

// src/rules/apv.ts
function calculateAPV(apvAmount) {
  return roundCLP(apvAmount);
}

// src/rules/family-allowance.ts
function calculateFamilyAllowance(baseSalary, loads, brackets) {
  if (loads <= 0) {
    return 0;
  }
  const bracket = brackets.find((b) => {
    const aboveFrom = baseSalary >= b.from;
    const belowTo = b.to === null || baseSalary <= b.to;
    return aboveFrom && belowTo;
  });
  if (!bracket) {
    return 0;
  }
  return roundCLP(bracket.amount * loads);
}

// src/rules/gratification.ts
function calculateGratification(baseSalary, gratificationType, gratificationAmount, imm) {
  switch (gratificationType) {
    case "legal": {
      const option25 = baseSalary * 0.25;
      const cap = 4.75 * imm / 12;
      return roundCLP(Math.min(option25, cap));
    }
    case "convenida":
      return roundCLP(gratificationAmount);
    case "none":
      return 0;
  }
}

// src/rules/health.ts
var FONASA_RATE = 7;
function calculateHealth(imponibleIncome, healthPlan, isapreUFAmount, ufValue) {
  const minimumHealth = percentage(imponibleIncome, FONASA_RATE);
  if (healthPlan === "fonasa") {
    return minimumHealth;
  }
  const isapreCost = roundCLP(isapreUFAmount * ufValue);
  return Math.max(minimumHealth, isapreCost);
}

// src/rules/income-tax.ts
function calculateIncomeTax(taxableIncome, taxBrackets, utmValue) {
  if (taxableIncome <= 0) {
    return 0;
  }
  const taxableInUTM = taxableIncome / utmValue;
  const bracket = taxBrackets.find((b) => {
    const aboveFrom = taxableInUTM >= b.from;
    const belowTo = b.to === null || taxableInUTM < b.to;
    return aboveFrom && belowTo;
  });
  if (!bracket || bracket.rate === 0) {
    return 0;
  }
  const taxInUTM = taxableInUTM * (bracket.rate / 100) - bracket.deduction;
  if (taxInUTM <= 0) {
    return 0;
  }
  return roundCLP(taxInUTM * utmValue);
}

// src/rules/mutual.ts
function calculateMutual(imponibleIncome, mutualRate) {
  return percentage(imponibleIncome, mutualRate);
}

// src/rules/sis.ts
function calculateSIS(imponibleIncome, afpCode, afpRates, uf) {
  const rates = afpRates[afpCode];
  if (!rates) {
    throw new Error(`AFP provider not found: ${afpCode}`);
  }
  return cappedPercentage(imponibleIncome, uf, rates.sisRate);
}

// src/rules/unemployment.ts
var EMPLOYEE_RATE = 0.6;
var EMPLOYER_RATE_INDEFINIDO = 2.4;
var EMPLOYER_RATE_PLAZO_FIJO = 3;
function calculateUnemployment(imponibleIncome, contractType) {
  const employee = percentage(imponibleIncome, EMPLOYEE_RATE);
  const employerRate = contractType === "indefinido" ? EMPLOYER_RATE_INDEFINIDO : EMPLOYER_RATE_PLAZO_FIJO;
  const employer = percentage(imponibleIncome, employerRate);
  return { employee, employer };
}

// src/rules/employer-pension-reform.ts
var REFORM_PHASES = [
  { startDate: /* @__PURE__ */ new Date("2028-08-01"), rate: 8.5 },
  { startDate: /* @__PURE__ */ new Date("2027-08-01"), rate: 6 },
  { startDate: /* @__PURE__ */ new Date("2026-08-01"), rate: 4 },
  { startDate: /* @__PURE__ */ new Date("2025-08-01"), rate: 2 }
];
function getReformRate(effectiveDate) {
  for (const phase of REFORM_PHASES) {
    if (effectiveDate >= phase.startDate) {
      return phase.rate;
    }
  }
  return 0;
}
function calculateEmployerPensionReform(imponibleIncome, uf, effectiveDate) {
  const rate = getReformRate(effectiveDate);
  if (rate === 0) return 0;
  return cappedPercentage(imponibleIncome, uf, rate);
}

// src/calculator.ts
async function calculatePayroll(input) {
  const referenceData = input.referenceData ?? await resolveReferenceData();
  const periodDate = input.periodDate ?? new Date(input.periodYear, input.periodMonth - 1, 1);
  return input.employees.map(
    (employee) => calculateEmployeePayroll(employee, referenceData, periodDate)
  );
}
function calculateEmployeePayroll(employee, referenceData, periodDate) {
  const { uf, utm, imm, afpRates, taxBrackets, familyAllowanceBrackets, mutualRate } = referenceData;
  const baseSalary = roundCLP(employee.baseSalary);
  const gratification = calculateGratification(
    baseSalary,
    employee.gratificationType,
    employee.gratificationAmount ?? 0,
    imm
  );
  let overtimeTotal = 0;
  let bonusesTotal = 0;
  let allowancesTotal = 0;
  let otherEarningsTotal = 0;
  let imponibleEarnings = 0;
  let taxableEarnings = 0;
  let nonTaxableEarnings = 0;
  for (const earning of employee.earnings) {
    const amount = roundCLP(earning.amount);
    const { isImponible, isTaxable } = resolveEarningFlags(earning.type, earning.isImponible, earning.isTaxable);
    switch (earning.type) {
      case "overtime":
        overtimeTotal = sum(overtimeTotal, amount);
        break;
      case "bonus":
      case "commission":
        bonusesTotal = sum(bonusesTotal, amount);
        break;
      case "allowance":
        allowancesTotal = sum(allowancesTotal, amount);
        break;
      default:
        otherEarningsTotal = sum(otherEarningsTotal, amount);
        break;
    }
    if (isImponible) {
      imponibleEarnings = sum(imponibleEarnings, amount);
    }
    if (isTaxable) {
      taxableEarnings = sum(taxableEarnings, amount);
    }
    if (!isImponible && !isTaxable) {
      nonTaxableEarnings = sum(nonTaxableEarnings, amount);
    }
  }
  const familyAllowance = calculateFamilyAllowance(
    baseSalary,
    employee.familyAllowanceLoads,
    familyAllowanceBrackets
  );
  const colacion = roundCLP(employee.colacion);
  const movilizacion = roundCLP(employee.movilizacion);
  const totalImponible = sum(baseSalary, gratification, imponibleEarnings);
  const totalTaxable = sum(baseSalary, gratification, taxableEarnings);
  const totalNonTaxable = sum(colacion, movilizacion, familyAllowance, nonTaxableEarnings);
  const afp = calculateAFP(totalImponible, employee.afpCode, afpRates, uf);
  const health = calculateHealth(
    totalImponible,
    employee.healthPlan,
    employee.isapreAmount ?? 0,
    uf
  );
  const contractType = employee.contractType ?? "indefinido";
  const unemployment = calculateUnemployment(totalImponible, contractType);
  const apv = calculateAPV(employee.apvAmount ?? 0);
  const incomeTaxBase = subtract(
    totalTaxable,
    sum(afp, health, apv, unemployment.employee)
  );
  const incomeTax = calculateIncomeTax(incomeTaxBase, taxBrackets, utm);
  let additionalDeductions = 0;
  for (const deduction of employee.deductions) {
    additionalDeductions = sum(additionalDeductions, roundCLP(deduction.amount));
  }
  const totalDeductions = sum(afp, health, unemployment.employee, incomeTax, apv, additionalDeductions);
  const totalEarnings = sum(
    baseSalary,
    gratification,
    overtimeTotal,
    bonusesTotal,
    allowancesTotal,
    otherEarningsTotal,
    familyAllowance,
    colacion,
    movilizacion
  );
  const netPay = subtract(totalEarnings, totalDeductions);
  const mutual = calculateMutual(totalImponible, mutualRate);
  const sis = calculateSIS(totalImponible, employee.afpCode, afpRates, uf);
  const employerUnemployment = unemployment.employer;
  const pensionReform = calculateEmployerPensionReform(totalImponible, uf, periodDate ?? /* @__PURE__ */ new Date());
  const totalEmployerCosts = sum(mutual, sis, employerUnemployment, pensionReform);
  return {
    employeeId: employee.employeeId,
    earnings: {
      baseSalary,
      gratification,
      overtime: overtimeTotal,
      bonuses: bonusesTotal,
      allowances: allowancesTotal,
      familyAllowance,
      other: otherEarningsTotal,
      totalImponible,
      totalTaxable,
      totalNonTaxable
    },
    deductions: {
      afp,
      health,
      unemployment: unemployment.employee,
      incomeTax,
      apv,
      additionalDeductions,
      total: totalDeductions
    },
    netPay,
    employerCosts: {
      mutual,
      sis,
      unemployment: employerUnemployment,
      pensionReform,
      total: totalEmployerCosts
    }
  };
}
function resolveEarningFlags(type, isImponible, isTaxable) {
  switch (type) {
    case "bonus":
    case "commission":
    case "overtime":
      return { isImponible: true, isTaxable: true };
    case "viatico":
    case "reimbursement":
    case "aguinaldo":
    case "loss_of_cash":
      return { isImponible: false, isTaxable: false };
    case "allowance":
    case "other":
      return { isImponible: isImponible ?? true, isTaxable: isTaxable ?? true };
  }
}

// src/net-to-gross.ts
function solveNetToGross(input, referenceData, options) {
  const tolerance = options?.tolerance ?? 1;
  const maxIterations = options?.maxIterations ?? 50;
  let low = options?.minGross ?? referenceData.imm;
  let high = options?.maxGross ?? roundCLP(300 * referenceData.uf);
  const employeeId = input.employeeId ?? crypto.randomUUID();
  let iterations = 0;
  let converged = false;
  let lastResult;
  let lastMid = low;
  const employeeTemplate = {
    employeeId,
    rut: input.rut,
    firstName: input.firstName,
    lastName: input.lastName,
    gratificationType: input.gratificationType,
    gratificationAmount: input.gratificationAmount,
    colacion: input.colacion,
    movilizacion: input.movilizacion,
    afpCode: input.afpCode,
    afpFund: input.afpFund,
    healthPlan: input.healthPlan,
    isapreAmount: input.isapreAmount,
    apvAmount: input.apvAmount,
    familyAllowanceLoads: input.familyAllowanceLoads,
    contractType: input.contractType ?? "indefinido",
    earnings: input.earnings,
    deductions: input.deductions
  };
  for (let i = 0; i < maxIterations; i++) {
    iterations = i + 1;
    const mid = roundCLP((low + high) / 2);
    lastMid = mid;
    const result = calculateEmployeePayroll(
      { ...employeeTemplate, baseSalary: mid },
      referenceData,
      options?.periodDate
    );
    lastResult = result;
    if (Math.abs(result.netPay - input.targetNetPay) <= tolerance) {
      converged = true;
      break;
    }
    if (result.netPay < input.targetNetPay) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
    if (low > high) break;
  }
  const finalResult = lastResult;
  return {
    targetNetPay: input.targetNetPay,
    grossSalary: lastMid,
    actualNetPay: finalResult.netPay,
    breakdown: finalResult,
    iterations,
    converged
  };
}

// src/rut.ts
function cleanRut(rut) {
  return rut.replace(/[.\-\s]/g, "").toUpperCase();
}
function parseRut(rut) {
  const cleaned = cleanRut(rut);
  if (cleaned.length < 2) {
    throw new Error("RUT inv\xE1lido: muy corto");
  }
  const verifier = cleaned.slice(-1);
  const number = Number.parseInt(cleaned.slice(0, -1), 10);
  if (Number.isNaN(number)) {
    throw new Error("RUT inv\xE1lido: n\xFAmero no v\xE1lido");
  }
  return { number, verifier };
}
function calculateVerifier(rutNumber) {
  let sum2 = 0;
  let multiplier = 2;
  let tempRut = rutNumber;
  while (tempRut > 0) {
    sum2 += tempRut % 10 * multiplier;
    tempRut = Math.floor(tempRut / 10);
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  const remainder = sum2 % 11;
  const verifier = 11 - remainder;
  if (verifier === 11) return "0";
  if (verifier === 10) return "K";
  return verifier.toString();
}
function validateRut(rut) {
  try {
    const { number, verifier } = parseRut(rut);
    const expectedVerifier = calculateVerifier(number);
    return verifier === expectedVerifier;
  } catch {
    return false;
  }
}
function formatRut(rut) {
  const { number, verifier } = parseRut(rut);
  const formatted = number.toLocaleString("es-CL");
  return `${formatted}-${verifier}`;
}

// src/previred/columns.ts
function num(position, width, name) {
  return { position, width, name, type: "numeric", align: "right", paddingChar: "0" };
}
function txt(position, width, name) {
  return { position, width, name, type: "text", align: "left", paddingChar: " " };
}
var PREVIRED_COLUMNS = [
  // Record identification
  num(1, 2, "recordType"),
  // 01 = employee record
  num(3, 9, "workerRut"),
  // RUT without DV, right-padded with zeros
  txt(12, 1, "workerRutDv"),
  // DV character
  txt(13, 24, "firstLastName"),
  // Apellido paterno
  txt(37, 24, "secondLastName"),
  // Apellido materno
  txt(61, 20, "firstName"),
  // Nombres
  num(81, 6, "period"),
  // YYYYMM
  num(87, 2, "daysWorked"),
  // Días trabajados
  // Remunerations
  num(89, 11, "baseSalary"),
  // Sueldo base
  num(100, 11, "gratification"),
  // Gratificación
  num(111, 11, "extraHours"),
  // Horas extras
  num(122, 11, "otherImponible"),
  // Otras rem. imponibles
  num(133, 11, "nonTaxableAllowances"),
  // No imponibles (colación, movilización)
  num(144, 11, "totalImponibleAfp"),
  // Total imponible AFP
  // AFP
  txt(155, 3, "afpCode"),
  // Código AFP
  num(158, 11, "afpWorkerAmount"),
  // Cotización AFP trabajador
  num(169, 11, "apvAmount"),
  // APV
  num(180, 11, "sisAmount"),
  // SIS
  // Health
  num(191, 11, "totalImponibleHealth"),
  // Total imponible salud
  txt(202, 3, "healthCode"),
  // Código de salud
  num(205, 11, "healthWorkerAmount"),
  // Cotización salud trabajador
  // Unemployment
  num(216, 11, "unemploymentWorker"),
  // Seguro cesantía trabajador
  num(227, 11, "unemploymentEmployer"),
  // Seguro cesantía empleador
  // Tax and net pay
  num(238, 11, "totalTaxable"),
  // Base imponible impuesto
  num(249, 11, "incomeTax"),
  // Impuesto único
  // Employer costs
  num(260, 11, "mutualAmount"),
  // Mutual (ACHS)
  num(271, 11, "pensionReform"),
  // Aporte previsional reforma
  // Net
  num(282, 11, "netPay")
  // Líquido a pagar
];

// src/previred/generator.ts
function formatField(value, col) {
  const str = String(value);
  const truncated = str.slice(0, col.width);
  if (col.align === "right") {
    return truncated.padStart(col.width, col.paddingChar);
  }
  return truncated.padEnd(col.width, col.paddingChar);
}
function formatPeriod(year, month) {
  return `${year}${String(month).padStart(2, "0")}`;
}
function generateEmployeeRecord(emp, period) {
  const values = {
    recordType: 1,
    workerRut: emp.rut,
    workerRutDv: emp.rutDv,
    firstLastName: emp.firstLastName,
    secondLastName: emp.secondLastName,
    firstName: emp.firstName,
    period,
    daysWorked: emp.daysWorked,
    baseSalary: emp.baseSalary,
    gratification: emp.gratification,
    extraHours: emp.extraHours,
    otherImponible: emp.otherImponible,
    nonTaxableAllowances: emp.nonTaxableAllowances,
    totalImponibleAfp: emp.totalImponibleAfp,
    afpCode: emp.afpCode,
    afpWorkerAmount: emp.afpWorkerAmount,
    apvAmount: emp.apvAmount,
    sisAmount: emp.sisAmount,
    totalImponibleHealth: emp.totalImponibleHealth,
    healthCode: emp.healthCode,
    healthWorkerAmount: emp.healthWorkerAmount,
    unemploymentWorker: emp.unemploymentWorker,
    unemploymentEmployer: emp.unemploymentEmployer,
    totalTaxable: emp.totalTaxable,
    incomeTax: emp.incomeTax,
    mutualAmount: emp.mutualAmount,
    pensionReform: emp.pensionReform,
    netPay: emp.netPay
  };
  return PREVIRED_COLUMNS.map((col) => formatField(values[col.name] ?? "", col)).join("");
}
function generatePreviredFile(data) {
  const period = formatPeriod(data.company.periodYear, data.company.periodMonth);
  const lines = data.employees.map((emp) => generateEmployeeRecord(emp, period));
  return lines.join("\n");
}

// src/previred/afp-codes.ts
var AFP_PREVIRED_CODES = {
  capital: "03",
  cuprum: "02",
  habitat: "05",
  planvital: "01",
  provida: "08",
  modelo: "28",
  uno: "34"
};
var HEALTH_PREVIRED_CODES = {
  fonasa: "07",
  // ISAPRE codes (sample — real codes from Previred spec):
  banmedica: "61",
  colmena: "64",
  consalud: "62",
  cruzblanca: "65",
  esencial: "70",
  masvida: "66",
  nuevamasvida: "67",
  vidatres: "68"
};

// src/previred/validator.ts
var VALID_AFP_CODES = new Set(Object.values(AFP_PREVIRED_CODES));
var VALID_HEALTH_CODES = new Set(Object.values(HEALTH_PREVIRED_CODES));
var VALID_AFP_CODES_STR = [...VALID_AFP_CODES].join(", ");
function addError(errors, field, message, value) {
  errors.push({ field, message, value });
}
function validatePreviredData(data) {
  const errors = [];
  if (!data.company.rut || data.company.rut.length < 7) {
    addError(errors, "company.rut", "RUT empresa inv\xE1lido", data.company.rut);
  }
  if (data.company.periodMonth < 1 || data.company.periodMonth > 12) {
    addError(errors, "company.periodMonth", "Mes inv\xE1lido (debe ser 1-12)", data.company.periodMonth);
  }
  if (data.company.periodYear < 2e3 || data.company.periodYear > 2100) {
    addError(errors, "company.periodYear", "A\xF1o inv\xE1lido", data.company.periodYear);
  }
  data.employees.forEach((emp, idx) => {
    const prefix = `employees[${idx}]`;
    if (!emp.rut || emp.rut.length < 7) {
      addError(errors, `${prefix}.rut`, "RUT trabajador inv\xE1lido", emp.rut);
    }
    if (emp.daysWorked < 0 || emp.daysWorked > 30) {
      addError(errors, `${prefix}.daysWorked`, "D\xEDas trabajados debe ser 0-30", emp.daysWorked);
    }
    if (emp.baseSalary < 0) {
      addError(errors, `${prefix}.baseSalary`, "Sueldo base no puede ser negativo", emp.baseSalary);
    }
    if (!VALID_AFP_CODES.has(emp.afpCode)) {
      addError(errors, `${prefix}.afpCode`, `C\xF3digo AFP inv\xE1lido. V\xE1lidos: ${VALID_AFP_CODES_STR}`, emp.afpCode);
    }
    if (!VALID_HEALTH_CODES.has(emp.healthCode)) {
      addError(errors, `${prefix}.healthCode`, `C\xF3digo salud inv\xE1lido`, emp.healthCode);
    }
    if (emp.incomeTax < 0) {
      addError(errors, `${prefix}.incomeTax`, "Impuesto \xFAnico no puede ser negativo", emp.incomeTax);
    }
    if (emp.netPay < 0) {
      addError(errors, `${prefix}.netPay`, "L\xEDquido a pagar no puede ser negativo", emp.netPay);
    }
  });
  return { valid: errors.length === 0, errors };
}

// src/rules/finiquito.ts
function calculateFiniquito(input) {
  const hireDate = new Date(input.hireDateStr);
  const termDate = new Date(input.terminationDateStr);
  const diffMs = termDate.getTime() - hireDate.getTime();
  const totalDays = Math.floor(diffMs / (1e3 * 60 * 60 * 24));
  const yearsOfService = Math.floor(totalDays / 365);
  const monthsOfService = Math.floor(totalDays / 30);
  const daysInFinalMonth = totalDays - yearsOfService * 365;
  const dailySalary = roundCLP(input.lastBaseSalary / 30);
  const daysThisYear = daysInFinalMonth + monthsOfService % 12 * 30;
  const vacationDaysEarned = 15 * daysThisYear / 365;
  const vacacionesProporcionales = roundCLP(vacationDaysEarned * dailySalary);
  let gratificacionProporcional = 0;
  if (!input.monthlyGratificationIncluded) {
    const monthsThisYear = monthsOfService % 12;
    const annualGrat = Math.min(
      percentage(input.lastBaseSalary * 12, 25),
      roundCLP(4.75 * input.imm)
    );
    gratificacionProporcional = roundCLP(annualGrat / 12 * monthsThisYear);
  }
  let avisoPrevio = 0;
  if (input.terminationType === "despido_sin_causa") {
    avisoPrevio = input.lastBaseSalary;
  }
  let indemnizacionAnosServicio = 0;
  let cappedAtUF = false;
  if (input.terminationType === "despido_sin_causa") {
    const fractionalMonths = monthsOfService % 12;
    const effectiveYears = fractionalMonths > 6 ? yearsOfService + 1 : yearsOfService;
    const cappedYears = Math.min(effectiveYears, 11);
    const maxBase = roundCLP(90 * input.uf);
    const effectiveBase = Math.min(input.lastBaseSalary, maxBase);
    if (input.lastBaseSalary > maxBase) cappedAtUF = true;
    indemnizacionAnosServicio = effectiveBase * cappedYears;
  }
  const total = vacacionesProporcionales + gratificacionProporcional + avisoPrevio + indemnizacionAnosServicio;
  return {
    vacacionesProporcionales,
    gratificacionProporcional,
    avisoPrevio,
    indemnizacionAnosServicio,
    yearsOfService,
    monthsOfService,
    daysInFinalMonth,
    cappedAtUF,
    total
  };
}

// src/rules/overtime.ts
var WEEKLY_HOURS = 45;
var WEEKS_PER_MONTH = 4.33;
var OVERTIME_SURCHARGE = 1.5;
function calculateOvertime(hours, baseSalary) {
  if (hours <= 0) {
    return 0;
  }
  const hourlyRate = baseSalary / WEEKLY_HOURS / WEEKS_PER_MONTH;
  const overtimeRate = hourlyRate * OVERTIME_SURCHARGE;
  return roundCLP(hours * overtimeRate);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AFPRateSchema,
  AFP_CAP_UF,
  AFP_PREVIRED_CODES,
  CalculationInputSchema,
  DEFAULT_REFERENCE_DATA,
  DeductionSchema,
  EarningSchema,
  EarningTypeSchema,
  EmployeePayrollInputSchema,
  FamilyAllowanceBracketSchema,
  HEALTH_PREVIRED_CODES,
  ReferenceDataSchema,
  TaxBracketSchema,
  calcular,
  calcularEmpleado,
  calculateEmployeePayroll,
  calculateFiniquito,
  calculateOvertime,
  calculatePayroll,
  cappedPercentage,
  clamp,
  cleanRut,
  clearIndicatorCache,
  divide,
  formatCLP,
  formatRut,
  generatePreviredFile,
  multiply,
  parseRut,
  percentage,
  resolveEarningFlags,
  resolveReferenceData,
  roundCLP,
  simulate,
  simulateEmployee,
  solveNetToGross,
  subtract,
  sum,
  validatePreviredData,
  validateRut
});
//# sourceMappingURL=index.cjs.map