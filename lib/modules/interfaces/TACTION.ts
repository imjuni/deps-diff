export const TACTION = {
  ADD: 'add',
  CHANGE: 'change',
  REMOVE: 'remove',
} as const;

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare
export type TACTION = typeof TACTION[keyof typeof TACTION];
