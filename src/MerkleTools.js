import { splitEvery, isEmpty, pipe, map } from 'ramda';

import { sha256Hash } from './utils';
import MerkleTree from './MerkleTree';

function MerkleTools({ hash = sha256Hash }) {
  // If node has only one child, its hash is the same as its child’s.
  const hashPair = ([l, r]) => (r ? hash(l + r) : l);

  /**
   * Receives level as array, creates pairs, and returns the next level
   * composed of the hashes of the concatenated values of each pair.
   * eg. [[D1, D2], [D3]] -> [D1D2, D3]
   */
  const hashLevel = pipe(
    // Create pairs: [D1, D2, D3] -> [[D1, D2], [D3]]
    splitEvery(2),
    map(hashPair),
  );

  /**
   * Receives a list of hashes and a list of lists where
   * the index represents the corresponding level in the tree.
   * The root being Level 0.
   * eg. [H1, H2, H3] -> [root, [hash(H11H2), H3], [H1, H2, H3]]
   */
  const createLevels = (level) => {
    // We've reached the root of the tree
    if (level.length === 1) return level;
    const next = hashLevel(level);
    // 1. Spread to flatten. The root will be a string instead of an.
    // 2. Invert insertion order to place root at Level 0.
    return [...createLevels(next), level];
  };

  const createMerkleTree = pipe(
    map(hash),
    createLevels,
    (d) => new MerkleTree(d, { hash }),
  );

  /**
   * Given a data element, a proof path, and merkle root,
   * Verify that a data element belongs to the tree.
   */
  const validateProof = (data, proof, merkleRoot) => {
    const hashedData = hash(data);

    const generateRoot = proof.reduce((acc, sibling) => {
      // An empty elem in a proof array represents a repeated value.
      if (isEmpty(sibling)) return hashedData;
      const pair = sibling.left ? [sibling.left, acc] : [acc, sibling.right];
      return hashPair(pair);
    }, hashedData);

    return generateRoot === merkleRoot;
  };

  return {
    createLevels,
    createMerkleTree,
    validateProof,
  };
}

export default MerkleTools;
