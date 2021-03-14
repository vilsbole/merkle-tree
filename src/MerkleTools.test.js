import { mockHash, fData, fTree, fProofs } from '@fixtures';

import MerkleTools from './MerkleTools';
import MerkleTree from './MerkleTree';

describe('MerkleTools', () => {
  const { createLevels, createMerkleTree, validateProof } = MerkleTools({
    hash: mockHash,
  });

  it('createLevels(): creates a tree from a list of strings', () => {
    expect(createLevels(fData.map(mockHash))).toEqual(fTree);
  });

  it('createMerkleTree(): returns a tree with the provided data', () => {
    expect(createMerkleTree(fData)).toBeInstanceOf(MerkleTree);
  });

  it('validateProof(): returns true when proof is valid', () => {
    const data = 'B';
    const leaves = fTree[3];
    const proof = fProofs[data];
    expect(validateProof(data, proof, fTree[0])).toEqual(true);
  });

  it('validateProof(): returns false if data is tampered with', () => {
    const data = 'foo';
    const proof = fProofs['B'];
    expect(validateProof(data, proof, fTree[0])).toEqual(false);
  });

  it('validateProof(): handles single child', () => {
    const data = 'G';
    const proof = fProofs[data];
    expect(validateProof(data, proof, fTree[0])).toEqual(true);
  });
});
