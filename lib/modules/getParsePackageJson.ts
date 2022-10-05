import { parse } from 'jsonc-parser';
import { isError } from 'my-easy-fp';
import { fail, pass, PassFailEither } from 'my-only-either';

export default function getParsePackageJson<T>(value: string): PassFailEither<Error, T> {
  try {
    const parsed = parse(value) as T;
    return pass(parsed);
  } catch (catched) {
    const err = isError(catched) ?? new Error('unknown error raised');
    return fail(err);
  }
}
