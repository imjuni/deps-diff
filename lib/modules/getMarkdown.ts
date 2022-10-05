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

export default function getMarkdown(diffs: AsyncReturnType<typeof getDiffsJson>, depth: number) {
  const types: (keyof AsyncReturnType<typeof getDiffsJson>)[] = ['dev', 'prod', 'peer'];

  const lines = types
    .map((type) => {
      if (diffs[type].length > 0) {
        return [
          `${indent(1)}- ${type}`,
          ...diffs[type]
            .filter((diff) => diff.action === 'add')
            .map((diff) => `${indent(2)}- add ${diff.name}: ${diff.next}`),
          ...diffs[type]
            .filter((diff) => diff.action === 'change')
            .map((diff) => `${indent(2)}- change ${diff.name}: ${diff.prev} > ${diff.next}`),
          ...diffs[type]
            .filter((diff) => diff.action === 'remove')
            .map((diff) => `${indent(2)}- remove ${diff.name}: ${diff.prev}`),
        ];
      }

      return [];
    })
    .flat();

  return [`${heading(depth)} deps`, ...lines].join(os.EOL);
}
