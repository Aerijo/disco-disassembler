import { INSTRUCTION } from "./instructions";

function resolveOpcode (opcode: number, hword: number, resolvers: ((hword: number) => INSTRUCTION)[]): INSTRUCTION {
  if (opcode >= resolvers.length) return INSTRUCTION.UNDEFINED;
  return resolvers[opcode](hword);
}

function LSL_IMM_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.LSL_IMM_T1;
}

function LSR_IMM_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.LSR_IMM_T1;
}

function ASR_IMM_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.ASR_IMM_T1;
}

function ADD_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.ADD_REG_T1;
}

function SUB_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.SUB_REG_T1;
}

function ADD_IMM_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.ADD_IMM_T1;
}

function SUB_IMM_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.SUB_IMM_T1;
}

function MOV_IMM_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.MOV_IMM_T1;
}

function CMP_IMM_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.CMP_IMM_T1;
}

function ADD_IMM_T2 (_hword: number): INSTRUCTION {
  return INSTRUCTION.ADD_IMM_T2;
}

function SUB_IMM_T2 (_hword: number): INSTRUCTION {
  return INSTRUCTION.SUB_IMM_T2;
}

function idShift (hword: number): INSTRUCTION {
  // 00xx xxx- ---- ----
  return resolveOpcode(hword >>> 9, hword, [
    LSL_IMM_T1, LSL_IMM_T1, LSL_IMM_T1, LSL_IMM_T1, // 000xx
    LSR_IMM_T1, LSR_IMM_T1, LSR_IMM_T1, LSR_IMM_T1, // 001xx
    ASR_IMM_T1, ASR_IMM_T1, ASR_IMM_T1, ASR_IMM_T1, // 010xx
    ADD_REG_T1, // 01100
    SUB_REG_T1, // 01101
    ADD_IMM_T1, // 01110 (3-bit ADD)
    SUB_IMM_T1, // 01111 (3-bit SUB)
    MOV_IMM_T1, MOV_IMM_T1, MOV_IMM_T1, MOV_IMM_T1, // 100xx
    CMP_IMM_T1, CMP_IMM_T1, CMP_IMM_T1, CMP_IMM_T1, // 101xx
    ADD_IMM_T2, ADD_IMM_T2, ADD_IMM_T2, ADD_IMM_T2, // 110xx (8-bit ADD)
    SUB_IMM_T2, SUB_IMM_T2, SUB_IMM_T2, SUB_IMM_T2, // 111xx (8-bit SUB)
  ]);
}

function AND_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.AND_REG_T1;
}

function EOR_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.EOR_REG_T1;
}

function LSL_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.LSL_REG_T1;
}

function LSR_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.LSR_REG_T1;
}

function ASR_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.ASR_REG_T1;
}

function ADC_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.ADC_REG_T1;
}

function SBC_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.SBC_REG_T1;
}

function ROR_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.ROR_REG_T1;
}

function TST_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.TST_REG_T1;
}

function RSB_IMM_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.RSB_IMM_T1;
}

function CMP_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.CMP_REG_T1;
}

function CMN_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.CMN_REG_T1;
}

function ORR_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.ORR_REG_T1;
}

function MUL_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.MUL_REG_T1;
}

function BIC_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.BIC_REG_T1;
}

function MVN_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.MVN_REG_T1;
}

function idDataProc (hword: number): INSTRUCTION {
  // 0100 00xx xx-- ----
  return resolveOpcode((hword >>> 6) & 0b1111, hword, [
    AND_REG_T1, EOR_REG_T1, LSL_REG_T1, LSR_REG_T1,
    ASR_REG_T1, ADC_REG_T1, SBC_REG_T1, ROR_REG_T1,
    TST_REG_T1, RSB_IMM_T1, CMP_REG_T1, CMN_REG_T1,
    ORR_REG_T1, MUL_REG_T1, BIC_REG_T1, MVN_REG_T1,
  ]);
}

function ADD_REG_T2 (_hword: number): INSTRUCTION {
  return INSTRUCTION.ADD_REG_T2;
}

function UNPREDICTABLE (_hword: number): INSTRUCTION {
  return INSTRUCTION.UNPREDICTABLE;
}

function CMP_REG_T2 (_hword: number): INSTRUCTION {
  return INSTRUCTION.CMP_REG_T2;
}

function MOV_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.MOV_REG_T1;
}

function BX (_hword: number): INSTRUCTION {
  return INSTRUCTION.BX;
}

function BLX_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.BLX_REG_T1;
}

function idSpecialData (hword: number): INSTRUCTION {
  // 0100 01xx xx-- ----
  return resolveOpcode((hword >>> 6) & 0b1111, hword, [
    ADD_REG_T2, ADD_REG_T2, UNPREDICTABLE, CMP_REG_T2,
    CMP_REG_T2, CMP_REG_T2, MOV_REG_T1,   MOV_REG_T1,
    MOV_REG_T1, MOV_REG_T1, BX,           BLX_REG_T1,
  ]);
}

function LDR_LIT_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.LDR_LIT_T1;
}

function STR_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.STR_REG_T1;
}

function STRH_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.STRH_REG_T1;
}

function STRB_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.STRB_REG_T1;
}

function LDRSB_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.LDRSB_REG_T1;
}

function LDR_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.LDR_REG_T1;
}

function LDRH_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.LDRH_REG_T1;
}

function LDRB_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.LDRB_REG_T1;
}

function LDRSH_REG_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.LDRSH_REG_T1;
}

function STR_IMM_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.STR_IMM_T1;
}

function LDR_IMM_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.LDR_IMM_T1;
}

function STRB_IMM_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.STRB_IMM_T1;
}

function LDRB_IMM_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.LDRB_IMM_T1;
}

function STRH_IMM_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.STRH_IMM_T1;
}

function LDRH_IMM_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.LDRH_IMM_T1;
}

function STR_IMM_T2 (_hword: number): INSTRUCTION {
  return INSTRUCTION.STR_IMM_T2;
}

function LDR_IMM_T2 (_hword: number): INSTRUCTION {
  return INSTRUCTION.LDR_IMM_T2;
}

function ADR_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.ADR_T1;
}

function ADD_SP_IMM_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.ADD_SP_IMM_T1;
}

function idLoadSingle (hword: number): INSTRUCTION {
  // aaaa bbb- ---- ----
  const opA = hword >>> 12;
  const opB = (hword >>> 9) & 0b111;

  switch (opA) {
    case 0b0101:
      return resolveOpcode(opB, hword, [
        STR_REG_T1, STRH_REG_T1, STRB_REG_T1, LDRSB_REG_T1,
        LDR_REG_T1, LDRH_REG_T1, LDRB_REG_T1, LDRSH_REG_T1,
      ]);
    case 0b0110:
      return resolveOpcode(opB, hword, [
        STR_IMM_T1, STR_IMM_T1, STR_IMM_T1, STR_IMM_T1,
        LDR_IMM_T1, LDR_IMM_T1, LDR_IMM_T1, LDR_IMM_T1,
      ]);
    case 0b0111:
      return resolveOpcode(opB, hword, [
        STRB_IMM_T1, STRB_IMM_T1, STRB_IMM_T1, STRB_IMM_T1,
        LDRB_IMM_T1, LDRB_IMM_T1, LDRB_IMM_T1, LDRB_IMM_T1,
      ]);
    case 0b1000:
      return resolveOpcode(opB, hword, [
        STRH_IMM_T1, STRH_IMM_T1, STRH_IMM_T1, STRH_IMM_T1,
        LDRH_IMM_T1, LDRH_IMM_T1, LDRH_IMM_T1, LDRH_IMM_T1,
      ]);
    case 0b1001:
      return resolveOpcode(opB, hword, [
        STR_IMM_T2, STR_IMM_T2, STR_IMM_T2, STR_IMM_T2,
        LDR_IMM_T2, LDR_IMM_T2, LDR_IMM_T2, LDR_IMM_T2,
      ]);
    default:
      return INSTRUCTION.UNDEFINED;
  }
}

function ADD_SP_IMM_T2 (_hword: number): INSTRUCTION {
  return INSTRUCTION.ADD_SP_IMM_T2;
}

function SUB_SP_IMM_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.SUB_SP_IMM_T1;
}

function CBZ (_hword: number): INSTRUCTION {
  return INSTRUCTION.CBZ;
}

function PUSH (_hword: number): INSTRUCTION {
  return INSTRUCTION.PUSH;
}

function CBNZ (_hword: number): INSTRUCTION {
  return INSTRUCTION.CBNZ;
}

function REV (_hword: number): INSTRUCTION {
  return INSTRUCTION.REV;
}

function REV16 (_hword: number): INSTRUCTION {
  return INSTRUCTION.REV16;
}

function REVSH (_hword: number): INSTRUCTION {
  return INSTRUCTION.REVSH;
}

function POP (_hword: number): INSTRUCTION {
  return INSTRUCTION.POP;
}

function BKPT (_hword: number): INSTRUCTION {
  return INSTRUCTION.BKPT;
}

function NOP (_hword: number): INSTRUCTION {
  return INSTRUCTION.NOP;
}

function YIELD (_hword: number): INSTRUCTION {
  return INSTRUCTION.YIELD;
}

function WFE (_hword: number): INSTRUCTION {
  return INSTRUCTION.WFE;
}

function WFI (_hword: number): INSTRUCTION {
  return INSTRUCTION.WFI;
}

function SEV (_hword: number): INSTRUCTION {
  return INSTRUCTION.SEV;
}

function idIfThen (hword: number): INSTRUCTION {
  const opA = (hword >>> 4) & 0b1111;
  const opB = hword & 0b1111;

  if (opB !== 0) {
    return INSTRUCTION.IT;
  }

  return resolveOpcode(opA, hword, [
    NOP, YIELD, WFE, WFI, SEV,
  ]);
}

function idMisc (hword: number): INSTRUCTION {
  return resolveOpcode((hword >>> 5) & 0b1111111, hword, [
    ADD_SP_IMM_T2, ADD_SP_IMM_T2, ADD_SP_IMM_T2, ADD_SP_IMM_T2,
    SUB_SP_IMM_T1, SUB_SP_IMM_T1, SUB_SP_IMM_T1, SUB_SP_IMM_T1,
    CBZ,  CBZ,  CBZ,  CBZ,  CBZ,  CBZ,  CBZ,  CBZ,
    PUSH, PUSH, PUSH, PUSH, PUSH, PUSH, PUSH, PUSH,
    PUSH, PUSH, PUSH, PUSH, PUSH, PUSH, PUSH, PUSH,
    CBNZ, CBNZ, CBNZ, CBNZ, CBNZ, CBNZ, CBNZ, CBNZ,
    REV,  REV,  REV16, REV16, REVSH, REVSH,
    CBNZ, CBNZ, CBNZ, CBNZ, CBNZ, CBNZ, CBNZ, CBNZ,
    POP,  POP,  POP,  POP,  POP,  POP,  POP,  POP,
    POP,  POP,  POP,  POP,  POP,  POP,  POP,  POP,
    BKPT, BKPT, BKPT, BKPT, BKPT, BKPT, BKPT, BKPT,
    idIfThen, idIfThen, idIfThen, idIfThen,
    idIfThen, idIfThen, idIfThen, idIfThen,
  ]);
}

function STM_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.STM_T1;
}

function LDM_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.LDM_T1;
}

function B_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.B_T1;
}

function B_T2 (_hword: number): INSTRUCTION {
  return INSTRUCTION.B_T2;
}

function SVC_T1 (_hword: number): INSTRUCTION {
  return INSTRUCTION.SVC_T1;
}

function idCondBranch (hword: number): INSTRUCTION {
  const opcode = (hword >>> 8) & 0b1111;
  switch (opcode) {
    case 0b1110:
      return INSTRUCTION.UNDEFINED;
    case 0b1111:
      return SVC_T1(hword);
    default:
      return B_T2(hword);
  }
}

export function identifyNarrowInstruction (hword: number): INSTRUCTION {
  // xxxx xx-- ---- ----
  return resolveOpcode(hword >>> 10, hword, [
    idShift, idShift, idShift, idShift, // 00xxxx
    idShift, idShift, idShift, idShift,
    idShift, idShift, idShift, idShift,
    idShift, idShift, idShift, idShift,

    idDataProc, idSpecialData, // 01000x

    LDR_LIT_T1, LDR_LIT_T1, // 01001x

    idLoadSingle, idLoadSingle, idLoadSingle, idLoadSingle, // 0101xx
    idLoadSingle, idLoadSingle, idLoadSingle, idLoadSingle, // 011xxx
    idLoadSingle, idLoadSingle, idLoadSingle, idLoadSingle, // 100xxx
    idLoadSingle, idLoadSingle, idLoadSingle, idLoadSingle,
    idLoadSingle, idLoadSingle, idLoadSingle, idLoadSingle,

    ADR_T1, ADR_T1, //10100x

    ADD_SP_IMM_T1, ADD_SP_IMM_T1, // 10101x

    idMisc, idMisc, idMisc, idMisc, // 1011xx

    STM_T1, STM_T1, // 11000x

    LDM_T1, LDM_T1, // 11001x

    idCondBranch, idCondBranch, idCondBranch, idCondBranch, // 1101xx

    B_T1, B_T1, // 11100x
  ]);
}
