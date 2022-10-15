export const LIST_SIGN = {
  UNORDERED_TITLE: '#',
  UNORDERED_MINUS: 'm',
  UNORDERED_PLUS: '+',
  UNORDERED_ASTERISK: '*',
  ORDERED: '1',
} as const;

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare
export type LIST_SIGN = typeof LIST_SIGN[keyof typeof LIST_SIGN];
