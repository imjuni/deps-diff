export const TDEPENDENCY = {
  DEV: 'dev',
  PROD: 'prod',
  PEER: 'peer',
} as const;

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare
export type TDEPENDENCY = typeof TDEPENDENCY[keyof typeof TDEPENDENCY];
