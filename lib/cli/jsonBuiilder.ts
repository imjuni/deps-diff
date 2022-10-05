import IBaseOption from '@configs/interfaces/IBaseOption';
import IJsonOption from '@configs/interfaces/IJsonOption';
import { Argv } from 'yargs';

export default function jsonBuilder(argv: Argv<IBaseOption>): Argv<IJsonOption> {
  return argv as Argv<IJsonOption>;
}
