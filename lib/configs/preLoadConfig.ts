import IJsonOption from '@configs/interfaces/IJsonOption';
import IMarkdownOption from '@configs/interfaces/IMarkdownOption';
import TOptionWithAbsolutePath from '@configs/interfaces/TOptionWithAbsolutePath';
import getParseJson from '@modules/getParseJson';
import findUp from 'find-up';
import fs from 'fs';
import { existsSync, getDirnameSync } from 'my-node-fp';
import yargs from 'yargs';

function getConfigFilePath(argv: { c?: string; config?: string; p?: string; project?: string }) {
  const argvConfigFilePath = argv.c ?? argv.config;
  const argvProjectFilePath = argv.p ?? argv.project;
  const projectDirPath =
    argvProjectFilePath != null ? getDirnameSync(argvProjectFilePath) : undefined;

  const configFilePathSearchResultOnCwd = findUp.sync('.depsdiffrc');
  const configFilePathSearchProjectDirPath =
    projectDirPath != null ? findUp.sync('.depsdiffrc', { cwd: projectDirPath }) : undefined;

  return (
    argvConfigFilePath ?? configFilePathSearchResultOnCwd ?? configFilePathSearchProjectDirPath
  );
}

export default function preLoadConfig() {
  try {
    const argv = yargs(process.argv.slice(2)).parseSync() as any;

    const configFilePath = getConfigFilePath(argv);

    if (configFilePath == null || existsSync(configFilePath) === false) {
      return {};
    }

    const configBuf = fs.readFileSync(configFilePath);
    const parsed = getParseJson<
      TOptionWithAbsolutePath<Omit<IJsonOption & IMarkdownOption, 'type'>>
    >(configBuf.toString());

    if (parsed.type === 'fail') {
      return {};
    }

    return parsed.pass;
  } catch {
    return {};
  }
}
