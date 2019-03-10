import { INSTRUCTION } from "./instructions";

function CDP (word: number): INSTRUCTION {
  return ((word >>> 28) & 0b1)
    ? INSTRUCTION.CDP_T2
    : INSTRUCTION.CDP_T1;
}

function MCR (word: number): INSTRUCTION {
  return ((word >>> 28) & 0b1)
    ? INSTRUCTION.MCR_T2
    : INSTRUCTION.MCR_T1;
}

function MRC (word: number): INSTRUCTION {
  return ((word >>> 28) & 0b1)
    ? INSTRUCTION.MRC_T2
    : INSTRUCTION.MRC_T1;
}

function MRRC (word: number): INSTRUCTION {
  return ((word >>> 28) & 0b1)
    ? INSTRUCTION.MRRC_T2
    : INSTRUCTION.MRRC_T1;
}

function MCRR (word: number): INSTRUCTION {
  return ((word >>> 28) & 0b1)
    ? INSTRUCTION.MCRR_T2
    : INSTRUCTION.MCRR_T1;
}

function LDC (word: number): INSTRUCTION {
  if (((word >>> 16) & 0b1111) === 0b1111) return LDC_LIT(word);

  return ((word >>> 28) & 0b1)
    ? INSTRUCTION.LDC_IMM_T2
    : INSTRUCTION.LDC_IMM_T1;
}

function LDC_LIT (word: number): INSTRUCTION {
  return ((word >>> 28) & 0b1)
    ? INSTRUCTION.LDC_LIT_T2
    : INSTRUCTION.LDC_LIT_T1;
}

function STC (word: number): INSTRUCTION {
  return ((word >>> 28) & 0b1)
    ? INSTRUCTION.STC_T2
    : INSTRUCTION.STC_T1;
}

function AND_REG_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.AND_REG_T2;
}

function TST_REG_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.TST_REG_T2;
}

function BIC_REG_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.BIC_REG_T2;
}

function ORR_REG_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.ORR_REG_T2;
}

function ORN_REG_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.ORN_REG_T1;
}

function MVN_REG_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.MVN_REG_T2;
}

function EOR_REG_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.EOR_REG_T2;
}

function TEQ_REG_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.TEQ_REG_T1;
}

function PKHBT (_word: number): INSTRUCTION {
  return INSTRUCTION.PKHBT; // TODO: Identify PKHBT vs PKHTB
}

function ADD_REG_T3 (_word: number): INSTRUCTION {
  return INSTRUCTION.ADD_REG_T3;
}

function CMN_REG_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.CMN_REG_T2;
}

function ADC_REG_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.ADC_REG_T2;
}

function SBC_REG_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.SBC_REG_T2;
}

function SUB_REG_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.SUB_REG_T2;
}

function CMP_REG_T3 (_word: number): INSTRUCTION {
  return INSTRUCTION.CMP_REG_T3;
}

function RSB_REG_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.RSB_REG_T1;
}

function MOV_REG_T3 (_word: number): INSTRUCTION {
  return INSTRUCTION.MOV_REG_T3;
}

function LSL_IMM_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.LSL_IMM_T2;
}

function LSR_IMM_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.LSR_IMM_T2;
}

function ASR_IMM_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.ASR_IMM_T2;
}

function RRX_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.RRX_T1;
}

function ROR_IMM_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.ROR_IMM_T1;
}

function LDM_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.LDM_T2;
}

function POP_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.POP_T2;
}

function STM_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.STM_T2;
}

function LDMDB_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.LDMDB_T1;
}

function PUSH_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.PUSH_T2;
}

function STMDB_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.STMDB_T1;
}

function idLDRD (word: number): INSTRUCTION {
  const RN = (word >>> 16) & 0b1111;
  return (RN === 0b1111) ? LDRD_LIT_T1(word) : LDRD_IMM_T1(word);
}

function LDRD_LIT_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.LDRD_LIT_T1;
}

function LDRD_IMM_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.LDRD_IMM_T1;
}

function STREX_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.STREX_T1;
}

function LDREX_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.LDREX_T1;
}

function STRD_IMM_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.STRD_IMM_T1;
}

function STREXB_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.STREXB_T1;
}

function STREXH_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.STREXH_T1;
}

function TBB_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.TBB_T1;
}

function TBH_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.TBH_T1;
}

function LDREXB_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.LDREXB_T1;
}

function LDREXH_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.LDREXH_T1;
}

function BL_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.BL_T1;
}

function B_T4 (_word: number): INSTRUCTION {
  return INSTRUCTION.B_T4;
}

function B_T3 (_word: number): INSTRUCTION {
  return INSTRUCTION.B_T3;
}

function MSR_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.MSR_T1;
}

function MRS_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.MRS_T1;
}

function NOP_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.NOP_T2;
}

function YIELD_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.YIELD_T2;
}

function WFE_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.WFE_T2;
}

function WFI_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.WFI_T2;
}

function SEV_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.SEV_T2;
}

function DBG_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.DBG_T1;
}

function CLREX_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.CLREX_T1;
}

function DSB_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.DSB_T1;
}

function DMB_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.DMB_T1;
}

function ISB_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.ISB_T1;
}

function AND_IMM_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.AND_IMM_T1;
}

function TST_IMM_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.TST_IMM_T1;
}

function BIC_IMM_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.BIC_IMM_T1;
}

function ORR_IMM_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.ORR_IMM_T1;
}

function MOV_IMM_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.MOV_IMM_T2;
}

function ORN_IMM_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.ORN_IMM_T1;
}

function MVN_IMM_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.MVN_IMM_T1;
}

function EOR_IMM_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.EOR_IMM_T1;
}

function TEQ_IMM_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.TEQ_IMM_T1;
}

function ADD_IMM_T3 (_word: number): INSTRUCTION {
  return INSTRUCTION.ADD_IMM_T3;
}

function CMN_IMM_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.CMN_IMM_T1;
}

function ADC_IMM_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.ADC_IMM_T1;
}

function SBC_IMM_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SBC_IMM_T1;
}

function SUB_IMM_T3 (_word: number): INSTRUCTION {
  return INSTRUCTION.SUB_IMM_T3;
}

function CMP_IMM_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.CMP_IMM_T2;
}

function RSB_IMM_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.RSB_IMM_T2;
}

function ADD_IMM_T4 (_word: number): INSTRUCTION {
  return INSTRUCTION.ADD_IMM_T4;
}

function ADR_T3 (_word: number): INSTRUCTION {
  return INSTRUCTION.ADR_T3;
}

function MOV_IMM_T3 (_word: number): INSTRUCTION {
  return INSTRUCTION.MOV_IMM_T3;
}

function SUB_IMM_T4 (_word: number): INSTRUCTION {
  return INSTRUCTION.SUB_IMM_T4;
}

function ADR_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.ADR_T2;
}

function MOVT_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.MOVT_T1;
}

function SSAT_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SSAT_T1;
}

function SSAT16_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SSAT16_T1;
}

function SBFX_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SBFX_T1;
}

function BFI_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.BFI_T1;
}

function BFC_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.BFC_T1;
}

function USAT_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.USAT_T1;
}

function USAT16_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.USAT16_T1;
}

function UBFX_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.UBFX_T1;
}

function MLS_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.MLS_T1;
}

function MUL_T2 (_word: number): INSTRUCTION {
  return INSTRUCTION.MUL_T2;
}

function MLA_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.MLA_T1;
}

function SMULTT_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMULTT_T1;
}

function SMULTB_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMULTB_T1;
}

function SMULBT_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMULBT_T1;
}

function SMULBB_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMULBB_T1;
}

function SMLATT_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMLATT_T1;
}

function SMLATB_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMLATB_T1;
}

function SMLABT_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMLABT_T1;
}

function SMLABB_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMLABB_T1;
}

function SMUADX_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMUADX_T1;
}

function SMUAD_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMUAD_T1;
}

function SMLADX_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMLADX_T1;
}

function SMLAD_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMLAD_T1;
}

function SMULWT_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMULWT_T1;
}

function SMULWB_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMULWB_T1;
}

function SMLAWT_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMLAWT_T1;
}

function SMLAWB_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMLAWB_T1;
}

function SMUSDX_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMUSDX_T1;
}

function SMUSD_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMUSD_T1;
}

function SMLSDX_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMLSDX_T1;
}

function SMLSD_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMLSD_T1;
}

function SMMULR_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMMULR_T1;
}

function SMMUL_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMMUL_T1;
}

function SMMLAR_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMMLAR_T1;
}

function SMMLA_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMMLA_T1;
}

function SMMLSR_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMMLSR_T1;
}

function SMMLS_T1 (_word: number): INSTRUCTION {
  return INSTRUCTION.SMMLS_T1;
}

function USADA8 (_word: number): INSTRUCTION {
  return INSTRUCTION.USADA8;
}

function USAD8 (_word: number): INSTRUCTION {
  return INSTRUCTION.USAD8;
}

function idCoprocessorInstr (word: number): INSTRUCTION {
  const op1 = (word >>> 20) & 0b111111;
  const op = (word >>> 4) & 0b1;

  if (((op1 >>> 4) & 0b11) === 0b10) {
    if (op === 0) return CDP(word);
    return ((op1 & 0b1) === 0b1)
      ? MCR(word)
      : MRC(word);
  }

  if ((op1 | 0b000101) === 0b000101) {
    return ((op1 & 0b100) === 0b100)
      ? ((op1 & 0b1) === 0b1)
        ? MRRC(word)
        : MCRR(word)
      : INSTRUCTION.UNDEFINED;
  }

  if ((op1 >>> 5) === 0b0) {
    return ((op1 & 0b1) === 0b1)
      ? LDC(word)
      : STC(word);
  }

  return INSTRUCTION.UNDEFINED;
}

function idMoveAndImmShift (word: number): INSTRUCTION {
  const type = (word >>> 4) & 0b11;
  const imm2 = (word >>> 6) & 0b11;
  const imm3 = (word >>> 12) & 0b111;
  const immIs0 = (imm2 + imm3) === 0;

  switch (type) {
    case 0b00: return immIs0 ? MOV_REG_T3(word) : LSL_IMM_T2(word);
    case 0b01: return LSR_IMM_T2(word);
    case 0b10: return ASR_IMM_T2(word);
    case 0b11: return immIs0 ? RRX_T1(word) : ROR_IMM_T1(word);
    default: return INSTRUCTION.UNDEFINED;
  }
}

function idDataProcessingShifted (word: number): INSTRUCTION {
  const op = (word >>> 21) & 0b1111;
  const RN_PC = ((word >>> 16) & 0b1111) === 0b1111;
  const RD_PC = ((word >>>  8) & 0b1111) === 0b1111;
  const S  = (word >>> 20) & 0b1;

  switch (op) {
    case 0b0000: return RD_PC ? (S ? TST_REG_T2(word) : INSTRUCTION.UNPREDICTABLE) : AND_REG_T2(word);
    case 0b0001: return BIC_REG_T2(word);
    case 0b0010: return RN_PC ? idMoveAndImmShift(word) : ORR_REG_T2(word);
    case 0b0011: return RN_PC ? MVN_REG_T2(word) : ORN_REG_T1(word);
    case 0b0100: return RD_PC ? (S ? TEQ_REG_T1(word) : INSTRUCTION.UNPREDICTABLE) : EOR_REG_T2(word);
    case 0b0110: return PKHBT(word);
    case 0b1000: return RD_PC ? (S ? CMN_REG_T2(word) : INSTRUCTION.UNPREDICTABLE) : ADD_REG_T3(word);
    case 0b1010: return ADC_REG_T2(word);
    case 0b1011: return SBC_REG_T2(word);
    case 0b1101: return RD_PC ? (S ? CMP_REG_T3(word) : INSTRUCTION.UNPREDICTABLE) : SUB_REG_T2(word);
    case 0b1110: return RSB_REG_T1(word);
    default: return INSTRUCTION.UNDEFINED;
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
      ? STM_T2(word)
      : cond
        ? POP_T2(word)
        : LDM_T2(word);
    case 0b10: return L
      ? LDMDB_T1(word)
      : cond
        ? PUSH_T2(word)
        : STMDB_T1(word);
    default: return INSTRUCTION.UNDEFINED;
  }
}

function idLdrStrDual (word: number): INSTRUCTION {
  const op1 = (word >>> 23) & 0b11;
  const op2 = (word >>> 20) & 0b11;
  const op3 = (word >>> 4) & 0b1111;

  switch (op1) {
    case 0b00: switch (op2) {
        case 0b00: return STREX_T1(word);
        case 0b01: return LDREX_T1(word);
        case 0b10: return STRD_IMM_T1(word);
        case 0b11: return idLDRD(word);
        default: return INSTRUCTION.UNDEFINED;
      }
    case 0b01: switch (op2) {
        case 0b00: switch (op3) {
            case 0b0100: return STREXB_T1(word);
            case 0b0101: return STREXH_T1(word);
            default: return INSTRUCTION.UNDEFINED;
          }
        case 0b01: switch (op3) {
            case 0b0000: return TBB_T1(word);
            case 0b0001: return TBH_T1(word);
            case 0b0100: return LDREXB_T1(word);
            case 0b0101: return LDREXH_T1(word);
            default: return INSTRUCTION.UNDEFINED;
          }
        case 0b10: return STRD_IMM_T1(word);
        case 0b11: return idLDRD(word);
        default: return INSTRUCTION.UNDEFINED;
      }
    default: return (op2 % 2 === 0) ? STRD_IMM_T1(word) : idLDRD(word);
  }
}

function idHint (word: number): INSTRUCTION {
  const op1 = (word >>> 8) & 0b111;
  const op2 = word & 0b11111111;
  if (op1 !== 0b000) return INSTRUCTION.UNDEFINED;

  switch (op2) {
    case 0b00000000: return NOP_T2(word);
    case 0b00000001: return YIELD_T2(word);
    case 0b00000010: return WFE_T2(word);
    case 0b00000011: return WFI_T2(word);
    case 0b00000100: return SEV_T2(word);
    default:
      return ((op2 & 0b11110000) === 0b11110000)
        ? DBG_T1(word)
        : INSTRUCTION.UNDEFINED;
  }
}

function idMiscControl (word: number): INSTRUCTION {
  const op = (word >>> 4) & 0b1111;
  switch (op) {
    case 0b0010: return CLREX_T1(word);
    case 0b0100: return DSB_T1(word);
    case 0b0101: return DMB_T1(word);
    case 0b0110: return ISB_T1(word);
    default: return INSTRUCTION.UNDEFINED;
  }
}

function idBranchesAndMisc (word: number): INSTRUCTION {
  const op1 = (word >>> 12) & 0b111;
  const op = (word >>> 20) & 0b1111111;

  if (op1 === 0b010 && op === 0b1111111) return INSTRUCTION.UNDEFINED;

  switch (op1 & 0b101) {
    case 0b101: return BL_T1(word);
    case 0b001: return B_T4(word);
    case 0b000:
    case 0b010:
      if (((op >>> 3) & 0b111) !== 0b111) return B_T3(word);
      switch (op) {
        case 0b0111000:
        case 0b0111001: return MSR_T1(word);
        case 0b0111010: return idHint(word);
        case 0b0111011: return idMiscControl(word);
        case 0b0111110:
        case 0b0111111: return MRS_T1(word);
        default: return INSTRUCTION.UNDEFINED;
      }
    default: return INSTRUCTION.UNDEFINED;
  }
}

function idDataProcModifiedImmediate (word: number): INSTRUCTION {
  const op = (word >>> 20) & 0b11111;
  const RN_PC = ((word >>> 16) & 0b1111) === 0b1111;
  const RD_PC = ((word >>>  8) & 0b1111) === 0b1111;

  const opEff = op >>> 1; // the table uses `op`, but all ignore the last bit

  switch (opEff) {
    case 0b0000: return RD_PC ? TST_IMM_T1(word) : AND_IMM_T1(word);
    case 0b0001: return BIC_IMM_T1(word);
    case 0b0010: return RN_PC ? MOV_IMM_T2(word) : ORR_IMM_T1(word);
    case 0b0011: return RN_PC ? MVN_IMM_T1(word) : ORN_IMM_T1(word);
    case 0b0100: return RD_PC ? TEQ_IMM_T1(word) : EOR_IMM_T1(word);
    case 0b1000: return RD_PC ? CMN_IMM_T1(word) : ADD_IMM_T3(word);
    case 0b1010: return ADC_IMM_T1(word);
    case 0b1011: return SBC_IMM_T1(word);
    case 0b1101: return RD_PC ? CMP_IMM_T2(word) : SUB_IMM_T3(word);
    case 0b1110: return RSB_IMM_T2(word);
    default: return INSTRUCTION.UNDEFINED;
  }
}

function idDataProcPlainBinaryImmediate (word: number): INSTRUCTION {
  const op = (word >>> 20) & 0b11111;
  const RN_PC = ((word >>> 16) & 0b1111) === 0b1111;
  const imm5is0 = ((word >>> 12) & 0b111) + ((word >>> 6) & 0b11) > 0;

  switch (op) {
    case 0b00000: return RN_PC ? ADR_T3(word) : ADD_IMM_T4(word);
    case 0b00100: return MOV_IMM_T3(word);
    case 0b01010: return RN_PC ? ADR_T2(word) : SUB_IMM_T4(word);
    case 0b01100: return MOVT_T1(word);
    case 0b10000: return SSAT_T1(word);
    case 0b10010: return imm5is0 ? SSAT16_T1(word) : SSAT_T1(word);
    case 0b10100: return SBFX_T1(word);
    case 0b10110: return RN_PC ? BFC_T1(word) : BFI_T1(word);
    case 0b11000: return USAT_T1(word);
    case 0b11010: return imm5is0 ? USAT16_T1(word) : USAT_T1(word);
    case 0b11100: return UBFX_T1(word);
    default: return INSTRUCTION.UNDEFINED;
  }
}

function idMultiplyDiff (word: number): INSTRUCTION {
  if (((word >>> 6) & 0b11) !== 0b00) return INSTRUCTION.UNDEFINED;
  const op1 = (word >>> 20) & 0b111;
  const op2 = (word >>> 4) & 0b11;
  if ((op2 & 0b10) > 0 && op1 !== 0b001) return INSTRUCTION.UNDEFINED;
  const RA_PC = ((word >>> 12) & 0b1111) === 0b1111;
  const X = ((word >>> 4) & 0b1) === 0b1;
  const W = ((word >>> 5) & 0b1) === 0b1;

  switch (op1) {
    case 0b000: return (op2 === 0b00)
      ? RA_PC
        ? MUL_T2(word)
        : MLA_T1(word)
      : MLS_T1(word);
    case 0b001: return RA_PC
      ? W
        ? (X ? SMULTT_T1(word) : SMULTB_T1(word))
        : (X ? SMULBT_T1(word) : SMULBB_T1(word))
      : W
        ? (X ? SMLATT_T1(word) : SMLATB_T1(word))
        : (X ? SMLABT_T1(word) : SMLABB_T1(word));
    case 0b010: return RA_PC
      ? (X ? SMUADX_T1(word) : SMUAD_T1(word))
      : (X ? SMLADX_T1(word) : SMLAD_T1(word));
    case 0b011: return RA_PC
      ? (X ? SMULWT_T1(word) : SMULWB_T1(word))
      : (X ? SMLAWT_T1(word) : SMLAWB_T1(word));
    case 0b100: return RA_PC
      ? (X ? SMUSDX_T1(word) : SMUSD_T1(word))
      : (X ? SMLSDX_T1(word) : SMLSD_T1(word));
    case 0b101: return RA_PC
      ? (X ? SMMULR_T1(word) : SMMUL_T1(word))
      : (X ? SMMLAR_T1(word) : SMMLA_T1(word));
    case 0b110: return X ? SMMLSR_T1(word) : SMMLS_T1(word);
    case 0b111:
      if (op2 !== 0b00) return INSTRUCTION.UNDEFINED;
      return RA_PC ? USADA8(word) : USAD8(word);
    default: return INSTRUCTION.UNDEFINED;
  }
}

function idDataProcRegistry (_word: number): INSTRUCTION {
  return INSTRUCTION.TODO;
}

function idLoadWord (_word: number): INSTRUCTION {
  return INSTRUCTION.TODO;
}

function idLoadHalfWord (_word: number): INSTRUCTION {
  return INSTRUCTION.TODO;
}

function idLoadByte (_word: number): INSTRUCTION {
  return INSTRUCTION.TODO;
}

function idStoreSingle (_word: number): INSTRUCTION {
  return INSTRUCTION.TODO;
}

function idLongMultiplyDiff (_word: number): INSTRUCTION {
  return INSTRUCTION.TODO;
}

export function identifyWideInstruction (word: number, halfWord: boolean = false): INSTRUCTION {
  if (halfWord) {
    // handle when we only have the first half of the command
    return INSTRUCTION.UNDEFINED;
  }

  const op1 = (word >>> 27) & 0b11;
  const op2 = (word >>> 20) & 0b1111111;
  const op = (word >>> 15) & 0b1;

  switch (op1) {
    case 0b01:
      if (((op2 >>> 6) & 0b1) > 0) return idCoprocessorInstr(word);
      if (((op2 >>> 5) & 0b1) > 0) return idDataProcessingShifted(word);
      if (((op2 >>> 3) & 0b1) > 0) {
        return idLdrStrMultiple(word);
      } else {
        return idLdrStrDual(word);
      }
    case 0b10:
      if (op) return idBranchesAndMisc(word);
      if (((op2 >>> 5) & 0b1) === 0b0) {
        return idDataProcModifiedImmediate(word);
      } else {
        return idDataProcPlainBinaryImmediate(word);
      }
    case 0b11:
      if (((op2 >>> 6) & 0b1) > 0) return idCoprocessorInstr(word);
      if (((op2 >>> 5) & 0b1) > 0) {
        return (((op2 >>> 4) & 0b1) > 0)
          ? (((op2 >>> 3) & 0b1) === 1)
            ? idLongMultiplyDiff(word)
            : idMultiplyDiff(word)
          : idDataProcRegistry(word);
      }
      if ((op2 & 0b1110001) === 0) return idStoreSingle(word);
      switch (op2 & 0b111) {
        case 0b001: return idLoadByte(word);
        case 0b011: return idLoadHalfWord(word);
        case 0b101: return idLoadWord(word);
        default: break;
      }
      return INSTRUCTION.UNDEFINED;
    default:
      return INSTRUCTION.UNDEFINED; // the word is a narrow command
  }
}
