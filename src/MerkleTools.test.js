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
    const args = {
      data: 'B',
      proof: fProofs['B'],
      root: fTree[0],
    };
    expect(validateProof(args)).toEqual(true);
  });

  it('validateProof(): returns false if data is tampered with', () => {
    const args = {
      data: 'foo',
      proof: fProofs['B'],
      root: fTree[0],
    };
    expect(validateProof(args)).toEqual(false);
  });

  it('validateProof(): handles single child', () => {
    const args = {
      data: 'G',
      proof: fProofs['G'],
      root: fTree[0],
    };
    expect(validateProof(args)).toEqual(true);
  });
});
