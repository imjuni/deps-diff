import IBaseOption from '@configs/interfaces/IBaseOption';
import { TDEPENDENCY } from '@configs/interfaces/TDEPENDENCY';
import { TIGNORE_ACTION } from '@configs/interfaces/TIGNORE_ACTION';
import { TLIST_SIGN } from '@configs/interfaces/TLIST_SIGN';
import { Argv } from 'yargs';

export default function builder<T extends IBaseOption>(argv: Argv<T>): Argv<T> {
  argv
    .option('project', {
      alias: 'p',
      description:
        'project directory from which to extract version changes, if you not pass this option that will be use cwd(current working directory)',
      type: 'string',
      default: process.cwd(),
    })
    .option('config', {
      alias: 'c',
      description: `configuration file path, if you not pass this option that will be use find '.depsrc' first`,
      type: 'string',
    })
    .option('verbose', {
      alias: 'v',
      description: `display verbose message, if you enable verbose option that will be disable cli spinner`,
      type: 'boolean',
      default: false,
    })
    .option('dependencies', {
      alias: 'd',
      description: `array of dependency type: dev, prod, peer`,
      type: 'string',
      choices: [TDEPENDENCY.DEV, TDEPENDENCY.PROD, TDEPENDENCY.PEER],
      array: true,
      default: [TDEPENDENCY.PROD],
    })
    .option('ignore', {
      alias: 'i',
      description: 'ignore specfic dependency with action',
      type: 'string',
      choices: [
        TIGNORE_ACTION.DEV_ADD,
        TIGNORE_ACTION.DEV_REMOVE,
        TIGNORE_ACTION.DEV_CHANGE,
        TIGNORE_ACTION.PROD_ADD,
        TIGNORE_ACTION.PROD_REMOVE,
        TIGNORE_ACTION.PROD_CHANGE,
        TIGNORE_ACTION.PEER_ADD,
        TIGNORE_ACTION.PEER_REMOVE,
        TIGNORE_ACTION.PEER_CHANGE,
      ],
      array: true,
      default: [],
    })
    .option('prev-hash', {
      description: 'previous git commit hash for comparison',
      type: 'string',
    })
    .option('next-hash', {
      description: 'next git commit hash for comparison',
      type: 'string',
    })
    .option('title-list-type', {
      description: 'list type of markdown document title',
      type: 'string',
      choices: [
        TLIST_SIGN.UNORDERED_TITLE,
        TLIST_SIGN.ORDERED,
        TLIST_SIGN.UNORDERED_ASTERISK,
        TLIST_SIGN.UNORDERED_MINUS,
        TLIST_SIGN.UNORDERED_PLUS,
      ],
      default: TLIST_SIGN.UNORDERED_TITLE,
    })
    .option('deps-list-type', {
      description: 'list type of markdown document dependency',
      type: 'string',
      choices: [
        TLIST_SIGN.ORDERED,
        TLIST_SIGN.UNORDERED_ASTERISK,
        TLIST_SIGN.UNORDERED_MINUS,
        TLIST_SIGN.UNORDERED_PLUS,
      ],
      default: TLIST_SIGN.UNORDERED_MINUS,
    })
    .option('content-list-type', {
      description: 'list type of markdown document content',
      type: 'string',
      choices: [
        TLIST_SIGN.ORDERED,
        TLIST_SIGN.UNORDERED_ASTERISK,
        TLIST_SIGN.UNORDERED_MINUS,
        TLIST_SIGN.UNORDERED_PLUS,
      ],
      default: TLIST_SIGN.UNORDERED_MINUS,
    })
    .option('git-basedir', {
      description: 'git base directory',
      type: 'string',
    })
    .option('git-binary', {
      description: 'git binary filename',
      type: 'string',
      default: 'git',
    });

  return argv;
}
