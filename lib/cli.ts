import builder from '@cli/builder';
import mdBuilder from '@cli/mdBuiilder';
import IJsonOption from '@configs/interfaces/IJsonOption';
import IMarkdownOption from '@configs/interfaces/IMarkdownOption';
import preLoadConfig from '@configs/preLoadConfig';
import withAbsolutePath from '@configs/withAbsolute';
import getDiffsJson from '@modules/getDiffsJson';
import getMarkdown from '@modules/getMarkdown';
import Printable from '@modules/Printable';
import fastSafeStringify from 'fast-safe-stringify';
import yargs, { Argv } from 'yargs';

process.on('SIGPIPE', process.exit);

const parser = yargs(process.argv.slice(2))
  .command<IJsonOption>({
    command: 'json',
    builder: (argv) => {
      return builder(argv as any) as Argv<IJsonOption>;
    },
    handler: async (argv) => {
      Printable.out({ action: 'start', data: 'Compare two package.json' });

      const option = withAbsolutePath(argv);
      const diffs = await getDiffsJson(option);

      Printable.out({ action: 'data', data: fastSafeStringify(diffs) });
      Printable.out({ action: 'end', data: 'Compare complete!' });
    },
  })
  .command<IMarkdownOption>({
    command: 'md',
    builder: (argv) => {
      return mdBuilder(builder(argv as any));
    },
    handler: async (argv) => {
      Printable.out({ action: 'start', data: 'Compare two package.json' });

      const option = withAbsolutePath(argv);
      const diffs = await getDiffsJson(option);
      const md = getMarkdown(diffs, option);

      Printable.out({ action: 'data', data: md });
      Printable.out({ action: 'end', data: 'Compare complete!' });
    },
  })
  .help()
  .config(preLoadConfig())
  .recommendCommands()
  .demandCommand();

(async () => {
  await parser.argv;
})();
