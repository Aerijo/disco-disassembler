import { INSTRUCTION } from "../instructions/instructions";
const I = INSTRUCTION;

function idCDP (word: number): INSTRUCTION {
  return ((word >>> 28) & 0b1)
    ? I.CDP_T2
    : I.CDP_T1;
}

function idMCR (word: number): INSTRUCTION {
  return ((word >>> 28) & 0b1)
    ? I.MCR_T2
    : I.MCR_T1;
}

function idMRC (word: number): INSTRUCTION {
  return ((word >>> 28) & 0b1)
    ? I.MRC_T2
    : I.MRC_T1;
}

function idMRRC (word: number): INSTRUCTION {
  return ((word >>> 28) & 0b1)
    ? I.MRRC_T2
    : I.MRRC_T1;
}

function idMCRR (word: number): INSTRUCTION {
  return ((word >>> 28) & 0b1)
    ? I.MCRR_T2
    : I.MCRR_T1;
}

function idLDC (word: number): INSTRUCTION {
  if (((word >>> 16) & 0b1111) === 0b1111) return idLDC_LIT(word);

  return ((word >>> 28) & 0b1)
    ? I.LDC_IMM_T2
    : I.LDC_IMM_T1;
}

function idLDC_LIT (word: number): INSTRUCTION {
  return ((word >>> 28) & 0b1)
    ? I.LDC_LIT_T2
    : I.LDC_LIT_T1;
}

function idSTC (word: number): INSTRUCTION {
  return ((word >>> 28) & 0b1)
    ? I.STC_T2
    : I.STC_T1;
}

function idLDRD (word: number): INSTRUCTION {
  const RN = (word >>> 16) & 0b1111;
  return (RN === 0b1111) ? I.LDRD_LIT_T1 : I.LDRD_IMM_T1;
}

function idCoprocessorInstr (word: number): INSTRUCTION {
  const op1 = (word >>> 20) & 0b111111;
  const op = (word >>> 4) & 0b1;

  if (((op1 >>> 4) & 0b11) === 0b10) {
    if (op === 0) return idCDP(word);
    return ((op1 & 0b1) === 0b1)
      ? idMCR(word)
      : idMRC(word);
  }

  if ((op1 | 0b000101) === 0b000101) {
    return ((op1 & 0b100) === 0b100)
      ? ((op1 & 0b1) === 0b1)
        ? idMRRC(word)
        : idMCRR(word)
      : I.UNDEFINED;
  }

  if ((op1 >>> 5) === 0b0) {
    return ((op1 & 0b1) === 0b1)
      ? idLDC(word)
      : idSTC(word);
  }

  return I.UNDEFINED;
}

function idMoveAndImmShift (word: number): INSTRUCTION {
  const type = (word >>> 4) & 0b11;
  const imm2 = (word >>> 6) & 0b11;
  const imm3 = (word >>> 12) & 0b111;
  const immIs0 = (imm2 + imm3) === 0;

  switch (type) {
    case 0b00: return immIs0 ? I.MOV_REG_T3 : I.LSL_IMM_T2;
    case 0b01: return I.LSR_IMM_T2;
    case 0b10: return I.ASR_IMM_T2;
    case 0b11: return immIs0 ? I.RRX_T1 : I.ROR_IMM_T1;
    default: return I.UNDEFINED;
  }
}

function idDataProcessingShifted (word: number): INSTRUCTION {
  const op = (word >>> 21) & 0b1111;
  const RN_PC = ((word >>> 16) & 0b1111) === 0b1111;
  const RD_PC = ((word >>>  8) & 0b1111) === 0b1111;
  const S  = (word >>> 20) & 0b1;

  switch (op) {
    case 0b0000: return RD_PC ? (S ? I.TST_REG_T2 : I.UNPREDICTABLE) : I.AND_REG_T2;
    case 0b0001: return I.BIC_REG_T2;
    case 0b0010: return RN_PC ? idMoveAndImmShift(word) : I.ORR_REG_T2;
    case 0b0011: return RN_PC ? I.MVN_REG_T2 : I.ORN_REG_T1;
    case 0b0100: return RD_PC ? (S ? I.TEQ_REG_T1 : I.UNPREDICTABLE) : I.EOR_REG_T2;
    case 0b0110: return I.PKHBT_T1;
    case 0b1000: return RD_PC ? (S ? I.CMN_REG_T2 : I.UNPREDICTABLE) : I.ADD_REG_T3;
    case 0b1010: return I.ADC_REG_T2;
    case 0b1011: return I.SBC_REG_T2;
    case 0b1101: return RD_PC ? (S ? I.CMP_REG_T3 : I.UNPREDICTABLE) : I.SUB_REG_T2;
    case 0b1110: return I.RSB_REG_T1;
    default: return I.UNDEFINED;
  }
}

function idLdrStrMultiple (word: number) {
  const op = (word >>> 23) & 0b11;
  const L = (word >>> 20) & 0b1;
  const W = (word >>> 21) & 0b1;
  const RN = (word >>> 16) & 0b1111;
  const cond = (W === 0b1) && (RN === 0b1101);

  switch (op) {
    case 0b01: return (L === 0)
      ? I.STM_T2
      : cond
        ? I.POP_T2
        : I.LDM_T2;
    case 0b10: return L
      ? I.LDMDB_T1
      : cond
        ? I.PUSH_T2
        : I.STMDB_T1;
    default: return I.UNDEFINED;
  }
}

function idLdrStrDual (word: number): INSTRUCTION {
  const op1 = (word >>> 23) & 0b11;
  const op2 = (word >>> 20) & 0b11;
  const op3 = (word >>> 4) & 0b1111;

  switch (op1) {
    case 0b00: switch (op2) {
        case 0b00: return I.STREX_T1;
        case 0b01: return I.LDREX_T1;
        case 0b10: return I.STRD_IMM_T1;
        case 0b11: return idLDRD(word);
        default: return I.UNDEFINED;
      }
    case 0b01: switch (op2) {
        case 0b00: switch (op3) {
            case 0b0100: return I.STREXB_T1;
            case 0b0101: return I.STREXH_T1;
            default: return I.UNDEFINED;
          }
        case 0b01: switch (op3) {
            case 0b0000: return I.TBB_T1;
            case 0b0001: return I.TBH_T1;
            case 0b0100: return I.LDREXB_T1;
            case 0b0101: return I.LDREXH_T1;
            default: return I.UNDEFINED;
          }
        case 0b10: return I.STRD_IMM_T1;
        case 0b11: return idLDRD(word);
        default: return I.UNDEFINED;
      }
    default: return (op2 % 2 === 0) ? I.STRD_IMM_T1 : idLDRD(word);
  }
}

function idHint (word: number): INSTRUCTION {
  const op1 = (word >>> 8) & 0b111;
  const op2 = word & 0b11111111;
  if (op1 !== 0b000) return I.UNDEFINED;

  switch (op2) {
    case 0b00000000: return I.NOP_T2;
    case 0b00000001: return I.YIELD_T2;
    case 0b00000010: return I.WFE_T2;
    case 0b00000011: return I.WFI_T2;
    case 0b00000100: return I.SEV_T2;
    default:
      return ((op2 & 0b11110000) === 0b11110000)
        ? I.DBG_T1
        : I.UNDEFINED;
  }
}

function idMiscControl (word: number): INSTRUCTION {
  const op = (word >>> 4) & 0b1111;
  switch (op) {
    case 0b0010: return I.CLREX_T1;
    case 0b0100: return I.DSB_T1;
    case 0b0101: return I.DMB_T1;
    case 0b0110: return I.ISB_T1;
    default: return I.UNDEFINED;
  }
}

function idBranchesAndMisc (word: number): INSTRUCTION {
  const op1 = (word >>> 12) & 0b111;
  const op = (word >>> 20) & 0b1111111;

  if (op1 === 0b010 && op === 0b1111111) return I.UNDEFINED;

  switch (op1 & 0b101) {
    case 0b101: return I.BL_T1;
    case 0b001: return I.B_T4;
    case 0b000:
      if (((op >>> 3) & 0b111) !== 0b111) return I.B_T3;
      switch (op) {
        case 0b0111000:
        case 0b0111001: return I.MSR_T1;
        case 0b0111010: return idHint(word);
        case 0b0111011: return idMiscControl(word);
        case 0b0111110:
        case 0b0111111: return I.MRS_T1;
        default: return I.UNDEFINED;
      }
    default: return I.UNDEFINED;
  }
}

function idDataProcModifiedImmediate (word: number): INSTRUCTION {
  const op = (word >>> 20) & 0b11111;
  const RN_PC = ((word >>> 16) & 0b1111) === 0b1111;
  const RD_PC = ((word >>>  8) & 0b1111) === 0b1111;

  const opEff = op >>> 1; // the table uses `op`, but all ignore the last bit

  switch (opEff) {
    case 0b0000: return RD_PC ? I.TST_IMM_T1 : I.AND_IMM_T1;
    case 0b0001: return I.BIC_IMM_T1;
    case 0b0010: return RN_PC ? I.MOV_IMM_T2 : I.ORR_IMM_T1;
    case 0b0011: return RN_PC ? I.MVN_IMM_T1 : I.ORN_IMM_T1;
    case 0b0100: return RD_PC ? I.TEQ_IMM_T1 : I.EOR_IMM_T1;
    case 0b1000: return RD_PC ? I.CMN_IMM_T1 : I.ADD_IMM_T3;
    case 0b1010: return I.ADC_IMM_T1;
    case 0b1011: return I.SBC_IMM_T1;
    case 0b1101: return RD_PC ? I.CMP_IMM_T2 : I.SUB_IMM_T3;
    case 0b1110: return I.RSB_IMM_T2;
    default: return I.UNDEFINED;
  }
}

function idDataProcPlainBinaryImmediate (word: number): INSTRUCTION {
  const op = (word >>> 20) & 0b11111;
  const RN_PC = ((word >>> 16) & 0b1111) === 0b1111;
  const imm5is0 = ((word >>> 12) & 0b111) + ((word >>> 6) & 0b11) > 0;

  switch (op) {
    case 0b00000: return RN_PC ? I.ADR_T3 : I.ADD_IMM_T4;
    case 0b00100: return I.MOV_IMM_T3;
    case 0b01010: return RN_PC ? I.ADR_T2 : I.SUB_IMM_T4;
    case 0b01100: return I.MOVT_T1;
    case 0b10000: return I.SSAT_T1;
    case 0b10010: return imm5is0 ? I.SSAT16_T1 : I.SSAT_T1;
    case 0b10100: return I.SBFX_T1;
    case 0b10110: return RN_PC ? I.BFC_T1 : I.BFI_T1;
    case 0b11000: return I.USAT_T1;
    case 0b11010: return imm5is0 ? I.USAT16_T1 : I.USAT_T1;
    case 0b11100: return I.UBFX_T1;
    default: return I.UNDEFINED;
  }
}

function idMultiplyDiff (word: number): INSTRUCTION {
  if (((word >>> 6) & 0b11) !== 0b00) return I.UNDEFINED;
  const op1 = (word >>> 20) & 0b111;
  const op2 = (word >>> 4) & 0b11;
  if ((op2 & 0b10) > 0 && op1 !== 0b001) return I.UNDEFINED;
  const RA_PC = ((word >>> 12) & 0b1111) === 0b1111;
  const X = ((word >>> 4) & 0b1) === 0b1;
  const W = ((word >>> 5) & 0b1) === 0b1;

  switch (op1) {
    case 0b000: return (op2 === 0b00)
      ? RA_PC
        ? I.MUL_T2
        : I.MLA_T1
      : I.MLS_T1;
    case 0b001: return RA_PC
      ? W
        ? (X ? I.SMULTT_T1 : I.SMULTB_T1)
        : (X ? I.SMULBT_T1 : I.SMULBB_T1)
      : W
        ? (X ? I.SMLATT_T1 : I.SMLATB_T1)
        : (X ? I.SMLABT_T1 : I.SMLABB_T1);
    case 0b010: return RA_PC
      ? (X ? I.SMUADX_T1 : I.SMUAD_T1)
      : (X ? I.SMLADX_T1 : I.SMLAD_T1);
    case 0b011: return RA_PC
      ? (X ? I.SMULWT_T1 : I.SMULWB_T1)
      : (X ? I.SMLAWT_T1 : I.SMLAWB_T1);
    case 0b100: return RA_PC
      ? (X ? I.SMUSDX_T1 : I.SMUSD_T1)
      : (X ? I.SMLSDX_T1 : I.SMLSD_T1);
    case 0b101: return RA_PC
      ? (X ? I.SMMULR_T1 : I.SMMUL_T1)
      : (X ? I.SMMLAR_T1 : I.SMMLA_T1);
    case 0b110: return X ? I.SMMLSR_T1 : I.SMMLS_T1;
    case 0b111:
      if (op2 !== 0b00) return I.UNDEFINED;
      return RA_PC ? I.USADA8 : I.USAD8;
    default: return I.UNDEFINED;
  }
}

function idMiscOperations (word: number): INSTRUCTION {
  if (((word >>> 12) & 0b1111) !== 0b1111) return I.UNDEFINED;
  const op1 = (word >>> 20) & 0b11;
  const op2 = (word >>> 4) & 0b11;

  switch (op1) {
    case 0b00: switch (op2) {
      case 0b00: return I.QADD_T1;
      case 0b01: return I.QDADD_T1;
      case 0b10: return I.QSUB_T1;
      case 0b11: return I.QDSUB_T1;
      default: return I.UNDEFINED;
    }
    case 0b01: switch (op2) {
      case 0b00: return I.REV_T2;
      case 0b01: return I.REV16_T2;
      case 0b10: return I.RBIT_T1;
      case 0b11: return I.REVSH_T2;
      default: return I.UNDEFINED;
    }
    case 0b10: return (op2 === 0) ? I.SEL_T1 : I.UNDEFINED;
    case 0b11: return (op2 === 0) ? I.CLZ_T1 : I.UNDEFINED;
    default: return I.UNDEFINED;
  }
}

function idParallelAddSubSigned (word: number): INSTRUCTION {
  if (((word >>> 12) & 0b1111) !== 0b1111) return I.UNDEFINED;
  const op1 = (word >>> 20) & 0b11;
  const op2 = (word >>> 4) & 0b11;

  switch (op2) {
    case 0b00: switch (op1) {
      case 0b000: return I.SADD8_T1;
      case 0b001: return I.SADD16_T1;
      case 0b010: return I.SASX_T1;
      case 0b100: return I.SSUB8_T1;
      case 0b101: return I.SSUB16_T1;
      case 0b110: return I.SSAX_T1;
      default: return I.UNDEFINED;
    }
    case 0b01: switch (op1) {
      case 0b000: return I.QADD8_T1;
      case 0b001: return I.QADD16_T1;
      case 0b010: return I.QASX_T1;
      case 0b100: return I.QSUB8_T1;
      case 0b101: return I.QSUB16_T1;
      case 0b110: return I.QSAX_T1;
      default: return I.UNDEFINED;
    }
    case 0b10: switch (op1) {
      case 0b000: return I.SHADD8_T1;
      case 0b001: return I.SHADD16_T1;
      case 0b010: return I.SHASX_T1;
      case 0b100: return I.SHSUB8_T1;
      case 0b101: return I.SHSUB16_T1;
      case 0b110: return I.SHSAX_T1;
      default: return I.UNDEFINED;
    }
    default: return I.UNDEFINED;
  }
}

function idParallelAddSubUnsigned (word: number): INSTRUCTION {
  if (((word >>> 12) & 0b1111) !== 0b1111) return I.UNDEFINED;
  const op1 = (word >>> 20) & 0b11;
  const op2 = (word >>> 4) & 0b11;

  switch (op2) {
    case 0b00: switch (op1) {
      case 0b000: return I.UADD8_T1;
      case 0b001: return I.UADD16_T1;
      case 0b010: return I.UASX_T1;
      case 0b100: return I.USUB8_T1;
      case 0b101: return I.USUB16_T1;
      case 0b110: return I.USAX_T1;
      default: return I.UNDEFINED;
    }
    case 0b01: switch (op1) {
      case 0b000: return I.UQADD8_T1;
      case 0b001: return I.UQADD16_T1;
      case 0b010: return I.UQASX_T1;
      case 0b100: return I.UQSUB8_T1;
      case 0b101: return I.UQSUB16_T1;
      case 0b110: return I.UQSAX_T1;
      default: return I.UNDEFINED;
    }
    case 0b10: switch (op1) {
      case 0b000: return I.UHADD8_T1;
      case 0b001: return I.UHADD16_T1;
      case 0b010: return I.UHASX_T1;
      case 0b100: return I.UHSUB8_T1;
      case 0b101: return I.UHSUB16_T1;
      case 0b110: return I.UHSAX_T1;
      default: return I.UNDEFINED;
    }
    default: return I.UNDEFINED;
  }
}

function idDataProcRegister (word: number): INSTRUCTION {
  // 1111 1010 aaaa nnnn 1111 ---- bbbb ----
  if (((word >>> 12) & 0b1111) !== 0b1111) return I.UNDEFINED;

  const op1 = (word >>> 20) & 0b1111;
  const RN_PC = ((word >>> 16) & 0b1111) === 0b1111;
  const op2 = (word >>> 4) & 0b1111;
  const op1StartsWith1 = (op1 & 0b1000) > 0;
  const op2StartsWith1 = (op2 & 0b1000) > 0;

  if (op2StartsWith1) {
    switch (op1) {
      case 0b0000: return RN_PC ? I.SXTH_T2 : I.SXTAH_T1;
      case 0b0001: return RN_PC ? I.UXTH_T2 : I.UXTAH_T1;
      case 0b0010: return RN_PC ? I.SXTB16_T1 : I.SXTAB16_T1;
      case 0b0011: return RN_PC ? I.UXTB16_T1 : I.UXTAB16_T1;
      case 0b0100: return RN_PC ? I.SXTB_T2 : I.SXTAB_T1;
      case 0b0101: return RN_PC ? I.UXTB_T2 : I.UXTAB_T1;
      default: return ((op2 & 0b0100) === 0 && (op1 & 0b1100) === 0b1000)
        ? idMiscOperations(word)
        : I.UNDEFINED;
    }
  }

  if (op1StartsWith1) {
    return ((op2 & 0b0100) > 0)
      ? idParallelAddSubUnsigned(word)
      : idParallelAddSubSigned(word);
  }

  if (op2 !== 0) return I.UNDEFINED;

  switch (op1 >>> 1) {
    case 0b000: return I.LSL_REG_T2;
    case 0b001: return I.LSR_REG_T2;
    case 0b010: return I.ASR_REG_T2;
    case 0b011: return I.ROR_REG_T2;
    default: return I.UNDEFINED;
  }
}

function idLoadWord (word: number): INSTRUCTION {
  const op1 = (word >>> 23) & 0b11;
  const op2 = (word >>> 6) & 0b111111;
  const RN_PC = ((word >>> 16) & 0b1111) === 0b1111;

  if ((op1 & 0b10) > 0) return I.UNDEFINED;

  if (RN_PC) return I.LDR_LIT_T2;

  if (op1 === 0b01) return I.LDR_IMM_T3;

  if (op2 === 0) return I.LDR_REG_T2;

  const op3 = op2 >>> 2;

  if (op3 === 0b1100 || (op3 & 0b1001) === 0b1001) return I.LDR_IMM_T4;

  if (op3 === 0b1110) return I.LDRT_T1;

  return I.UNDEFINED;
}

function idLoadHalfWord (word: number): INSTRUCTION {
  const op1 = (word >>> 23) & 0b11;
  const op2 = (word >>> 6) & 0b111111;
  const RN_PC = ((word >>> 16) & 0b1111) === 0b1111;
  const RT_PC = ((word >>> 12) & 0b1111) === 0b1111;

  if (RN_PC) {
    return RT_PC
      ? ((op1 & 0b10) > 0)
        ? I.UNALLOCATED
        : I.UNPREDICTABLE
      : ((op1 & 0b10) === 0)
        ? I.LDRH_LIT_T1
        : I.LDRSH_LIT_T1;
  }

  if (RT_PC) {
    if ((op1 & 0b01) > 0) return I.UNALLOCATED;

    if (op2 === 0 || (op2 & 0b111100) === 0b1100) {
      return I.UNALLOCATED;
    }

    if ((op2 & 0b100100) === 0b100100 || (op2 & 0b111100) === 0b111000) {
      return I.UNPREDICTABLE;
    }

    return I.UNDEFINED;
  }

  switch (op1) {
    case 0b01: return I.LDRH_IMM_T3;
    case 0b11: return I.LDRSH_IMM_T1;
    case 0b00:
      if (op2 === 0) return I.LDRH_REG_T2;
      if ((op2 & 0b100100) === 0b100100) return I.LDRH_IMM_T3;
      if ((op2 & 0b111100) === 0b110000) return I.LDRH_IMM_T3;
      if ((op2 & 0b111100) === 0b111000) return I.LDRHT_T1;
      return I.UNDEFINED;
    case 0b10:
      if (op2 === 0) return I.LDRSH_REG_T2;
      if ((op2 & 0b100100) === 0b100100) return I.LDRSH_IMM_T2;
      if ((op2 & 0b111100) === 0b110000) return I.LDRSH_IMM_T2;
      if ((op2 & 0b111100) === 0b111000) return I.LDRSHT_T1;
      return I.UNDEFINED;
    default: return I.UNDEFINED;
  }
}

function idLoadByte (word: number): INSTRUCTION {
  const op1 = (word >>> 23) & 0b11;
  const op2 = (word >>> 6) & 0b111111;
  const RN_PC = ((word >>> 16) & 0b1111) === 0b1111;
  const RT_PC = ((word >>> 12) & 0b1111) === 0b1111;

  if (RT_PC) {
    if (RN_PC) {
      switch (op1) {
        case 0b00:
        case 0b01: return I.PLD_LIT_T1;
        case 0b10:
        case 0b11: return I.PLI_IMM_LIT_T3;
        default: return I.UNDEFINED;
      }
    }

    switch (op1) {
      case 0b01: return I.PLD_IMM_T1;
      case 0b11: return I.PLI_IMM_LIT_T1;
      case 0b00:
        if (op2 === 0) return I.PLD_REG_T1;
        if ((op2 & 0b100100) === 0b100100) return I.UNPREDICTABLE;
        if ((op2 & 0b111100) === 0b110000) return I.PLD_IMM_T2;
        if ((op2 & 0b111100) === 0b111000) return I.UNPREDICTABLE;
        return I.UNDEFINED;
      case 0b10:
        if (op2 === 0) return I.PLI_REG_T1;
        if ((op2 & 0b100100) === 0b100100) return I.UNPREDICTABLE;
        if ((op2 & 0b111100) === 0b110000) return I.PLD_IMM_LIT_T2;
        if ((op2 & 0b111100) === 0b111000) return I.UNPREDICTABLE;
        return I.UNDEFINED;
      default: return I.UNDEFINED;
    }
  }

  if (RN_PC) {
    switch (op1) {
      case 0b00:
      case 0b01: return I.LDRB_LIT_T1;
      case 0b10:
      case 0b11: return I.LDRSB_LIT_T1;
      default: return I.UNDEFINED;
    }
  }

  switch (op1) {
    case 0b01: return I.LDRB_IMM_T2;
    case 0b11: return I.LDRSB_IMM_T1;
    case 0b00:
      if (op2 === 0) return I.LDRB_REG_T2;
      if ((op2 & 0b100100) === 0b100100) return I.LDRB_IMM_T3;
      if ((op2 & 0b111100) === 0b110000) return I.LDRB_IMM_T3;
      if ((op2 & 0b111100) === 0b111000) return I.LDRBT_T1;
      return I.UNDEFINED;
    case 0b10:
      if (op2 === 0) return I.LDRSB_REG_T2;
      if ((op2 & 0b100100) === 0b100100) return I.LDRSB_IMM_T2;
      if ((op2 & 0b111100) === 0b110000) return I.LDRSB_IMM_T2;
      if ((op2 & 0b111100) === 0b111000) return I.LDRSBT_T1;
      return I.UNDEFINED;
    default: return I.UNDEFINED;
  }
}

function idStoreSingle (word: number): INSTRUCTION {
  const op1 = (word >>> 21) & 0b111;
  const op2Eff = (word >>> 11) & 0b1;

  switch (op1) {
    case 0b000: return (op2Eff === 0) ? I.STRB_REG_T2 : I.STRB_IMM_T3;
    case 0b001: return (op2Eff === 0) ? I.STRH_REG_T2 : I.STRH_IMM_T3;
    case 0b010: return (op2Eff === 0) ? I.STR_REG_T2 : I.STR_IMM_T4;
    case 0b100: return I.STRB_IMM_T2;
    case 0b101: return I.STRH_IMM_T2;
    case 0b110: return I.STR_IMM_T3;
    default: return I.UNDEFINED;
  }
}

function idLongMultiplyDiff (word: number): INSTRUCTION {
  const op1 = (word >>> 20) & 0b111;
  const op2 = (word >>> 4) & 0b1111;

  switch (op1) {
    case 0b000: return (op2 === 0) ? I.SMULL_T1 : I.UNDEFINED;
    case 0b001: return (op2 === 0b1111) ? I.SDIV_T1 : I.UNDEFINED;
    case 0b010: return (op2 === 0) ? I.UMULL_T1 : I.UNDEFINED;
    case 0b011: return (op2 === 0b1111) ? I.UDIV_T1 : I.UNDEFINED;
    case 0b100:
      if (op2 === 0) return I.SMLAL_T1;
      switch (op2) {
        case 0b1000: return I.SMLALBB_T1;
        case 0b1001: return I.SMLALBT_T1;
        case 0b1010: return I.SMLALTB_T1;
        case 0b1011: return I.SMLALTT_T1;
        case 0b1100: return I.SMALD_T1;
        case 0b1101: return I.SMALDX_T1;
        default: return I.UNDEFINED;
      }
    case 0b101: switch (op2) {
      case 0b1100: return I.SMLSLD_T1;
      case 0b1101: return I.SMLSLDX_T1;
      default: return I.UNDEFINED;
    }
    case 0b110: switch (op2) {
      case 0b0000: return I.UMLAL_T1;
      case 0b0110: return I.UMAAL_T1;
      default: return I.UNDEFINED;
    }
    default: return I.UNDEFINED;
  }
}

export function identifyWideInstruction (word: number, halfWord: boolean = false): INSTRUCTION {
  if (halfWord) {
    // handle when we only have the first half of the command
    return I.INVALID;
  }

  const op1 = (word >>> 27) & 0b11;
  const op2 = (word >>> 20) & 0b1111111;
  const op = (word >>> 15) & 0b1;

  switch (op1) {
    case 0b01:
      if ((op2 & 0b1100100) === 0b0000000) return idLdrStrMultiple(word);
      if ((op2 & 0b1100100) === 0b0000100) return idLdrStrDual(word);
      if ((op2 & 0b1100000) === 0b0100000) return idDataProcessingShifted(word);
      if ((op2 & 0b1000000) === 0b1000000) return idCoprocessorInstr(word);
      return I.UNDEFINED;
    case 0b10:
      if (op) return idBranchesAndMisc(word);
      if (((op2 >>> 5) & 0b1) === 0) {
        return idDataProcModifiedImmediate(word);
      } else {
        return idDataProcPlainBinaryImmediate(word);
      }
    case 0b11:
      if ((op2 & 0b1000000) > 0) return idCoprocessorInstr(word);
      if (((op2 >>> 5) & 0b1) > 0) {
        return (((op2 >>> 4) & 0b1) > 0)
          ? (((op2 >>> 3) & 0b1) === 1)
            ? idLongMultiplyDiff(word)
            : idMultiplyDiff(word)
          : idDataProcRegister(word);
      }
      if ((op2 & 0b1110001) === 0) return idStoreSingle(word);
      switch (op2 & 0b111) {
        case 0b001: return idLoadByte(word);
        case 0b011: return idLoadHalfWord(word);
        case 0b101: return idLoadWord(word);
        default: return I.UNDEFINED;
      }
    default:
      return I.UNDEFINED; // the word is a narrow command
  }
}
