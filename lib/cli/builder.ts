import IOption from '@cli/interfaces/IOption';
import { Argv } from 'yargs';

export default function builder(argv: Argv<IOption>): Argv<IOption> {
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
    .option('dependency', {
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
    .option('hash', {
      alias: 'h',
      description: 'git commit hash for comparison',
      type: 'string',
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
