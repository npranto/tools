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
  -h, --help                          display help for command

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

  editorconfig [options]
  		 WHAT IT DOES:
  		 - adds `.editorconfig` file in the root level (w/ default configurations)

  		 -R, --remove (removes editorconfig from current project)

  		 BEFORE YOU RUN:
  		 - only run this command from the root of your project, otherwise editorconfig may not setup properly

  gh-actions [options] <addOrRemove>
  		 WHAT IT DOES:
  			A list of GitHub Actions workflows

  		 -CT, --create-tag (automatically bumps patch version and creates tag on merge to `master` branch)
  		 i.e., `tools gh-actions add --create-tag` OR `tools gh-actions remove --create-tag`

  		 BEFORE YOU RUN:
  		 - only run this command from the root of your project, otherwise Github Actions workflow may not setup properly

  help [command]                      display help for command
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
- once feature/bugfix is added, commit the changes and push it up to origin to create a new pull request
- once pull request changes have been reviewed, merge the changes to `master`
- verify that a new tag is created w/ a patch version bump

### Release Process
To release new changes to production (NPM), we usually create draft and publish a new Release by targeting a specific tag created in history. Once the drafted release notes has been carefully reviewed and published, the [NPM Publish](https://github.com/npranto/tools/actions/workflows/npm-publish.yml) Github action will kick off automatically to publish the new version to NPM
#### Step(s):
1. go over to [Release](https://github.com/npranto/tools/releases) history
2. click on "Draft a new release", to create a new release note to publish
3. choose the tag you want to release from "Choose a tag" dropdown
4. add "Release title", generally the tag name, i.e, "v1.0.5"
5. for "Previous tag" dropdown, choose the currently deployed version from NPM
6. click on "Generate release notes" to automatically fill in details for release notes 
7. click on "Publish release"
8. verify that the new release version is created in [Release](https://github.com/npranto/tools/releases) history
9.  verify that a new build for [NPM Publish](https://github.com/npranto/tools/actions/workflows/npm-publish.yml) Github action is kicked off 
10. once the build succeeds, verify that [@npranto/tools](https://www.npmjs.com/package/@npranto/tools)'s latest version is pointing to the released version (in NPM)

*Note: if the "NPM Publish" action build fails, look into the build logs, debug potential issue, fix the issue and repeat the same process from Step 1*
