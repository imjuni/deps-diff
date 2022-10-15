export const DEPENDENCY = {
  DEV: 'dev',
  PROD: 'prod',
  PEER: 'peer',
} as const;

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare
export type DEPENDENCY = typeof DEPENDENCY[keyof typeof DEPENDENCY];
