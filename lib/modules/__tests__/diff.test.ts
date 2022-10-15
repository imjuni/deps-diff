import getDiffsJson from '@modules/getDiffsJson';
import * as env from '@modules/__tests__/data/env';
import 'jest';

test('getPackageJsonFromGit-case-01', async () => {
  const diffs = await getDiffsJson({
    ...env.mdOption,
    prevHash: '55433be50a9ada8a9ebc43e7812f35a469ef5c12',
    nextHash: '40c6c1efb5b919bc4afe165f755e9ab1a619e7f2',
  });

  const expectResult = {
    dev: [],
    prod: [
      {
        dependency: 'prod',
        action: 'add',
        name: 'find-up',
        next: '5.0.0',
        prev: 'N/A',
        semver: undefined,
      },
    ],
    peer: [],
  };

  expect(diffs).toEqual(expectResult);
});
