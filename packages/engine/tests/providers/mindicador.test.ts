import { Effect } from 'effect';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchIndicatorsForPeriod } from '../../src/providers/mindicador.js';

afterEach(() => vi.unstubAllGlobals());

describe('mindicador provider', () => {
  it('fetchIndicatorsForPeriod keeps the decimals of the UF and asks for the last day of the month', async () => {
    const urls: string[] = [];
    vi.stubGlobal('fetch', vi.fn(async (url: string) => {
      urls.push(String(url));
      const valor = String(url).includes('/uf/') ? 38_416.69 : 67_294;
      return new Response(JSON.stringify({ serie: [{ valor }] }), { status: 200 });
    }));
    const r = await Effect.runPromise(fetchIndicatorsForPeriod(2025, 1));
    expect(r.uf).toBe(38_416.69);
    expect(r.utm).toBe(67_294);
    expect(urls.sort()).toEqual(['https://mindicador.cl/api/uf/31-01-2025', 'https://mindicador.cl/api/utm/31-01-2025']);
  });
});
