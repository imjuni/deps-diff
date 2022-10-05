import IBaseOption from '@configs/interfaces/IBaseOption';
import IJsonOption from '@configs/interfaces/IJsonOption';
import IMarkdownOption from '@configs/interfaces/IMarkdownOption';
import IPackageJson from '@configs/interfaces/IPackageJson';
import TOptionWithAbsolutePath from '@configs/interfaces/TOptionWithAbsolutePath';
import getDiff from '@modules/getDiff';
import getNextPackageJson from '@modules/getNextPackageJson';
import getPrevPackageJson from '@modules/getPrevPackageJson';
import IDiff from '@modules/interfaces/IDiff';
import { exists, isDescendant } from 'my-node-fp';
import { cpus } from 'os';
import * as simpleGit from 'simple-git';
import { LastArrayElement } from 'type-fest';

type TDependencies = keyof Pick<
  IPackageJson,
  'dependencies' | 'devDependencies' | 'peerDependencies'
>;

type TDependencyMap = Record<LastArrayElement<IBaseOption['dependency']>, TDependencies>;

const dependencyMap: TDependencyMap = {
  dev: 'devDependencies',
  prod: 'dependencies',
  peer: 'peerDependencies',
};

export default async function getDiffsJson<T extends IJsonOption | IMarkdownOption>(
  option: TOptionWithAbsolutePath<T>,
) {
  try {
    if ((await exists(option.absolute.project)) === false) {
      console.error(`Cannot found project directory: ${option.absolute.project}`);
    }

    if (
      option.absolute.gitBaseDir !== option.absolute.project &&
      isDescendant(option.absolute.gitBaseDir, option.absolute.project) === false
    ) {
      console.error(
        `Project directory have to descendant of git-basedir:${option.absolute.gitBaseDir} > ${option.absolute.project}`,
      );
    }

    const options: Partial<simpleGit.SimpleGitOptions> = {
      baseDir: option.absolute.gitBaseDir,
      binary: option.gitBinary,
      maxConcurrentProcesses: cpus().length,
      trimmed: false,
    };

    const git = simpleGit.default(options);

    const packageJson = await getNextPackageJson({ option, git });
    const prevPackageJson = await getPrevPackageJson({ option, git });

    const dependencies = option.dependency.reduce<{ dev: IDiff[]; prod: IDiff[]; peer: IDiff[] }>(
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
        (diff) => option.ignore.includes(`${diff.dependency}-${diff.action}`) === false,
      ),
      prod: dependencies.prod.filter(
        (diff) => option.ignore.includes(`${diff.dependency}-${diff.action}`) === false,
      ),
      peer: dependencies.peer.filter(
        (diff) => option.ignore.includes(`${diff.dependency}-${diff.action}`) === false,
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
