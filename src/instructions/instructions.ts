export enum INSTRUCTION {
  // internal use
  TODO,
  INVALID,

  // instructions
  UNDEFINED,
  UNALLOCATED,
  UNPREDICTABLE,
  LSL_IMM_T1,
  LSR_IMM_T1,
  ASR_IMM_T1,
  ADD_REG_T1,
  SUB_REG_T1,
  ADD_IMM_T1,
  SUB_IMM_T1,
  MOV_IMM_T1,
  CMP_IMM_T1,
  ADD_IMM_T2,
  SUB_IMM_T2,
  AND_REG_T1,
  EOR_REG_T1,
  LSL_REG_T1,
  LSR_REG_T1,
  ASR_REG_T1,
  ADC_REG_T1,
  SBC_REG_T1,
  ROR_REG_T1,
  TST_REG_T1,
  RSB_IMM_T1,
  CMP_REG_T1,
  CMN_REG_T1,
  ORR_REG_T1,
  MUL_REG_T1,
  BIC_REG_T1,
  MVN_REG_T1,
  ADD_REG_T2,
  CMP_REG_T2,
  MOV_REG_T1,
  BLX_REG_T1,
  LDR_LIT_T1,
  STR_REG_T1,
  STRH_REG_T1,
  STRB_REG_T1,
  LDRSB_REG_T1,
  LDR_REG_T1,
  LDRH_REG_T1,
  LDRB_REG_T1,
  LDRSH_REG_T1,
  STR_IMM_T1,
  LDR_IMM_T1,
  STRB_IMM_T1,
  LDRB_IMM_T1,
  STRH_IMM_T1,
  LDRH_IMM_T1,
  STR_IMM_T2,
  LDR_IMM_T2,
  ADR_T1,
  ADD_SP_IMM_T1,
  ADD_SP_IMM_T2,
  SUB_SP_IMM_T1,
  STM_T1,
  LDM_T1,
  B_T2,
  SVC_T1,
  B_T1,
  CDP_T1,
  CDP_T2,
  MCR_T1,
  MCR_T2,
  MRC_T1,
  MRC_T2,
  MRRC_T1,
  MRRC_T2,
  MCRR_T1,
  MCRR_T2,
  LDC_IMM_T1,
  LDC_IMM_T2,
  LDC_LIT_T1,
  LDC_LIT_T2,
  STC_T1,
  STC_T2,
  AND_REG_T2,
  TST_REG_T2,
  BIC_REG_T2,
  ORR_REG_T2,
  ORN_REG_T1,
  MVN_REG_T2,
  EOR_REG_T2,
  TEQ_REG_T1,
  ADD_REG_T3,
  CMN_REG_T2,
  ADC_REG_T2,
  SBC_REG_T2,
  SUB_REG_T2,
  CMP_REG_T3,
  RSB_REG_T1,
  MOV_REG_T3,
  LSL_IMM_T2,
  LSR_IMM_T2,
  ASR_IMM_T2,
  ROR_IMM_T1,
  RRX_T1,
  LDM_T2,
  POP_T2,
  STM_T2,
  LDMDB_T1,
  PUSH_T2,
  STMDB_T1,
  LDRD_LIT_T1,
  LDRD_IMM_T1,
  STREX_T1,
  LDREX_T1,
  STRD_IMM_T1,
  STREXB_T1,
  STREXH_T1,
  TBB_T1,
  TBH_T1,
  LDREXB_T1,
  LDREXH_T1,
  BL_T1,
  B_T3,
  B_T4,
  MSR_T1,
  MRS_T1,
  NOP_T2,
  YIELD_T2,
  WFE_T2,
  WFI_T2,
  SEV_T2,
  DBG_T1,
  CLREX_T1,
  DSB_T1,
  DMB_T1,
  ISB_T1,
  AND_IMM_T1,
  TST_IMM_T1,
  BIC_IMM_T1,
  ORR_IMM_T1,
  MOV_IMM_T2,
  ORN_IMM_T1,
  MVN_IMM_T1,
  EOR_IMM_T1,
  TEQ_IMM_T1,
  ADD_IMM_T3,
  CMN_IMM_T1,
  ADC_IMM_T1,
  SBC_IMM_T1,
  SUB_IMM_T3,
  CMP_IMM_T2,
  RSB_IMM_T2,
  ADD_IMM_T4,
  ADR_T3,
  MOV_IMM_T3,
  SUB_IMM_T4,
  ADR_T2,
  MOVT_T1,
  SSAT_T1,
  SSAT16_T1,
  SBFX_T1,
  BFI_T1,
  BFC_T1,
  USAT_T1,
  USAT16_T1,
  UBFX_T1,
  MLS_T1,
  MUL_T2,
  MLA_T1,
  SMULTT_T1,
  SMULTB_T1,
  SMULBT_T1,
  SMULBB_T1,
  SMLATT_T1,
  SMLATB_T1,
  SMLABT_T1,
  SMLABB_T1,
  SMUADX_T1,
  SMUAD_T1,
  SMLADX_T1,
  SMLAD_T1,
  SMULWT_T1,
  SMULWB_T1,
  SMLAWT_T1,
  SMLAWB_T1,
  SMUSDX_T1,
  SMUSD_T1,
  SMLSDX_T1,
  SMLSD_T1,
  SMMULR_T1,
  SMMUL_T1,
  SMMLAR_T1,
  SMMLA_T1,
  SMMLSR_T1,
  SMMLS_T1,
  USADA8,
  USAD8,
  CBZ_T1,
  PUSH_T1,
  CBNZ_T1,
  REV_T1,
  REV16_T1,
  REVSH_T1,
  POP_T1,
  BKPT_T1,
  SXTH_T1,
  SXTB_T1,
  UXTH_T1,
  UXTB_T1,
  CPS_T1,
  BX_T1,
  PKHBT_T1,
  IT_T1,
  SEV_T1,
  WFI_T1,
  WFE_T1,
  YIELD_T1,
  NOP_T1,
  LSL_REG_T2,
  LSR_REG_T2,
  ASR_REG_T2,
  ROR_REG_T2,
  SXTH_T2,
  SXTAH_T1,
  UXTH_T2,
  UXTAH_T1,
  SXTB16_T1,
  SXTAB16_T1,
  UXTB16_T1,
  UXTAB16_T1,
  SXTB_T2,
  SXTAB_T1,
  UXTB_T2,
  UXTAB_T1,
  QADD_T1,
  QDADD_T1,
  QSUB_T1,
  QDSUB_T1,
  REV_T2,
  REV16_T2,
  RBIT_T1,
  REVSH_T2,
  SEL_T1,
  CLZ_T1,
  SADD8_T1,
  SADD16_T1,
  SASX_T1,
  SSUB8_T1,
  SSUB16_T1,
  SSAX_T1,
  QADD8_T1,
  QADD16_T1,
  QASX_T1,
  QSUB8_T1,
  QSUB16_T1,
  QSAX_T1,
  SHADD8_T1,
  SHADD16_T1,
  SHASX_T1,
  SHSUB8_T1,
  SHSUB16_T1,
  SHSAX_T1,
  UADD8_T1,
  UADD16_T1,
  UASX_T1,
  USUB8_T1,
  USUB16_T1,
  USAX_T1,
  UQADD8_T1,
  UQADD16_T1,
  UQASX_T1,
  UQSUB8_T1,
  UQSUB16_T1,
  UQSAX_T1,
  UHADD8_T1,
  UHADD16_T1,
  UHASX_T1,
  UHSUB8_T1,
  UHSUB16_T1,
  UHSAX_T1,
  LDR_LIT_T2,
  LDR_IMM_T3,
  LDR_REG_T2,
  LDR_IMM_T4,
  LDRT_T1,
  LDRH_LIT_T1,
  LDRSH_LIT_T1,
  LDRH_IMM_T3,
  LDRSH_IMM_T1,
  LDRH_REG_T2,
  LDRHT_T1,
  LDRSH_IMM_T2,
  LDRSH_REG_T2,
  LDRSHT_T1,
  PLD_IMM_LIT_T2,
  LDRB_LIT_T1,
  LDRSB_LIT_T1,
  LDRB_IMM_T2,
  LDRSB_IMM_T1,
  LDRB_REG_T2,
  LDRB_IMM_T3,
  LDRBT_T1,
  LDRSB_REG_T2,
  LDRSB_IMM_T2,
  LDRSBT_T1,
  PLD_LIT_T1,
  PLI_IMM_LIT_T3,
  PLD_IMM_T1,
  PLI_IMM_LIT_T1,
  PLD_REG_T1,
  PLD_IMM_T2,
  PLI_REG_T1,
  STRB_REG_T2,
  STRB_IMM_T3,
  STRH_REG_T2,
  STRH_IMM_T3,
  STR_REG_T2,
  STR_IMM_T4,
  STRB_IMM_T2,
  STRH_IMM_T2,
  STR_IMM_T3,
  SMULL_T1,
  SDIV_T1,
  UMULL_T1,
  UDIV_T1,
  SMLAL_T1,
  SMLALBB_T1,
  SMLALBT_T1,
  SMLALTB_T1,
  SMLALTT_T1,
  SMALD_T1,
  SMALDX_T1,
  SMLSLD_T1,
  SMLSLDX_T1,
  UMLAL_T1,
  UMAAL_T1,
}

enum Bit {
  ZERO = 0,
  ONE = 1,
  SHOULD_ZERO,
  SHOULD_ONE,
  ANY,
}

/**
 * A bare description of valid bits for an
 * encoding. Information like register positions or
 * "if Rd == '1111' SEE <other>" is not stored here.
 */
class BytePattern {
  bits: ReadonlyArray<Bit>;

  bitmask: number;

  bitmaskCheck: number;

  /** if this is a wide instruction */
  wide: boolean;

  constructor (template: string) {
    this.bits = BytePattern.parseTemplate(template);
    this.wide = this.bits.length === 32;

    const { bitmask, bitmaskCheck } = BytePattern.createMasks(this.bits);
    this.bitmask = bitmask;
    this.bitmaskCheck = bitmaskCheck;
  }

  static createMasks (bits: ReadonlyArray<Bit>): { bitmask: number, bitmaskCheck: number } {
    let bitmask = 0;
    let bitmaskCheck = 0;

    for (let i = 0; i < bits.length; i++) {
      const bit = bits[i];
      switch (bit) {
        case Bit.ZERO: bitmask &= 1 << (bits.length - i); break;
        case Bit.ONE:
          bitmask &= 1 << (bits.length - i);
          bitmaskCheck &= 1 << (bits.length - i);
          break;
        default: {}
      }
    }

    return { bitmask, bitmaskCheck };
  }

  /**
   * A template closely matches the existing syntax in the manual
   * E.g., `11101xx01xxx(0)(1)1` - `x` means anything, `(n)` means
   * an `n` is expected, but not required (if not `n`, then it is
   * UNPREDICTABLE).
   */
  static parseTemplate (template: string): Bit[] {
    let shouldMode = false;
    const bits: Bit[] = [];

    for (const token of template) {
      switch (token) {
        case "0": bits.push(shouldMode ? Bit.SHOULD_ZERO : Bit.ZERO); break;
        case "1": bits.push(shouldMode ? Bit.SHOULD_ONE : Bit.ONE); break;
        case "x": bits.push(Bit.ANY); break;
        case "(": shouldMode = true; break;
        case ")": shouldMode = false; break;
        default:
          console.error(`Unexpected token ${token} in template ${template}. Assuming ANY`);
          bits.push(Bit.ANY);
          break;
      }
    }

    if (bits.length === 16 || bits.length === 32) return bits;

    if (bits.length < 16) {
      console.error(`Template ${template} is length ${bits.length}. Padding with ZERO to narrow.`);
      while (bits.length < 16) bits.push(Bit.ZERO);
    } else {
      console.error(`Template ${template} is length ${bits.length}. Padding with ZERO to wide.`);
      while (bits.length < 32) bits.push(Bit.ZERO);
    }
    return bits;
  }

  matches (input: number): boolean {
    return (input & this.bitmask) === this.bitmaskCheck;
  }
}

export class Encoding {
  /** Object representing the required, invalid, optional, etc. bits */
  bytePattern: BytePattern;

  name?: string;

  wide: boolean;

  constructor (bytePattern: string) {
    this.bytePattern = new BytePattern(bytePattern);
    this.wide = this.bytePattern.wide;
  }

  /**
   * @param  input The word or hword to test
   * @return       True if it the input can be interpreted as this instruction
   */
  matches (input: number): boolean {
    return this.bytePattern.matches(input);
  }
}

export function getOptimalSplitBit (encodings: Encoding[], wide: boolean): number {
  const counts: ({high: number, low: number, any: number})[] = [];

  const width = wide ? 32 : 16;

  for (let i = 0; i < width; i++) {
    const count = { high: 0, low: 0, any: 0 };
    for (const encoding of encodings) {
      switch (encoding.bytePattern.bits[i]) {
        case Bit.ZERO: count.low++; break;
        case Bit.ONE: count.high++; break;
        default: count.any++;
      }
    }
    counts.push(count);
  }

  let optimalIndex = 0;
  let optimalScore = Infinity;
  for (let i = 0; i < counts.length; i++) {
    const count = counts[i];
    const score = Math.abs(count.high - count.low) + count.any * 2;
    if (score < optimalScore) {
      optimalIndex = i;
      optimalScore = score;
    }
  }

  return optimalIndex;
}

export function splitEncodingsByOptimalBit (encodings: Encoding[], wide: boolean): {high: Encoding[], low: Encoding[]} {
  const splitIndex = getOptimalSplitBit(encodings, wide);

  const high: Encoding[] = [];
  const low: Encoding[] = [];

  for (const encoding of encodings) {
    switch (encoding.bytePattern.bits[splitIndex]) {
      case Bit.ZERO: low.push(encoding); break;
      case Bit.ONE: high.push(encoding); break;
      default: low.push(encoding); high.push(encoding);
    }
  }

  return { high, low };
}
