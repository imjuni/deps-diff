import IJsonOption from '@configs/interfaces/IJsonOption';
import IMarkdownOption from '@configs/interfaces/IMarkdownOption';
import IPackageJson from '@configs/interfaces/IPackageJson';
import IOptionWithAbsolutePath from '@configs/interfaces/TOptionWithAbsolutePath';
import getParseJson from '@modules/getParseJson';
import path from 'path';
import { SimpleGit } from 'simple-git';

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
    await git.show(
      `${hash}:${path.join(
        option.absolute.project.replace(option.absolute.gitBaseDir, ''),
        option.absolute.packageJsonFileName,
      )}`,
    ),
  );

  return prevPackageJson;
}
