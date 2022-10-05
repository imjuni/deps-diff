import AbstractParser from '@modules/AbstractParser';
import getMarkdown from '@modules/getMarkdown';
import IChunk from '@modules/interfaces/IChunk';
import IDiff from '@modules/interfaces/IDiff';
import ora from 'ora';

export default class MarkdownParser extends AbstractParser {
  #ora: ora.Ora;

  constructor() {
    super();

    this.#ora = ora({ stream: process.stderr });
  }

  async finish(): Promise<void> {
    const rawJson = this.data.join('');
    const data: { dev: IDiff[]; prod: IDiff[]; peer: IDiff[] } = JSON.parse(rawJson);
    const md = getMarkdown(data, 2);

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
