import { DEPENDENCY } from '@configs/interfaces/DEPENDENCY';
import { LIST_SIGN } from '@configs/interfaces/LIST_SIGN';

export default interface IBaseOption {
  /**
   * project directory from which to extract version changes, if you not pass this option
   * that will be use cwd(current working directory)
   */
  project: string;

  /**
   * array of dependency type: dev, prod, peer
   *
   * - dev  devDependencies
   * - prod dependencies
   * - peer peerDependencies
   */
  dependencies: DEPENDENCY[];

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
  ignore: (
    | 'dev-add'
    | 'dev-remove'
    | 'dev-change'
    | 'prod-add'
    | 'prod-remove'
    | 'prod-change'
    | 'peer-add'
    | 'peer-remove'
    | 'peer-change'
  )[];

  /**
   * configuration file path, if you not pass this option that will be use find '.depsrc' first
   */
  config?: string;

  /**
   * previous git commit hash for comparison
   */
  prevHash?: string;

  /**
   * next git commit hash for comparison
   */
  nextHash?: string;

  /** list type of markdown document title */
  titleListType: LIST_SIGN;

  /** list type of markdown document dependency */
  depsListType: LIST_SIGN;

  /** list type of markdown document content */
  contentListType: LIST_SIGN;

  /** git binary filename */
  gitBinary: string;

  /** git base directory, `.git` directory path */
  gitBasedir?: string;
}
