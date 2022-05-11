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

## Using Docker

```sh-session
git clone https://github.com/ant4g0nist/neil
cd neil
export image=neil:0.1.0
docker build -t $image .
```

Configure NETWORK and INFURA_API_KEY in .env file
```
alias neil="docker run --env-file $(pwd)/.env -it $image"
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

How far back from the latest block you want to query?

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

Range of the blocks you want to query!

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
