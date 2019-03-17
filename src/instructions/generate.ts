import { Encoding, InstrType } from "./encodings";

export enum Duplicate {
  NONE,
  MATCH,
  CONCAT_LR,
  CONCAT_RL,
}

export interface EncodingDefinition {
  [key: string]: {
    pattern: string;
    duplicateVariables?: Duplicate;
    page?: number;
    pageSkip?: number;
  };
}

export interface KeywordMap {
  [key: string]: string[];
}

function typeFromShorthand (val: string): InstrType {
  switch (val) {
    case "IMM": return InstrType.IMMEDIATE;
    case "REG": return InstrType.REGISTER;
    case "LIT": return InstrType.LITERAL;
    case "SPI": return InstrType.SP_PLUS_IMMEDIATE;
    case "SPR": return InstrType.SP_PLUS_REGISTER;
    case "SMI": return InstrType.SP_MINUS_IMMEDIATE;
    case "SMR": return InstrType.SP_MINUS_REGISTER;
    case "IMMLIT": return InstrType.IMMEDIATE_LITERAL;
    default:
      throw new Error(`Unrecognised type ${val}`);
  }
}

export function instrTypeToDisplayName (type: InstrType, {addParens=true, short=true}): string {
  let name: string = "";
  switch (type) {
    case InstrType.NONE: name = ""; break;
    case InstrType.IMMEDIATE: name = short ? "imm" : "immediate"; break;
    case InstrType.REGISTER: name = short ? "reg" : "register"; break;
    case InstrType.LITERAL: name = short ? "lit" : "literal"; break;
    case InstrType.SP_PLUS_IMMEDIATE: name = short ? "SPI" : "SP plus immediate"; break;
    case InstrType.SP_PLUS_REGISTER: name = short ? "SPR" : "SP plus register"; break;
    case InstrType.SP_MINUS_IMMEDIATE: name = short ? "SMI" : "SP minus immediate"; break;
    case InstrType.SP_MINUS_REGISTER: name = short ? "SMR" : "SP minus register"; break;
    case InstrType.IMMEDIATE_LITERAL: name = short ? "iml" : "immediate, literal"; break;
    default: name = "MISSING";
  }
  if (addParens && name.length > 0) {
    name = `(${name})`;
  }
  return name;
}

/**
 * Given an [EncodingDefinition](#EncodingDefinition), it will generate an
 * array of encodings that can be used to get more information about the
 * identified instruction.
 *
 * Notes:
 * - Auto page numbers work like this:
 *   - First page is 1
 *   - When an item has a page, that is the new page
 *   - When an item shares a name-type with the one before, the same page is used
 *   - When an item does not, the page is incremented by 2 and that is used
 *
 *  These rules let most page numbers be implicitly defined, while allowing
 *  corrections when the manual is not entirely regular
 */
export function generateEncodingsFromObject (encodingDefinitions: EncodingDefinition): Encoding[] {
  const encodings: Encoding[] = [];
  let page = 0;
  let pageSkip = 2;

  let prevName: string = "";
  let prevType: InstrType = InstrType.NONE;

  Object.entries(encodingDefinitions).forEach(entry => {
    const key = entry[0];
    const value = entry[1];

    const keyParts = key.split(/_/g);

    const name = keyParts[0];
    let encoding = 0;
    let type = InstrType.NONE;

    switch (keyParts.length) {
      case 2:
        encoding = parseInt(keyParts[1].slice(-1), 10);
        break;
      case 3:
        type = typeFromShorthand(keyParts[1]);
        encoding = parseInt(keyParts[2].slice(-1), 10);
        break;
      default:
        if (keyParts.length > 3) {
          throw new Error(`Too many keyparts for ${key}`);
        } else {
          throw new Error(`Missing encoding number for ${key}`);
        }
    }

    const pattern = value.pattern;

    const baseName = name.match(/^(.*?)2?$/)![1];

    if (value.page !== undefined) {
      if (value.page < page) { debugger; throw new Error(`Unexpected page ordering for ${entry}`); }
      page = value.page;
    } else {
      if (value.pageSkip !== undefined) {
        pageSkip = value.pageSkip;
      }
      if (baseName !== prevName || type !== prevType) {
        page += pageSkip;
      }
    }

    prevName = baseName;
    prevType = type;

    encodings.push(new Encoding({
      name,
      rawName: key,
      pattern,
      encoding,
      type,
      duplicateVars: value.duplicateVariables,
      page,
    }));
  });

  return encodings;
}
