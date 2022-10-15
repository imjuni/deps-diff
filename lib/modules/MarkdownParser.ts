import { TDEPENDENCY } from '@configs/interfaces/TDEPENDENCY';
import { TLIST_SIGN } from '@configs/interfaces/TLIST_SIGN';
import AbstractParser from '@modules/AbstractParser';
import getMarkdown from '@modules/getMarkdown';
import IChunk from '@modules/interfaces/IChunk';
import IDiff from '@modules/interfaces/IDiff';
import ora from 'ora';

export default class MarkdownParser extends AbstractParser {
  #ora: ora.Ora;

  #depth: number;

  #titleListSign: TLIST_SIGN;

  #contentListSign: TLIST_SIGN;

  #depsListSign: TLIST_SIGN;

  constructor() {
    super();

    this.#ora = ora({ stream: process.stderr });
    this.#depth = 2;
    this.#titleListSign = TLIST_SIGN.UNORDERED_TITLE;
    this.#contentListSign = TLIST_SIGN.UNORDERED_MINUS;
    this.#depsListSign = TLIST_SIGN.UNORDERED_MINUS;
  }

  async finish(): Promise<void> {
    const rawJson = this.data.join('');
    const data: { dev: IDiff[]; prod: IDiff[]; peer: IDiff[] } = JSON.parse(rawJson);
    const md = getMarkdown(data, {
      dependencies: [TDEPENDENCY.DEV, TDEPENDENCY.PROD, TDEPENDENCY.PEER],
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
