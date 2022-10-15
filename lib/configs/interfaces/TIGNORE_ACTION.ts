/**
 * ignore specfic dependency with action
 *
 * - dev-add    devDependencies `add` action ignore
 * - dev-remove devDependencies `remove` action ignore
 * - dev-change devDependencies `change` action ignore
 * - prod-add    dependencies `add` action ignore
 * - prod-remove dependencies `remove` action ignore
 * - prod-change dependencies `change` action ignore
 * - peer-add    peerDependencies `add` action ignore
 * - peer-remove peerDependencies `remove` action ignore
 * - peer-change peerDependencies `change` action ignore
 */
export const TIGNORE_ACTION = {
  DEV_ADD: 'dev-add',
  DEV_REMOVE: 'dev-remove',
  DEV_CHANGE: 'dev-change',
  PROD_ADD: 'prod-add',
  PROD_REMOVE: 'prod-remove',
  PROD_CHANGE: 'prod-change',
  PEER_ADD: 'peer-add',
  PEER_REMOVE: 'peer-remove',
  PEER_CHANGE: 'peer-change',
} as const;

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare
export type TIGNORE_ACTION = typeof TIGNORE_ACTION[keyof typeof TIGNORE_ACTION];
