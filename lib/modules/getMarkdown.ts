import IMarkdownOption from '@configs/interfaces/IMarkdownOption';
import { TDEPENDENCY } from '@configs/interfaces/TDEPENDENCY';
import { TLIST_SIGN } from '@configs/interfaces/TLIST_SIGN';
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

function getListSign(listSign: TLIST_SIGN, depth?: number) {
  if (listSign === TLIST_SIGN.UNORDERED_ASTERISK) {
    return TLIST_SIGN.UNORDERED_ASTERISK;
  }

  if (listSign === TLIST_SIGN.UNORDERED_PLUS) {
    return TLIST_SIGN.UNORDERED_PLUS;
  }

  if (listSign === TLIST_SIGN.ORDERED) {
    return `${TLIST_SIGN.ORDERED}.`;
  }

  if (listSign === TLIST_SIGN.UNORDERED_TITLE) {
    return heading(depth ?? 2);
  }

  return '-';
}

export default function getMarkdown(
  diffs: AsyncReturnType<typeof getDiffsJson>,
  option: {
    dependencies: TDEPENDENCY[];
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
