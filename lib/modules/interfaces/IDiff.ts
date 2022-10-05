import { ReleaseType } from 'semver';

export default interface IDiff {
  /**
   * action
   * - add add new dependencies
   * - change change dependencies version
   * - remove remove dependencies
   * */
  action: 'add' | 'change' | 'remove';

  /**
   * dependency from
   * - dev from package.devDependencies
   * - prod from package.dependencies
   * - peer from package.peerDependencies
   */
  dependency: 'dev' | 'prod' | 'peer';

  /** package name */
  name: string;

  /** package previous version */
  prev: string;

  /** package next(current) version */
  next: string;

  /** two version difference */
  semver?: ReleaseType;
}
