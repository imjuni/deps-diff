import IOption from '@cli/interfaces/IOption';
import IPackageJson from '@configs/interfaces/IPackageJson';
import getDiff from '@modules/getDiff';
import getParsePackageJson from '@modules/getParsePackageJson';
import IDiff from '@modules/interfaces/IDiff';
import fs from 'fs';
import { exists, isDescendant } from 'my-node-fp';
import { cpus } from 'os';
import path from 'path';
import * as simpleGit from 'simple-git';
import { LastArrayElement } from 'type-fest';
import { ArgumentsCamelCase } from 'yargs';

type TDependencies = keyof Pick<
  IPackageJson,
  'dependencies' | 'devDependencies' | 'peerDependencies'
>;

type TDependencyMap = Record<LastArrayElement<IOption['dependency']>, TDependencies>;

const dependencyMap: TDependencyMap = {
  dev: 'devDependencies',
  prod: 'dependencies',
  peer: 'peerDependencies',
};

function getGitBaseDir(argv: ArgumentsCamelCase<IOption>): string {
  const gitBasedir = argv.gitBasedir ?? argv.project;
  return path.isAbsolute(gitBasedir) ? path.resolve(gitBasedir) : gitBasedir;
}

export default async function getDiffsJson(argv: ArgumentsCamelCase<IOption>) {
  try {
    const project = path.isAbsolute(argv.project) ? path.resolve(argv.project) : argv.project;
    const gitBaseDir = getGitBaseDir(argv);

    if ((await exists(project)) === false) {
      console.error(`Cannot found project directory: ${project}`);
    }

    if (gitBaseDir !== project && isDescendant(gitBaseDir, project) === false) {
      console.error(
        `Project directory have to descendant of git-basedir:${gitBaseDir} > ${project}`,
      );
    }

    const packageJsonFileName = 'package.json';
    const packageJsonFilePath = path.resolve(path.join(project, packageJsonFileName));

    if ((await exists(packageJsonFilePath)) === false) {
      console.error(`Cannot found package.json file: ${packageJsonFilePath}`);
    }

    const options: Partial<simpleGit.SimpleGitOptions> = {
      baseDir: gitBaseDir,
      binary: argv.gitBinary,
      maxConcurrentProcesses: cpus().length,
      trimmed: false,
    };

    const packageJson = getParsePackageJson<IPackageJson>(
      (await fs.promises.readFile(packageJsonFilePath)).toString(),
    );

    if (packageJson.type === 'fail') {
      console.error(`${packageJsonFilePath}: invalid json format`);
      process.exit(1);
    }

    const git = simpleGit.default(options);

    const hash = await (async () => {
      if (argv.hash == null) {
        const gitlogs = await git.log({ maxCount: 5 });

        if (gitlogs.latest == null) {
          if (argv.hash == null) {
            console.error('Cannot found latest commit');
            process.exit(1);
          }

          console.error(`Cannot found ${argv.hash} commit`);
          process.exit(1);
        }

        return gitlogs.latest.hash;
      }

      return argv.hash;
    })();

    const prevPackageJson = getParsePackageJson<IPackageJson>(
      await git.show(`${hash}:${path.join(project.replace(gitBaseDir, ''), packageJsonFileName)}`),
    );

    if (prevPackageJson.type === 'fail') {
      console.error(`${packageJsonFilePath}: invalid json format`);
      process.exit(1);
    }

    const dependencies = argv.dependency.reduce<{ dev: IDiff[]; prod: IDiff[]; peer: IDiff[] }>(
      (aggregation, dependency) => {
        const currentDependencies: Record<string, string> =
          packageJson.pass[dependencyMap[dependency]] ?? {};
        const prevDependencies: Record<string, string> =
          prevPackageJson.pass[dependencyMap[dependency]] ?? {};

        const diff = getDiff({
          type: dependency,
          next: currentDependencies,
          prev: prevDependencies,
        });

        return { ...aggregation, [dependency]: diff };
      },
      {
        dev: [],
        prod: [],
        peer: [],
      },
    );

    const filtered = {
      dev: dependencies.dev.filter(
        (diff) => argv.ignore.includes(`${diff.dependency}-${diff.action}`) === false,
      ),
      prod: dependencies.prod.filter(
        (diff) => argv.ignore.includes(`${diff.dependency}-${diff.action}`) === false,
      ),
      peer: dependencies.peer.filter(
        (diff) => argv.ignore.includes(`${diff.dependency}-${diff.action}`) === false,
      ),
    };

    return filtered;
  } catch (catched) {
    return {
      dev: [],
      prod: [],
      peer: [],
    };
  }
}
