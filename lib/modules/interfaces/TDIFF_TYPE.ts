export const TDIFF_TYPE = {
  ADD: 'add',
  CHANGE: 'change',
  REMOVE: 'remove',
} as const;

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare
export type TDIFF_TYPE = typeof TDIFF_TYPE[keyof typeof TDIFF_TYPE];
