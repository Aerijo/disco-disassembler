import { INSTRUCTION } from "../instructions/instructions";

const I = INSTRUCTION;

function resolveOpcode (opcode: number, hword: number, resolvers: (INSTRUCTION | ((hword: number) => INSTRUCTION))[]): INSTRUCTION {
  if (opcode >= resolvers.length) return I.UNDEFINED;
  const resolver = resolvers[opcode];
  if (resolver instanceof Function) {
    return resolver(hword);
  }
  return resolver;
}

function idShift (hword: number): INSTRUCTION {
  // 00xx xxx- ---- ----
  return resolveOpcode(hword >>> 9, hword, [
    I.LSL_IMM_T1, I.LSL_IMM_T1, I.LSL_IMM_T1, I.LSL_IMM_T1, // 000xx
    I.LSR_IMM_T1, I.LSR_IMM_T1, I.LSR_IMM_T1, I.LSR_IMM_T1, // 001xx
    I.ASR_IMM_T1, I.ASR_IMM_T1, I.ASR_IMM_T1, I.ASR_IMM_T1, // 010xx
    I.ADD_REG_T1, // 01100
    I.SUB_REG_T1, // 01101
    I.ADD_IMM_T1, // 01110 (3-bit ADD)
    I.SUB_IMM_T1, // 01111 (3-bit SUB)
    I.MOV_IMM_T1, I.MOV_IMM_T1, I.MOV_IMM_T1, I.MOV_IMM_T1, // 100xx
    I.CMP_IMM_T1, I.CMP_IMM_T1, I.CMP_IMM_T1, I.CMP_IMM_T1, // 101xx
    I.ADD_IMM_T2, I.ADD_IMM_T2, I.ADD_IMM_T2, I.ADD_IMM_T2, // 110xx (8-bit ADD)
    I.SUB_IMM_T2, I.SUB_IMM_T2, I.SUB_IMM_T2, I.SUB_IMM_T2, // 111xx (8-bit SUB)
  ]);
}

function idDataProc (hword: number): INSTRUCTION {
  // 0100 00xx xx-- ----
  return resolveOpcode((hword >>> 6) & 0b1111, hword, [
    I.AND_REG_T1, I.EOR_REG_T1, I.LSL_REG_T1, I.LSR_REG_T1,
    I.ASR_REG_T1, I.ADC_REG_T1, I.SBC_REG_T1, I.ROR_REG_T1,
    I.TST_REG_T1, I.RSB_IMM_T1, I.CMP_REG_T1, I.CMN_REG_T1,
    I.ORR_REG_T1, I.MUL_REG_T1, I.BIC_REG_T1, I.MVN_REG_T1,
  ]);
}

function idSpecialData (hword: number): INSTRUCTION {
  // 0100 01xx xx-- ----
  return resolveOpcode((hword >>> 6) & 0b1111, hword, [
    I.ADD_REG_T2,    I.ADD_REG_T2, I.ADD_REG_T2, I.ADD_REG_T2, // 00xx
    I.UNPREDICTABLE, I.CMP_REG_T2, I.CMP_REG_T2, I.CMP_REG_T2, // 0100 UNPREDICTABLE, 0101:011x CMP
    I.MOV_REG_T1,    I.MOV_REG_T1, I.MOV_REG_T1, I.MOV_REG_T1, // 10xx
    I.BX_T1,         I.BX_T1, // 110x
    I.BLX_REG_T1,    I.BLX_REG_T1, // 111x
  ]);
}

function idLoadSingle (hword: number): INSTRUCTION {
  // aaaa bbb- ---- ----
  const opA = hword >>> 12;
  const opB = (hword >>> 9) & 0b111;

  switch (opA) {
    case 0b0101:
      return resolveOpcode(opB, hword, [
        I.STR_REG_T1, I.STRH_REG_T1, I.STRB_REG_T1, I.LDRSB_REG_T1,
        I.LDR_REG_T1, I.LDRH_REG_T1, I.LDRB_REG_T1, I.LDRSH_REG_T1,
      ]);
    case 0b0110:
      return resolveOpcode(opB, hword, [
        I.STR_IMM_T1, I.STR_IMM_T1, I.STR_IMM_T1, I.STR_IMM_T1,
        I.LDR_IMM_T1, I.LDR_IMM_T1, I.LDR_IMM_T1, I.LDR_IMM_T1,
      ]);
    case 0b0111:
      return resolveOpcode(opB, hword, [
        I.STRB_IMM_T1, I.STRB_IMM_T1, I.STRB_IMM_T1, I.STRB_IMM_T1,
        I.LDRB_IMM_T1, I.LDRB_IMM_T1, I.LDRB_IMM_T1, I.LDRB_IMM_T1,
      ]);
    case 0b1000:
      return resolveOpcode(opB, hword, [
        I.STRH_IMM_T1, I.STRH_IMM_T1, I.STRH_IMM_T1, I.STRH_IMM_T1,
        I.LDRH_IMM_T1, I.LDRH_IMM_T1, I.LDRH_IMM_T1, I.LDRH_IMM_T1,
      ]);
    case 0b1001:
      return resolveOpcode(opB, hword, [
        I.STR_IMM_T2, I.STR_IMM_T2, I.STR_IMM_T2, I.STR_IMM_T2,
        I.LDR_IMM_T2, I.LDR_IMM_T2, I.LDR_IMM_T2, I.LDR_IMM_T2,
      ]);
    default:
      return I.UNDEFINED;
  }
}

function idIfThen (hword: number): INSTRUCTION {
  const opA = (hword >>> 4) & 0b1111;
  const opB = hword & 0b1111;

  if (opB !== 0) {
    return I.IT_T1;
  }

  return resolveOpcode(opA, hword, [
    I.NOP_T1, I.YIELD_T1, I.WFE_T1, I.WFI_T1, I.SEV_T1,
  ]);
}

function idMisc (hword: number): INSTRUCTION {
  return resolveOpcode((hword >>> 5) & 0b1111111, hword, [
    I.ADD_SP_IMM_T2, I.ADD_SP_IMM_T2, I.ADD_SP_IMM_T2, I.ADD_SP_IMM_T2, // 00000xx
    I.SUB_SP_IMM_T1, I.SUB_SP_IMM_T1, I.SUB_SP_IMM_T1, I.SUB_SP_IMM_T1, // 00001xx
    I.CBZ_T1,  I.CBZ_T1,  I.CBZ_T1,  I.CBZ_T1, // 0001xxx
    I.CBZ_T1,  I.CBZ_T1,  I.CBZ_T1,  I.CBZ_T1,
    I.SXTH_T1, I.SXTH_T1, // 001000x
    I.SXTB_T1, I.SXTB_T1, // 001001x
    I.UXTH_T1, I.UXTH_T1, // 001010x
    I.UXTB_T1, I.UXTB_T1, // 001011x
    I.CBZ_T1, I.CBZ_T1, I.CBZ_T1, I.CBZ_T1, // 0011xxx
    I.CBZ_T1, I.CBZ_T1, I.CBZ_T1, I.CBZ_T1,
    I.PUSH_T1, I.PUSH_T1, I.PUSH_T1, I.PUSH_T1, // 010xxxx
    I.PUSH_T1, I.PUSH_T1, I.PUSH_T1, I.PUSH_T1,
    I.PUSH_T1, I.PUSH_T1, I.PUSH_T1, I.PUSH_T1,
    I.PUSH_T1, I.PUSH_T1, I.PUSH_T1, I.PUSH_T1,
    I.UNDEFINED, I.UNDEFINED, I.CPS_T1,    I.UNDEFINED, // 011xxxx (CPS_T1 === 0110011)
    I.UNDEFINED, I.UNDEFINED, I.UNDEFINED, I.UNDEFINED,
    I.UNDEFINED, I.UNDEFINED, I.UNDEFINED, I.UNDEFINED,
    I.UNDEFINED, I.UNDEFINED, I.UNDEFINED, I.UNDEFINED,
    I.UNDEFINED, I.UNDEFINED, I.UNDEFINED, I.UNDEFINED, // 1000xxx
    I.UNDEFINED, I.UNDEFINED, I.UNDEFINED, I.UNDEFINED,
    I.CBNZ_T1, I.CBNZ_T1, I.CBNZ_T1, I.CBNZ_T1, // 1001xxx
    I.CBNZ_T1, I.CBNZ_T1, I.CBNZ_T1, I.CBNZ_T1,
    I.REV_T1,  I.REV_T1, // 101000x
    I.REV16_T1, I.REV16_T1, // 101001x
    I.UNDEFINED, I.UNDEFINED, // 101010x
    I.REVSH_T1, I.REVSH_T1, // 101011x
    I.CBNZ_T1, I.CBNZ_T1, I.CBNZ_T1, I.CBNZ_T1, // 1011xxx
    I.CBNZ_T1, I.CBNZ_T1, I.CBNZ_T1, I.CBNZ_T1,
    I.POP_T1,  I.POP_T1,  I.POP_T1,  I.POP_T1, // 110xxxx
    I.POP_T1,  I.POP_T1,  I.POP_T1,  I.POP_T1,
    I.POP_T1,  I.POP_T1,  I.POP_T1,  I.POP_T1,
    I.POP_T1,  I.POP_T1,  I.POP_T1,  I.POP_T1,
    I.BKPT_T1, I.BKPT_T1, I.BKPT_T1, I.BKPT_T1, // 1110xxx
    I.BKPT_T1, I.BKPT_T1, I.BKPT_T1, I.BKPT_T1,
    idIfThen, idIfThen, idIfThen, idIfThen, // 1111xxx
    idIfThen, idIfThen, idIfThen, idIfThen,
  ]);
}

function idCondBranch (hword: number): INSTRUCTION {
  const opcode = (hword >>> 8) & 0b1111;
  switch (opcode) {
    case 0b1110:
      return I.UNDEFINED;
    case 0b1111:
      return I.SVC_T1;
    default:
      return I.B_T2;
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

    I.LDR_LIT_T1, I.LDR_LIT_T1, // 01001x

    idLoadSingle, idLoadSingle, idLoadSingle, idLoadSingle, // 0101xx
    idLoadSingle, idLoadSingle, idLoadSingle, idLoadSingle, // 011xxx
    idLoadSingle, idLoadSingle, idLoadSingle, idLoadSingle, // 100xxx
    idLoadSingle, idLoadSingle, idLoadSingle, idLoadSingle,
    idLoadSingle, idLoadSingle, idLoadSingle, idLoadSingle,

    I.ADR_T1, I.ADR_T1, //10100x

    I.ADD_SP_IMM_T1, I.ADD_SP_IMM_T1, // 10101x

    idMisc, idMisc, idMisc, idMisc, // 1011xx

    I.STM_T1, I.STM_T1, // 11000x

    I.LDM_T1, I.LDM_T1, // 11001x

    idCondBranch, idCondBranch, idCondBranch, idCondBranch, // 1101xx

    I.B_T1, I.B_T1, // 11100x
  ]);
}
