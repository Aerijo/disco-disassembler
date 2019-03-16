import { EncodingDefinition, Duplicate, KeywordMap } from "../src/instructions/generate";

export const encodings: EncodingDefinition = {
  ADC_IMM_T1: {
    pattern: "11110 [i] 0 1010 [S] [Rn:4] 0 [imm3] [Rd:4] [imm8]",
    page: 185,
  },
  ADC_REG_T1: {
    pattern: "010000 0101 [Rm:3] [Rdn:3]",
  },
  ADC_REG_T2: {
    pattern: "11101 01 1010 [S] [Rn:4] (0) [imm3] [Rd:4] [imm2] [type] [Rm:4]",
  },
  ADD_IMM_T1: {
    pattern: "000 11 1 0 [imm3] [Rn:3] [Rd:3]",
  },
  ADD_IMM_T2: {
    pattern: "001 10 [Rdn:3] [imm8]",
  },
  ADD_IMM_T3: {
    pattern: "11110 [i] 0 1000 [S] [Rn:4] 0 [imm3] [Rd:4] [imm8]",
  },
  ADD_IMM_T4: {
    pattern: "11110 [i] 1 0000  0  [Rn:4] 0 [imm3] [Rd:4] [imm8]",
  },
  ADD_REG_T1: {
    pattern: "000 11 0 0 [Rm:3] [Rn:3] [Rd:3]",
  },
  ADD_REG_T2: {
    pattern: "010001 00 [DN:1] [Rm:4] [Rdn:3]",
  },
  ADD_REG_T3: {
    pattern: "11101 01 1000 [S] [Rn:4] (0) [imm3] [Rd:4] [imm2] [type] [Rm:4]",
  },
  ADD_SPI_T1: {
    pattern: "1010 1 [Rd:3] [imm8]",
  },
  ADD_SPI_T2: {
    pattern: "1011 0000 0 [imm7]",
  },
  ADD_SPI_T3: {
    pattern: "11110 [i] 0 1000 [S] 1101 0 [imm3] [Rd:4] [imm8]",
  },
  ADD_SPI_T4: {
    pattern: "11110 [i] 1 0000 0 1101 0 [imm3] [Rd:4] [imm8]",
  },
  ADD_SPR_T1: {
    pattern: "01000100 [DM:1] 1101 [Rdm:3]",
  },
  ADD_SPR_T2: {
    pattern: "01000100 1 [Rm:4] 101",
  },
  ADD_SPR_T3: {
    pattern: "11101011000 [S] 1101 0 [imm3] [Rd:4] [imm2] [type] [Rm:4]",
  },
  ADR_T1: {
    pattern: "1010 0 [Rd:3] [imm8]",
  },
  ADR_T2: {
    pattern: "11110 [i] 10101 0 1111 0 [imm3] [Rd:4] [imm8]",
  },
  ADR_T3: {
    pattern: "11110 [i] 10000 0 1111 0 [imm3] [Rd:4] [imm8]",
  },
  AND_IMM_T1: {
    pattern: "11110 [i] 0 0000 [S] [Rn:4] 0 [imm3] [Rd:4] [imm8]",
  },
  AND_REG_T1: {
    pattern: "010000 0000 [Rm:3] [Rdn:3]",
  },
  AND_REG_T2: {
    pattern: "11101 01 0000 [S] [Rn:4] (0) [imm3] [Rd:4] [imm2] [type] [Rm:4]",
  },
  ASR_IMM_T1: {
    pattern: "000 10 [imm5] [Rm:3] [Rd:3]",
  },
  ASR_IMM_T2: {
    pattern: "11101 01 0010 [S] 1111 (0) [imm3] [Rd:4] [imm2] 10 [Rm:4]",
  },
  ASR_REG_T1: {
    pattern: "010000 0100 [Rm:3] [Rdn:3]",
  },
  ASR_REG_T2: {
    pattern: "11111 010 0 10 [S] [Rn:4] 1111 [Rd:4] 0 000 [Rm:4]",
  },
  B_T1: {
    pattern: "1101 [cond:4] [imm8]",
  },
  B_T2: {
    pattern: "11100 [imm11]",
  },
  B_T3: {
    pattern: "11110 [S] [cond:4] [imm6] 10 [J1:1] 0 [J2:1] [imm11]",
  },
  B_T4: {
    pattern: "11110 [S] [imm10] 10 [J1:1] 1 [J2:1] [imm11]",
  },
  BFC_T1: {
    pattern: "11110 (0) 11 011 0 1111 0 [imm3] [Rd:4] [imm2] (0) [msb:5]",
  },
  BFI_T1: {
    pattern: "11110 (0) 11 011 0 [Rn:4] 0 [imm3] [Rd:4] [imm2] (0) [msb:5]",
    page: 210,
  },
  BIC_IMM_T1: {
    pattern: "11110 [i] 0 0001 [S] [Rn:4] 0 [imm3] [Rd:4] [imm8]",
    page: 211,
  },
  BIC_REG_T1: {
    pattern: "010000 1110 [Rm:3] [Rdn:3]",
  },
  BIC_REG_T2: {
    pattern: "11101 01 0001 [S] [Rn:4] (0) [imm3] [Rd:4] [imm2] [type] [Rm:4]",
  },
  BKPT_T1: {
    pattern: "1011 1110 [imm8]",
  },
  BL_T1: {
    pattern: "11110 [S] [imm10] 11 [J1:1] 1 [J2:1] [imm11]",
    page: 216,
  },
  BLX_REG_T1: {
    pattern: "010001 11 1 [Rm:4] (000)",
    page: 217,
  },
  BX_T1: {
    pattern: "010001 11 0 [Rm:4] (000)",
    page: 218,
  },
  CBZ_T1: {
    pattern: "1011 0 0 [i] 1 [imm5] [Rn:3]",
    page: 219,
  },
  CBNZ_T1: {
    pattern: "1011 1 0 [i] 1 [imm5] [Rn:3]", // shares diagram with CBZ
    page: 219,
  },
  CDP_T1: {
    pattern: "1110 1110 [opc1:4] [CRn:4] [CRd:4] [coproc:4] [opc2:3] 0 [CRm:4]",
  },
  CDP2_T2: {
    pattern: "1111 1110 [opc1:4] [CRn:4] [CRd:4] [coproc:4] [opc2:3] 0 [CRm:4]",
  },
  CLREX_T1: {
    pattern: "11110 0 111 01 1 (1111) 10 (0) 0 (1111) 0010 (1111)",
  },
  CLZ_T1: {
    pattern: "11111 010 1 011 [Rm:4] 1111 [Rd:4] 1 000 [Rm:4]",
    duplicateVariables: Duplicate.MATCH,
    page: 224,
  },
  CMN_IMM_T1: {
    pattern: "11110 [i] 0 1000 1 [Rn:4] 0 [imm3] 1111 [imm8]",
    page: 225,
  },
  CMN_REG_T1: {
    pattern: "010000 1011 [Rm:3] [Rn:3]",
  },
  CMN_REG_T2: {
    pattern: "11101 01 1000 1 [Rn:4] (0) [imm3] 1111 [imm2] [type] [Rm:4]",
  },
  CMP_IMM_T1: {
    pattern: "001 01 [Rn:3] [imm8]",
  },
  CMP_IMM_T2: {
    pattern: "11110 [i] 0 1101 1 [Rn:4] 0 [imm3] 1111 [imm8]",
  },
  CMP_REG_T1: {
    pattern: "010000 1010 [Rm:3] [Rn:3]",
  },
  CMP_REG_T2: {
    pattern: "010001 01 [N] [Rm:4] [Rn:3]",
  },
  CMP_REG_T3: {
    pattern: "11101 01 1101 1 [Rn:4] (0) [imm3] 1111 [imm2] [type] [Rm:4]",
  },
  CPS_T1: {
    pattern: "1011 0110 011 [im:1] (0) (0) [I:1] [F:1]",
  },
  // NOTE: CPY is alias for MOV
  DBG_T1: {
    pattern: "11110 0 111 01 0 (1111) 10 (0) 0 (0) 000 1111 [option:4]",
    page: 234,
  },
  DMB_T1: {
    pattern: "11110 0 111 01 1 (1111) 10 (0) 0 (1111) 0101 [option:4]",
    page: 235,
  },
  DSB_T1: {
    pattern: "11110 0 111 01 1 (1111) 10 (0) 0 (1111) 0100 [option:4]",
  },
  EOR_IMM_T1: {
    pattern: "11110 [i] 0 0100 [S] [Rn:4] 0 [imm3] [Rd:4] [imm8]",
    page: 238,
  },
  EOR_REG_T1: {
    pattern: "010000 0001 [Rm:3] [Rdn:3]",
    page: 239,
  },
  EOR_REG_T2: {
    pattern: "11101 01 0100 [S] [Rn:4] (0) [imm3] [Rd:4] [imm2] [type] [Rm:4]",
  },
  ISB_T1: {
    pattern: "11110 0 111 01 1 (1111) 10 (0) 0 (1111) 0110 [option:4]",
  },
  IT_T1: {
    pattern: "1011 1111 [firstcond:4] [mask:4]",
    page: 242,
  },
  LDC_IMM_T1: {
    pattern: "1110 110 [P] [U] [D:1] [W] 1 [Rn:4] [CRd:4] [coproc:4] [imm8]",
  },
  LDC2_IMM_T2: {
    pattern: "1111 110 [P] [U] [D:1] [W] 1 [Rn:4] [CRd:4] [coproc:4] [imm8]",
  },
  LDC_LIT_T1: {
    pattern: "1110 110 [P] [U] [D:1] [W] 1 1111 [CRd:4] [coproc:4] [imm8]",
  },
  LDC2_LIT_T2: {
    pattern: "1111 110 [P] [U] [D:1] [W] 1 1111 [CRd:4] [coproc:4] [imm8]",
  },
  LDM_T1: {
    pattern: "1100 1 [Rn:3] [register_list:8]",
  },
  LDM_T2: { // NOTE: also cover pseudo instructions LDMIA, LDMFD
    pattern: "11101 00 010 [W] 1 [Rn:4] [P] [M:1] (0) [register_list:13]",
  },
  LDMDB_T1: { // NOTE: also cover pseudo instruction LDMEA
    pattern: "11101 00 100 [W] 1 [Rn:4] [P] [M:1] (0) [register_list:13]",
  },
  LDR_IMM_T1: {
    pattern: "011 0 1 [imm5] [Rn:3] [Rt:3]",
  },
  LDR_IMM_T2: {
    pattern: "1001 1 [Rt:3] [imm8]",
  },
  LDR_IMM_T3: {
    pattern: "11111 00 0 1 10 1 [Rn:4] [Rt:4] [imm12]",
  },
  LDR_IMM_T4: {
    pattern: "11111 00 0 0 10 1 [Rn:4] [Rt:4] 1 [P] [U] [W] [imm8]",
  },
  LDR_LIT_T1: {
    pattern: "01001 [Rt:3] [imm8]",
  },
  LDR_LIT_T2: {
    pattern: "11111 00 0 [U] 10 1 1111 [Rt:4] [imm12]",
  },
  LDR_REG_T1: {
    pattern: "0101 100 [Rm:3] [Rn:3] [Rt:3]",
  },
  LDR_REG_T2: {
    pattern: "11111 00 0 0 10 1 [Rn:4] [Rt:4] 0 00000 [imm2] [Rm:4]",
  },
  LDRB_IMM_T1: {
    pattern: "011 1 1 [imm5] [Rn:3] [Rt:3]",
  },
  LDRB_IMM_T2: {
    pattern: "11111 00 0 1 00 1 [Rn:4] [Rt:4] [imm12]",
  },
  LDRB_IMM_T3: {
    pattern: "11111 00 0 0 00 1 [Rn:4] [Rt:4] 1 [P] [U] [W] [imm8]",
  },
  LDRB_LIT_T1: {
    pattern: "11111 00 0 [U] 00 1 1111 [Rt:4] [imm12]",
  },
  LDRB_REG_T1: {
    pattern: "0101 110 [Rm:3] [Rn:3] [Rt:3]",
  },
  LDRB_REG_T2: {
    pattern: "11111 00 0 0 00 1 [Rn:4] [Rt:4] 0 00000 [imm2] [Rm:4]",
  },
  LDRBT_T1: {
    pattern: "11111 00 0 0 00 1 [Rn:4] [Rt:4] 1 110 [imm8]",
  },
  LDRD_IMM_T1: {
    pattern: "11101 00 [P] [U] 1 [W] 1 [Rn:4] [Rt:4] [Rt2:4] [imm8]",
  },
  LDRD_LIT_T1: {
    pattern: "11101 00 [P] [U] 1 [W] 1 1111 [Rt:4] [Rt2:4] [imm8]",
  },
  LDREX_T1: {
    pattern: "11101 00 0 0 1 0 1 [Rn:4] [Rt:4] (1111) [imm8]",
  },
  LDREXB_T1: {
    pattern: "11101 000110 1 [Rn:4] [Rt:4] (1111) 0100 (1111)",
    page: 271,
  },
  LDREXH_T1: {
    pattern: "11101 000110 1 [Rn:4] [Rt:4] (1111) 0101 (1111)",
    page: 272,
  },
  LDRH_IMM_T1: {
    pattern: "1000 1 [imm5] [Rn:3] [Rt:3]",
  },
  LDRH_IMM_T2: {
    pattern: "11111 00 0 1 01 1 [Rn:4] [Rt:4] [imm12]",
  },
  LDRH_IMM_T3: {
    pattern: "11111 00 0 0 01 1 [Rn:4] [Rt:4] 1 [P] [U] [W] [imm8]",
  },
  LDRH_LIT_T1: {
    pattern: "11111 00 0 [U] 01 1 1111 [Rt:4] [imm12]",
  },
  LDRH_REG_T1: {
    pattern: "0101 101 [Rm:3] [Rn:3] [Rt:3]",
  },
  LDRH_REG_T2: {
    pattern: "11111 00 0 0 01 1 [Rn:4] [Rt:4] 0 00000 [imm2] [Rm:4]",
  },
  LDRHT_T1: {
    pattern: "11111 00 0 0 01 1 [Rn:4] [Rt:4] 1 110 [imm8]",
  },
  LDRSB_IMM_T1: {
    pattern: "11111 00 1 1 00 1 [Rn:4] [Rt:4] [imm12]",
  },
  LDRSB_IMM_T2: {
    pattern: "11111 00 1 0 00 1 [Rn:4] [Rt:4] 1 [P] [U] [W] [imm8]",
  },
  LDRSB_LIT_T1: {
    pattern: "11111 00 1 [U] 00 1 1111 [Rt:4] [imm12]",
  },
  LDRSB_REG_T1: {
    pattern: "0101 011 [Rm:3] [Rn:3] [Rt:3]",
  },
  LDRSB_REG_T2: {
    pattern: "11111 00 1 0 00 1 [Rn:4] [Rt:4] 0 00000 [imm2] [Rm:4]",
  },
  LDRSBT_T1: {
    pattern: "11111 00 1 0 00 1 [Rn:4] [Rt:4] 1 110 [imm8]",
  },
  LDRSH_IMM_T1: {
    pattern: "11111 00 1 1 01 1 [Rn:4] [Rt:4] [imm12]",
  },
  LDRSH_IMM_T2: {
    pattern: "11111 00 1 0 01 1 [Rn:4] [Rt:4] 1 [P] [U] [W] [imm8]",
  },
  LDRSH_LIT_T1: {
    pattern: "11111 00 1 [U] 01 1 1111 [Rt:4] [imm12]",
  },
  LDRSH_REG_T1: {
    pattern: "0101 111 [Rm:3] [Rn:3] [Rt:3]",
  },
  LDRSH_REG_T2: {
    pattern: "11111 00 1 0 01 1 [Rn:4] [Rt:4] 0 00000 [imm2] [Rm:4]",
  },
  LDRSHT_T1: {
    pattern: "11111 00 1 0 01 1 [Rn:4] [Rt:4] 1 110 [imm8]",
  },
  LDRT_T1: {
    pattern: "11111 00 0 0 10 1 [Rn:4] [Rt:4] 1 110 [imm8]",
    page: 297,
  },
  LSL_IMM_T1: {
    pattern: "000 00 [imm5] [Rm:3] [Rd:3]",
    page: 298,
  },
  LSL_IMM_T2: {
    pattern: "11101 01 0010 [S] 1111 (0) [imm3] [Rd:4] [imm2] 00 [Rm:4]",
  },
  LSL_REG_T1: {
    pattern: "010000 0010 [Rm:3] [Rdn:3]",
  },
  LSL_REG_T2: {
    pattern: "11111 010 0 00 [S] [Rn:4] 1111 [Rd:4] 0 000 [Rm:4]",
  },
  LSR_IMM_T1: {
    pattern: "000 01 [imm5] [Rm:3] [Rd:3]",
  },
  LSR_IMM_T2: {
    pattern: "11101 01 0010 [S] 1111 (0) [imm3] [Rd:4] [imm2] 01 [Rm:4]",
  },
  LSR_REG_T1: {
    pattern: "010000 0011 [Rm:3] [Rdn:3]",
  },
  LSR_REG_T2: {
    pattern: "11111 010 0 01 [S] [Rn:4] 1111 [Rd:4] 0 000 [Rm:4]",
  },
  MCR_T1: {
    pattern: "1110 1110 [opc1:3] 0 [CRn:4] [Rt:4] [coproc:4] [opc2:3] 1 [CRm:4]",
  },
  MCR2_T2: {
    pattern: "1111 1110 [opc1:3] 0 [CRn:4] [Rt:4] [coproc:4] [opc2:3] 1 [CRm:4]",
  },
  MCRR_T1: {
    pattern: "1110 110 0 0 1 0 0 [Rt2:4] [Rt:4] [coproc:4] [opc1:4] [CRm:4]",
  },
  MCRR2_T2: {
    pattern: "1111 110 0 0 1 0 0 [Rt2:4] [Rt:4] [coproc:4] [opc1:4] [CRm:4]",
  },
  MLA_T1: {
    pattern: "11111 0110 000 [Rn:4] [Rs:4] [Rd:4] 0000 [Rm:4]",
  },
  MLS_T1: {
    pattern: "11111 0110 000 [Rn:4] [Ra:4] [Rd:4] 0001 [Rm:4]",
    page: 311,
  },
  MOV_IMM_T1: {
    pattern: "001 00 [Rd:3] [imm8]",
    page: 312,
  },
  MOV_IMM_T2: {
    pattern: "11110 [i] 0 0010 [S] 1111 0 [imm3] [Rd:4] [imm8]",
  },
  MOV_IMM_T3: {
    pattern: "11110 [i] 10 0 1 0 0 [imm4] 0 [imm3] [Rd:4] [imm8]",
  },
  MOV_REG_T1: {
    pattern: "010001 10 [D:1] [Rm:4] [Rd:3]",
  },
  MOV_REG_T2: {
    pattern: "000 00 00000 [Rm:3] [Rd:3]",
  },
  MOV_REG_T3: {
    pattern: "11101 01 0010 [S] 1111 (0) 000 [Rd:4] 0000 [Rm:4]",
  },
  MOVT_T1: {
    pattern: "11110 [i] 10 1 1 0 0 [imm4] 0 [imm3] [Rd:4] [imm8]",
    page: 317,
  },
  MRC_T1: {
    pattern: "1110 1110 [opc1:3] 1 [CRn:4] [Rt:4] [coproc:4] [opc2:3] 1 [CRm:4]",
    page: 318,
  },
  MRC2_T2: {
    pattern: "1111 1110 [opc1:3] 1 [CRn:4] [Rt:4] [coproc:4] [opc2:3] 1 [CRm:4]",
  },
  MRRC_T1: {
    pattern: "1110 110 0 0 1 0 1 [Rt2:4] [Rt:4] [coproc:4] [opc1:4] [CRm:4]",
  },
  MRRC2_T2: {
    pattern: "1111 110 0 0 1 0 1 [Rt2:4] [Rt:4] [coproc:4] [opc1:4] [CRm:4]",
  },
  MRS_T1: {
    pattern: "11110 0 1111 1 (0) (1111) 10 (0) 0 [Rd:4] [SYSm:8]",
  },
  MSR_T1: {
    pattern: "11110 0 1110 0 (0) [Rn:4] 10 (0) 0 [mask:2] (0) (0) [SYSm:8]",
    page: 323,
  },
  MUL_T1: {
    pattern: "010000 1101 [Rn:3] [Rdm:3]",
    page: 324,
  },
  MUL_T2: {
    pattern: "11111 0110 000 [Rn:4] 1111 [Rd:4] 0000 [Rm:4]",
  },
  MVN_IMM_T1: {
    pattern: "11110 [i] 0 0011 [S] 1111 0 [imm3] [Rd:4] [imm8]",
  },
  MVN_REG_T1: {
    pattern: "010000 1111 [Rm:3] [Rd:3]",
  },
  MVN_REG_T2: {
    pattern: "11101 01 0011 [S] 1111 (0) [imm3] [Rd:4] [imm2] [type] [Rm:4]",
  },
  // NEG is symonym for RSB (imm) with #0
  NOP_T1: {
    pattern: "1011 1111 0000 0000",
    page: 331,
  },
  NOP_T2: {
    pattern: "11110 0 111 01 0 (1111) 10 (0) 0 (0) 000 00000000",
  },
  ORN_IMM_T1: {
    pattern: "11110 [i] 0 0011 [S] [Rn:4] 0 [imm3] [Rd:4] [imm8]",
    page: 332,
  },
  ORN_REG_T1: {
    pattern: "11101 01 0011 [S] [Rn:4] (0) [imm3] [Rd:4] [imm2] [type] [Rm:4]",
    page: 333,
  },
  ORR_IMM_T1: {
    pattern: "11110 [i] 0 0010 [S] [Rn:4] 0 [imm3] [Rd:4] [imm8]",
    page: 334,
  },
  ORR_REG_T1: {
    pattern: "010000 1100 [Rm:3] [Rdn:3]",
  },
  ORR_REG_T2: {
    pattern: "11101 01 0010 [S] [Rn:4] (0) [imm3] [Rd:4] [imm2] [type] [Rm:4]",
  },
  PKHBT_T1: {
    pattern: "11101 01 0110 [S] [Rn:4] (0) [imm3] [Rd:4] [imm2] 0 [T:1] [Rm:4]",
  },
  PKHTB_T1: {
    pattern: "11101 01 0110 [S] [Rn:4] (0) [imm3] [Rd:4] [imm2] 1 [T:1] [Rm:4]",
    page: 338,
  },
  PLD_IMM_T1: {
    pattern: "11111 00 0 1 0 0 1 [Rn:4] 1111 [imm12]",
  },
  PLD_IMM_T2: {
    pattern: "11111 00 0 0 0 0 1 [Rn:4] 1111 1 100 [imm8]",
  },
  PLD_LIT_T1: {
    pattern: "11111 00 0 [U] 00 1 1111 1111 [imm12]",
    page: 341,
  },
  PLD_REG_T1: {
    pattern: "11111 00 0 0 00 1 [Rn:4] 1111 0 00000 [imm2] [Rm:4]",
    page: 342,
  },
  PLI_IMMLIT_T1: {
    pattern: "11111 00 1 1 00 1 [Rn:4] 1111 [imm12]",
  },
  PLI_IMMLIT_T2: {
    pattern: "11111 00 1 0 00 1 [Rn:4] 1111 1 100 [imm8]",
  },
  PLI_IMMLIT_T3: {
    pattern: "11111 00 1 [U] 00 1 1111 1111 [imm12]",
  },
  PLI_REG_T1: {
    pattern: "11111 00 1 0 00 1 [Rn:4] 1111 0 00000 [imm2] [Rm:4]",
  },
  POP_T1: {
    pattern: "1011 1 10 [P] [register_list:8]",
  },
  POP_T2: {
    pattern: "11101 00 010 1 1 1101 [P] [M:1] (0) [register_list:13]",
  },
  POP_T3: {
    pattern: "11111 00 0 0 10 1 1101 [Rt:4] 1 011 00000000",
  },
  PUSH_T1: {
    pattern: "1011 0 10 [M:1] [register_list:8]",
  },
  PUSH_T2: {
    pattern: "11101 00 100 1 0 1101 (0) [M:1] (0) [register_list:13]",
  },
  PUSH_T3: {
    pattern: "11111 00 0 0 10 0 1101 [Rt:4] 1 101 00000100",
  },
  QADD_T1: {
    pattern: "11111 010 1 000 [Rn:4] 1111 [Rd:4] 1 000 [Rm:4]",
  },
  QADD16_T1: {
    pattern: "11111 010 1 001 [Rn:4] 1111 [Rd:4] 0 001 [Rm:4]",
    page: 353,
  },
  QADD8_T1: {
    pattern: "11111 010 1 000 [Rn:4] 1111 [Rd:4] 0 001 [Rm:4]",
    page: 354,
  },
  QASX_T1: {
    pattern: "11111 010 1 010 [Rn:4] 1111 [Rd:4] 0 001 [Rm:4]",
    page: 355,
  },
  QDADD_T1: {
    pattern: "11111 010 1 000 [Rn:4] 1111 [Rd:4] 1 001 [Rm:4]",
    page: 356,
  },
  QDSUB_T1: {
    pattern: "11111 010 1 000 [Rn:4] 1111 [Rd:4] 1 011 [Rm:4]",
    page: 357,
  },
  QSAX_T1: {
    pattern: "11111 010 1 110 [Rn:4] 1111 [Rd:4] 0 001 [Rm:4]",
    page: 358,
  },
  QSUB_T1: {
    pattern: "11111 010 1 000 [Rn:4] 1111 [Rd:4] 1 010 [Rm:4]",
    page: 359,
  },
  QSUB16_T1: {
    pattern: "11111 010 1 101 [Rn:4] 1111 [Rd:4] 0 001 [Rm:4]",
    page: 360,
  },
  QSUB8_T1: {
    pattern: "11111 010 1 100 [Rn:4] 1111 [Rd:4] 0 001 [Rm:4]",
    page: 361,
  },
  RBIT_T1: {
    pattern: "11111 010 1 001 [Rm:4] 1111 [Rd:4] 1 010 [Rm:4]",
    duplicateVariables: Duplicate.MATCH,
    page: 362,
  },
  REV_T1: {
    pattern: "1011 1010 00 [Rm:3] [Rd:3]",
    page: 363,
  },
  REV_T2: {
    pattern: "11111 010 1 001 [Rm:4] 1111 [Rd:4] 1 000 [Rm:4]",
    duplicateVariables: Duplicate.MATCH,
  },
  REV16_T1: {
    pattern: "1011 1010 01 [Rm:3] [Rd:3]",
    page: 364,
  },
  REV16_T2: {
    pattern: "11111 010 1 001 [Rm:4] 1111 [Rd:4] 1 001 [Rm:4]",
    duplicateVariables: Duplicate.MATCH,
  },
  REVSH_T1: {
    pattern: "1011 1010 11 [Rm:3] [Rd:3]",
    page: 365,
  },
  REVSH_T2: {
    pattern: "11111 010 1 001 [Rm:4] 1111 [Rd:4] 1 011 [Rm:4]",
    duplicateVariables: Duplicate.MATCH,
  },
  ROR_IMM_T1: {
    pattern: "11101 01 0010 [S] 1111 (0) [imm3] [Rd:4] [imm2] 11 [Rm:4]",
    page: 366,
  },
  ROR_REG_T1: {
    pattern: "010000 0111 [Rm:3] [Rdn:3]",
  },
  ROR_REG_T2: {
    pattern: "11111 010 0 11 [S] [Rn:4] 1111 [Rd:4] 0 000 [Rm:4]",
  },
  RRX_T1: {
    pattern: "11101 01 0010 [S] 1111 (0) 000 [Rd:4] 00 11 [Rm:4]",
  },
  RSB_IMM_T1: {
    pattern: "010000 1001 [Rn:3] [Rd:3]",
  },
  RSB_IMM_T2: {
    pattern: "11110 [i] 0 1110 [S] [Rn:4] 0 [imm3] [Rd:4] [imm8]",
  },
  RSB_REG_T1: {
    pattern: "11101 01 1110 [S] [Rn:4] (0) [imm3] [Rd:4] [imm2] [type] [Rm:4]",
  },
  SADD16_T1: {
    pattern: "11111 010 1 001 [Rn:4] 1111 [Rd:4] 0 000 [Rm:4]",
  },
  SADD8_T1: {
    pattern: "11111 010 1 000 [Rn:4] 1111 [Rd:4] 0 000 [Rm:4]",
    page: 377,
  },
  SASX_T1: {
    pattern: "11111 010 1 010 [Rn:4] 1111 [Rd:4] 0 000 [Rm:4]",
    page: 378,
  },
  SBC_IMM_T1: {
    pattern: "11110 [i] 0 1011 [S] [Rn:4] 0 [imm3] [Rd:4] [imm8]",
    page: 379,
  },
  SBC_REG_T1: {
    pattern: "010000 0110 [Rm:3] [Rdn:3]",
    page: 380,
  },
  SBC_REG_T2: {
    pattern: "11101 01 1011 [S] [Rn:4] (0) [imm3] [Rd:4] [imm2] [type] [Rm:4]",
  },
  SBFX_T1: {
    pattern: "11110 (0) 11 010 0 [Rn:4] 0 [imm3] [Rd:4] [imm2] (0) [widthm1:5]",
  },
  SDIV_T1: {
    pattern: "11111 011100 1 [Rn:4] (1111) [Rd:4] 1111 [Rm:4]",
    page: 383,
  },
  SEL_T1: {
    pattern: "11111 010 1 010 [Rn:4] 1111 [Rd:4] 1 000 [Rm:4]",
    page: 384,
  },
  SEV_T1: {
    pattern: "1011 1111 0100 0000",
    page: 385,
  },
  SEV_T2: {
    pattern: "11110 0 111 01 0 (1111) 10 (0) 0 (0) 000 00000100",
  },
  SHADD16_T1: {
    pattern: "11111 010 1 001 [Rn:4] 1111 [Rd:4] 0 010 [Rm:4]",
    page: 386,
  },
  SHADD8_T1: {
    pattern: "11111 010 1 000 [Rn:4] 1111 [Rd:4] 0 010 [Rm:4]",
    page: 387,
  },
  SHASX_T1: {
    pattern: "11111 010 1 010 [Rn:4] 1111 [Rd:4] 0 010 [Rm:4]",
    page: 388,
  },
  SHSAX_T1: {
    pattern: "11111 010 1 110 [Rn:4] 1111 [Rd:4] 0 010 [Rm:4]",
    page: 389,
  },
  SHSUB16_T1: {
    pattern: "11111 010 1 101 [Rn:4] 1111 [Rd:4] 0 010 [Rm:4]",
    page: 390,
  },
  SHSUB8_T1: {
    pattern: "11111 010 1 100 [Rn:4] 1111 [Rd:4] 0 010 [Rm:4]",
    page: 391,
  },
  SMLABB_T1: {
    pattern: "11111 0110 001 [Rn:4] [Ra:4] [Rd:4] 00 0 0 [Rm:4]",
    page: 392,
  },
  SMLABT_T1: {
    pattern: "11111 0110 001 [Rn:4] [Ra:4] [Rd:4] 00 0 1 [Rm:4]",
    page: 392,
  },
  SMLATB_T1: {
    pattern: "11111 0110 001 [Rn:4] [Ra:4] [Rd:4] 00 1 0 [Rm:4]",
    page: 392,
  },
  SMLATT_T1: {
    pattern: "11111 0110 001 [Rn:4] [Ra:4] [Rd:4] 00 1 1 [Rm:4]",
    page: 392,
  },
  SMLAD_T1: {
    pattern: "11111 0110 010 [Rn:4] [Ra:4] [Rd:4] 000 0 [Rm:4]",
    page: 394,
  },
  SMLADX_T1: {
    pattern: "11111 0110 010 [Rn:4] [Ra:4] [Rd:4] 000 1 [Rm:4]",
    page: 394,
  },
  SMLAL_T1: {
    pattern: "11111 0111 1 00 [Rn:4] [RdLo:4] [RdHi:4] 0000 [Rm:4]",
    page: 396,
  },
  SMLALBB_T1: {
    pattern: "11111 0111 100 [Rn:4] [RdLo:4] [RdHi:4] 10 0 0 [Rm:4]",
    page: 398,
  },
  SMLALBT_T1: {
    pattern: "11111 0111 100 [Rn:4] [RdLo:4] [RdHi:4] 10 0 1 [Rm:4]",
    page: 398,
  },
  SMLALTB_T1: {
    pattern: "11111 0111 100 [Rn:4] [RdLo:4] [RdHi:4] 10 1 0 [Rm:4]",
    page: 398,
  },
  SMLALTT_T1: {
    pattern: "11111 0111 100 [Rn:4] [RdLo:4] [RdHi:4] 10 1 1 [Rm:4]",
    page: 398,
  },
  SMLALD_T1: {
    pattern: "11111 0111 100 [Rn:4] [RdLo:4] [RdHi:4] 110 0 [Rm:4]",
    page: 400,
  },
  SMLALDX_T1: {
    pattern: "11111 0111 100 [Rn:4] [RdLo:4] [RdHi:4] 110 1 [Rm:4]",
    page: 400,
  },
  SMLAWB_T1: {
    pattern: "11111 0110 011 [Rn:4] [Ra:4] [Rd:4] 000 0 [Rm:4]",
    page: 402,
  },
  SMLAWT_T1: {
    pattern: "11111 0110 011 [Rn:4] [Ra:4] [Rd:4] 000 1 [Rm:4]",
    page: 402,
  },
  SMLSD_T1: {
    pattern: "11111 0110 100 [Rn:4] [Ra:4] [Rd:4] 000 0 [Rm:4]",
    page: 403,
  },
  SMLSDX_T1: {
    pattern: "11111 0110 100 [Rn:4] [Ra:4] [Rd:4] 000 1 [Rm:4]",
    page: 403,
  },
  SMLSLD_T1: {
    pattern: "11111 0111 1 01 [Rn:4] [RdLo:4] [RdHi:4] 110 0 [Rm:4]",
    page: 404,
  },
  SMLSLDX_T1: {
    pattern: "11111 0111 1 01 [Rn:4] [RdLo:4] [RdHi:4] 110 1 [Rm:4]",
    page: 404,
  },
  SMMLA_T1: {
    pattern: "11111 0110 101 [Rn:4] [Ra:4] [Rd:4] 000 0 [Rm:4]",
    page: 406,
  },
  SMMLAR_T1: {
    pattern: "11111 0110 101 [Rn:4] [Ra:4] [Rd:4] 000 1 [Rm:4]",
    page: 406,
  },
  SMMLS_T1: {
    pattern: "11111 0110 110 [Rn:4] [Ra:4] [Rd:4] 000 0 [Rm:4]",
    page: 407,
  },
  SMMLSR_T1: {
    pattern: "11111 0110 110 [Rn:4] [Ra:4] [Rd:4] 000 1 [Rm:4]",
    page: 407,
  },
  SMMUL_T1: {
    pattern: "11111 0110 101 [Rn:4] 1111 [Rd:4] 000 0 [Rm:4]",
    page: 408,
  },
  SMMULR_T1: {
    pattern: "11111 0110 101 [Rn:4] 1111 [Rd:4] 000 1 [Rm:4]",
    page: 408,
  },
  SMUAD_T1: {
    pattern: "11111 0110 010 [Rn:4] 1111 [Rd:4] 000 0 [Rm:4]",
    page: 409,
  },
  SMUADX_T1: {
    pattern: "11111 0110 010 [Rn:4] 1111 [Rd:4] 000 1 [Rm:4]",
    page: 409,
  },
  SMULBB_T1: {
    pattern: "11111 0110 001 [Rn:4] 1111 [Rd:4] 00 0 0 [Rm:4]",
    page: 410,
  },
  SMULBT_T1: {
    pattern: "11111 0110 001 [Rn:4] 1111 [Rd:4] 00 0 1 [Rm:4]",
    page: 410,
  },
  SMULTB_T1: {
    pattern: "11111 0110 001 [Rn:4] 1111 [Rd:4] 00 1 0 [Rm:4]",
    page: 410,
  },
  SMULTT_T1: {
    pattern: "11111 0110 001 [Rn:4] 1111 [Rd:4] 00 1 1 [Rm:4]",
    page: 410,
  },
  SMULL_T1: {
    pattern: "11111 0111 0 00 [Rn:4] [RdLo:4] [RdHi:4] 0000 [Rm:4]",
    page: 412,
  },
  SMULWB_T1: {
    pattern: "11111 0110 011 [Rn:4] 1111 [Rd:4] 000 0 [Rm:4]",
    page: 413,
  },
  SMULWT_T1: {
    pattern: "11111 0110 011 [Rn:4] 1111 [Rd:4] 000 1 [Rm:4]",
    page: 413,
  },
  SMUSD_T1: {
    pattern: "11111 0110 100 [Rn:4] 1111 [Rd:4] 000 0 [Rm:4]",
    page: 414,
  },
  SMUSDX_T1: {
    pattern: "11111 0110 100 [Rn:4] 1111 [Rd:4] 000 1 [Rm:4]",
    page: 414,
  },
  SSAT_T1: {
    pattern: "11110 (0) 11 00 [sh:1] 0 [Rn:4] 0 [imm3] [Rd:4] [imm2] (0) [sat_imm:5]",
    page: 415,
  },
  SSAT16_T1: {
    pattern: "11110 (0) 11 001 0 [Rn:4] 0 000 [Rd:4] 00 (00) [sat_imm:4]",
    page: 416,
  },
  SSAX_T1: {
    pattern: "11111 010 1 110 [Rn:4] 1111 [Rd:4] 0 000 [Rm:4]",
    page: 417,
  },
  SSUB16_T1: {
    pattern: "11111 010 1 101 [Rn:4] 1111 [Rd:4] 0 000 [Rm:4]",
    page: 418,
  },
  SSUB8_T1: {
    pattern: "11111 010 1 100 [Rn:4] 1111 [Rd:4] 0 000 [Rm:4]",
    page: 419,
  },
  STC_T1: {
    pattern: "1110 110 [P] [U] [N] [W] 0 [Rn:4] [CRd:4] [coproc:4] [imm8]",
    page: 420,
  },
  STC2_T2: {
    pattern: "1111 110 [P] [U] [N] [W] 0 [Rn:4] [CRd:4] [coproc:4] [imm8]",
  },
  STM_T1: { // related are STMEA and STMIA
    pattern: "1100 0 [Rn:3] [register_list:8]",
  },
  STM_T2: {
    pattern: "11101 00 010 [W] 0 [Rn:4] (0) [M:1] (0) [register_list:13]",
  },
  STMDB_T1: { // STMFD is a synonym
    pattern: "11101 00 100 [W] 0 [Rn:4] (0) [M:1] (0) [register_list:13]",
  },
  STR_IMM_T1: {
    pattern: "011 0 0 [imm5] [Rn:3] [Rt:3]",
  },
  STR_IMM_T2: {
    pattern: "1001 0 [Rt:3] [imm8]",
  },
  STR_IMM_T3: {
    pattern: "11111 00 0 1 10 0 [Rn:4] [Rt:4] [imm12]",
  },
  STR_IMM_T4: {
    pattern: "11111 00 0 0 10 0 [Rn:4] [Rt:4] 1 [P] [U] [W] [imm8]",
  },
  STR_REG_T1: {
    pattern: "0101 000 [Rm:3] [Rn:3] [Rt:3]",
  },
  STR_REG_T2: {
    pattern: "11111 00 0 0 10 0 [Rn:4] [Rt:4] 0 00000 [imm2] [Rm:4]",
  },
  STRB_IMM_T1: {
    pattern: "011 1 0 [imm5] [Rn:3] [Rt:3]",
  },
  STRB_IMM_T2: {
    pattern: "11111 00 0 1 00 0 [Rn:4] [Rt:4] [imm12]",
  },
  STRB_IMM_T3: {
    pattern: "11111 00 0 0 00 0 [Rn:4] [Rt:4] 1 [P] [U] [W] [imm8]",
  },
  STRB_REG_T1: {
    pattern: "0101 010 [Rm:3] [Rn:3] [Rt:3]",
  },
  STRB_REG_T2: {
    pattern: "11111 00 0 0 00 0 [Rn:4] [Rt:4] 0 00000 [imm2] [Rm:4]",
  },
  STRBT_T1: {
    pattern: "11111 00 0 0 00 0 [Rn:4] [Rt:4] 1 110 [imm8]",
  },
  STRD_IMM_T1: {
    pattern: "11101 00 [P] [U] 1 [W] 0 [Rn:4] [Rt:4] [Rt2:4] [imm8]",
  },
  STREX_T1: {
    pattern: "11101 00 0 0 1 0 0 [Rn:4] [Rt:4] [Rd:4] [imm8]",
  },
  STREXB_T1: {
    pattern: "11101 000110 0 [Rn:4] [Rt:4] (1111) 0100 [Rd:4]",
    page: 439,
  },
  STREXH_T1: {
    pattern: "11101 000110 0 [Rn:4] [Rt:4] (1111) 0101 [Rd:4]",
    page: 440,
  },
  STRH_IMM_T1: {
    pattern: "1000 0 [imm5] [Rn:3] [Rt:3]",
  },
  STRH_IMM_T2: {
    pattern: "11111 00 0 1 01 0 [Rn:4] [Rt:4] [imm12]",
  },
  STRH_IMM_T3: {
    pattern: "11111 00 0 0 01 0 [Rn:4] [Rt:4] 1 [P] [U] [W] [imm8]",
  },
  STRH_REG_T1: {
    pattern: "0101 001 [Rm:3] [Rn:3] [Rt:3]",
  },
  STRH_REG_T2: {
    pattern: "11111 00 0 0 01 0 [Rn:4] [Rt:4] 0 00000 [imm2] [Rm:4]",
  },
  STRHT_T1: {
    pattern: "11111 00 0 0 01 0 [Rn:4] [Rt:4] 1 110 [imm8]",
  },
  STRT_T1: {
    pattern: "11111 00 0 0 10 0 [Rn:4] [Rt:4] 1 110 [imm8]",
    page: 447,
  },
  SUB_IMM_T1: {
    pattern: "000 11 1 1 [imm3] [Rn:3] [Rd:3]",
    page: 448,
  },
  SUB_IMM_T2: {
    pattern: "001 11 [Rdn:3] [imm8]",
  },
  SUB_IMM_T3: {
    pattern: "11110 [i] 0 1101 [S] [Rn:4] 0 [imm3] [Rd:4] [imm8]",
  },
  SUB_IMM_T4: {
    pattern: "11110 [i] 1 0101 0 [Rn:4] 0 [imm3] [Rd:4] [imm8]",
  },
  SUB_REG_T1: {
    pattern: "000 11 0 1 [Rm:3] [Rn:3] [Rd:3]",
  },
  SUB_REG_T2: {
    pattern: "11101 01 1101 [S] [Rn:4] (0) [imm3] [Rd:4] [imm2] [type] [Rm:4]",
  },
  SUB_SMI_T1: {
    pattern: "1011 0000 1 [imm7]",
  },
  SUB_SMI_T2: {
    pattern: "11110 [i] 0 1101 [S] 1101 0 [imm3] [Rd:4] [imm8]",
  },
  SUB_SMI_T3: {
    pattern: "11110 [i] 1 0101 0 1101 0 [imm3] [Rd:4] [imm8]",
  },
  SUB_SMR_T1: {
    pattern: "11101 0 1 1101 [S] 1101 (0) [imm3] [Rd:4] [imm2] [type] [Rm:4]",
  },
  SVC_T1: {
    pattern: "1101 1111 [imm8]",
    pageSkip: 1,
  },
  SXTAB_T1: {
    pattern: "11111 010 0 100 [Rn:4] 1111 [Rd:4] 1 (0) [rotate:2] [Rm:4]",
  },
  SXTAB16_T1: {
    pattern: "11111 010 0 010 [Rn:4] 1111 [Rd:4] 1 (0) [rotate:2] [Rm:4]",
  },
  SXTAH_T1: {
    pattern: "11111 010 0 000 [Rn:4] 1111 [Rd:4] 1 (0) [rotate:2] [Rm:4]",
  },
  SXTB_T1: {
    pattern: "1011 0010 01 [Rm:3] [Rd:3]",
  },
  SXTB_T2: {
    pattern: "11111 010 0 100 1111 1111 [Rd:4] 1 (0) [rotate:2] [Rm:4]",
  },
  SXTB16_T1: {
    pattern: "11111 010 0 010 1111 1111 [Rd:4] 1 (0) [rotate:2] [Rm:4]",
  },
  SXTH_T1: {
    pattern: "1011 0010 00 [Rm:3] [Rd:3]",
  },
  SXTH_T2: {
    pattern: "11111 010 0 000 1111 1111 [Rd:4] 1 (0) [rotate:2] [Rm:4]",
  },
  TBB_T1: {
    pattern: "11101 00 0 1 1 0 1 [Rn:4] (1111) (0000) 000 0 [Rm:4]",
  },
  TBH_T1: {
    pattern: "11101 00 0 1 1 0 1 [Rn:4] (1111) (0000) 000 1 [Rm:4]",
    page: 462,
  },
  TEQ_IMM_T1: {
    pattern: "11110 [i] 0 0100 1 [Rn:4] 0 [imm3] 1111 [imm8]",
  },
  TEQ_REG_T1: {
    pattern: "11101 01 0100 1 [Rn:4] (0) [imm3] 1111 [imm2] [type:2] [Rm:4]",
  },
  TST_IMM_T1: {
    pattern: "11110 [i] 0 0000 1 [Rn:4] 0 [imm3] 1111 [imm8]",
  },
  TST_REG_T1: {
    pattern: "010000 1000 [Rm:3] [Rn:3]",
  },
  TST_REG_T2: {
    pattern: "11101 01 0000 1 [Rn:4] (0) [imm3] 1111 [imm2] [type] [Rm:4]",
  },
  UADD16_T1: {
    pattern: "11111 010 1 001 [Rn:4] 1111 [Rd:4] 0 100 [Rm:4]",
  },
  UADD8_T1: {
    pattern: "11111 010 1 000 [Rn:4] 1111 [Rd:4] 0 100 [Rm:4]",
  },
  UASX_T1: {
    pattern: "11111 010 1 010 [Rn:4] 1111 [Rd:4] 0 100 [Rm:4]",
  },
  UBFX_T1: {
    pattern: "11110 (0) 11 110 0 [Rn:4] 0 [imm3] [Rd:4] [imm2] (0) [widthm1:5]",
  },
  UDF_T1: {
    pattern: "1101 1110 [imm8]",
  },
  UDF_T2: {
    pattern: "111 10 1111111 [imm4] 1 010 [imm12]",
  },
  UDIV_T1: {
    pattern: "11111 011101 1 [Rn:4] (1111) [Rd:4] 1111 [Rm:4]",
  },
  UHADD16_T1: {
    pattern: "11111 010 1 001 [Rn:4] 1111 [Rd:4] 0 110 [Rm:4]",
  },
  UHADD8_T1: {
    pattern: "11111 010 1 000 [Rn:4] 1111 [Rd:4] 0 110 [Rm:4]",
  },
  UHASX_T1: {
    pattern: "11111 010 1 010 [Rn:4] 1111 [Rd:4] 0 110 [Rm:4]",
  },
  UHSAX_T1: {
    pattern: "11111 010 1 110 [Rn:4] 1111 [Rd:4] 0 110 [Rm:4]",
  },
  UHSUB16_T1: {
    pattern: "11111 010 1 101 [Rn:4] 1111 [Rd:4] 0 110 [Rm:4]",
  },
  UHSUB8_T1: {
    pattern: "11111 010 1 100 [Rn:4] 1111 [Rd:4] 0 110 [Rm:4]",
  },
  UMAAL_T1: {
    pattern: "11111 0111 110 [Rn:4] [RdLo:4] [RdHi:4] 0110 [Rm:4]",
  },
  UMLAL_T1: {
    pattern: "11111 0111 110 [Rn:4] [RdLo:4] [RdHi:4] 0000 [Rm:4]",
  },
  UMULL_T1: {
    pattern: "11111 0111 010 [Rn:4] [RdLo:4] [RdHi:4] 0000 [Rm:4]",
  },
  UQADD16_T1: {
    pattern: "11111 010 1 001 [Rn:4] 1111 [Rd:4] 0 101 [Rm:4]",
  },
  UQADD8_T1: {
    pattern: "11111 010 1 000 [Rn:4] 1111 [Rd:4] 0 101 [Rm:4]",
  },
  UQASX_T1: {
    pattern: "11111 010 1 010 [Rn:4] 1111 [Rd:4] 0 101 [Rm:4]",
  },
  UQSAX_T1: {
    pattern: "11111 010 1 110 [Rn:4] 1111 [Rd:4] 0 101 [Rm:4]",
  },
  UQSUB16_T1: {
    pattern: "11111 010 1 101 [Rn:4] 1111 [Rd:4] 0 101 [Rm:4]",
  },
  UQSUB8_T1: {
    pattern: "11111 010 1 100 [Rn:4] 1111 [Rd:4] 0 101 [Rm:4]",
  },
  USAD8_T1: {
    pattern: "11111 0110 111 [Rn:4] 1111 [Rd:4] 0000 [Rm:4]",
  },
  USADA8_T1: {
    pattern: "11111 0110 111 [Rn:4] [Ra:4] [Rd:4] 0000 [Rm:4]",
  },
  USAT_T1: {
    pattern: "11110 (0) 11 10 [sh:1] 0 [Rn:4] 0 [imm3] [Rd:4] [imm2] (0) [sat_imm:5]",
  },
  USAT16_T1: {
    pattern: "11110 (0) 11 101 0 [Rn:4] 0 000 [Rd:4] 00 (00) [sat_imm:4]",
  },
  USAX_T1: {
    pattern: "11111 010 1 110 [Rn:4] 1111 [Rd:4] 0 100 [Rm:4]",
  },
  USUB16_T1: {
    pattern: "11111 010 1 101 [Rn:4] 1111 [Rd:4] 0 100 [Rm:4]",
  },
  USUB8_T1: {
    pattern: "11111 010 1 100 [Rn:4] 1111 [Rd:4] 0 100 [Rm:4]",
  },
  UXTAB_T1: {
    pattern: "11111 010 0 101 [Rn:4] 1111 [Rd:4] 1 (0) [rotate:2] [Rm:4]",
  },
  UXTAB16_T1: {
    pattern: "11111 010 0 011 [Rn:4] 1111 [Rd:4] 1 (0) [rotate:2] [Rm:4]",
  },
  UXTAH_T1: {
    pattern: "11111 010 0 001 [Rn:4] 1111 [Rd:4] 1 (0) [rotate:2] [Rm:4]",
  },
  UXTB_T1: {
    pattern: "1011 0010 11 [Rm:3] [Rd:3]",
  },
  UXTB_T2: {
    pattern: "11111 010 0 101 1111 1111 [Rd:4] 1 (0) [rotate:2] [Rm:4]",
  },
  UXTB16_T1: {
    pattern: "11111 010 0 011 1111 1111 [Rd:4] 1 (0) [rotate:2] [Rm:4]",
  },
  UXTH_T1: {
    pattern: "1011 0010 10 [Rm:3] [Rd:3]",
  },
  UXTH_T2: {
    pattern: "11111 010 0 001 1111 1111 [Rd:4] 1 (0) [rotate:2] [Rm:4]",
  },
  // TODO: Floating point
  WFE_T1: {
    pattern: "1011 1111 0010 0000",
    page: 560,
    pageSkip: 1,
  },
  WFE_T2: {
    pattern: "11110 0 111 01 0 (1111) 10 (0) 0 (0) 000 00000010",
  },
  WFI_T1: {
    pattern: "1011 1111 0011 0000",
  },
  WFI_T2: {
    pattern: "11110 0 111 01 0 (1111) 10 (0) 0 (0) 000 00000011",
  },
  YIELD_T1: {
    pattern: "1011 1111 0001 0000",
  },
  YIELD_T2: {
    pattern: "11110 0 111 01 0 (1111) 10 (0) 0 (0) 000 00000001",
  },
};

// All encoding name parts are implicitly converted to keywords.
// E.g., `ADD_REG_T2` -> "ADD", "REGISTER", "T2"
export const keywords: KeywordMap = {
  MATH: ["ADD", "SUB", "MUL", "DIV"],
  DIV: ["SDIV", "UDIV"],
  SIGNED: ["SDIV", "SMULL"], // etc.
};
