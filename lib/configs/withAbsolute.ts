import IJsonOption from '@configs/interfaces/IJsonOption';
import IMarkdownOption from '@configs/interfaces/IMarkdownOption';
import IOptionWithAbsolutePath from '@configs/interfaces/TOptionWithAbsolutePath';
import getGitBaseDir from '@modules/getGitBaseDir';
import path from 'path';

export default function withAbsolutePath<T extends IJsonOption | IMarkdownOption>(
  option: T,
): IOptionWithAbsolutePath<T> {
  const project = path.isAbsolute(option.project) ? path.resolve(option.project) : option.project;
  const gitBaseDir = getGitBaseDir(option);

  return { ...option, absolute: { project, gitBaseDir, packageJsonFileName: 'package.json' } };
}
