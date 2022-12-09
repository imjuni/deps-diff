import { nodeResolve } from '@rollup/plugin-node-resolve';
import ts from '@rollup/plugin-typescript';
import readPackage from 'read-pkg';

const pkg = readPackage.sync();

function resolveOnly(module) {
  return (
    pkg?.dependencies?.[module] == null &&
    pkg?.devDependencies?.[module] == null &&
    pkg.peerDependencies?.[module] == null
  );
}

export default [
  {
    input: 'lib/cli.ts',
    output: [
      {
        format: 'cjs',
        file: 'dist/cli.js',
        banner: '#!/usr/bin/env node',
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve({ resolveOnly }),
      ts({ tsconfig: 'tsconfig.prod.json', compilerOptions: { declarationDir: 'typings' } }),
    ],
  },
  {
    input: 'lib/pipe-md.ts',
    output: [
      {
        format: 'cjs',
        file: 'dist/pipe-md.js',
        banner: '#!/usr/bin/env node',
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve({ resolveOnly }),
      ts({ tsconfig: 'tsconfig.prod.json', compilerOptions: { declarationDir: 'typings' } }),
    ],
  },
  {
    input: 'lib/cjs.ts',
    output: [
      {
        format: 'cjs',
        file: 'dist/cjs/index.cjs',
        sourcemap: true,
      },
      {
        format: 'esm',
        file: 'dist/esm/index.mjs',
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve({ resolveOnly }),
      ts({ tsconfig: 'tsconfig.prod.json', compilerOptions: { declarationDir: 'typings' } }),
    ],
  },
];
