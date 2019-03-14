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
    duplicateVariables?: Duplicate
  };
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
    default:
      console.error(`Unrecognised type ${val}`);
      return InstrType.NONE;
  }
}

export function generateEncodingsFromObject (encodingDefinitions: EncodingDefinition): Encoding[] {
  const encodings: Encoding[] = [];

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
          console.error(`Too many keyparts for ${key}`);
        } else {
          console.error(`Missing encoding number for ${key}`);
        }
    }

    const pattern = value.pattern;

    encodings.push(new Encoding({name, pattern, encoding, type, duplicateVars: value.duplicateVariables}));
  });

  return encodings;
}
