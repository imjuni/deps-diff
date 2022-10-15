import IChunk from '@modules/interfaces/IChunk';
import { TCHUNK_ACTION } from '@modules/interfaces/TCHUNK_ACTION';
import fastSafeStringify from 'fast-safe-stringify';
import ora from 'ora';
import os from 'os';

export class Printable {
  #ora: ora.Ora;

  #verbose: boolean;

  constructor() {
    this.#ora = ora({ stream: process.stderr });
    this.#verbose = false;
  }

  out(chunk: IChunk) {
    // pipe connected isTTY true, pipe not connected isTTY undefined
    if (process.stdout.isTTY === false && chunk.action !== TCHUNK_ACTION.VERBOSE) {
      // pipe attached
      process.stdout.write(fastSafeStringify(chunk));
      return;
    }

    // pipe connected isTTY true, pipe not connected isTTY undefined
    if (process.stdout.isTTY === false && chunk.action === TCHUNK_ACTION.VERBOSE) {
      return;
    }

    // not pipe
    if (chunk.action === TCHUNK_ACTION.START && this.#verbose === false) {
      this.#ora.start(chunk.data);
    } else if (chunk.action === TCHUNK_ACTION.START && this.#verbose === true) {
      console.log(`${os.EOL}${chunk.data}`);
    } else if (chunk.action === TCHUNK_ACTION.VERBOSE && this.#verbose === true) {
      console.log(chunk.data);
    } else if (chunk.action === TCHUNK_ACTION.DATA) {
      console.log(`${os.EOL}${chunk.data}`);
    } else if (chunk.action === TCHUNK_ACTION.END && this.#verbose === true) {
      console.log(`${os.EOL}${chunk.data}`);
    } else if (chunk.action === TCHUNK_ACTION.END && this.#verbose === false) {
      this.#ora.succeed(chunk.data);
      this.#ora.stop();
    }
  }

  get verbose() {
    return this.#verbose;
  }

  set verbose(value) {
    this.#verbose = value;
  }
}

const pipeout = new Printable();

export default pipeout;
