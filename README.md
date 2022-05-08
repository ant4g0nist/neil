# Neil

Neil - an Ethereum block explorer

<!-- toc -->
* [Neil](#neil)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g neil
$ neil COMMAND
running command...
$ neil (--version)
neil/0.1.0 darwin-arm64 node-v18.0.0
$ neil --help [COMMAND]
USAGE
  $ neil COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`neil help [COMMAND]`](#neil-help-command)
* [`neil history [NUMBER]`](#neil-history-number)
* [`neil range [FROM] [TO]`](#neil-range-from-to)

## `neil help [COMMAND]`

Display help for neil.

```
USAGE
  $ neil help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for neil.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `neil history [NUMBER]`

[32mHow far back from the latest block you want to query?[39m

```
USAGE
  $ neil history [NUMBER]

ARGUMENTS
  NUMBER  The number of blocks to query from the latest block

DESCRIPTION
  How far back from the latest block you want to query?

EXAMPLES
  $ neil history 10
```

_See code: [dist/commands/history/index.ts](https://github.com/ant4g0nist/neil/blob/v0.1.0/dist/commands/history/index.ts)_

## `neil range [FROM] [TO]`

[32mRange of the blocks you want to query![39m

```
USAGE
  $ neil range [FROM] [TO]

ARGUMENTS
  FROM  The starting block (inclusive) to run the query!
  TO    The end block (inclusive) to run the query!

DESCRIPTION
  Range of the blocks you want to query!

EXAMPLES
  $ neil range 10 12
```

_See code: [dist/commands/range/index.ts](https://github.com/ant4g0nist/neil/blob/v0.1.0/dist/commands/range/index.ts)_
<!-- commandsstop -->
