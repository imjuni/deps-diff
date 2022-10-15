import getNextPackageJson from '@modules/getNextPackageJson';
import getPackageJsonFromGit from '@modules/getPackageJsonFromGit';
import getPrevPackageJson from '@modules/getPrevPackageJson';
import getPackageJsonFromGitCase01 from '@modules/__tests__/data//getPackageJsonFromGit-case-01';
import * as env from '@modules/__tests__/data/env';
import 'jest';
import * as simpleGit from 'simple-git';

test('getPackageJsonFromGit-case-01', async () => {
  const git = simpleGit.default(env.gitOptions);
  const packageJson = await getPackageJsonFromGit({
    git,
    option: env.mdOption,

    // second commit of deps-diff
    hash: '55433be50a9ada8a9ebc43e7812f35a469ef5c12',
  });

  expect(packageJson).toEqual(getPackageJsonFromGitCase01);
});

test('getPrevPackageJson-case-01', async () => {
  const git = simpleGit.default(env.gitOptions);
  const packageJson = await getPrevPackageJson({
    git,
    option: { ...env.mdOption, prevHash: '55433be50a9ada8a9ebc43e7812f35a469ef5c12' },
  });

  expect(packageJson).toEqual(getPackageJsonFromGitCase01);
});

test('getPrevPackageJson-case-02', async () => {
  const git = simpleGit.default(env.gitOptions);
  const packageJson = await getPrevPackageJson({
    git,
    option: { ...env.mdOption },
  });

  expect(packageJson.type).toEqual('pass');
});

test('getNextPackageJson-case-01', async () => {
  const git = simpleGit.default(env.gitOptions);
  const packageJson = await getNextPackageJson({
    git,
    option: { ...env.mdOption, nextHash: '55433be50a9ada8a9ebc43e7812f35a469ef5c12' },
  });

  expect(packageJson).toEqual(getPackageJsonFromGitCase01);
});

test('getNextPackageJson-case-01', async () => {
  const git = simpleGit.default(env.gitOptions);
  const packageJson = await getNextPackageJson({
    git,
    option: { ...env.mdOption },
  });

  expect(packageJson.type).toEqual('pass');
});
