import { MerkleTools, MerkleTree } from './src';

const data = ['A', 'B', 'C', 'D'];

const { createMerkleTree, validateProof } = MerkleTools();
const tree = createMerkleTree(data);

console.dir(
  {
    root: tree.root(),
    height: tree.height(),
    level: tree.level(1),
    proof: tree.getProof('D'),
    isValid: validateProof(tree.getProof('D')),
  },
  { depth: null },
);
