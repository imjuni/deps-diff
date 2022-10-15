import { DEPENDENCY } from '@configs/interfaces/DEPENDENCY';
import IJsonOption from '@configs/interfaces/IJsonOption';
import IMarkdownOption from '@configs/interfaces/IMarkdownOption';
import { LIST_SIGN } from '@configs/interfaces/LIST_SIGN';
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
  dependencies: [DEPENDENCY.PROD, DEPENDENCY.DEV],
  ignore: [],
  config: undefined,
  prevHash: undefined,
  nextHash: undefined,
  titleListType: LIST_SIGN.UNORDERED_TITLE,
  depsListType: LIST_SIGN.UNORDERED_ASTERISK,
  contentListType: LIST_SIGN.UNORDERED_ASTERISK,
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
  dependencies: [DEPENDENCY.DEV, DEPENDENCY.PROD],
  ignore: [],
  config: undefined,
  prevHash: undefined,
  nextHash: undefined,
  titleListType: LIST_SIGN.UNORDERED_TITLE,
  depsListType: LIST_SIGN.UNORDERED_ASTERISK,
  contentListType: LIST_SIGN.UNORDERED_ASTERISK,
  gitBinary: 'git',
  gitBasedir: 'git',
  absolute: {
    project: path.resolve('.'),
    gitBaseDir: path.resolve('.'),
    packageJsonFileName: 'package.json',
  },
};
