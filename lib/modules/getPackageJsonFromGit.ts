import IJsonOption from '@configs/interfaces/IJsonOption';
import IMarkdownOption from '@configs/interfaces/IMarkdownOption';
import IPackageJson from '@configs/interfaces/IPackageJson';
import IOptionWithAbsolutePath from '@configs/interfaces/TOptionWithAbsolutePath';
import getParseJson from '@modules/getParseJson';
import { isError } from 'my-easy-fp';
import { fail } from 'my-only-either';
import path from 'path';
import { SimpleGit } from 'simple-git';

function getHashDir<T>(option: IOptionWithAbsolutePath<T>) {
  return path.posix.join(
    path.relative(option.absolute.gitBaseDir, option.absolute.project),
    option.absolute.packageJsonFileName,
  );
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
  try {
    const prevPackageJson = getParseJson<IPackageJson>(
      await git.show(`${hash}:${getHashDir(option)}`),
    );

    return prevPackageJson;
  } catch (catched) {
    const err = isError(catched) ?? new Error('unknown error raised from `getPackageJsonFromGit`');
    return fail(err);
  }
}
