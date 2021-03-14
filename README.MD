# Markle tree

### Part 1 - Merkle tree implementation

With the coding language of your choice, write a module allowing the creation of a Merkle tree from an array of data (in the illustration, that would be L1, L2, L3, et L4).
For instance: `createMerkleTree([string1, string2, string3, ...]) => MerkleTree`

The Merkle tree should have the following function:

```
// Returns the Merkle root of the tree MerkleTree#root()
// Returns the number of levels of the tree MerkleTree#height()
// Returns an Array containing the hashes of the given level MerkleTree#level(index)
```

Hashes are computed using the cryptographic function SHA256.
Bonus : writing a test suite

### Part 2 - Questions

1. In the illustration, let’s imagine I know the whole Merkle tree. Someone gives me L2 data block but I don’t trust him. How can I check if L2 data is valid?
2. I know only the L3 block and the Merkle root. What minimum information do I need to check that the L3 block and the Merkle root belong to the same Merkle tree?
3. What are some Merkle tree use cases?
