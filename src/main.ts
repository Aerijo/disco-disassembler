import * as stm from "../data/STM32L476";
import { INSTRUCTION } from "./instructions/instructions";
import { generateEncodingsFromObject } from "./instructions/generate";
import { identifyWideInstruction } from "./disassemble/wide";
import { identifyNarrowInstruction } from "./disassemble/narrow";

const stmEnc = generateEncodingsFromObject(stm.encodings);
console.log(stmEnc.length);

export function identifyInstruction (input: number): INSTRUCTION {
  if (input > (1 << 16)) {
    return identifyWideInstruction(input);
  } else {
    return identifyNarrowInstruction(input);
  }
}

{
  const f = identifyInstruction(parseInt("F1040501", 16));

  console.log(INSTRUCTION[f]);
}
