import IJsonOption from '@configs/interfaces/IJsonOption';
import IMarkdownOption from '@configs/interfaces/IMarkdownOption';
import IPackageJson from '@configs/interfaces/IPackageJson';
import IOptionWithAbsolutePath from '@configs/interfaces/TOptionWithAbsolutePath';
import getParseJson from '@modules/getParseJson';
import path from 'path';
import { SimpleGit } from 'simple-git';

function getHashDir<T>(option: IOptionWithAbsolutePath<T>) {
  if (option.absolute.gitBaseDir !== option.absolute.project) {
    return path.posix.join(
      path.relative(option.absolute.gitBaseDir, option.absolute.project),
      option.absolute.packageJsonFileName,
    );
  }

  return option.absolute.project;
}

export default async function getPackageJsonFromGit<T extends IJsonOption | IMarkdownOption>({
  git,
  option,
  hash,
}: {
  git: SimpleGit;
  option: IOptionWithAbsolutePath<T>;
  hash: string;
}): Promise<ReturnType<typeof getParseJson<IPackageJson>>> {
  const prevPackageJson = getParseJson<IPackageJson>(
    await git.show(`${hash}:${getHashDir(option)}`),
  );

  return prevPackageJson;
}
