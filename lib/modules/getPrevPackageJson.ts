import IJsonOption from '@configs/interfaces/IJsonOption';
import IMarkdownOption from '@configs/interfaces/IMarkdownOption';
import IOptionWithAbsolutePath from '@configs/interfaces/TOptionWithAbsolutePath';
import getHashDir from '@modules/getHashDir';
import getPackageJsonFromGit from '@modules/getPackageJsonFromGit';
import { TCHUNK_ACTION } from '@modules/interfaces/TCHUNK_ACTION';
import Printable from '@modules/Printable';
import { SimpleGit } from 'simple-git';

export default async function getPrevPackageJson<T extends IJsonOption | IMarkdownOption>({
  option,
  git,
}: {
  option: IOptionWithAbsolutePath<T>;
  git: SimpleGit;
}) {
  if (option.prevHash != null) {
    Printable.out({
      action: TCHUNK_ACTION.VERBOSE,
      data: `Previous-with-hash: ${option.prevHash}:${getHashDir(option)}`,
    });

    const prevPackageJson = await getPackageJsonFromGit({ option, git, hash: option.prevHash });

    if (prevPackageJson.type === 'fail') {
      console.error(
        `${option.prevHash} > ${option.absolute.packageJsonFileName} invalid json format`,
      );
      process.exit(1);
    }

    return prevPackageJson;
  }

  const gitlogs = await git.log({ maxCount: 5 });

  if (gitlogs.latest == null) {
    if (option.prevHash == null) {
      console.error('Cannot found latest commit');
      process.exit(1);
    }

    console.error(`Cannot found ${option.prevHash} commit`);
    process.exit(1);
  }

  Printable.out({
    action: TCHUNK_ACTION.VERBOSE,
    data: `Previous-with-latest: ${gitlogs.latest.hash}:${getHashDir(option)}`,
  });

  const prevPackageJson = await getPackageJsonFromGit({ option, git, hash: gitlogs.latest.hash });

  if (prevPackageJson.type === 'fail') {
    console.error(
      `${gitlogs.latest.hash} > ${option.absolute.packageJsonFileName} invalid json format`,
    );
    process.exit(1);
  }

  return prevPackageJson;
}
