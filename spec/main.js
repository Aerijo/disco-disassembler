const { getMachineCodeBytes, isWideInstruction } = require("../dist/parse/parse")

const { identifyWideInstruction } = require("../dist/disassemble/wide")
const { identifyNarrowInstruction } = require("../dist/disassemble/narrow")
const { INSTRUCTION, Encoding, getOptimalSplitBit, splitEncodingsByOptimalBit } = require("../dist/instructions/instructions")

const encodings = [
  new Encoding("x11x000x100x1001"),
  new Encoding("1110010001001010"),
  new Encoding("x101x001x01x00x1"),
  new Encoding("1110010001001010"),
  new Encoding("1010101010000101"),
  new Encoding("1110010001001010"),
  new Encoding("x111x1x00x100000"),
  new Encoding("1110010001001010"),
  new Encoding("xxx0x100100x1001"),
  new Encoding("x11001x01001x0xx"),
  new Encoding("1110010001001010"),
  new Encoding("x1001x010x010x10"),
  new Encoding("x101x001010010x0"),
  new Encoding("0001001x00100x10"),
]

getOptimalSplitBit(encodings, false)

console.log(splitEncodingsByOptimalBit(encodings, false))
