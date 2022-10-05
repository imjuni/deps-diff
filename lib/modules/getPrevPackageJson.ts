import IJsonOption from '@configs/interfaces/IJsonOption';
import IMarkdownOption from '@configs/interfaces/IMarkdownOption';
import IOptionWithAbsolutePath from '@configs/interfaces/TOptionWithAbsolutePath';
import getPackageJsonFromGit from '@modules/getPackageJsonFromGit';
import { SimpleGit } from 'simple-git';

export default async function getPrevPackageJson<T extends IJsonOption | IMarkdownOption>({
  option,
  git,
}: {
  option: IOptionWithAbsolutePath<T>;
  git: SimpleGit;
}) {
  if (option.prevHash != null) {
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

  const prevPackageJson = await getPackageJsonFromGit({ option, git, hash: gitlogs.latest.hash });

  if (prevPackageJson.type === 'fail') {
    console.error(
      `${gitlogs.latest.hash} > ${option.absolute.packageJsonFileName} invalid json format`,
    );
    process.exit(1);
  }

  return prevPackageJson;
}
