export const LIST_SIGN = {
  UNORDERED_TITLE: '#',
  UNORDERED_MINUS: 'm',
  UNORDERED_PLUS: '+',
  UNORDERED_ASTERISK: '*',
  ORDERED: '1',
} as const;

// eslint-disable-next-line
export type LIST_SIGN = typeof LIST_SIGN[keyof typeof LIST_SIGN];
