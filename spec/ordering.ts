import { generateEncodingsFromObject } from "../src/instructions/generate";
import * as stm from "../data/STM32L476";
import { INSTRUCTION } from "../src/instructions/instructions";

const encodings = generateEncodingsFromObject(stm.encodings);

for (let i = 0; i < encodings.length; i++) {
  const instrName = INSTRUCTION[i];
  const rawName = encodings[i].rawName;

  if (instrName !== rawName) {
    debugger;
    throw new Error(`Mismatched INSTRUCTION to Encoding; ${instrName} vs ${rawName}`);
  }
}
