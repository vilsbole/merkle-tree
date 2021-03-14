import { sha256Hash } from './utils';

// Naive implementation of a Merkle tree for a pre-determind
// static amount of leaves.
class MerkleTree {
  constructor(tree, { hash = sha256Hash }) {
    if (!tree) {
      throw new Error('MerkleTree: missing arguments');
    }
    this.tree = tree;
    this.hash = hash;
  }

  // Returns the Merkle root of the tree
  root() {
    return this.tree[0];
  }

  // Returns the number of levels of the tree.
  // ie. This is equivalent to the nb of edges in the tree.
  height() {
    return this.tree.length - 1;
  }

  // Returns an Array containing the hashes of the given level.
  // index 0 is the Merkle root.
  level(index) {
    return this.tree[index];
  }

  // Return an array composed of the sibling and sibling position
  // required to validate that the data is included in the tree.
  getProof(data) {
    const leafIndex = this.level(this.height()).indexOf(this.hash(data));
    if (leafIndex < 0) return null; // data provided is not in tree.

    const height = this.height();

    const isEven = (n) => n % 2 === 0;
    const getSiblingProof = (idx, level) => {
      return isEven(idx)
        ? level[idx + 1] // Return an empty object when the hash should be repeated.
          ? { right: level[idx + 1] }
          : {}
        : { left: level[idx - 1] || level[idx] };
    };

    const getSiblings = (acc, level, levelIdx) => {
      // If we've reached the root return the cumulated proofs
      if (levelIdx === 0) return { data, proof: acc, root: level };

      // Calculate the index position of data for the current level.
      // We already have the index for the leaf level.
      const idxInLevel =
        levelIdx === height
          ? leafIndex
          : Math.floor(leafIndex / (2 * (height - levelIdx)));

      return [...acc, getSiblingProof(idxInLevel, level)];
    };

    // We reduceRight to start with the leaves while preserving the
    // the correct level index.
    return this.tree.reduceRight(getSiblings, []);
  }
}

export default MerkleTree;
