import { mockHash, fTree, fProofs } from '@fixtures';

import MerkleTree from './MerkleTree';

describe('MerkleTree', () => {
  const defaultOptions = { hash: mockHash };
  it('Throws when instancied with missing arguments', () => {
    expect(() => new MerkleTree()).toThrow();
  });

  it('root(): returns the correct root', () => {
    const tree = new MerkleTree(fTree, defaultOptions);
    expect(tree.root()).toEqual(fTree[0]);
  });

  it('height(): returns the correct tree height', () => {
    const tree = new MerkleTree(fTree, defaultOptions);
    expect(tree.height()).toEqual(fTree.length - 1);
  });

  it('height(): returns 0 when tree has no edges', () => {
    const tree = new MerkleTree(['foo'], defaultOptions);
    expect(tree.height()).toEqual(0);
  });

  it('level(): returns the correct level', () => {
    const tree = new MerkleTree(fTree, defaultOptions);
    expect(tree.level(1)).toEqual(fTree[1]);
    expect(tree.level(tree.height())).toEqual(fTree[fTree.length - 1]);
  });

  it('getProof(): returns null if data is not in tree', () => {
    const actual = new MerkleTree(fTree, defaultOptions).getProof('foo');
    expect(actual).toEqual(null);
  });

  it('getProof(): returns a proof for the provided data element', () => {
    const data = 'F';
    const tree = new MerkleTree(fTree, defaultOptions);
    const actual = tree.getProof(data);
    const expected = {
      data,
      proof: fProofs[data],
      root: tree.root(),
    };
    expect(actual).toEqual(expected);
  });

  it('getProof(): handles repeated element', () => {
    const data = 'G';
    const tree = new MerkleTree(fTree, defaultOptions);
    const actual = tree.getProof(data);
    const expected = {
      data,
      proof: fProofs[data],
      root: tree.root(),
    };
    expect(actual).toEqual(expected);
  });

  it('getProof(): handles first element in list', () => {
    const data = 'A';
    const tree = new MerkleTree(fTree, defaultOptions);
    const actual = tree.getProof(data);
    const expected = {
      data,
      proof: fProofs[data],
      root: tree.root(),
    };
    expect(actual).toEqual(expected);
  });
});
