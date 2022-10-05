import IChunk from '@modules/interfaces/IChunk';
import { isError } from 'my-easy-fp';
import { fail, pass, PassFailEither } from 'my-only-either';

export default abstract class AbstractParser {
  static jsonParse<T>(value: string): PassFailEither<Error, T> {
    try {
      const parsed = JSON.parse(value);
      return pass(parsed);
    } catch (catched) {
      const err = isError(catched) ?? new Error('unknown error raised');
      return fail(err);
    }
  }

  #writable: NodeJS.Socket;

  #data: string[];

  constructor() {
    this.#writable = process.openStdin();
    this.#data = [];
  }

  get data() {
    return this.#data;
  }

  init() {
    this.#writable.on('data', this.receive.bind(this));
    this.#writable.on('end', this.finish.bind(this));
  }

  receive(chunk: Buffer) {
    const parsed = AbstractParser.jsonParse<IChunk>(chunk.toString());

    if (parsed.type === 'fail') {
      return;
    }

    if (parsed.pass.action === 'data') {
      this.#data.push(parsed.pass.data);
    } else if (parsed.pass.action === 'start') {
      this.start(parsed.pass);
    } else if (parsed.pass.action === 'end') {
      this.end(parsed.pass);
    }
  }

  abstract finish(): Promise<void>;
  abstract start(chunk: IChunk): Promise<void>;
  abstract end(chunk: IChunk): Promise<void>;
}
