export default interface IPackageJson {
  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#name */
  name: string;

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#version */
  version: string;

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#description */
  description?: string;

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#keywords */
  keywords?: string[];

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#homepage */
  homepage?: string;

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#bugs */
  bugs?: {
    url: string;
    email: string;
  };

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#license */
  license?: string;

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#author */
  author?: string;

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#contributors */
  contributors?: string[];

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#funding */
  funding?:
    | {
        type: string;
        url: string;
      }
    | {
        type: string;
        url: string;
      }[];

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#files */
  files?: string[];

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#main */
  main?: string;

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#browser */
  browser?: string;

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#bin */
  bin?: string | Record<string, string>;

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#man */
  man?: string | string[];

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#directories */
  directories?: {
    bin: string;
    doc: string;
    lib: string;
    man: string;
  };

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#repository */
  repository?:
    | string
    | {
        type: string;
        url: string;
        directory: string;
      };

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#scripts */
  scripts?: Record<string, string>;

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#config */
  config?: Record<string, any>;

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#licenses */
  licenses?: { type: string; url: string }[];

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#engines */
  engines?: {
    node: string;
    npm: string;
  };

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#os */
  os?: string[];

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#cpu */
  cpu?: string[];

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#private */
  private?: boolean;

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#workspaces */
  workspaces?: string;

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#dependencies */
  dependencies?: Record<string, string>;

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#devDependencies */
  devDependencies?: Record<string, string>;

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#peerDependencies */
  peerDependencies?: Record<string, string>;

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#peerDependenciesMeta */
  peerDependenciesMeta?: Record<string, Record<string, { optional: boolean }>>;

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#bundleDependencies */
  bundleDependencies?: string[];

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json#optionalDependencies */
  optionalDependencies?: string[];

  /** https://docs.npmjs.com/cli/v8/configuring-npm/package-json# overrides */
  overrides?: string[];
}
