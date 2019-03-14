/**
 * Takes the raw string from a mem dump, and returns the relevant
 * machine code as an array of bytes. E.g.,
 * ```
 *   Offset: 00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F
 * 080001c0:                         A1 F1 01 01 4F F0 03 01           ¡ñ..Oð..
 * 080001d0: A1 F1 01 01 FF E7 43 4F 50 45 5F F8 06 10 01 F1   ¡ñ..ÿçCOPE_ø...ñ
 * 080001e0: 05 02 02 F1 60 63 00 BF FD E7 00 00 02 4B 13 B1   ...ñ`c.¿ýç...K.±
 * ```
 * Will return ["A1", "F1", ..., "13", "B1"]
 *
 * @param input The memory dump file contents
 * @return The machine code as an array of character pairs
 */
export function parseInput (input: string): string[] {
  const bytes: string[] = [];
  const lines = input.split("\n");

  for (const line of lines) {
    const match = /^\s*(?:(.*?):)?\s*((?:[0-9A-F]{2}\s?)*)/.exec(line)!;

    if (match[1] && /[^0-9A-F]/i.test(match[1])) { continue; } // is not an address; likely Offset

    const values = match[2].trim().split(" ");

    for (const value of values) {
      bytes.push(...(value.match(/.{1,2}/g) as any));
    }
  }

  return bytes;
}

/**
 * Same as parseInput, but also converts the character pairs to
 * numbers
 * @param input Raw string to parse
 * @return Array of machine code bytes
 */
export function getMachineCodeBytes (input: string): number[] {
  return parseInput(input).map(b => parseInt(b, 16));
}

export function isWideInstruction (hword: number) {
  return (hword & 0xE000) === 0xE000 && (hword & 0x1800) > 0; // first 3 bits are high && 4th or 5th is high
}
