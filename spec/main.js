const { getMachineCodeBytes, isWideInstruction } = require("../dist/parse")

const input = "  Offset: 00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F 	\n080001c0:                         A1 F1 01 01 4F F0 03 01           ¡ñ..Oð..\n080001d0: A1 F1 01 01 FF E7 43 4F 50 45 5F F8 06 10 01 F1   ¡ñ..ÿçCOPE_ø...ñ\n080001e0: 05 02 02 F1 60 63 00 BF FD E7 00 00 02 4B 13 B1   ...ñ`c.¿ýç...K.±\n080001f0: 02 48 00 F0 05 B8 70 47 00 00 00 00 0D 02 00 08   .H.ð.¸pG........\n08000200: 00 23 01 46 1A 46 18 46 00 F0 1E B8 38 B5 0A 4C   .#.F.F.F.ð.¸8µ.L\n08000210: 0A 4D 64 1B A4 10 0A D0 04 F1 80 43 01 3B 05 EB   .Md.¤..Ð.ñ.C.;.ë\n08000220: 83 05 01 3C 55 F8 04 39 98 47 00 2C F9 D1 BD E8   ...<Uø.9.G.,ùÑ½è\n08000230: 38 40 00 F0 79 B8 00 BF 44 03 00 08 40 03 00 08   8@.ðy¸.¿D...@...\n08000240: 70 47 00 BF 70 47 00 BF 2D E9 F8 43 2B 4D 06 46   pG.¿pG.¿-éøC+M.F\n08000250: 28 68 98 46 0F 46 91 46 FF F7 F2 FF 28 4B 1C 68   (h.F.F.Fÿ÷òÿ(K.h\n08000260: D4 F8 48 31 00 2B 3D D0 5A 68 1F 2A 0D DC 02 F1   ÔøH1.+=ÐZh.*.Ü.ñ\n08000270: 01 0C 16 BB 02 32 C3 F8 04 C0 28 68 43 F8 22 70   ...».2Ãø.À(hCø\"p\n08000280: FF F7 E0 FF 00 20 BD E8 F8 83 1E 4B 7B B3 4F F4   ÿ÷àÿ..½èø..K{³Oô\n"

let i2 = "  Offset: 00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F 	\n08000100: 11 03 00 08 11 03 00 08 11 03 00 08 11 03 00 08   ................\n08000110: 11 03 00 08 11 03 00 08 11 03 00 08 11 03 00 08   ................\n08000120: 11 03 00 08 11 03 00 08 11 03 00 08 11 03 00 08   ................\n08000130: 11 03 00 08 11 03 00 08 11 03 00 08 11 03 00 08   ................\n08000140: 11 03 00 08 11 03 00 08 11 03 00 08 11 03 00 08   ................\n08000150: 11 03 00 08 11 03 00 08 11 03 00 08 11 03 00 08   ................\n08000160: 11 03 00 08 11 03 00 08 11 03 00 08 11 03 00 08   ................\n08000170: 11 03 00 08 11 03 00 08 11 03 00 08 00 00 00 00   ................\n08000180: 11 03 00 08 11 03 00 08 10 B5 05 4C 23 78 33 B9   .........µ.L#x3¹\n08000190: 04 4B 13 B1 04 48 AF F3 00 80 01 23 23 70 10 BD   .K.±.H¯ó...##p.½\n080001a0: 2C 04 00 20 00 00 00 00 14 03 00 08 08 B5 03 4B   ,............µ.K\n080001b0: 1B B1 03 49 03 48 AF F3 00 80 08 BD 00 00 00 00   .±.I.H¯ó...½....\n080001c0: 30 04 00 20 14 03 00 08 01 F1 05 01 12 FB 03 F1   0........ñ...û.ñ\n080001d0: 12 FB 13 F1 12 FB 23 F1 12 FB 33 F1 A1 F1 05 01   .û.ñ.û#ñ.û3ñ¡ñ..\n080001e0: 00 BF FD E7 02 4B 13 B1 02 48 00 F0 05 B8 70 47   .¿ýç.K.±.H.ð.¸pG\n080001f0: 00 00 00 00 05 02 00 08 00 23 01 46 1A 46 18 46   .........#.F.F.F\n08000200: 00 F0 1E B8 38 B5 0A 4C 0A 4D 64 1B A4 10 0A D0   .ð.¸8µ.L.Md.¤..Ð\n08000210: 04 F1 80 43 01 3B 05 EB 83 05 01 3C 55 F8 04 39   .ñ.C.;.ë...<Uø.9\n08000220: 98 47 00 2C F9 D1 BD E8 38 40 00 F0 79 B8 00 BF   .G.,ùÑ½è8@.ðy¸.¿\n08000230: 3C 03 00 08 38 03 00 08 70 47 00 BF 70 47 00 BF   <...8...pG.¿pG.¿\n08000240: 2D E9 F8 43 2B 4D 06 46 28 68 98 46 0F 46 91 46   -éøC+M.F(h.F.F.F\n08000250: FF F7 F2 FF 28 4B 1C 68 D4 F8 48 31 00 2B 3D D0   ÿ÷òÿ(K.hÔøH1.+=Ð\n08000260: 5A 68 1F 2A 0D DC 02 F1 01 0C 16 BB 02 32 C3 F8   Zh.*.Ü.ñ...».2Ãø\n08000270: 04 C0 28 68 43 F8 22 70 FF F7 E0 FF 00 20 BD E8   .À(hCø\"pÿ÷àÿ..½è\n08000280: F8 83 1E 4B 7B B3 4F F4 C8 70 AF F3 00 80 03 46   ø..K{³OôÈp¯ó...F\n"

// i2 = "  Offset: 00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F 	\n08000100: 11 03 00 08 11 03 00 08 11 03 00 08 11 03 00 08   ................\n08000110: 11 03 00 08 11 03 00 08 11 03 00 08 11 03 00 08   ................\n08000120: 11 03 00 08 11 03 00 08 11 03 00 08 11 03 00 08   ................\n08000130: 11 03 00 08 11 03 00 08 11 03 00 08 11 03 00 08   ................\n08000140: 11 03 00 08 11 03 00 08 11 03 00 08 11 03 00 08   ................\n08000150: 11 03 00 08 11 03 00 08 11 03 00 08 11 03 00 08   ................\n08000160: 11 03 00 08 11 03 00 08 11 03 00 08 11 03 00 08   ................\n08000170: 11 03 00 08 11 03 00 08 11 03 00 08 00 00 00 00   ................\n08000180: 11 03 00 08 11 03 00 08 10 B5 05 4C 23 78 33 B9   .........µ.L#x3¹\n08000190: 04 4B 13 B1 04 48 AF F3 00 80 01 23 23 70 10 BD   .K.±.H¯ó...##p.½\n080001a0: 2C 04 00 20 00 00 00 00 14 03 00 08 08 B5 03 4B   ,............µ.K\n080001b0: 1B B1 03 49 03 48 AF F3 00 80 08 BD 00 00 00 00   .±.I.H¯ó...½....\n080001c0: 30 04 00 20 14 03 00 08 01 F1 05 01 12 FB 03 F1   0........ñ...û.ñ\n080001d0: 12 FB 13 F1 12 FB 23 F1 12 FB 33 F1 A1 F1 05 01   .û.ñ.û#ñ.û3ñ¡ñ..\n080001e0: 00 BF FD E7 02 4B 13 B1 02 48 00 F0 05 B8 70 47   .¿ýç.K.±.H.ð.¸pG\n080001f0: 00 00 00 00 05 02 00 08 00 23 01 46 1A 46 18 46   .........#.F.F.F\n08000200: 00 F0 1E B8 38 B5 0A 4C 0A 4D 64 1B A4 10 0A D0   .ð.¸8µ.L.Md.¤..Ð\n08000210: 04 F1 80 43 01 3B 05 EB 83 05 01 3C 55 F8 04 39   .ñ.C.;.ë...<Uø.9\n08000220: 98 47 00 2C F9 D1 BD E8 38 40 00 F0 79 B8 00 BF   .G.,ùÑ½è8@.ðy¸.¿\n08000230: 3C 03 00 08 38 03 00 08 70 47 00 BF 70 47 00 BF   <...8...pG.¿pG.¿\n08000240: 2D E9 F8 43 2B 4D 06 46 28 68 98 46 0F 46 91 46   -éøC+M.F(h.F.F.F\n08000250: FF F7 F2 FF 28 4B 1C 68 D4 F8 48 31 00 2B 3D D0   ÿ÷òÿ(K.hÔøH1.+=Ð\n08000260: 5A 68 1F 2A 0D DC 02 F1 01 0C 16 BB 02 32 C3 F8   Zh.*.Ü.ñ...».2Ãø\n08000270: 04 C0 28 68 43 F8 22 70 FF F7 E0 FF 00 20 BD E8   .À(hCø\"pÿ÷àÿ..½è\n08000280: F8 83 1E 4B 7B B3 4F F4 C8 70 AF F3 00 80 03 46   ø..K{³OôÈp¯ó...F\n08000290: 48 B3 D4 F8 48 21 00 21 C0 E9 00 21 4F F0 01 0C   H³ÔøH!.!Àé.!Oð..\n080002a0: C4 F8 48 01 0A 46 C0 F8 88 11 C0 F8 8C 11 00 2E   ÄøH..FÀø..Àø....\n080002b0: DC D0 03 EB 82 01 01 24 C1 F8 88 90 D3 F8 88 01   ÜÐ.ë...$Áø..Óø..\n080002c0: 94 40 20 43 02 2E C3 F8 88 01 C1 F8 08 81 CD D1   .@.C..Ãø..Áø..ÍÑ\n080002d0: D3 F8 8C 11 0C 43 C3 F8 8C 41 C7 E7 04 F5 A6 73   Óø...CÃø.AÇç.õ¦s\n080002e0: C4 F8 48 31 BC E7 28 68 FF F7 A8 FF 4F F0 FF 30   ÄøH1¼ç(hÿ÷¨ÿOðÿ0\n080002f0: C5 E7 00 BF                                       Åç.¿\n"

const { identifyWideInstruction } = require("../dist/wide")
const { identifyNarrowInstruction } = require("../dist/narrow")
const { INSTRUCTION } = require("../dist/instructions")

// const instructions = getMachineCodeBytes(input)
const instructions = getMachineCodeBytes(i2)

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
    const res = INSTRUCTION[identifyWideInstruction(word)]
    if (res === "UNDEFINED") {
      debugger;
      const res2 = identifyWideInstruction(word);
      console.log(res2);
    }
    result.push(res + ":" + word.toString(16).toUpperCase() + ":" + word.toString(2))
  } else {
    console.log(hword.toString(16).padStart(4, '0'))
    const res = INSTRUCTION[identifyNarrowInstruction(hword)]
    if (res === "UNDEFINED") {
      debugger;
      const res2 = identifyNarrowInstruction(word);
      console.log(res2);
    }
    result.push(res + ":" + hword.toString(16).toUpperCase() + ":" + hword.toString(2))
  }
}

console.log(result)
