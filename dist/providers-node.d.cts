import * as effect_Cause from 'effect/Cause';
import * as effect_Types from 'effect/Types';
import { Effect } from 'effect';
import { z } from 'zod';

declare const NetworkError_base: new <A extends Record<string, any> = {}>(args: effect_Types.Equals<A, {}> extends true ? void : { readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }) => effect_Cause.YieldableError & {
    readonly _tag: "NetworkError";
} & Readonly<A>;
/**
 * Network error - failed to fetch from API
 */
declare class NetworkError extends NetworkError_base<{
    readonly _type: "NetworkError";
    readonly message: string;
    readonly url: string;
    readonly cause?: unknown;
}> {
    static make(url: string, cause?: unknown): NetworkError;
}
declare const ParseError_base: new <A extends Record<string, any> = {}>(args: effect_Types.Equals<A, {}> extends true ? void : { readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }) => effect_Cause.YieldableError & {
    readonly _tag: "ParseError";
} & Readonly<A>;
/**
 * Parse error - failed to parse HTML response
 */
declare class ParseError extends ParseError_base<{
    readonly _type: "ParseError";
    readonly message: string;
    readonly cause?: unknown;
}> {
    static make(cause?: unknown): ParseError;
}
declare const ValidationError_base: new <A extends Record<string, any> = {}>(args: effect_Types.Equals<A, {}> extends true ? void : { readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }) => effect_Cause.YieldableError & {
    readonly _tag: "ValidationError";
} & Readonly<A>;
/**
 * Validation error - extracted data doesn't match expected schema
 */
declare class ValidationError extends ValidationError_base<{
    readonly _type: "ValidationError";
    readonly message: string;
    readonly errors: Array<{
        path: string;
        message: string;
    }>;
}> {
    static make(errors: Array<{
        path: string;
        message: string;
    }>): ValidationError;
    static fromZodError(error: z.ZodError): ValidationError;
}
declare const ScrapingError_base: new <A extends Record<string, any> = {}>(args: effect_Types.Equals<A, {}> extends true ? void : { readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }) => effect_Cause.YieldableError & {
    readonly _tag: "ScrapingError";
} & Readonly<A>;
/**
 * Scraping error - failed to extract expected data from HTML
 */
declare class ScrapingError extends ScrapingError_base<{
    readonly _type: "ScrapingError";
    readonly message: string;
    readonly details?: string;
}> {
    static make(message: string, details?: string): ScrapingError;
}
/**
 * Union of all fetcher errors
 */
type AFPScraperError = NetworkError | ParseError | ValidationError | ScrapingError;
/**
 * Single AFP rate entry
 */
interface AFPRate {
    /** AFP provider name (e.g., "Capital", "Cuprum") */
    afpProvider: string;
    /** Commission rate as percentage (e.g., 1.44 for 1.44%) */
    commissionRate: number;
    /** SIS (Seguro de Invalidez y Sobrevivencia) rate as percentage */
    sisRate: number;
    /** Effective date of these rates */
    effectiveDate: Date;
}
/**
 * Fetches current AFP commission rates for a specific month
 *
 * @param year - Year (e.g., 2026)
 * @param month - Month (1-12)
 * @returns Effect that resolves to array of AFP rates or fails with typed error
 *
 * @example
 * ```typescript
 * import { Effect } from "effect";
 * import { fetchAFPRates } from "@emisso/payroll-cl/providers/node";
 *
 * const program = Effect.gen(function* () {
 *   const rates = yield* fetchAFPRates(2026, 2);
 *   console.log(`Found ${rates.length} AFP rates`);
 *   for (const rate of rates) {
 *     console.log(`${rate.afpProvider}: ${rate.commissionRate}% + ${rate.sisRate}% SIS`);
 *   }
 *   return rates;
 * });
 *
 * Effect.runPromise(program)
 *   .then(data => console.log("Success:", data))
 *   .catch(error => console.error("Error:", error));
 * ```
 */
declare function fetchAFPRates(year: number, month: number): Effect.Effect<AFPRate[], AFPScraperError, never>;

export { type AFPRate, type AFPScraperError, fetchAFPRates };
