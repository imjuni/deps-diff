import builder from '@cli/builder';
import IOption from '@cli/interfaces/IOption';
import mdBuilder from '@cli/mdBuiilder';
import getDiffsJson from '@modules/getDiffsJson';
import getMarkdown from '@modules/getMarkdown';
import Printable from '@modules/Printable';
import fastSafeStringify from 'fast-safe-stringify';
import yargs, { Argv } from 'yargs';

process.on('SIGPIPE', process.exit);

const parser = yargs(process.argv.slice(2))
  .command<IOption>({
    command: 'json',
    builder: (argv) => {
      return builder(argv as Argv<IOption>);
    },
    handler: async (argv) => {
      Printable.out({ action: 'start', data: 'Compare two package.json' });

      const diffs = await getDiffsJson(argv);

      Printable.out({ action: 'data', data: fastSafeStringify(diffs) });
      Printable.out({ action: 'end', data: 'Compare complete!' });
    },
  })
  .command<IOption>({
    command: 'md',
    builder: (argv) => {
      return mdBuilder(builder(argv as Argv<IOption>));
    },
    handler: async (argv) => {
      Printable.out({ action: 'start', data: 'Compare two package.json' });

      const diffs = await getDiffsJson(argv);
      const md = getMarkdown(diffs, argv.depth);

      Printable.out({ action: 'data', data: md });
      Printable.out({ action: 'end', data: 'Compare complete!' });
    },
  })
  .help()
  .recommendCommands()
  .demandCommand();

(async () => {
  await parser.argv;
  process.exit(0);
})();
