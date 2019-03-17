import { INSTRUCTION, instructionToEncoding } from "./instructions/instructions";
import { identifyWideInstruction } from "./disassemble/wide";
import { identifyNarrowInstruction } from "./disassemble/narrow";
import { Encoding } from "./instructions/encodings";

export function identifyInstruction (input: number): INSTRUCTION {
  if (input > (1 << 16)) {
    return identifyWideInstruction(input);
  } else {
    return identifyNarrowInstruction(input);
  }
}

export function bitsToEncoding (input: number): Encoding {
  const instruction = identifyInstruction(input);
  return instructionToEncoding(instruction);
}
