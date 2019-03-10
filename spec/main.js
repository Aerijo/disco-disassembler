const { getMachineCodeBytes, isWideInstruction } = require("../dist/parse")

const input = "  Offset: 00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F 	\n080001c0:                         A1 F1 01 01 4F F0 03 01           ¡ñ..Oð..\n080001d0: A1 F1 01 01 FF E7 43 4F 50 45 5F F8 06 10 01 F1   ¡ñ..ÿçCOPE_ø...ñ\n080001e0: 05 02 02 F1 60 63 00 BF FD E7 00 00 02 4B 13 B1   ...ñ`c.¿ýç...K.±\n080001f0: 02 48 00 F0 05 B8 70 47 00 00 00 00 0D 02 00 08   .H.ð.¸pG........\n08000200: 00 23 01 46 1A 46 18 46 00 F0 1E B8 38 B5 0A 4C   .#.F.F.F.ð.¸8µ.L\n08000210: 0A 4D 64 1B A4 10 0A D0 04 F1 80 43 01 3B 05 EB   .Md.¤..Ð.ñ.C.;.ë\n08000220: 83 05 01 3C 55 F8 04 39 98 47 00 2C F9 D1 BD E8   ...<Uø.9.G.,ùÑ½è\n08000230: 38 40 00 F0 79 B8 00 BF 44 03 00 08 40 03 00 08   8@.ðy¸.¿D...@...\n08000240: 70 47 00 BF 70 47 00 BF 2D E9 F8 43 2B 4D 06 46   pG.¿pG.¿-éøC+M.F\n08000250: 28 68 98 46 0F 46 91 46 FF F7 F2 FF 28 4B 1C 68   (h.F.F.Fÿ÷òÿ(K.h\n08000260: D4 F8 48 31 00 2B 3D D0 5A 68 1F 2A 0D DC 02 F1   ÔøH1.+=ÐZh.*.Ü.ñ\n08000270: 01 0C 16 BB 02 32 C3 F8 04 C0 28 68 43 F8 22 70   ...».2Ãø.À(hCø\"p\n08000280: FF F7 E0 FF 00 20 BD E8 F8 83 1E 4B 7B B3 4F F4   ÿ÷àÿ..½èø..K{³Oô\n"

const { identifyWideInstruction } = require("../dist/wide")
const { identifyNarrowInstruction } = require("../dist/narrow")
const { INSTRUCTION } = require("../dist/instructions")

const instructions = getMachineCodeBytes(input)
// const instructions = getMachineCodeBytes("01 F1 05 01 12 FB 03 F1 12 FB 13 F1 12 FB 23 F1 12 FB 33 F1 A1 F1 05 01")

const result = []
let i = 0;
while (i < instructions.length) {
  const byte1 = instructions[i++];

  if (i === instructions.length) {
    result.push('[half instruction]')
    break
  }

  const byte2 = instructions[i++];

  const hword = (byte2 << 8) | byte1; // little endian

  if (isWideInstruction(hword)) {
    if (i + 2 > instructions.length) {
      result.push("[wide start]")
      break
    }
    const byte3 = instructions[i++]
    const byte4 = instructions[i++]
    const shword = (byte4 << 8) | byte3
    const word = (hword * (2 ** 16)) + shword

    console.log(word.toString(16).padStart(8, '0'))
    result.push(INSTRUCTION[identifyWideInstruction(word)] + ":" + word.toString(16).toUpperCase() + ":" + word.toString(2))
  } else {
    console.log(hword.toString(16).padStart(4, '0'))
    result.push(INSTRUCTION[identifyNarrowInstruction(hword)] + ":" + hword.toString(16).toUpperCase() + ":" + hword.toString(2))
  }
}

console.log(result)
