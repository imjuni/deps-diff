import { nodeResolve } from '@rollup/plugin-node-resolve';
import ts from '@rollup/plugin-typescript';
import readPackage from 'read-pkg';

const pkg = readPackage.sync();

export default [
  {
    input: 'lib/cli.ts',
    output: [
      {
        format: 'cjs',
        file: 'dist/cli.js',
        banner: '#!/usr/bin/env node',
      },
    ],
    plugins: [
      nodeResolve({
        resolveOnly: (module) => {
          return pkg?.dependencies?.[module] == null && pkg?.devDependencies?.[module] == null;
        },
      }),
      ts({ tsconfig: 'tsconfig.json' }),
    ],
  },
  {
    input: 'lib/pipe-md.ts',
    output: [
      {
        format: 'cjs',
        file: 'dist/pipe-md.js',
        banner: '#!/usr/bin/env node',
      },
    ],
    plugins: [
      nodeResolve({
        resolveOnly: (module) => {
          return pkg?.dependencies?.[module] == null && pkg?.devDependencies?.[module] == null;
        },
      }),
      ts({ tsconfig: 'tsconfig.json' }),
    ],
  },
  {
    input: 'lib/pipe-md.ts',
    output: [
      {
        format: 'cjs',
        file: 'dist/pipe-md.cjs',
      },
      {
        format: 'esm',
        file: 'dist/pipe-md.mjs',
      },
    ],
    plugins: [
      nodeResolve({
        resolveOnly: (module) => {
          return pkg?.dependencies?.[module] == null && pkg?.devDependencies?.[module] == null;
        },
      }),
      ts({ tsconfig: 'tsconfig.json' }),
    ],
  },
];
