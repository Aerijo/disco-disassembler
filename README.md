This project is for the STM32L476 discovery board (discoboard). It aims to be a tool to interpret machine code, as well as a general glossary of commands that can be searched and filtered in numerous ways, e.g. by byte matches or keywords.

The instruction interpreter likely has a few errors in it. Hopefully these will be found and removed with use.


### Generalised Instruction Decoding

One goal of this module is to support arbitrary encodings (that at least somewhat resemble ARM encodings). Given an input instruction, the steps to decode are

1. Get the encoding tree corresponding to the instruction width
2. Descend the (binary) tree by checking the marked bit
3. When a terminal node is reached, there will be an array of possible encodings (some encodings are more specific versions of general ones). Check each in order, and return if there is a match. If no match, return undefined.

Note that the final step iterates the array in order. At least for the ARM instructions I am using, arranging the encodings by most to least specific is sufficient to accurately determine which instruction it is.

However, some instructions conflict in complicated ways. E.g.,
```
ADD_REG_T2: 01000100 [DN:1] [Rm:4] [Rdn:3]
ADD_SPR_T1: 01000100 [DM:1] 1101   [Rdm:3]
ADD_SPR_T2: 01000100 1      [Rm:4] 101
```
For `ADD_SPR_T2`, though it looks more specific with only one variable, a value of `1101` makes it `T1` instead. The `T1` encoding itself is unconditional; matching the set bits guarantees a complete match (if neither match then `ADD_REG_T2` is used). This feature will be on hold until all conflicts can be resolved with a natural way to specify how.
