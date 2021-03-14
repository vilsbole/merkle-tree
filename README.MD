# Merkle tree

Naive implementation of a static Merkle tree.

### Usage

---

1. Install depedencies

   ```sh
   yarn
   ```

2. Available commands

   ```sh
   # Run demo
   $ yarn demo

   # Run tests
   $ yarn test
   ```

### Example:

---

```js
import { MerkleTools } from './src';

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

/*
  {
    root: '50a504831bd50fee3581d287168a85a8dcdd6aa777ffd0fe35e37290268a0153',
    height: 2,
    level: [
      'b30ab174f7459cdd40a3acdf15d0c9444fec2adcfb9d579aa154c084885edd0a',
      '26b5aabe804fe5d533c663dea833e8078188376ce5ca2b5c3371d09ef6b0657b'
    ],
    proof: {
      data: 'D',
      proof: [
        {
          left: '6b23c0d5f35d1b11f9b683f0b0a617355deb11277d91ae091d399c655b87940d'
        },
        {
          left: 'b30ab174f7459cdd40a3acdf15d0c9444fec2adcfb9d579aa154c084885edd0a'
        }
      ],
      root: '50a504831bd50fee3581d287168a85a8dcdd6aa777ffd0fe35e37290268a0153'
    },
    isValid: true
   }
*/
```

### FAQ:

---

1. **In the illustration, let’s imagine I know the whole Merkle tree. Someone gives me L2 data block but I don’t trust him. How can I check if L2 data is valid?**

   When the entire Merkle tree is available, validating the membership of a data block is a simple as verifying that the hash of the data block is a leaf of the tree.

   Example:

   ```js
   const hash = (v) => `h(${v})`;
   const { createMerkleTree } = MerkleTools({ hash });

   const demo = createMerkleTree(['L1', 'L2', 'L3']);
   const leaves = demo.level(demo.height());

   console.log(leaves, leaves.includes(hash('L2')));
   // true
   ```

2. **I know only the L3 block and the Merkle root. What minimum information do I need to check that the L3 block and the Merkle root belong to the same Merkle tree?**

   When only the data block and the Merkle root are available, and we consider that the applied hash function as well as the convention for single child nodes are known; the membership validation of the data block only requires an additional Merkle proof.

   A proof is composed of a list of sibiling nodes for each level. The list should contain both the position (left or right) and the hash contained of the sibling node. The position allows the validator to determine the order of concatenation of the sibliings hashes when it generates the parent hash of the parent node.

   Provided with proof, a validator is able to reconstruct the tree path for the data block and verify that the final hash corresponds to the provided root.

   A benefit of a Merkle proof is it's bandwidth efficiency. Instead of transmitting all the leaves: `O(n)` for `n` leaves, it enables membership verification with the mere subset of leaves: `O(log{n})`.

3. **What are some Merkle tree use cases?**

   Merkle trees have a wide range of applications. It is used for consistency verification in blockchains (eg. Bitcoin, Ethereum), identifying file modifications in version control systems (eg. Git, Mercurial), data integrity in database systems (eg. Cassandra, DynamoDB).

   See also:

   - [Merkle trees in action](https://www.codementor.io/blog/merkle-trees-5h9arzd3n8#merkle-trees-in-action)
   - [Wikipedia](https://en.wikipedia.org/wiki/Merkle_tree)
