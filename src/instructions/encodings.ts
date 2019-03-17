import { Duplicate } from "./generate";

enum Bit {
  ZERO = 0,
  ONE = 1,
  SHOULD_ZERO,
  SHOULD_ONE,
  ANY,
}

interface Variable {
  name: string;
  range: [number, number];
  mask: number;
  shift: number;
}

interface PreVariable {
  name: string;
  range: [number, number];
}

export interface ResolvedVariable extends Variable {
  value: number;
}

export enum InstrType {
  NONE,
  IMMEDIATE,
  REGISTER,
  LITERAL,
  SP_PLUS_IMMEDIATE,
  SP_PLUS_REGISTER,
  SP_MINUS_IMMEDIATE,
  SP_MINUS_REGISTER,
  IMMEDIATE_LITERAL,
}

class BytePattern {
  static extractVariableProperties (input: string, start: number): PreVariable {
    const parts = input.split(/:/);

    let name = parts[0];
    let range: [number, number] = [start, start];

    if (parts.length === 1) {
      if (/^imm\d+$/.test(name)) {
        range[1] += parseInt(name.slice(3), 10);
      } else {
        switch (name) {
          case "S": range[1] += 1; break;
          case "i": range[1] += 1; break;
          case "P": range[1] += 1; break;
          case "U": range[1] += 1; break;
          case "N": range[1] += 1; break;
          case "W": range[1] += 1; break;
          case "type": range[1] += 2; break;
          default: throw new Error(`Unknown variable ${parts[0]}`);
        }
      }
    } else {
      if (!parts[1].match(/^[1-9][0-9]*$/)) {
        throw new Error(`Malformed variable length ${input}`);
      } else {
        range[1] += parseInt(parts[1], 10);
      }
    }

    return { name, range };
  }

  static constructVariables (preVariables: PreVariable[], instructionWidth: number): Variable[] {
    return preVariables.map(v => {
      const varWidth = v.range[1] - v.range[0];
      const shift = instructionWidth - v.range[0];
      const mask = ((2 ** varWidth) - 1) << shift;

      return { name: v.name, range: v.range, mask, shift };
    });
  }

  static createMasks (bits: ReadonlyArray<Bit>): { bitmask: number, bitmaskCheck: number } {
    let bitmask = 0;
    let bitmaskCheck = 0;

    for (let i = 0; i < bits.length; i++) {
      const bit = bits[i];
      switch (bit) {
        case Bit.ZERO: bitmask += 2 ** (bits.length - i - 1); break;
        case Bit.ONE:
          bitmask += 2 ** (bits.length - i - 1);
          bitmaskCheck += 2 ** (bits.length - i - 1);
          break;
        default: {}
      }
    }

    return { bitmask, bitmaskCheck };
  }

  /**
   * A template closely matches the existing syntax in the manual
   * E.g., `11101xx01xxx(0)(1)1` - `x` means anything, `(n)` means
   * an `n` is expected, but not required (if not `n`, then it is
   * UNPREDICTABLE).
   */
  static parseTemplate (template: string, duplicateVars: Duplicate): {bits: Bit[], variables: Variable[]} {
    let shouldMode = false;
    const bits: Bit[] = [];
    const preVariables: {name: string, range: [number, number]}[] = [];

    for (let i = 0; i < template.length; i++) {
      const token = template.charAt(i);
      switch (token) {
        case " ": continue;
        case "0": bits.push(shouldMode ? Bit.SHOULD_ZERO : Bit.ZERO); break;
        case "1": bits.push(shouldMode ? Bit.SHOULD_ONE : Bit.ONE); break;
        case "x": bits.push(Bit.ANY); break;
        case "(": shouldMode = true; break;
        case ")": shouldMode = false; break;
        case "[":
          if (shouldMode) {
            throw new Error(`Unexpected variable start in shouldMode in template ${template}`);
          }
          const start = i + 1;
          while (template.charAt(i) !== "]") i++;

          const variableData = BytePattern.extractVariableProperties(template.slice(start, i), bits.length);
          if (duplicateVars === Duplicate.NONE && preVariables.some(v => v.name === variableData.name)) {
            throw new Error(`Duplicate variable ${variableData.name} in template ${template}`);
          }
          preVariables.push(variableData);
          for (let _ = variableData.range[0]; _ < variableData.range[1]; _++) bits.push(Bit.ANY); // tslint disable prefer-for-of-loop
          break;
        default:
          throw new Error(`Unexpected token ${token} in template ${template}`);
      }
    }

    const variables = BytePattern.constructVariables(preVariables, bits.length);

    if (bits.length === 16 || bits.length === 32) return { bits, variables };

    throw new Error(`Template ${template} is length ${bits.length}.`);
  }
}

interface EncodingParams {
  name: string;
  rawName?: string;
  pattern: string;
  encoding: number;
  type: InstrType;
  duplicateVars?: Duplicate;
  page: number;
}

export class Encoding {
  /** General name of the instruction. E.g., `ADD` in `ADD (Immediate) T1` */
  name: string;

  /** Type of instruction, if applicable (NONE otherwise). E.g., `IMM` for `ADD (Immediate) T1` */
  type: InstrType;

  /** The encoding number of the instruction + type combination. E.g., `T1` in `ADD (Immediate) T1` */
  encoding: number;

  /** The width of the encoding. E.g., 32 for wide (32-bit) instructions. */
  width: number;

  /** A mask that can be used to isolate bits with specified values */
  bitmask: number;

  /** A mask to test equality with an instruction ANDed with the bitmask. If equal, it is a match. */
  bitmaskCheck: number;

  /** The special ranges for things like Rn and i, imm3, imm8, etc. Range is exclusive end */
  variables: Variable[];

  /** The string pattern this encoding was created from */
  rawPattern: string;

  /** The name this was defined with in the data */
  rawName: string;

  /** The pattern expanded into an array of Bit's, which specifies what values / how precise it needs to be in each index */
  bits: Bit[];

  /** The page in the manual (section A7) where this instruction is specified */
  page: number;

  constructor (param: EncodingParams) {
    this.name = param.name;
    this.rawName = param.rawName || param.name;
    this.rawPattern = param.pattern;
    this.encoding = param.encoding;
    this.type = param.type;
    this.page = param.page;

    const { bits, variables } = BytePattern.parseTemplate(param.pattern, param.duplicateVars || Duplicate.NONE);
    this.bits = bits;
    this.variables = variables;

    this.width = this.bits.length;

    const { bitmask, bitmaskCheck } = BytePattern.createMasks(this.bits);
    this.bitmask = bitmask;
    this.bitmaskCheck = bitmaskCheck;
  }

  /**
   * @param  input The word or hword to test
   * @return       True if it the input can be interpreted as this instruction
   */
  matches (input: number): boolean {
    return (input & this.bitmask) === this.bitmaskCheck;
  }

  /** @returns A readable representaion of the byte pattern, where `x` means any bit is allowed */
  toString (): string {
    return this.bits.map(b => {
      switch (b) {
        case Bit.ZERO: return "0";
        case Bit.ONE: return "1";
        default: return "x";
      }
    }).join("");
  }

  /**
   * Compares the specicivity against another Encoding. Returns 1 if this
   * is a specific case of the other, -1 if the other way round, and 0 if they
   * are unrelated
   */
  compare (other: Encoding): number {
    let direction = 0;
    for (let i = 0; i < this.bits.length; i++) {
      const e1bit = this.bits[i];
      const e2bit = other.bits[i];
      const cmp = compareBits(e1bit, e2bit);
      if (cmp === 0) { continue; }
      if (direction === 0) {
        direction = cmp;
      } else {
        if (direction !== cmp) { return 0; }
      }
    }

    return direction;
  }

  /** Converts an array of variable definitions into a map name -> value & other */
  extractVariableValues (instruction: number): { [name:string]: ResolvedVariable } {
    const resolved: { [name:string]: ResolvedVariable } = {};
    for (const variable of this.variables) {
      const name = variable.name;
      const value = (instruction >>> variable.shift) & variable.mask;

      resolved[name] = {...variable, value };
    }
    return resolved;
  }
}

export function getOptimalSplitBit (encodings: Encoding[], length: number): number {
  const counts: ({high: number, low: number, any: number, index: number})[] = [];

  for (let i = 0; i < length; i++) {
    const count = { high: 0, low: 0, any: 0, index: i };
    for (const encoding of encodings) {
      switch (encoding.bits[i]) {
        case Bit.ZERO: count.low++; break;
        case Bit.ONE: count.high++; break;
        default: count.any++;
      }
    }

    if (count.any === 0 && (count.high === 0 || count.low === 0)) continue;
    if (count.high === 0 && count.low === 0) continue;
    counts.push(count);
  }

  if (counts.length === 0) {
    debugger;
    throw new Error("No optimal split bit");
  }

  let optimalIndex = 0;
  let optimalScore = Infinity;
  for (const count of counts) {
    const score = Math.abs(count.high - count.low) + count.any * 2;
    if (score < optimalScore) {
      optimalIndex = count.index;
      optimalScore = score;
    }
  }

  return optimalIndex;
}

export function splitEncodingsByOptimalBit (encodings: Encoding[], length: number): {high: Encoding[], low: Encoding[], index: number} {
  const splitIndex = getOptimalSplitBit(encodings, length);

  const high: Encoding[] = [];
  const low: Encoding[] = [];

  for (const encoding of encodings) {
    switch (encoding.bits[splitIndex]) {
      case Bit.ZERO: low.push(encoding); break;
      case Bit.ONE: high.push(encoding); break;
      default: low.push(encoding); high.push(encoding);
    }
  }

  return { high, low, index: splitIndex };
}

export type EncodingNode = {
  /** If this contains a list of encodings that all match the given input */
  leaf: false;

  size: number;

  /** Mask to check the relevant bit */
  bitmask: number;

  /** Where to go if the input has high bit in the checked location */
  high: EncodingNode;

  /** Where to go if the input has low bit in the checked location */
  low: EncodingNode;
} | {
  /** If this contains a list of encodings that all match the given input */
  leaf: true;

  size: number;

  /** All encodings */
  encodings: Encoding[];
};

function allEncodingsMatch (encodings: Encoding[], length: number): boolean {
  if (encodings.length === 0 || encodings.length === 1) return true;

  const firstEncoding = encodings[0];
  for (let i = 0; i < length; i++) {
    let requiredMatch = firstEncoding.bits[i];
    for (let j = 1; j < encodings.length; j++) {
      const bit = encodings[j].bits[i];
      if (requiredMatch > Bit.ONE) {
        if (bit <= Bit.ONE) requiredMatch = bit;
        continue;
      }

      if (bit > Bit.ONE) continue;

      if (requiredMatch !== bit) return false;
    }
  }

  return true;
}

/**
 * Compares the specicivity of the bit pair. Returns 1 if the first
 * is more specific than the second, 0 if same, and -1 if the second
 * is more specific than the first.
 */
function compareBits (b1: Bit, b2: Bit): number {
  if (b1 === b2) { return 0; }

  const b2general = b2 > Bit.ONE;
  return b1 > Bit.ONE
    ? b2general ? 0 : 1
    : b2general ? -1 : 0;
}

function customOrderEncodings (encodings: Encoding[]): Encoding[] | null {
  // TODO generalise to accept other custom orders
  if (encodings.length !== 3) { return null; }
  debugger;
  if (encodings[0].name !== "ADD" || encodings[1].name !== "ADD" || encodings[2].name !== "ADD") { return null; }

  const first = encodings.find(e => e.type === InstrType.SP_PLUS_REGISTER && e.encoding === 1);
  const second = encodings.find(e => e.type === InstrType.SP_PLUS_REGISTER && e.encoding === 2);
  const third = encodings.find(e => e.type === InstrType.REGISTER && e.encoding === 2);
  if (first === undefined || second === undefined || third === undefined) { return null; }

  return [first, second, third];
}

function autoOrderEncodings (encodings: Encoding[]): Encoding[] {
  return encodings.sort((a, b) => {
    if (a.name === "CMP" && b.name === "SUB") { debugger; }
    const cmp = a.compare(b);
    if (cmp === 0) { throw new Error(`Ambiguous instruction ordering: ${a.name}:${a.toString()}, ${b.name}:${b.toString()}`); }
    return cmp;
  });
}

export function buildEncodingTree (encodings: Encoding[], length: number): EncodingNode {
  if (allEncodingsMatch(encodings, length)) {
    const customOrdering = customOrderEncodings(encodings);
    if (customOrdering !== null) {
      return { leaf: true, encodings: customOrdering, size: encodings.length };
    }
    return { leaf: true, encodings: autoOrderEncodings(encodings), size: encodings.length };
  }

  const { high, low, index } = splitEncodingsByOptimalBit(encodings, length);
  const bitmask = 2 ** (length - index - 1); // 1 << will break for values near 32

  return {
    size: encodings.length,
    leaf: false,
    bitmask,
    high: buildEncodingTree(high, length),
    low: buildEncodingTree(low, length),
  };
}

export function identifyInstructionFromTree (instruction: number, node: EncodingNode): Encoding | null {
  if (node.leaf) {
    for (const encoding of node.encodings) {
      if (encoding.matches(instruction)) return encoding;
    }
    return null;
  }

  if ((instruction & node.bitmask) > 0) {
    return identifyInstructionFromTree(instruction, node.high);
  } else {
    return identifyInstructionFromTree(instruction, node.low);
  }
}
