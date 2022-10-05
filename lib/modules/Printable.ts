import IChunk from '@modules/interfaces/IChunk';
import fastSafeStringify from 'fast-safe-stringify';
import ora from 'ora';
import os from 'os';

export class Printable {
  #ora: ora.Ora;

  constructor() {
    this.#ora = ora({ stream: process.stderr });
  }

  out(chunk: IChunk) {
    // pipe connected isTTY true, pipe not connected isTTY undefined
    if (process.stdout.isTTY === true) {
      // not pipe
      if (chunk.action === 'start') {
        this.#ora.start(chunk.data);
      } else if (chunk.action === 'data') {
        console.log(`${os.EOL}${chunk.data}`);
      } else {
        this.#ora.text = chunk.data;
        this.#ora.stop();
      }
      return;
    }

    // pipe attached
    process.stdout.write(fastSafeStringify(chunk));
  }
}

const pipeout = new Printable();

export default pipeout;
