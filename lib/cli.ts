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
import yargs, { CommandModule } from 'yargs';

process.on('SIGPIPE', process.exit);

const jsoncmd: CommandModule<IJsonOption, IJsonOption> & { description: string } = {
  command: 'json',
  description: 'json output generate',
  builder: (argv) => builder(argv),
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
};

const mdcmd: CommandModule<IMarkdownOption, IMarkdownOption> & { description: string } = {
  command: 'md',
  description: 'markdown output generate',
  builder: (argv) => mdBuilder(builder(argv)),
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
};

const parser = yargs(process.argv.slice(2));

parser
  .command(jsoncmd as CommandModule<{}, IJsonOption>)
  .command(mdcmd as CommandModule<{}, IMarkdownOption>)
  .config(preLoadConfig())
  .demandCommand()
  .recommendCommands()
  .strict(true)
  .help();

(async () => {
  await parser.parse();
})();
