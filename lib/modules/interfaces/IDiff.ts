import { TDEPENDENCY } from '@configs/interfaces/TDEPENDENCY';
import { TACTION } from '@modules/interfaces/TACTION';
import { ReleaseType } from 'semver';

export default interface IDiff {
  /**
   * action
   * - add add new dependencies
   * - change change dependencies version
   * - remove remove dependencies
   * */
  action: TACTION;

  /**
   * dependency from
   * - dev from package.devDependencies
   * - prod from package.dependencies
   * - peer from package.peerDependencies
   */
  dependency: TDEPENDENCY;

  /** package name */
  name: string;

  /** package previous version */
  prev: string;

  /** package next(current) version */
  next: string;

  /** two version difference */
  semver?: ReleaseType;
}
