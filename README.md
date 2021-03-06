pi-gen
======

Pingendo static site generator

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/pi-gen.svg)](https://npmjs.org/package/pi-gen)
[![Downloads/week](https://img.shields.io/npm/dw/pi-gen.svg)](https://npmjs.org/package/pi-gen)
[![License](https://img.shields.io/npm/l/pi-gen.svg)](https://github.com/gseregni/pi-gen/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g pi-gen
$ pi-gen COMMAND
running command...
$ pi-gen (-v|--version|version)
pi-gen/1.0.31 darwin-x64 node-v10.16.0
$ pi-gen --help [COMMAND]
USAGE
  $ pi-gen COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pi-gen build`](#pi-gen-build)
* [`pi-gen compile FILE`](#pi-gen-compile-file)
* [`pi-gen help [COMMAND]`](#pi-gen-help-command)
* [`pi-gen serve`](#pi-gen-serve)

## `pi-gen build`

compile an src dir

```
USAGE
  $ pi-gen build

EXAMPLE
  $ pi-gen build
```

_See code: [src/commands/build.ts](https://github.com/gseregni/pi-gen/blob/v1.0.31/src/commands/build.ts)_

## `pi-gen compile FILE`

compile an html template

```
USAGE
  $ pi-gen compile FILE

ARGUMENTS
  FILE  input file

EXAMPLE
  $ pi-gen compile ./src/index.html
```

_See code: [src/commands/compile.ts](https://github.com/gseregni/pi-gen/blob/v1.0.31/src/commands/compile.ts)_

## `pi-gen help [COMMAND]`

display help for pi-gen

```
USAGE
  $ pi-gen help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.0/src/commands/help.ts)_

## `pi-gen serve`

watch /src /data an reload

```
USAGE
  $ pi-gen serve

EXAMPLE
  $ pi-gen serve
```

_See code: [src/commands/serve.ts](https://github.com/gseregni/pi-gen/blob/v1.0.31/src/commands/serve.ts)_
<!-- commandsstop -->
