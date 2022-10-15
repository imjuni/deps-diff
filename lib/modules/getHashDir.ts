import IOptionWithAbsolutePath from '@configs/interfaces/TOptionWithAbsolutePath';
import path from 'path';

export default function getHashDir<T>(option: IOptionWithAbsolutePath<T>) {
  return path.posix.join(
    path.relative(option.absolute.gitBaseDir, option.absolute.project),
    option.absolute.packageJsonFileName,
  );
}
