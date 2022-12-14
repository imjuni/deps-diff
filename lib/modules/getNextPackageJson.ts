import IJsonOption from '@configs/interfaces/IJsonOption';
import IMarkdownOption from '@configs/interfaces/IMarkdownOption';
import IPackageJson from '@configs/interfaces/IPackageJson';
import IOptionWithAbsolutePath from '@configs/interfaces/TOptionWithAbsolutePath';
import getHashDir from '@modules/getHashDir';
import getPackageJsonFromGit from '@modules/getPackageJsonFromGit';
import getParseJson from '@modules/getParseJson';
import { TCHUNK_ACTION } from '@modules/interfaces/TCHUNK_ACTION';
import Printable from '@modules/Printable';
import fs from 'fs';
import { exists } from 'my-node-fp';
import path from 'path';
import { SimpleGit } from 'simple-git';

export default async function getNextPackageJson<T extends IJsonOption | IMarkdownOption>({
  option,
  git,
}: {
  option: IOptionWithAbsolutePath<T>;
  git: SimpleGit;
}) {
  if (option.nextHash != null) {
    Printable.out({
      action: TCHUNK_ACTION.VERBOSE,
      data: `Current-with-hash: ${option.nextHash}:${getHashDir(option)}`,
    });

    const nextPackageJson = await getPackageJsonFromGit({ option, git, hash: option.nextHash });

    if (nextPackageJson.type === 'fail') {
      console.error(
        `${option.nextHash} > ${option.absolute.packageJsonFileName} invalid json format`,
      );
      process.exit(1);
    }

    return nextPackageJson;
  }

  const packageJsonFilePath = path.resolve(
    path.join(option.absolute.project, option.absolute.packageJsonFileName),
  );

  if ((await exists(packageJsonFilePath)) === false) {
    console.error(`Cannot found package.json file: ${packageJsonFilePath}`);
  }

  Printable.out({
    action: TCHUNK_ACTION.VERBOSE,
    data: `Current-with-file: ${packageJsonFilePath}`,
  });

  const nextPackageJson = getParseJson<IPackageJson>(
    (await fs.promises.readFile(packageJsonFilePath)).toString(),
  );

  if (nextPackageJson.type === 'fail') {
    console.error(
      `\n${option.nextHash} > ${option.absolute.packageJsonFileName} invalid json format`,
    );
    process.exit(1);
  }

  return nextPackageJson;
}
