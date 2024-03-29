import { nodeResolve } from '@rollup/plugin-node-resolve';
import readPackage from 'read-pkg';
import ts from 'rollup-plugin-ts';

const pkg = readPackage.sync();

function resolveOnly(module: string) {
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
      },
    ],
    plugins: [nodeResolve({ resolveOnly }), ts({ tsconfig: 'tsconfig.prod.json' })],
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
    plugins: [nodeResolve({ resolveOnly }), ts({ tsconfig: 'tsconfig.prod.json' })],
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
    plugins: [nodeResolve({ resolveOnly }), ts({ tsconfig: 'tsconfig.prod.json' })],
  },
];
