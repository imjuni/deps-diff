import IOption from '@cli/interfaces/IOption';
import { Argv } from 'yargs';

export default function mdBuilder(argv: Argv<IOption>): Argv<IOption> {
  argv.option('depth', {
    description: 'output markdown heading depth',
    type: 'number',
    default: 2,
  });

  return argv;
}
