import { Effect } from 'effect';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchIndicatorsFromSII, parseIndicatorNumber } from '../../src/providers/sii-rss.js';

// Feed as published by the SII in November 2026 (US number format, dotted titles, no UTA item).
const FEED = `<?xml version="1.0" encoding="iso-8859-1"?>
<rss version="2.0"><channel>
<title>SII - INDICES Y VALORES ECONOMICOS DEL DIA 18-11-2026</title>
<item><title>DOLAR OBSERVADO</title><description><![CDATA[CLP - $ 996.68]]></description></item>
<item><title>U.F.</title><description><![CDATA[CLP - $ 41,357.3]]></description></item>
<item><title>U.T.M. Noviembre</title><description><![CDATA[CLP - $ 72,440]]></description></item>
</channel></rss>`;

afterEach(() => vi.unstubAllGlobals());

describe('SII RSS provider', () => {
  it('parses Chilean and US number formats', () => {
    expect(parseIndicatorNumber('1.234.567,89')).toBe(1234567.89);
    expect(parseIndicatorNumber('38.500,12')).toBe(38500.12);
    expect(parseIndicatorNumber('65.967')).toBe(65967);
    expect(parseIndicatorNumber('CLP - $ 41,357.3')).toBe(41357.3);
    expect(parseIndicatorNumber('CLP - $ 72,440')).toBe(72440);
    expect(parseIndicatorNumber('CLP - $ 996.68')).toBe(996.68);
    expect(parseIndicatorNumber('1.234')).toBe(1234);
    expect(parseIndicatorNumber('0,5')).toBe(0.5);
    expect(parseIndicatorNumber('0.500')).toBe(0.5);
    expect(parseIndicatorNumber('12')).toBe(12);
    expect(parseIndicatorNumber('41357.300')).toBe(41357.3);
    expect(parseIndicatorNumber('CLP - $ 41,357.30 (18-11-2026)')).toBe(41357.3);
    expect(() => parseIndicatorNumber('12.34.5')).toThrow();
    expect(() => parseIndicatorNumber('1,23.4')).toThrow();
    expect(() => parseIndicatorNumber('CLP - $')).toThrow();
  });

  it('reads UF and UTM from the current feed; UTA is optional', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(FEED, { status: 200 })));
    const r = await Effect.runPromise(fetchIndicatorsFromSII());
    expect(r.uf).toBe(41357.3);
    expect(r.utm).toBe(72440);
    expect(r.uta).toBeUndefined();
  });
});
