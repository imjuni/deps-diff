import IJsonOption from '@configs/interfaces/IJsonOption';
import IMarkdownOption from '@configs/interfaces/IMarkdownOption';
import TOptionWithAbsolutePath from '@configs/interfaces/TOptionWithAbsolutePath';
import getParseJson from '@modules/getParseJson';
import findUp from 'find-up';
import fs from 'fs';
import minimist from 'minimist';
import { existsSync, getDirnameSync } from 'my-node-fp';

function getConfigFilePath(argv: minimist.ParsedArgs) {
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
    const argv = minimist(process.argv.slice(2));

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
