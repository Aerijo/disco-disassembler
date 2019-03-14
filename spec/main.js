const stm = require("../dist/data/STM32L476")

const { generateEncodingsFromObject } = require("../dist/src/instructions/generate")
const { buildEncodingTree } = require("../dist/src/instructions/encodings")

const encodings = generateEncodingsFromObject(stm.encodings);

debugger;

const narrows = [];
const wides = [];

encodings.forEach(e => (e.wide ? wides : narrows).push(e));

const ntree = buildEncodingTree(narrows, 16);
const wtree = buildEncodingTree(wides, 32);

console.log(ntree, wtree);

debugger;
