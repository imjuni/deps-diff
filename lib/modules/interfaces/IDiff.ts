import { TDEPENDENCY } from '@configs/interfaces/TDEPENDENCY';
import { TDIFF_TYPE } from '@modules/interfaces/TDIFF_TYPE';
import { ReleaseType } from 'semver';

export default interface IDiff {
  /**
   * action
   * - add add new dependencies
   * - change change dependencies version
   * - remove remove dependencies
   * */
  action: TDIFF_TYPE;

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
