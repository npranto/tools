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
  -h, --help          display help for command

Commands:
  husky [options]
  		 WHAT IT DOES:
  		 - Installs prettier package as a devDependency
  		 - Initializes `git init`
  		 - Setups up all the git hooks w/ husky

  		 -R, --remove (removes all husky setup from current project)

  		 BEFORE YOU RUN:
  		 - only run this command from the root of your project, otherwise husky may not setup properly

  prettier [options]
  		 WHAT IT DOES:
  		 - Installs prettier package as a devDependency
  		 - adds `.prettierrc` file w/ default configurations
  		 - adds `.prettierignore` with default ignore files
  		 - adds `format` npm script inside package.json file to auto formats all the files w/in your project

  		 -C, --custom (to setup your own prettier configurations w/ a set of questionnaires)
  		 -R, --remove (removes all prettier setup from current project)

  		 BEFORE YOU RUN:
  		 - only run this command from the root of your project, otherwise prettier may not setup properly

  eslint [options]
  		 WHAT IT DOES:
  		 - Installs eslint package as a devDependency
  		 - adds `.eslintrc.js` file for ESLint configuration
  		 - adds `.eslintignore` with default ignore files
  		 - adds `format` npm script inside package.json file to auto formats all the files w/in your project

  		-R, --remove (removes all ESLint setup from current project)

  		 BEFORE YOU RUN:
  		 - only run this command from the root of your project, otherwise eslint may not setup properly

  help [command]      display help for command
```

## For Contributors Only

### Development Setup
> Clone repository
```sh
git clone https://github.com/
npranto/tools.git
```
> Install dependencies
```sh
npm install
```
*Note: run the above command inside the `tools` project directory*

> Globally install `tools` CLI in your machine
```sh
npm install -g .
``` 
*Note: run the above command inside the `tools` project directory*
### Development Process
- to work on a feature or a bugfix issue, checkout the `master` branch first (locally)
- create a new branch off of `master` - `git checkout -b tools-[ISSUE_NUMBER]`
- once feature/bugfix is added, update `package.json` and `package-lock.json` files w/ new version update (based on major, minor or patch) 
- now, commit the changes and push it up to origin to create a new pull request
- once pull request changes have been reviewed, merge the changes to `master`
- once the changes are merged to master, create a new tag for that change (based on major, minor or patch update). Make sure to include details for new features or fix added in the change

### Release Process
- checkout the tag going out for next release - `git checkout tags/[TAG_NAME]`
- log into npm - `npm login` and enter in username, password and email
- to publish current tag to npm, run - `npm publish --access public`
