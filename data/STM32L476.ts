import { EncodingDefinition, Duplicate } from "../src/instructions/generate";

export const encodings: EncodingDefinition = {
  ADC_IMM_T1: {
    pattern: "11110 [i] 0 1010 [S] [Rn:4] 0 [imm3] [Rd:4] [imm8]",
  },
  ADC_REG_T1: {
    pattern: "010000 0101 [Rm:3] [Rdn:3]",
  },
  ADC_REG_T2: {
    pattern: "11101 01 1010 [S] [Rn:4] (0) [imm3] [Rd:4] [imm2] [type:2] [Rm:4]",
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
    pattern: "11101 01 1000 [S] [Rn:4] (0) [imm3] [Rd:4] [imm2] [type:2] [Rm:4]",
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
    pattern: "11101011000 [S] 1101 0 [imm3] [Rd:4] [imm2] [type:2] [Rm:4]",
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
    pattern: "11101 01 0000 [S] [Rn:4] (0) [imm3] [Rd:4] [imm2] [type:2] [Rm:4]",
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
  },
  BIC_IMM_T1: {
    pattern: "11110 [i] 0 0001 [S] [Rn:4] 0 [imm3] [Rd:4] [imm8]",
  },
  BIC_REG_T1: {
    pattern: "010000 1110 [Rm:3] [Rdn:3]",
  },
  BIC_REG_T2: {
    pattern: "11101 01 0001 [S] [Rn:4] (0) [imm3] [Rd:4] [imm2] [type:2] [Rm:4]",
  },
  BKPT_T1: {
    pattern: "1011 1110 [imm8]",
  },
  BL_T1: {
    pattern: "11110 [S] [imm10] 11 [J1:1] 1 [J2:1] [imm11]",
  },
  BLX_REG_T1: {
    pattern: "010001 11 1 [Rm:4] (000)",
  },
  BX_T1: {
    pattern: "010001 11 0 [Rm:4] (000)",
  },
  CBZ_T1: {
    pattern: "1011 0 0 [i] 1 [imm5] [Rn:3]",
  },
  CBNZ_T1: {
    pattern: "1011 1 0 [i] 1 [imm5] [Rn:3]", // shares diagram with CBZ
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
  },
  CMN_IMM_T1: {
    pattern: "11110 [i] 0 1000 1 [Rn:4] 0 [imm3] 1111 [imm8]",
  },
  CMN_REG_T1: {
    pattern: "010000 1011 [Rm:3] [Rn:3]",
  },
  CMN_REG_T2: {
    pattern: "11101 01 1000 1 [Rn:4] (0) [imm3] 1111 [imm2] [type:2] [Rm:4]",
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
    pattern: "010001 01 [N:1] [Rm:4] [Rn:3]",
  },
  CMP_REG_T3: {
    pattern: "11101 01 1101 1 [Rn:4] (0) [imm3] 1111 [imm2] [type:2] [Rm:4]",
  },
  CPS_T1: {
    pattern: "1011 0110 011 [im:1] (0) (0) [I:1] [F:1]",
  },
  // NOTE: CPY is alias for MOV
  DBG_T1: {
    pattern: "11110 0 111 01 0 (1111) 10 (0) 0 (0) 000 1111 [option:4]",
  },
  DMB_T1: {
    pattern: "11110 0 111 01 1 (1111) 10 (0) 0 (1111) 0101 [option:4]",
  },
  DSB_T1: {
    pattern: "11110 0 111 01 1 (1111) 10 (0) 0 (1111) 0100 [option:4]",
  },
  EOR_IMM_T1: {
    pattern: "11110 [i] 0 0100 [S] [Rn:4] 0 [imm3] [Rd:4] [imm8]",
  },
  EOR_REG_T1: {
    pattern: "010000 0001 [Rm:3] [Rdn:3]",
  },
  EOR_REG_T2: {
    pattern: "11101 01 0100 [S] [Rn:4] (0) [imm3] [Rd:4] [imm2] [type:2] [Rm:4]",
  },
  ISB_T1: {
    pattern: "11110 0 111 01 1 (1111) 10 (0) 0 (1111) 0110 [option:4]",
  },
  IT_T1: {
    pattern: "1011 1111 [firstcond:4] [mask:4]",
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
  },
  LDREXH_T1: {
    pattern: "11101 000110 1 [Rn:4] [Rt:4] (1111) 0101 (1111)",
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
  },
  LSL_IMM_T1: {
    pattern: "000 00 [imm5] [Rm:3] [Rd:3]",
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
  },
  MOV_IMM_T1: {
    pattern: "001 00 [Rd:3] [imm8]",
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
  },
  MRC_T1: {
    pattern: "1110 1110 [opc1:3] 1 [CRn:4] [Rt:4] [coproc:4] [opc2:3] 1 [CRm:4]",
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
  },
  MUL_T1: {
    pattern: "010000 1101 [Rn:3] [Rdm:3]",
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
    pattern: "11101 01 0011 [S] 1111 (0) [imm3] [Rd:4] [imm2] [type:2] [Rm:4]",
  },
  // NEG is symonym for RSB (imm) with #0
  NOP_T1: {
    pattern: "1011 1111 0000 0000",
  },
  NOP_T2: {
    pattern: "11110 0 111 01 0 (1111) 10 (0) 0 (0) 000 00000000",
  },
  ORN_IMM_T1: {
    pattern: "11110 [i] 0 0011 [S] [Rn:4] 0 [imm3] [Rd:4] [imm8]",
  },
  ORN_REG_T1: {
    pattern: "11101 01 0011 [S] [Rn:4] (0) [imm3] [Rd:4] [imm2] [type:2] [Rm:4]",
  },
  ORR_IMM_T1: {
    pattern: "11110 [i] 0 0010 [S] [Rn:4] 0 [imm3] [Rd:4] [imm8]",
  },
  ORR_REG_T1: {
    pattern: "010000 1100 [Rm:3] [Rdn:3]",
  },
  ORR_REG_T2: {
    pattern: "11101 01 0010 [S] [Rn:4] (0) [imm3] [Rd:4] [imm2] [type:2] [Rm:4]",
  },
  PKHBT_T1: {
    pattern: "11101 01 0110 [S] [Rn:4] (0) [imm3] [Rd:4] [imm2] 0 [T:1] [Rm:4]",
  },
  PKHTB_T1: {
    pattern: "11101 01 0110 [S] [Rn:4] (0) [imm3] [Rd:4] [imm2] 1 [T:1] [Rm:4]",
  },
};
