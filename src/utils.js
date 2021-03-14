import sha256 from 'crypto-js/sha256';

export const sha256Hash = (v) => sha256(v).toString();
