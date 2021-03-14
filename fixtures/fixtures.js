export const fData = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

export const fTree = [
  'h(h(h(h(A)h(B))h(h(C)h(D)))h(h(h(E)h(F))h(G)))',
  ['h(h(h(A)h(B))h(h(C)h(D)))', 'h(h(h(E)h(F))h(G))'],
  ['h(h(A)h(B))', 'h(h(C)h(D))', 'h(h(E)h(F))', 'h(G)'],
  ['h(A)', 'h(B)', 'h(C)', 'h(D)', 'h(E)', 'h(F)', 'h(G)'],
];

export const fProofs = {
  A: [{ right: fTree[3][1] }, { right: fTree[2][1] }, { right: fTree[1][1] }],
  B: [{ left: fTree[3][0] }, { right: fTree[2][1] }, { right: fTree[1][1] }],
  C: [], // unused
  D: [], // unused
  F: [{ left: fTree[3][4] }, { right: fTree[2][3] }, { left: fTree[1][0] }],
  G: [{}, { left: fTree[2][2] }, { left: fTree[1][0] }],
};

export const mockHash = (v) => `h(${v})`;
