export const TCHUNK_ACTION = {
  START: 'start',
  END: 'end',
  DATA: 'data',
  VERBOSE: 'verbose',
} as const;

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare
export type TCHUNK_ACTION = typeof TCHUNK_ACTION[keyof typeof TCHUNK_ACTION];
