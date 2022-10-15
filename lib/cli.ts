import builder from '@cli/builder';
import mdBuilder from '@cli/mdBuiilder';
import IJsonOption from '@configs/interfaces/IJsonOption';
import IMarkdownOption from '@configs/interfaces/IMarkdownOption';
import preLoadConfig from '@configs/preLoadConfig';
import withAbsolutePath from '@configs/withAbsolute';
import getDiffsJson from '@modules/getDiffsJson';
import getMarkdown from '@modules/getMarkdown';
import { TCHUNK_ACTION } from '@modules/interfaces/TCHUNK_ACTION';
import Printable from '@modules/Printable';
import fastSafeStringify from 'fast-safe-stringify';
import os from 'os';
import yargs, { Argv } from 'yargs';

process.on('SIGPIPE', process.exit);

const parser = yargs(process.argv.slice(2))
  .command<IJsonOption>({
    command: 'json',
    builder: (argv) => {
      return builder(argv as any) as Argv<IJsonOption>;
    },
    handler: async (argv) => {
      Printable.verbose = argv.verbose;
      Printable.out({ action: TCHUNK_ACTION.START, data: 'Compare two package.json' });

      const option = withAbsolutePath(argv);

      Printable.out({
        action: TCHUNK_ACTION.VERBOSE,
        data: `${os.EOL}Project Directory: ${option.absolute.project}`,
      });
      Printable.out({
        action: TCHUNK_ACTION.VERBOSE,
        data: `Git base Directory: ${option.absolute.gitBaseDir}${os.EOL}`,
      });

      const diffs = await getDiffsJson(option);

      Printable.out({ action: TCHUNK_ACTION.END, data: 'Compare complete!' });
      Printable.out({ action: TCHUNK_ACTION.DATA, data: fastSafeStringify(diffs) });
    },
  })
  .command<IMarkdownOption>({
    command: 'md',
    builder: (argv) => {
      return mdBuilder(builder(argv as any));
    },
    handler: async (argv) => {
      Printable.verbose = argv.verbose;
      Printable.out({ action: TCHUNK_ACTION.START, data: 'Compare two package.json' });

      const option = withAbsolutePath(argv);

      Printable.out({
        action: TCHUNK_ACTION.VERBOSE,
        data: `${os.EOL}Project Directory: ${option.absolute.project}`,
      });
      Printable.out({
        action: TCHUNK_ACTION.VERBOSE,
        data: `Git base Directory: ${option.absolute.gitBaseDir}${os.EOL}`,
      });

      const diffs = await getDiffsJson(option);
      const md = getMarkdown(diffs, option);

      Printable.out({ action: TCHUNK_ACTION.END, data: 'Compare complete!' });
      Printable.out({ action: TCHUNK_ACTION.DATA, data: md });
    },
  })
  .help()
  .config(preLoadConfig())
  .recommendCommands()
  .demandCommand();

(async () => {
  await parser.argv;
})();
