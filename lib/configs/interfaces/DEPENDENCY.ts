export const DEPENDENCY = {
  DEV: 'dev',
  PROD: 'prod',
  PEER: 'peer',
} as const;

// eslint-disable-next-line
export type DEPENDENCY = typeof DEPENDENCY[keyof typeof DEPENDENCY];
