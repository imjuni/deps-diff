const expectJson = {
  type: 'pass',
  pass: {
    name: 'deps-diff',
    version: '0.5.0',
    description: 'Dependency difference create using by json or markdown format',
    scripts: {
      dev: 'cross-env TS_NODE_PROJECT=tsconfig.json node -r ts-node/register ./lib/cli.ts',
      'pipe-md':
        'cross-env TS_NODE_PROJECT=tsconfig.json node -r ts-node/register ./lib/pipe-md.ts',
      debug:
        'cross-env TS_NODE_PROJECT=tsconfig.json node -r ts-node/register --nolazy --inspect-brk=9229 ./lib/cli.ts',
      build: 'just --config ./.configs/just.config.ts build',
      clean: 'just --config ./.configs/just.config.ts clean',
      'rollup:prod': 'just --config ./.configs/just.config.ts rollup:prod',
      'rollup:dev': 'just --config ./.configs/just.config.ts rollup:dev',
      unpub: 'just --config ./.configs/just.config.ts unpub',
      pub: 'just --config ./.configs/just.config.ts pub',
      'pub:prod': 'just --config ./.configs/just.config.ts pub:prod',
      prepublishOnly: 'node prepublish.js',
    },
    repository: { type: 'git', url: 'git+https://github.com/imjuni/deps-diff.git' },
    keywords: ['deps', 'deps-diff'],
    author: 'ByungJoon Lee',
    license: 'MIT',
    main: './dist/cjs/cjs.js',
    module: './dist/esm/esm.js',
    exports: {
      './package.json': './package.json',
      '.': [
        {
          import: './dist/esm/esm.js',
          require: './dist/cjs/cjs.js',
        },
        './dist/cjs/cjs.js',
      ],
    },
    bin: {
      'deps-diff': './dist/cli.js',
      'deps-pipe-md': './dist/pipe-md.js',
    },
    bugs: { url: 'https://github.com/imjuni/deps-diff/issues' },
    homepage: 'https://github.com/imjuni/deps-diff#readme',
    engines: { node: '>=14' },
    devDependencies: {
      '@jest/test-sequencer': '^29.1.2',
      '@rollup/plugin-node-resolve': '^14.1.0',
      '@rollup/plugin-typescript': '^8.5.0',
      '@tsconfig/node14': '^1.0.3',
      '@types/debug': '^4.1.7',
      '@types/duplexer3': '^0.1.1',
      '@types/jest': '^29.1.1',
      '@types/node': '^18.7.23',
      '@types/parse-gitignore': '^1.0.0',
      '@types/source-map-support': '^0.5.6',
      '@types/yargs': '^17.0.13',
      '@typescript-eslint/eslint-plugin': '^5.38.1',
      '@typescript-eslint/parser': '^5.38.1',
      'cross-env': '^7.0.3',
      esbuild: '^0.15.10',
      eslint: '^8.24.0',
      'eslint-config-airbnb-typescript': '^17.0.0',
      'eslint-config-prettier': '^8.5.0',
      'eslint-plugin-jsdoc': '^39.3.6',
      'eslint-plugin-prefer-arrow': '^1.2.3',
      'eslint-plugin-prettier': '^4.2.1',
      execa: '^5.1.1',
      jest: '^29.1.2',
      'just-task': '^1.6.1',
      'prettier-eslint': '^15.0.1',
      'prettier-plugin-organize-imports': '^3.1.1',
      'read-pkg': '^5.2.0',
      rimraf: '^3.0.2',
      rollup: '^2.79.1',
      'rollup-plugin-sourcemaps': '^0.6.3',
      'rollup-plugin-terser': '^7.0.2',
      'rollup-plugin-ts': '^3.0.2',
      'ts-jest': '^29.0.3',
      'ts-loader': '^9.4.1',
      'ts-node': '^10.9.1',
      'tsconfig-paths': '^4.1.0',
      typescript: '^4.8.4',
    },
    dependencies: {
      'fast-safe-stringify': '^2.1.1',
      'jsonc-parser': '^3.2.0',
      'my-easy-fp': '^0.16.0',
      'my-node-fp': '^0.8.1',
      'my-only-either': '^1.3.0',
      ora: '^5.4.1',
      semver: '^7.3.7',
      'simple-git': '^3.14.1',
      tslib: '^2.4.0',
      'type-fest': '^3.0.0',
      yargs: '^17.6.0',
    },
  },
};

export default expectJson;
