import IJsonOption from '@configs/interfaces/IJsonOption';
import IMarkdownOption from '@configs/interfaces/IMarkdownOption';
import { TDEPENDENCY } from '@configs/interfaces/TDEPENDENCY';
import { TLIST_SIGN } from '@configs/interfaces/TLIST_SIGN';
import IOptionWithAbsolutePath from '@configs/interfaces/TOptionWithAbsolutePath';
import { cpus } from 'os';
import path from 'path';
import * as simpleGit from 'simple-git';

export const gitOptions: Partial<simpleGit.SimpleGitOptions> = {
  baseDir: '.',
  binary: 'git',
  maxConcurrentProcesses: cpus().length,
  trimmed: false,
};

export const mdOption: IOptionWithAbsolutePath<IMarkdownOption> = {
  type: 'markdown',
  project: '.',
  dependencies: [TDEPENDENCY.PROD, TDEPENDENCY.DEV],
  ignore: [],
  config: undefined,
  prevHash: undefined,
  nextHash: undefined,
  titleListType: TLIST_SIGN.UNORDERED_TITLE,
  depsListType: TLIST_SIGN.UNORDERED_ASTERISK,
  contentListType: TLIST_SIGN.UNORDERED_ASTERISK,
  gitBinary: 'git',
  gitBasedir: 'git',
  depth: 2,
  absolute: {
    project: path.resolve('.'),
    gitBaseDir: path.resolve('.'),
    packageJsonFileName: 'package.json',
  },
};

export const jsonOption: IOptionWithAbsolutePath<IJsonOption> = {
  type: 'json',
  project: '.',
  dependencies: [TDEPENDENCY.DEV, TDEPENDENCY.PROD],
  ignore: [],
  config: undefined,
  prevHash: undefined,
  nextHash: undefined,
  titleListType: TLIST_SIGN.UNORDERED_TITLE,
  depsListType: TLIST_SIGN.UNORDERED_ASTERISK,
  contentListType: TLIST_SIGN.UNORDERED_ASTERISK,
  gitBinary: 'git',
  gitBasedir: 'git',
  absolute: {
    project: path.resolve('.'),
    gitBaseDir: path.resolve('.'),
    packageJsonFileName: 'package.json',
  },
};
