# deps-diff

Tiny utility for extract dependency difference two commit hash.

[![Download Status](https://img.shields.io/npm/dw/deps-diff.svg)](https://npmcharts.com/compare/deps-diff?minimal=true) [![Github Star](https://img.shields.io/github/stars/imjuni/deps-diff.svg?style=popout)](https://github.com/imjuni/deps-diff) [![Github Issues](https://img.shields.io/github/issues-raw/imjuni/deps-diff.svg)](https://github.com/imjuni/deps-diff/issues) [![NPM version](https://img.shields.io/npm/v/deps-diff.svg)](https://www.npmjs.com/package/deps-diff) [![License](https://img.shields.io/npm/l/deps-diff.svg)](https://github.com/imjuni/deps-diff/blob/master/LICENSE)

## Usage

```bash
# markdown
deps-diff md -p [your project directory]

# or use pipe
deps-diff json -p [your project directory] | deps-diff-pipe-md
```

output like below,

```md
- deps
  - dev
    - add rollup: 3.1.0
    - change deps-diff: 0.6.0 > 0.7.0
```

Yes, you can add this content to git commit log.

## CLI Option

### Command

| command | desc.                                            |
| ------- | ------------------------------------------------ |
| json    | dependencies difference generate json format     |
| md      | dependencies difference generate markdown format |

### Option

| command           | alias | default                    | array | desc.                                                                                                                                                       |
| ----------------- | ----- | -------------------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| project           | p     | process.cwd()              |       | project directory from which to extract version changes, if you not pass this option that will be use cwd(current working directory)                        |
| config            | c     |                            |       | configuration file path, if you not pass this option that will be use find '.depsrc' first                                                                  |
| dependencies      | d     | prod                       | o     | array of dependency type: dev, prod, peer                                                                                                                   |
| ignore            | i     |                            | o     | ignore specfic dependency with action. You can pass dev-add, dev-remove, dev-change, prod-add, prod-remove, prod-change, peer-add, peer-remove, peer-change |
| prev-hash         |       | latest commit hash         |       | previous git commit hash for comparison                                                                                                                     |
| next-hash         |       | process.cwd()/package.json |       | previous git commit hash for comparison                                                                                                                     |
| title-list-type   |       | #                          |       | list type of markdown document title                                                                                                                        |
| deps-list-type    |       | m (replace -)              |       | list type of markdown document dependency                                                                                                                   |
| content-list-type |       | m (replace -)              |       | list type of markdown document content                                                                                                                      |
| git-basedir       |       | process.cwd()              |       | git base directory. This directory exists `.git`                                                                                                            |
| git-binary        |       | git                        |       | git binary filename                                                                                                                                         |

## Monorepo

If your project structure like below,

```text
├─ .git/
├─ packages/
│  ├─ my-project/
│  │  ├─ package.json # deps-diff install here
│  │  ├─ Button.tsx
│  │  ├─ Input.tsx
│  ├─ pages/
│  │  ├─ Hero.tsx
│  │  ├─ User.tsx
```

You can add npm scripts that,

```bash
# my-project > package.json > scripts

deps-diff md -d prod -d dev --project . --git-basedir ../..
```

## Custom format markdown

You have to inheritance [AbstractParser](https://github.com/imjuni/deps-diff/blob/main/lib/modules/AbstractParser.ts) and implement it. [MarkdownParser](https://github.com/imjuni/deps-diff/blob/main/lib/modules/MarkdownParser.ts) is markdown parser example.
