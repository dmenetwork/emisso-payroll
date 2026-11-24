import * as effect_Cause from 'effect/Cause';
import * as effect_Types from 'effect/Types';
import { Effect } from 'effect';
import { z } from 'zod';

declare const NetworkError_base$1: new <A extends Record<string, any> = {}>(args: effect_Types.Equals<A, {}> extends true ? void : { readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }) => effect_Cause.YieldableError & {
    readonly _tag: "NetworkError";
} & Readonly<A>;
/**
 * Network error - failed to fetch from API
 */
declare class NetworkError$1 extends NetworkError_base$1<{
    readonly _type: "NetworkError";
    readonly message: string;
    readonly url: string;
    readonly cause?: unknown;
}> {
    static make(url: string, cause?: unknown): NetworkError$1;
}
declare const ParseError_base$1: new <A extends Record<string, any> = {}>(args: effect_Types.Equals<A, {}> extends true ? void : { readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }) => effect_Cause.YieldableError & {
    readonly _tag: "ParseError";
} & Readonly<A>;
/**
 * Parse error - failed to parse JSON response
 */
declare class ParseError$1 extends ParseError_base$1<{
    readonly _type: "ParseError";
    readonly message: string;
    readonly cause?: unknown;
}> {
    static make(cause?: unknown): ParseError$1;
}
declare const ValidationError_base$1: new <A extends Record<string, any> = {}>(args: effect_Types.Equals<A, {}> extends true ? void : { readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }) => effect_Cause.YieldableError & {
    readonly _tag: "ValidationError";
} & Readonly<A>;
/**
 * Validation error - response doesn't match expected schema
 */
declare class ValidationError$1 extends ValidationError_base$1<{
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
    }>): ValidationError$1;
    static fromZodError(error: z.ZodError): ValidationError$1;
}
/**
 * Union of all fetcher errors
 */
type MindicadorFetchError = NetworkError$1 | ParseError$1 | ValidationError$1;
/**
 * Economic indicators returned by fetchCurrentIndicators
 */
interface EconomicIndicators$1 {
    /** UF value in CLP */
    uf: number;
    /** UTM value in CLP */
    utm: number;
    /** Date when the data was fetched */
    fetchDate: Date;
}
/**
 * Fetches current UF and UTM values from mindicador.cl API
 *
 * @returns Effect that resolves to economic indicators or fails with typed error
 *
 * @example
 * ```typescript
 * import { Effect } from "effect";
 * import { fetchCurrentIndicators } from "@emisso/payroll-cl/providers";
 *
 * const program = Effect.gen(function* () {
 *   const indicators = yield* fetchCurrentIndicators();
 *   console.log(`UF: $${indicators.uf}, UTM: $${indicators.utm}`);
 *   return indicators;
 * });
 *
 * Effect.runPromise(program)
 *   .then(data => console.log("Success:", data))
 *   .catch(error => console.error("Error:", error));
 * ```
 */
declare function fetchCurrentIndicators(): Effect.Effect<EconomicIndicators$1, MindicadorFetchError, never>;
/**
 * Fetches UF and UTM values for a specific month from mindicador.cl API.
 * Uses the last day of the month to get the most representative value.
 *
 * @param year - e.g., 2026
 * @param month - 1-12, e.g., 2 for febrero
 * @returns Effect that resolves to economic indicators or fails with typed error
 *
 * Note: requesting the current in-progress month may fail if the last day
 * hasn't occurred yet and mindicador.cl has no data for that date.
 * For current-month calculations, use fetchCurrentIndicators() instead.
 *
 * @example
 * ```typescript
 * import { Effect } from "effect";
 * import { fetchIndicatorsForPeriod } from "@emisso/payroll-cl/providers";
 *
 * const program = Effect.gen(function* () {
 *   const indicators = yield* fetchIndicatorsForPeriod(2026, 2);
 *   console.log(`UF feb 2026: $${indicators.uf}, UTM: $${indicators.utm}`);
 *   return indicators;
 * });
 *
 * Effect.runPromise(program)
 *   .then(data => console.log("Success:", data))
 *   .catch(error => console.error("Error:", error));
 * ```
 */
declare function fetchIndicatorsForPeriod(year: number, month: number): Effect.Effect<EconomicIndicators$1, MindicadorFetchError, never>;

declare const NetworkError_base: new <A extends Record<string, any> = {}>(args: effect_Types.Equals<A, {}> extends true ? void : { readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }) => effect_Cause.YieldableError & {
    readonly _tag: "NetworkError";
} & Readonly<A>;
/**
 * Network error - failed to fetch from RSS feed
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
 * Parse error - failed to parse XML response
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
 * Validation error - response doesn't match expected structure
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
}
/**
 * Union of all fetcher errors
 */
type SIIFetchError = NetworkError | ParseError | ValidationError;
/**
 * Economic indicators returned by fetchIndicatorsFromSII
 */
interface EconomicIndicators {
    /** UF value in CLP */
    uf: number;
    /** UTM value in CLP */
    utm: number;
    /** UTA value in CLP */
    uta: number;
    /** Date when the data was fetched */
    fetchDate: Date;
}
/**
 * Fetches current UF, UTM, and UTA values from SII RSS feed
 *
 * @returns Effect that resolves to economic indicators or fails with typed error
 *
 * @example
 * ```typescript
 * import { Effect } from "effect";
 * import { fetchIndicatorsFromSII } from "@emisso/payroll-cl/providers";
 *
 * const program = Effect.gen(function* () {
 *   const indicators = yield* fetchIndicatorsFromSII();
 *   console.log(`UF: $${indicators.uf}, UTM: $${indicators.utm}, UTA: $${indicators.uta}`);
 *   return indicators;
 * });
 *
 * Effect.runPromise(program)
 *   .then(data => console.log("Success:", data))
 *   .catch(error => console.error("Error:", error));
 * ```
 */
declare function fetchIndicatorsFromSII(): Effect.Effect<EconomicIndicators, SIIFetchError, never>;

export { type EconomicIndicators$1 as EconomicIndicators, type MindicadorFetchError, type SIIFetchError, fetchCurrentIndicators, fetchIndicatorsForPeriod, fetchIndicatorsFromSII };
