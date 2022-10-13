import IJsonOption from '@configs/interfaces/IJsonOption';
import IMarkdownOption from '@configs/interfaces/IMarkdownOption';
import path from 'path';

export default function getGitBaseDir<T extends IJsonOption | IMarkdownOption>(option: T): string {
  const gitBasedir = option.gitBasedir ?? option.project;
  return path.isAbsolute(gitBasedir) ? gitBasedir : path.resolve(gitBasedir);
}
