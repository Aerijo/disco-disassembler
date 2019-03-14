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
  static constructVariable (input: string, start: number): Variable {
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
    const variables: Variable[] = [];

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

          const variable = BytePattern.constructVariable(template.slice(start, i), bits.length);
          if (duplicateVars === Duplicate.NONE && variables.some(v => v.name === variable.name)) {
            throw new Error(`Duplicate variable ${variable.name} in template ${template}`);
          }
          variables.push(variable);
          for (let _ = variable.range[0]; _ < variable.range[1]; _++) bits.push(Bit.ANY); // tslint disable prefer-for-of-loop
          break;
        default:
          throw new Error(`Unexpected token ${token} in template ${template}`);
      }
    }

    if (bits.length === 16 || bits.length === 32) return { bits, variables };

    throw new Error(`Template ${template} is length ${bits.length}.`);
  }
}

interface EncodingParams {
  name: string;
  pattern: string;
  encoding: number;
  type: InstrType;
  duplicateVars?: Duplicate;
}

export class Encoding {
  name: string;

  encoding: number;

  type: InstrType;

  wide: boolean;

  bitmask: number;

  bitmaskCheck: number;

  /** The special ranges for things like Rn and i, imm3, imm8, etc. Range is inclusive */
  variables: Variable[];

  rawPattern: string;
  bits: Bit[];

  constructor (param: EncodingParams) {
    this.name = param.name;
    this.rawPattern = param.pattern;
    this.encoding = param.encoding;
    this.type = param.type;

    const { bits, variables } = BytePattern.parseTemplate(param.pattern, param.duplicateVars || Duplicate.NONE);
    this.bits = bits;
    this.variables = variables;

    this.wide = this.bits.length === 32;

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

type EncodingNode = {
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

export function buildEncodingTree (encodings: Encoding[], length: number): EncodingNode {
  if (allEncodingsMatch(encodings, length)) {
    return { leaf: true, encodings, size: encodings.length };
  }

  const { high, low, index } = splitEncodingsByOptimalBit(encodings, length);
  const bitmask = 2 ** (length - index - 1); // 1 << will break for values near 32

  if (index === 0) debugger;

  return {
    size: encodings.length,
    leaf: false,
    bitmask,
    high: buildEncodingTree(high, length),
    low: buildEncodingTree(low, length),
  };
}

export function identifyNarrowInstructionFromTree (instruction: number, node: EncodingNode): Encoding | null {
  if (node.leaf) {
    for (const encoding of node.encodings) {
      if (encoding.matches(instruction)) return encoding;
    }
    return null;
  }

  if ((instruction & node.bitmask) > 0) {
    return identifyNarrowInstructionFromTree(instruction, node.high);
  } else {
    return identifyNarrowInstructionFromTree(instruction, node.low);
  }
}
