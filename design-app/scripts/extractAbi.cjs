// extractAbi.cjs
const fs = require('fs');
const path = require('path');
const solc = require('solc');

// ✅ Build correct path to AccessControl.sol
const sourcePath = path.join(__dirname, '..', 'src', 'contracts', 'AccessControl.sol');
const sourceCode = fs.readFileSync(sourcePath, 'utf8');

// Prepare Solidity compiler input
const input = {
  language: 'Solidity',
  sources: {
    'AccessControl.sol': {
      content: sourceCode,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['abi'],
      },
    },
  },
};

// Compile and extract ABI
const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contractName = Object.keys(output.contracts['AccessControl.sol'])[0];
const abi = output.contracts['AccessControl.sol'][contractName].abi;

// ✅ Correct output directory
const outputDir = path.join(__dirname, '..', 'src', 'abis');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const abiPath = path.join(outputDir, 'AccessControl.json');
fs.writeFileSync(abiPath, JSON.stringify(abi, null, 2));

console.log(`✅ ABI written to ${abiPath}`);
