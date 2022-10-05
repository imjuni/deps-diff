import IBaseOption from '@configs/interfaces/IBaseOption';
import IMarkdownOption from '@configs/interfaces/IMarkdownOption';
import { Argv } from 'yargs';

export default function mdBuilder(argv: Argv<IBaseOption>): Argv<IMarkdownOption> {
  argv.option('depth', {
    description: 'output markdown heading depth',
    type: 'number',
    default: 2,
  });

  return argv as Argv<IMarkdownOption>;
}
