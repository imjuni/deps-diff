import IBaseOption from '@configs/interfaces/IBaseOption';
import { TLIST_SIGN } from '@configs/interfaces/TLIST_SIGN';
import { Argv } from 'yargs';

export default function builder(argv: Argv<IBaseOption>): Argv<IBaseOption> {
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
    .option('dependencies', {
      alias: 'd',
      description: `array of dependency type: dev, prod, peer`,
      type: 'string',
      choices: ['dev', 'prod', 'peer'],
      array: true,
      default: ['prod'],
    })
    .option('ignore', {
      alias: 'i',
      description: 'ignore specfic dependency with action',
      type: 'string',
      choices: [
        'dev-add',
        'dev-remove',
        'dev-change',
        'prod-add',
        'prod-remove',
        'prod-change',
        'peer-add',
        'peer-remove',
        'peer-change',
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
