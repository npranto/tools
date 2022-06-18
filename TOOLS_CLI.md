# @npranto/tools

> A command line tool to setup useful packages and configurations w/in a project, i.e, husky, prettier, eslint and so on

## Installation

1. Install `tools` CLI globally on your machine

```sh
npm install @npranto/tools -g
```

2. Start using the CLI

```sh
tools --help
```

## Usage

```
Usage: tools [options] [command]

Options:
-h, --help display help for command

Commands:
setup-husky
	Installs up husky and sets up git hooks with it
	
	BEFORE YOU RUN: 
	- only run this command from the root of your project, otherwise husky may not setup properly

help [command] display help for command
```
