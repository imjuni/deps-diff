import { DEPENDENCY } from '@configs/interfaces/DEPENDENCY';
import IMarkdownOption from '@configs/interfaces/IMarkdownOption';
import { LIST_SIGN } from '@configs/interfaces/LIST_SIGN';
import TOptionWithAbsolutePath from '@configs/interfaces/TOptionWithAbsolutePath';
import getDiffsJson from '@modules/getDiffsJson';
import { populate } from 'my-easy-fp';
import os from 'os';
import { AsyncReturnType } from 'type-fest';

function indent(size: number) {
  return populate(size * 2)
    .map(() => ' ')
    .join('');
}

function heading(depth: number) {
  return populate(depth)
    .map(() => '#')
    .join('');
}

function getListSign(listSign: LIST_SIGN, depth?: number) {
  if (listSign === LIST_SIGN.UNORDERED_ASTERISK) {
    return LIST_SIGN.UNORDERED_ASTERISK;
  }

  if (listSign === LIST_SIGN.UNORDERED_PLUS) {
    return LIST_SIGN.UNORDERED_PLUS;
  }

  if (listSign === LIST_SIGN.ORDERED) {
    return `${LIST_SIGN.ORDERED}.`;
  }

  if (listSign === LIST_SIGN.UNORDERED_TITLE) {
    return heading(depth ?? 2);
  }

  return '-';
}

export default function getMarkdown(
  diffs: AsyncReturnType<typeof getDiffsJson>,
  option: {
    dependencies: DEPENDENCY[];
    depth: TOptionWithAbsolutePath<IMarkdownOption>['depth'];
    titleListType: TOptionWithAbsolutePath<IMarkdownOption>['titleListType'];
    contentListType: TOptionWithAbsolutePath<IMarkdownOption>['contentListType'];
    depsListType: TOptionWithAbsolutePath<IMarkdownOption>['depsListType'];
  },
) {
  const contentSign = getListSign(option.contentListType);
  const depsListSign = getListSign(option.depsListType);

  const lines = option.dependencies
    .map((type) => {
      if (diffs[type].length > 0) {
        return [
          `${indent(1)}${depsListSign} ${type}`,
          ...diffs[type]
            .filter((diff) => diff.action === 'add')
            .map((diff) => `${indent(2)}${contentSign} add ${diff.name}: ${diff.next}`),
          ...diffs[type]
            .filter((diff) => diff.action === 'change')
            .map(
              (diff) =>
                `${indent(2)}${contentSign} change ${diff.name}: ${diff.prev} > ${diff.next}`,
            ),
          ...diffs[type]
            .filter((diff) => diff.action === 'remove')
            .map((diff) => `${indent(2)}${contentSign} remove ${diff.name}: ${diff.prev}`),
        ];
      }

      return [];
    })
    .flat();

  const titleSing = getListSign(option.titleListType, option.depth);
  return [`${titleSing} deps`, ...lines].join(os.EOL);
}
