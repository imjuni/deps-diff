import { DEPENDENCY } from '@configs/interfaces/DEPENDENCY';
import { LIST_SIGN } from '@configs/interfaces/LIST_SIGN';
import AbstractParser from '@modules/AbstractParser';
import getMarkdown from '@modules/getMarkdown';
import IChunk from '@modules/interfaces/IChunk';
import IDiff from '@modules/interfaces/IDiff';
import ora from 'ora';

export default class MarkdownParser extends AbstractParser {
  #ora: ora.Ora;

  #depth: number;

  #titleListSign: LIST_SIGN;

  #contentListSign: LIST_SIGN;

  #depsListSign: LIST_SIGN;

  constructor() {
    super();

    this.#ora = ora({ stream: process.stderr });
    this.#depth = 2;
    this.#titleListSign = LIST_SIGN.UNORDERED_TITLE;
    this.#contentListSign = LIST_SIGN.UNORDERED_MINUS;
    this.#depsListSign = LIST_SIGN.UNORDERED_MINUS;
  }

  async finish(): Promise<void> {
    const rawJson = this.data.join('');
    const data: { dev: IDiff[]; prod: IDiff[]; peer: IDiff[] } = JSON.parse(rawJson);
    const md = getMarkdown(data, {
      dependencies: [DEPENDENCY.DEV, DEPENDENCY.PROD, DEPENDENCY.PEER],
      contentListType: this.#contentListSign,
      titleListType: this.#titleListSign,
      depsListType: this.#depsListSign,
      depth: this.#depth,
    });

    console.log(md);
  }

  async start(chunk: IChunk) {
    this.#ora.start(chunk.data);
  }

  async end(chunk: IChunk) {
    this.#ora.text = chunk.data;
    this.#ora.stop();
  }
}
