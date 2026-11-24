import { z } from 'zod';

/**
 * Payroll calculation engine types
 *
 * Zod schemas for validation at boundaries + inferred TypeScript types.
 * This module is pure — NO database or I/O imports.
 */

/**
 * Well-known earning types with legal defaults for imponible/taxable flags.
 *
 * - bonus, commission, overtime: always imponible + taxable
 * - viatico, reimbursement, aguinaldo, loss_of_cash: always exempt (Art. 41 CT)
 * - allowance, other: caller-defined via isTaxable/isImponible
 */
declare const EarningTypeSchema: z.ZodEnum<["bonus", "commission", "overtime", "allowance", "viatico", "reimbursement", "aguinaldo", "loss_of_cash", "other"]>;
type EarningType = z.infer<typeof EarningTypeSchema>;
declare const EarningSchema: z.ZodObject<{
    type: z.ZodEnum<["bonus", "commission", "overtime", "allowance", "viatico", "reimbursement", "aguinaldo", "loss_of_cash", "other"]>;
    description: z.ZodString;
    amount: z.ZodNumber;
    isTaxable: z.ZodOptional<z.ZodBoolean>;
    isImponible: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    type: "bonus" | "commission" | "overtime" | "allowance" | "viatico" | "reimbursement" | "aguinaldo" | "loss_of_cash" | "other";
    description: string;
    amount: number;
    isTaxable?: boolean | undefined;
    isImponible?: boolean | undefined;
}, {
    type: "bonus" | "commission" | "overtime" | "allowance" | "viatico" | "reimbursement" | "aguinaldo" | "loss_of_cash" | "other";
    description: string;
    amount: number;
    isTaxable?: boolean | undefined;
    isImponible?: boolean | undefined;
}>;
declare const DeductionSchema: z.ZodObject<{
    type: z.ZodString;
    description: z.ZodString;
    amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: string;
    description: string;
    amount: number;
}, {
    type: string;
    description: string;
    amount: number;
}>;
declare const EmployeePayrollInputSchema: z.ZodObject<{
    employeeId: z.ZodString;
    rut: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    baseSalary: z.ZodNumber;
    gratificationType: z.ZodEnum<["legal", "convenida", "none"]>;
    gratificationAmount: z.ZodOptional<z.ZodNumber>;
    colacion: z.ZodNumber;
    movilizacion: z.ZodNumber;
    afpCode: z.ZodString;
    afpFund: z.ZodEnum<["a", "b", "c", "d", "e"]>;
    healthPlan: z.ZodEnum<["fonasa", "isapre"]>;
    isapreAmount: z.ZodOptional<z.ZodNumber>;
    apvAmount: z.ZodOptional<z.ZodNumber>;
    familyAllowanceLoads: z.ZodNumber;
    contractType: z.ZodDefault<z.ZodOptional<z.ZodEnum<["indefinido", "plazo_fijo", "por_obra"]>>>;
    earnings: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["bonus", "commission", "overtime", "allowance", "viatico", "reimbursement", "aguinaldo", "loss_of_cash", "other"]>;
        description: z.ZodString;
        amount: z.ZodNumber;
        isTaxable: z.ZodOptional<z.ZodBoolean>;
        isImponible: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "bonus" | "commission" | "overtime" | "allowance" | "viatico" | "reimbursement" | "aguinaldo" | "loss_of_cash" | "other";
        description: string;
        amount: number;
        isTaxable?: boolean | undefined;
        isImponible?: boolean | undefined;
    }, {
        type: "bonus" | "commission" | "overtime" | "allowance" | "viatico" | "reimbursement" | "aguinaldo" | "loss_of_cash" | "other";
        description: string;
        amount: number;
        isTaxable?: boolean | undefined;
        isImponible?: boolean | undefined;
    }>, "many">;
    deductions: z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        description: z.ZodString;
        amount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: string;
        description: string;
        amount: number;
    }, {
        type: string;
        description: string;
        amount: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    employeeId: string;
    rut: string;
    firstName: string;
    lastName: string;
    baseSalary: number;
    gratificationType: "legal" | "convenida" | "none";
    colacion: number;
    movilizacion: number;
    afpCode: string;
    afpFund: "a" | "b" | "c" | "d" | "e";
    healthPlan: "fonasa" | "isapre";
    familyAllowanceLoads: number;
    contractType: "indefinido" | "plazo_fijo" | "por_obra";
    earnings: {
        type: "bonus" | "commission" | "overtime" | "allowance" | "viatico" | "reimbursement" | "aguinaldo" | "loss_of_cash" | "other";
        description: string;
        amount: number;
        isTaxable?: boolean | undefined;
        isImponible?: boolean | undefined;
    }[];
    deductions: {
        type: string;
        description: string;
        amount: number;
    }[];
    gratificationAmount?: number | undefined;
    isapreAmount?: number | undefined;
    apvAmount?: number | undefined;
}, {
    employeeId: string;
    rut: string;
    firstName: string;
    lastName: string;
    baseSalary: number;
    gratificationType: "legal" | "convenida" | "none";
    colacion: number;
    movilizacion: number;
    afpCode: string;
    afpFund: "a" | "b" | "c" | "d" | "e";
    healthPlan: "fonasa" | "isapre";
    familyAllowanceLoads: number;
    earnings: {
        type: "bonus" | "commission" | "overtime" | "allowance" | "viatico" | "reimbursement" | "aguinaldo" | "loss_of_cash" | "other";
        description: string;
        amount: number;
        isTaxable?: boolean | undefined;
        isImponible?: boolean | undefined;
    }[];
    deductions: {
        type: string;
        description: string;
        amount: number;
    }[];
    gratificationAmount?: number | undefined;
    isapreAmount?: number | undefined;
    apvAmount?: number | undefined;
    contractType?: "indefinido" | "plazo_fijo" | "por_obra" | undefined;
}>;
declare const AFPRateSchema: z.ZodObject<{
    commissionRate: z.ZodNumber;
    sisRate: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    commissionRate: number;
    sisRate: number;
}, {
    commissionRate: number;
    sisRate: number;
}>;
declare const TaxBracketSchema: z.ZodObject<{
    from: z.ZodNumber;
    to: z.ZodNullable<z.ZodNumber>;
    rate: z.ZodNumber;
    deduction: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    from: number;
    to: number | null;
    rate: number;
    deduction: number;
}, {
    from: number;
    to: number | null;
    rate: number;
    deduction: number;
}>;
declare const FamilyAllowanceBracketSchema: z.ZodObject<{
    from: z.ZodNumber;
    to: z.ZodNullable<z.ZodNumber>;
    amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    amount: number;
    from: number;
    to: number | null;
}, {
    amount: number;
    from: number;
    to: number | null;
}>;
declare const UnemploymentRateSchema: z.ZodObject<{
    employee: z.ZodNumber;
    employer: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    employee: number;
    employer: number;
}, {
    employee: number;
    employer: number;
}>;
declare const ReferenceDataSchema: z.ZodObject<{
    uf: z.ZodNumber;
    utm: z.ZodNumber;
    uta: z.ZodNumber;
    imm: z.ZodNumber;
    afpRates: z.ZodRecord<z.ZodString, z.ZodObject<{
        commissionRate: z.ZodNumber;
        sisRate: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        commissionRate: number;
        sisRate: number;
    }, {
        commissionRate: number;
        sisRate: number;
    }>>;
    fonasaRate: z.ZodNumber;
    taxBrackets: z.ZodArray<z.ZodObject<{
        from: z.ZodNumber;
        to: z.ZodNullable<z.ZodNumber>;
        rate: z.ZodNumber;
        deduction: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        from: number;
        to: number | null;
        rate: number;
        deduction: number;
    }, {
        from: number;
        to: number | null;
        rate: number;
        deduction: number;
    }>, "many">;
    familyAllowanceBrackets: z.ZodArray<z.ZodObject<{
        from: z.ZodNumber;
        to: z.ZodNullable<z.ZodNumber>;
        amount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        from: number;
        to: number | null;
    }, {
        amount: number;
        from: number;
        to: number | null;
    }>, "many">;
    unemploymentRate: z.ZodNumber;
    mutualRate: z.ZodNumber;
    imponibleCapUF: z.ZodOptional<z.ZodNumber>;
    unemploymentCapUF: z.ZodOptional<z.ZodNumber>;
    unemploymentRates: z.ZodOptional<z.ZodObject<{
        indefinido: z.ZodObject<{
            employee: z.ZodNumber;
            employer: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            employee: number;
            employer: number;
        }, {
            employee: number;
            employer: number;
        }>;
        plazo_fijo: z.ZodObject<{
            employee: z.ZodNumber;
            employer: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            employee: number;
            employer: number;
        }, {
            employee: number;
            employer: number;
        }>;
        por_obra: z.ZodObject<{
            employee: z.ZodNumber;
            employer: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            employee: number;
            employer: number;
        }, {
            employee: number;
            employer: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        indefinido: {
            employee: number;
            employer: number;
        };
        plazo_fijo: {
            employee: number;
            employer: number;
        };
        por_obra: {
            employee: number;
            employer: number;
        };
    }, {
        indefinido: {
            employee: number;
            employer: number;
        };
        plazo_fijo: {
            employee: number;
            employer: number;
        };
        por_obra: {
            employee: number;
            employer: number;
        };
    }>>;
    pensionReformRate: z.ZodOptional<z.ZodNumber>;
    mandatoryPensionRate: z.ZodOptional<z.ZodNumber>;
    gratificationRate: z.ZodOptional<z.ZodNumber>;
    gratificationCapIMM: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    uf: number;
    utm: number;
    uta: number;
    imm: number;
    afpRates: Record<string, {
        commissionRate: number;
        sisRate: number;
    }>;
    fonasaRate: number;
    taxBrackets: {
        from: number;
        to: number | null;
        rate: number;
        deduction: number;
    }[];
    familyAllowanceBrackets: {
        amount: number;
        from: number;
        to: number | null;
    }[];
    unemploymentRate: number;
    mutualRate: number;
    imponibleCapUF?: number | undefined;
    unemploymentCapUF?: number | undefined;
    unemploymentRates?: {
        indefinido: {
            employee: number;
            employer: number;
        };
        plazo_fijo: {
            employee: number;
            employer: number;
        };
        por_obra: {
            employee: number;
            employer: number;
        };
    } | undefined;
    pensionReformRate?: number | undefined;
    mandatoryPensionRate?: number | undefined;
    gratificationRate?: number | undefined;
    gratificationCapIMM?: number | undefined;
}, {
    uf: number;
    utm: number;
    uta: number;
    imm: number;
    afpRates: Record<string, {
        commissionRate: number;
        sisRate: number;
    }>;
    fonasaRate: number;
    taxBrackets: {
        from: number;
        to: number | null;
        rate: number;
        deduction: number;
    }[];
    familyAllowanceBrackets: {
        amount: number;
        from: number;
        to: number | null;
    }[];
    unemploymentRate: number;
    mutualRate: number;
    imponibleCapUF?: number | undefined;
    unemploymentCapUF?: number | undefined;
    unemploymentRates?: {
        indefinido: {
            employee: number;
            employer: number;
        };
        plazo_fijo: {
            employee: number;
            employer: number;
        };
        por_obra: {
            employee: number;
            employer: number;
        };
    } | undefined;
    pensionReformRate?: number | undefined;
    mandatoryPensionRate?: number | undefined;
    gratificationRate?: number | undefined;
    gratificationCapIMM?: number | undefined;
}>;
declare const CalculationInputSchema: z.ZodObject<{
    employees: z.ZodArray<z.ZodObject<{
        employeeId: z.ZodString;
        rut: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
        baseSalary: z.ZodNumber;
        gratificationType: z.ZodEnum<["legal", "convenida", "none"]>;
        gratificationAmount: z.ZodOptional<z.ZodNumber>;
        colacion: z.ZodNumber;
        movilizacion: z.ZodNumber;
        afpCode: z.ZodString;
        afpFund: z.ZodEnum<["a", "b", "c", "d", "e"]>;
        healthPlan: z.ZodEnum<["fonasa", "isapre"]>;
        isapreAmount: z.ZodOptional<z.ZodNumber>;
        apvAmount: z.ZodOptional<z.ZodNumber>;
        familyAllowanceLoads: z.ZodNumber;
        contractType: z.ZodDefault<z.ZodOptional<z.ZodEnum<["indefinido", "plazo_fijo", "por_obra"]>>>;
        earnings: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["bonus", "commission", "overtime", "allowance", "viatico", "reimbursement", "aguinaldo", "loss_of_cash", "other"]>;
            description: z.ZodString;
            amount: z.ZodNumber;
            isTaxable: z.ZodOptional<z.ZodBoolean>;
            isImponible: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            type: "bonus" | "commission" | "overtime" | "allowance" | "viatico" | "reimbursement" | "aguinaldo" | "loss_of_cash" | "other";
            description: string;
            amount: number;
            isTaxable?: boolean | undefined;
            isImponible?: boolean | undefined;
        }, {
            type: "bonus" | "commission" | "overtime" | "allowance" | "viatico" | "reimbursement" | "aguinaldo" | "loss_of_cash" | "other";
            description: string;
            amount: number;
            isTaxable?: boolean | undefined;
            isImponible?: boolean | undefined;
        }>, "many">;
        deductions: z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            description: z.ZodString;
            amount: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            type: string;
            description: string;
            amount: number;
        }, {
            type: string;
            description: string;
            amount: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        employeeId: string;
        rut: string;
        firstName: string;
        lastName: string;
        baseSalary: number;
        gratificationType: "legal" | "convenida" | "none";
        colacion: number;
        movilizacion: number;
        afpCode: string;
        afpFund: "a" | "b" | "c" | "d" | "e";
        healthPlan: "fonasa" | "isapre";
        familyAllowanceLoads: number;
        contractType: "indefinido" | "plazo_fijo" | "por_obra";
        earnings: {
            type: "bonus" | "commission" | "overtime" | "allowance" | "viatico" | "reimbursement" | "aguinaldo" | "loss_of_cash" | "other";
            description: string;
            amount: number;
            isTaxable?: boolean | undefined;
            isImponible?: boolean | undefined;
        }[];
        deductions: {
            type: string;
            description: string;
            amount: number;
        }[];
        gratificationAmount?: number | undefined;
        isapreAmount?: number | undefined;
        apvAmount?: number | undefined;
    }, {
        employeeId: string;
        rut: string;
        firstName: string;
        lastName: string;
        baseSalary: number;
        gratificationType: "legal" | "convenida" | "none";
        colacion: number;
        movilizacion: number;
        afpCode: string;
        afpFund: "a" | "b" | "c" | "d" | "e";
        healthPlan: "fonasa" | "isapre";
        familyAllowanceLoads: number;
        earnings: {
            type: "bonus" | "commission" | "overtime" | "allowance" | "viatico" | "reimbursement" | "aguinaldo" | "loss_of_cash" | "other";
            description: string;
            amount: number;
            isTaxable?: boolean | undefined;
            isImponible?: boolean | undefined;
        }[];
        deductions: {
            type: string;
            description: string;
            amount: number;
        }[];
        gratificationAmount?: number | undefined;
        isapreAmount?: number | undefined;
        apvAmount?: number | undefined;
        contractType?: "indefinido" | "plazo_fijo" | "por_obra" | undefined;
    }>, "many">;
    referenceData: z.ZodOptional<z.ZodObject<{
        uf: z.ZodNumber;
        utm: z.ZodNumber;
        uta: z.ZodNumber;
        imm: z.ZodNumber;
        afpRates: z.ZodRecord<z.ZodString, z.ZodObject<{
            commissionRate: z.ZodNumber;
            sisRate: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            commissionRate: number;
            sisRate: number;
        }, {
            commissionRate: number;
            sisRate: number;
        }>>;
        fonasaRate: z.ZodNumber;
        taxBrackets: z.ZodArray<z.ZodObject<{
            from: z.ZodNumber;
            to: z.ZodNullable<z.ZodNumber>;
            rate: z.ZodNumber;
            deduction: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            from: number;
            to: number | null;
            rate: number;
            deduction: number;
        }, {
            from: number;
            to: number | null;
            rate: number;
            deduction: number;
        }>, "many">;
        familyAllowanceBrackets: z.ZodArray<z.ZodObject<{
            from: z.ZodNumber;
            to: z.ZodNullable<z.ZodNumber>;
            amount: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            amount: number;
            from: number;
            to: number | null;
        }, {
            amount: number;
            from: number;
            to: number | null;
        }>, "many">;
        unemploymentRate: z.ZodNumber;
        mutualRate: z.ZodNumber;
        imponibleCapUF: z.ZodOptional<z.ZodNumber>;
        unemploymentCapUF: z.ZodOptional<z.ZodNumber>;
        unemploymentRates: z.ZodOptional<z.ZodObject<{
            indefinido: z.ZodObject<{
                employee: z.ZodNumber;
                employer: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                employee: number;
                employer: number;
            }, {
                employee: number;
                employer: number;
            }>;
            plazo_fijo: z.ZodObject<{
                employee: z.ZodNumber;
                employer: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                employee: number;
                employer: number;
            }, {
                employee: number;
                employer: number;
            }>;
            por_obra: z.ZodObject<{
                employee: z.ZodNumber;
                employer: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                employee: number;
                employer: number;
            }, {
                employee: number;
                employer: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            indefinido: {
                employee: number;
                employer: number;
            };
            plazo_fijo: {
                employee: number;
                employer: number;
            };
            por_obra: {
                employee: number;
                employer: number;
            };
        }, {
            indefinido: {
                employee: number;
                employer: number;
            };
            plazo_fijo: {
                employee: number;
                employer: number;
            };
            por_obra: {
                employee: number;
                employer: number;
            };
        }>>;
        pensionReformRate: z.ZodOptional<z.ZodNumber>;
        mandatoryPensionRate: z.ZodOptional<z.ZodNumber>;
        gratificationRate: z.ZodOptional<z.ZodNumber>;
        gratificationCapIMM: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        uf: number;
        utm: number;
        uta: number;
        imm: number;
        afpRates: Record<string, {
            commissionRate: number;
            sisRate: number;
        }>;
        fonasaRate: number;
        taxBrackets: {
            from: number;
            to: number | null;
            rate: number;
            deduction: number;
        }[];
        familyAllowanceBrackets: {
            amount: number;
            from: number;
            to: number | null;
        }[];
        unemploymentRate: number;
        mutualRate: number;
        imponibleCapUF?: number | undefined;
        unemploymentCapUF?: number | undefined;
        unemploymentRates?: {
            indefinido: {
                employee: number;
                employer: number;
            };
            plazo_fijo: {
                employee: number;
                employer: number;
            };
            por_obra: {
                employee: number;
                employer: number;
            };
        } | undefined;
        pensionReformRate?: number | undefined;
        mandatoryPensionRate?: number | undefined;
        gratificationRate?: number | undefined;
        gratificationCapIMM?: number | undefined;
    }, {
        uf: number;
        utm: number;
        uta: number;
        imm: number;
        afpRates: Record<string, {
            commissionRate: number;
            sisRate: number;
        }>;
        fonasaRate: number;
        taxBrackets: {
            from: number;
            to: number | null;
            rate: number;
            deduction: number;
        }[];
        familyAllowanceBrackets: {
            amount: number;
            from: number;
            to: number | null;
        }[];
        unemploymentRate: number;
        mutualRate: number;
        imponibleCapUF?: number | undefined;
        unemploymentCapUF?: number | undefined;
        unemploymentRates?: {
            indefinido: {
                employee: number;
                employer: number;
            };
            plazo_fijo: {
                employee: number;
                employer: number;
            };
            por_obra: {
                employee: number;
                employer: number;
            };
        } | undefined;
        pensionReformRate?: number | undefined;
        mandatoryPensionRate?: number | undefined;
        gratificationRate?: number | undefined;
        gratificationCapIMM?: number | undefined;
    }>>;
    periodYear: z.ZodNumber;
    periodMonth: z.ZodNumber;
    periodDate: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    employees: {
        employeeId: string;
        rut: string;
        firstName: string;
        lastName: string;
        baseSalary: number;
        gratificationType: "legal" | "convenida" | "none";
        colacion: number;
        movilizacion: number;
        afpCode: string;
        afpFund: "a" | "b" | "c" | "d" | "e";
        healthPlan: "fonasa" | "isapre";
        familyAllowanceLoads: number;
        contractType: "indefinido" | "plazo_fijo" | "por_obra";
        earnings: {
            type: "bonus" | "commission" | "overtime" | "allowance" | "viatico" | "reimbursement" | "aguinaldo" | "loss_of_cash" | "other";
            description: string;
            amount: number;
            isTaxable?: boolean | undefined;
            isImponible?: boolean | undefined;
        }[];
        deductions: {
            type: string;
            description: string;
            amount: number;
        }[];
        gratificationAmount?: number | undefined;
        isapreAmount?: number | undefined;
        apvAmount?: number | undefined;
    }[];
    periodYear: number;
    periodMonth: number;
    referenceData?: {
        uf: number;
        utm: number;
        uta: number;
        imm: number;
        afpRates: Record<string, {
            commissionRate: number;
            sisRate: number;
        }>;
        fonasaRate: number;
        taxBrackets: {
            from: number;
            to: number | null;
            rate: number;
            deduction: number;
        }[];
        familyAllowanceBrackets: {
            amount: number;
            from: number;
            to: number | null;
        }[];
        unemploymentRate: number;
        mutualRate: number;
        imponibleCapUF?: number | undefined;
        unemploymentCapUF?: number | undefined;
        unemploymentRates?: {
            indefinido: {
                employee: number;
                employer: number;
            };
            plazo_fijo: {
                employee: number;
                employer: number;
            };
            por_obra: {
                employee: number;
                employer: number;
            };
        } | undefined;
        pensionReformRate?: number | undefined;
        mandatoryPensionRate?: number | undefined;
        gratificationRate?: number | undefined;
        gratificationCapIMM?: number | undefined;
    } | undefined;
    periodDate?: Date | undefined;
}, {
    employees: {
        employeeId: string;
        rut: string;
        firstName: string;
        lastName: string;
        baseSalary: number;
        gratificationType: "legal" | "convenida" | "none";
        colacion: number;
        movilizacion: number;
        afpCode: string;
        afpFund: "a" | "b" | "c" | "d" | "e";
        healthPlan: "fonasa" | "isapre";
        familyAllowanceLoads: number;
        earnings: {
            type: "bonus" | "commission" | "overtime" | "allowance" | "viatico" | "reimbursement" | "aguinaldo" | "loss_of_cash" | "other";
            description: string;
            amount: number;
            isTaxable?: boolean | undefined;
            isImponible?: boolean | undefined;
        }[];
        deductions: {
            type: string;
            description: string;
            amount: number;
        }[];
        gratificationAmount?: number | undefined;
        isapreAmount?: number | undefined;
        apvAmount?: number | undefined;
        contractType?: "indefinido" | "plazo_fijo" | "por_obra" | undefined;
    }[];
    periodYear: number;
    periodMonth: number;
    referenceData?: {
        uf: number;
        utm: number;
        uta: number;
        imm: number;
        afpRates: Record<string, {
            commissionRate: number;
            sisRate: number;
        }>;
        fonasaRate: number;
        taxBrackets: {
            from: number;
            to: number | null;
            rate: number;
            deduction: number;
        }[];
        familyAllowanceBrackets: {
            amount: number;
            from: number;
            to: number | null;
        }[];
        unemploymentRate: number;
        mutualRate: number;
        imponibleCapUF?: number | undefined;
        unemploymentCapUF?: number | undefined;
        unemploymentRates?: {
            indefinido: {
                employee: number;
                employer: number;
            };
            plazo_fijo: {
                employee: number;
                employer: number;
            };
            por_obra: {
                employee: number;
                employer: number;
            };
        } | undefined;
        pensionReformRate?: number | undefined;
        mandatoryPensionRate?: number | undefined;
        gratificationRate?: number | undefined;
        gratificationCapIMM?: number | undefined;
    } | undefined;
    periodDate?: Date | undefined;
}>;
type EmployeePayrollInput = z.infer<typeof EmployeePayrollInputSchema>;
type ReferenceData = z.infer<typeof ReferenceDataSchema>;
type CalculationInput = z.infer<typeof CalculationInputSchema>;
/**
 * Breakdown of earnings
 */
interface EarningsBreakdown {
    baseSalary: number;
    gratification: number;
    overtime: number;
    bonuses: number;
    allowances: number;
    familyAllowance: number;
    other: number;
    totalImponible: number;
    totalTaxable: number;
    totalNonTaxable: number;
}
/**
 * Breakdown of deductions
 */
interface DeductionsBreakdown {
    afp: number;
    health: number;
    unemployment: number;
    incomeTax: number;
    apv: number;
    additionalDeductions: number;
    total: number;
}
/**
 * Complete calculation result for one employee
 */
interface CalculationResult {
    employeeId: string;
    earnings: EarningsBreakdown;
    deductions: DeductionsBreakdown;
    netPay: number;
    employerCosts: {
        mutual: number;
        sis: number;
        unemployment: number;
        pensionReform: number;
        total: number;
    };
}

/**
 * Main payroll calculation orchestrator
 *
 * Coordinates all calculation rules to produce a complete payroll result
 * for each employee. This module is pure: no database or I/O imports.
 */

/**
 * Calculate payroll for a batch of employees.
 *
 * @param input - Full payroll calculation input with employees and reference data
 * @returns Array of calculation results, one per employee
 */
declare function calculatePayroll(input: CalculationInput): Promise<CalculationResult[]>;
/**
 * Calculate payroll for a single employee.
 *
 * Orchestrates all rule modules to produce earnings, deductions,
 * net pay, and employer costs.
 *
 * @param employee - Employee payroll input
 * @param referenceData - Reference data for calculations
 * @returns Complete calculation result for the employee
 */
declare function calculateEmployeePayroll(employee: EmployeePayrollInput, referenceData: ReferenceData, periodDate?: Date): CalculationResult;
/**
 * Resolve imponible/taxable flags for an earning based on its type.
 *
 * Well-known types have legally-mandated flags (Art. 41 Código del Trabajo):
 * - bonus, commission, overtime: always imponible + taxable
 * - viatico, reimbursement, aguinaldo, loss_of_cash: always exempt
 * - allowance, other: use caller-provided flags (default true)
 */
declare function resolveEarningFlags(type: EarningType, isImponible?: boolean, isTaxable?: boolean): {
    isImponible: boolean;
    isTaxable: boolean;
};

/**
 * Net-to-gross reverse salary solver
 *
 * Uses binary search to find the gross salary (baseSalary) that produces
 * a target net pay after all payroll deductions (AFP, health, tax, etc.).
 *
 * This is a pure function module with no I/O or database imports.
 */

/**
 * Input for the net-to-gross solver.
 * Same shape as EmployeePayrollInput but with targetNetPay instead of baseSalary.
 */
interface NetToGrossInput {
    employeeId?: string;
    rut: string;
    firstName: string;
    lastName: string;
    targetNetPay: number;
    gratificationType: 'legal' | 'convenida' | 'none';
    gratificationAmount?: number;
    colacion: number;
    movilizacion: number;
    afpCode: string;
    afpFund: 'a' | 'b' | 'c' | 'd' | 'e';
    healthPlan: 'fonasa' | 'isapre';
    isapreAmount?: number;
    apvAmount?: number;
    familyAllowanceLoads: number;
    contractType?: 'indefinido' | 'plazo_fijo' | 'por_obra';
    earnings: EmployeePayrollInput['earnings'];
    deductions: EmployeePayrollInput['deductions'];
}
/**
 * Result of the net-to-gross solver
 */
interface NetToGrossResult {
    targetNetPay: number;
    grossSalary: number;
    actualNetPay: number;
    breakdown: CalculationResult;
    iterations: number;
    converged: boolean;
}
/**
 * Solve for the gross salary that produces a target net pay.
 *
 * Uses binary search over the gross salary range. The payroll function
 * is monotonically increasing in net pay as gross increases (higher salary
 * always produces higher net), which guarantees binary search convergence.
 *
 * @param input - Employee data with targetNetPay instead of baseSalary
 * @param referenceData - Reference data for payroll calculations
 * @param options - Optional solver configuration
 * @returns The gross salary, actual net pay, full breakdown, and convergence info
 */
declare function solveNetToGross(input: NetToGrossInput, referenceData: ReferenceData, options?: {
    tolerance?: number;
    maxIterations?: number;
    minGross?: number;
    maxGross?: number;
    periodDate?: Date;
}): NetToGrossResult;

/**
 * Money utilities for Chilean Peso (CLP)
 *
 * IMPORTANT: CLP has no decimal places. All amounts are integers.
 * All calculations should preserve integer arithmetic.
 */
/**
 * Round a number to integer (CLP doesn't use decimals)
 * Uses banker's rounding (round half to even) for fairness
 */
declare function roundCLP(amount: number): number;
/**
 * Calculate percentage of an amount with precise rounding
 * @param amount - Base amount in CLP
 * @param rate - Percentage rate (e.g., 10.5 for 10.5%)
 * @returns Calculated percentage as integer
 */
declare function percentage(amount: number, rate: number): number;
/**
 * Constrain a value between minimum and maximum bounds
 */
declare function clamp(value: number, min: number, max: number): number;
/**
 * Add multiple amounts safely (maintains integer arithmetic)
 */
declare function sum(...amounts: number[]): number;
/**
 * Subtract amounts safely (maintains integer arithmetic)
 */
declare function subtract(a: number, b: number): number;
/**
 * Multiply amount by a factor and round to integer
 */
declare function multiply(amount: number, factor: number): number;
/**
 * Divide amount by a divisor and round to integer
 */
declare function divide(amount: number, divisor: number): number;
/**
 * Format CLP amount for display with thousands separator
 * @returns Formatted string like "1.234.567"
 */
declare function formatCLP(amount: number): string;
/**
 * AFP/SIS/Pension Reform cap in UF (tope imponible)
 */
declare const AFP_CAP_UF = 81.6;
/**
 * Apply percentage to an amount capped at a tope imponible in UF (default 81.6 UF).
 * Used by AFP, SIS, health, unemployment and pension reform calculations.
 * The cap in CLP is round(capUF * uf).
 *
 * @param imponibleIncome - Imponible income in CLP
 * @param uf - Current UF value in CLP
 * @param rate - Percentage rate to apply
 * @param capUF - Tope imponible in UF
 * @returns Calculated amount in integer CLP
 */
declare function cappedPercentage(imponibleIncome: number, uf: number, rate: number, capUF?: number): number;

/**
 * Chilean RUT (Rol Único Tributario) utilities
 *
 * RUT format: XX.XXX.XXX-Y where Y is a check digit (0-9 or K)
 * Validation uses modulo 11 algorithm
 */
/**
 * Remove all formatting characters from RUT (dots, hyphens, spaces)
 */
declare function cleanRut(rut: string): string;
/**
 * Parse RUT into its components: number and verifier
 * @returns Object with number (without verifier) and verifier digit
 */
declare function parseRut(rut: string): {
    number: number;
    verifier: string;
};
/**
 * Validate if a RUT is valid according to Chilean mod-11 algorithm
 */
declare function validateRut(rut: string): boolean;
/**
 * Format RUT with dots and hyphen: 12.345.678-9
 */
declare function formatRut(rut: string): string;

/**
 * Reference data module
 *
 * Provides default reference data for Chilean payroll calculations
 * and interfaces for custom data providers.
 */

/**
 * Default reference data for Chilean payroll calculations.
 * Values reflect February 2026 economic indicators.
 *
 * NOTE: These values change monthly/annually. For production use,
 * fetch current values from official sources using the providers module:
 *   import { fetchCurrentIndicators } from '@emisso/payroll-cl/providers'
 */
declare const DEFAULT_REFERENCE_DATA: ReferenceData;
/**
 * Interface for custom reference data providers.
 * Implement this to fetch live data from official sources.
 */
interface ReferenceDataProvider {
    /** Fetch current reference data */
    fetchReferenceData(): Promise<ReferenceData>;
}
/**
 * Economic indicators (updated monthly from official sources)
 */
interface EconomicIndicators {
    uf: number;
    utm: number;
    uta: number;
    imm: number;
    effectiveDate: string;
}

/**
 * Previred file format types
 * Previred is the Chilean system for reporting social security payments
 * Reference: Previred DDJJ technical specification
 */
/** Employee data for Previred file generation */
interface PreviredEmployee {
    rut: string;
    rutDv: string;
    firstName: string;
    firstLastName: string;
    secondLastName: string;
    daysWorked: number;
    baseSalary: number;
    gratification: number;
    otherImponible: number;
    extraHours: number;
    nonTaxableAllowances: number;
    totalImponibleAfp: number;
    totalImponibleHealth: number;
    totalTaxable: number;
    afpCode: string;
    afpWorkerAmount: number;
    sisAmount: number;
    apvAmount: number;
    healthCode: string;
    healthWorkerAmount: number;
    unemploymentWorker: number;
    unemploymentEmployer: number;
    incomeTax: number;
    netPay: number;
    mutualAmount: number;
    pensionReform: number;
}
/** Company data for Previred file header */
interface PreviredCompany {
    rut: string;
    rutDv: string;
    businessName: string;
    periodYear: number;
    periodMonth: number;
}
/** Complete Previred file data */
interface PreviredFileData {
    company: PreviredCompany;
    employees: PreviredEmployee[];
}

/**
 * Generate Previred fixed-width DDJJ file
 *
 * Each employee becomes one row. The resulting string uses \n line endings.
 *
 * @param data - Payroll data to export
 * @returns Fixed-width text file content
 */
declare function generatePreviredFile(data: PreviredFileData): string;

interface ValidationResult {
    valid: boolean;
    errors: Array<{
        field: string;
        message: string;
        value?: unknown;
    }>;
}
/**
 * Validate Previred data before file generation
 */
declare function validatePreviredData(data: PreviredFileData): ValidationResult;

/**
 * AFP code mapping: internal code -> Previred numeric code
 * Source: Previred/Superintendencia de Pensiones official codes
 */
declare const AFP_PREVIRED_CODES: Record<string, string>;
/**
 * Health code mapping: internal code -> Previred numeric code
 */
declare const HEALTH_PREVIRED_CODES: Record<string, string>;

type TerminationType = 'renuncia' | 'despido_causa' | 'despido_sin_causa' | 'mutuo_acuerdo' | 'fin_plazo';
interface FiniquitoInput {
    hireDateStr: string;
    terminationDateStr: string;
    terminationType: TerminationType;
    lastBaseSalary: number;
    uf: number;
    imm: number;
    monthlyGratificationIncluded: boolean;
}
interface FiniquitoResult {
    vacacionesProporcionales: number;
    gratificacionProporcional: number;
    avisoPrevio: number;
    indemnizacionAnosServicio: number;
    yearsOfService: number;
    monthsOfService: number;
    daysInFinalMonth: number;
    cappedAtUF: boolean;
    total: number;
}
/**
 * Calculate finiquito (termination compensation) per Chilean Labor Code
 *
 * Art. 67: Vacation (15 business days/year, pro-rated)
 * Art. 161: Dismissal without cause → aviso previo + indemnizacion
 * Art. 163: Severance = 1 month per year (max 11 months, max 90 UF base)
 */
declare function calculateFiniquito(input: FiniquitoInput): FiniquitoResult;

/**
 * Overtime calculation rules
 *
 * Chilean overtime: hourly rate = (baseSalary / 45 / 4.33) * 1.5 (50% surcharge)
 * 45 = weekly hours, 4.33 = average weeks per month
 */
/**
 * Calculate overtime pay.
 *
 * @param hours - Number of overtime hours worked
 * @param baseSalary - Monthly base salary in CLP
 * @returns Overtime pay in integer CLP
 */
declare function calculateOvertime(hours: number, baseSalary: number): number;

/**
 * Lightweight indicator fetcher for auto-resolving reference data.
 *
 * Uses plain fetch + zod (no Effect dependency) so it stays in the
 * main bundle and works in Deno / Edge Functions.
 *
 * Cache behavior: results (including fallback on failure) are cached
 * for the process lifetime. In serverless environments, cache may reset
 * on cold starts. Call clearIndicatorCache() to force a re-fetch.
 */

/**
 * Fetches live UF + UTM from mindicador.cl, merges with DEFAULT_REFERENCE_DATA,
 * and caches for the process lifetime.
 *
 * Returns DEFAULT_REFERENCE_DATA on any failure (network, timeout, bad response).
 * Concurrent calls share a single in-flight request.
 */
declare function resolveReferenceData(): Promise<ReferenceData>;
/** Clear the cached reference data (useful for testing). */
declare function clearIndicatorCache(): void;

export { AFPRateSchema, AFP_CAP_UF, AFP_PREVIRED_CODES, type CalculationInput, CalculationInputSchema, type CalculationResult, DEFAULT_REFERENCE_DATA, DeductionSchema, type DeductionsBreakdown, EarningSchema, type EarningType, EarningTypeSchema, type EarningsBreakdown, type EconomicIndicators, type EmployeePayrollInput, EmployeePayrollInputSchema, FamilyAllowanceBracketSchema, type FiniquitoInput, type FiniquitoResult, HEALTH_PREVIRED_CODES, type NetToGrossInput, type NetToGrossResult, type PreviredCompany, type PreviredEmployee, type PreviredFileData, type ReferenceData, type ReferenceDataProvider, ReferenceDataSchema, TaxBracketSchema, type TerminationType, UnemploymentRateSchema, calculatePayroll as calcular, calculateEmployeePayroll as calcularEmpleado, calculateEmployeePayroll, calculateFiniquito, calculateOvertime, calculatePayroll, cappedPercentage, clamp, cleanRut, clearIndicatorCache, divide, formatCLP, formatRut, generatePreviredFile, multiply, parseRut, percentage, resolveEarningFlags, resolveReferenceData, roundCLP, calculatePayroll as simulate, calculateEmployeePayroll as simulateEmployee, solveNetToGross, subtract, sum, validatePreviredData, validateRut };
