export const TLIST_SIGN = {
  UNORDERED_TITLE: '#',
  UNORDERED_MINUS: 'm',
  UNORDERED_PLUS: '+',
  UNORDERED_ASTERISK: '*',
  ORDERED: '1',
} as const;

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare
export type TLIST_SIGN = typeof TLIST_SIGN[keyof typeof TLIST_SIGN];
