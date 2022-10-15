import { TDEPENDENCY } from '@configs/interfaces/TDEPENDENCY';
import { TIGNORE_ACTION } from '@configs/interfaces/TIGNORE_ACTION';
import { TLIST_SIGN } from '@configs/interfaces/TLIST_SIGN';

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
  dependencies: TDEPENDENCY[];

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
  ignore: TIGNORE_ACTION[];

  /**
   * configuration file path, if you not pass this option that will be use find '.depsrc' first
   */
  config?: string;

  /**
   * display verbose message, if you enable verbose option that will be disable cli spinner
   */
  verbose: boolean;

  /**
   * previous git commit hash for comparison
   */
  prevHash?: string;

  /**
   * next git commit hash for comparison
   */
  nextHash?: string;

  /** list type of markdown document title */
  titleListType: TLIST_SIGN;

  /** list type of markdown document dependency */
  depsListType: TLIST_SIGN;

  /** list type of markdown document content */
  contentListType: TLIST_SIGN;

  /** git binary filename */
  gitBinary: string;

  /** git base directory, `.git` directory path */
  gitBasedir?: string;
}
