const chalk = require('chalk');
const { program } = require('commander');
const onEditorConfig = require('./onEditorConfig');
const onESLint = require('./onESLint');
const onGitHubActions = require('./onGitHubActions');
const onHusky = require('./onHusky');
const onPrettier = require('./onPrettier');

program
	.command('husky')
	.description(
		`
		${chalk.blue.bold.underline('WHAT IT DOES')}:
		- Installs prettier package as a devDependency
		- Initializes \`git init\`
		- Setups up all the git hooks w/ husky

		-R, --remove (removes all husky setup from current project)

		${chalk.blue.bold.underline('BEFORE YOU RUN')}:
		- only run this command from the root of your project, otherwise husky may not setup properly
		`,
	)
	.option('-R, --remove', 'removes all husky setup from current project')
	.action(onHusky);

program
	.command('prettier')
	.description(
		`
		${chalk.blue.bold.underline('WHAT IT DOES')}:
		- Installs prettier package as a devDependency
		- adds \`.prettierrc\` file w/ default configurations
		- adds \`.prettierignore\` with default ignore files
		- adds \`format\` npm script inside package.json file to auto formats all the files w/in your project

		-C, --custom (to setup your own prettier configurations w/ a set of questionnaires)
		-R, --remove (removes all prettier setup from current project)

		${chalk.blue.bold.underline('BEFORE YOU RUN')}:
		- only run this command from the root of your project, otherwise prettier may not setup properly
		`,
	)
	.option(
		'-C, --custom',
		'setup your own prettier configurations w/ a set of questionnaires',
	)
	.option('-R, --remove', 'removes all prettier setup from current project')
	.action(onPrettier);

program
	.command('eslint')
	.description(
		`
		${chalk.blue.bold.underline('WHAT IT DOES')}:
		- Installs eslint package as a devDependency
		- adds \`.eslintrc.js\` file for ESLint configuration
		- adds \`.eslintignore\` with default ignore files
		- adds \`format\` npm script inside package.json file to auto formats all the files w/in your project

	-R, --remove (removes all ESLint setup from current project)

		${chalk.blue.bold.underline('BEFORE YOU RUN')}:
		- only run this command from the root of your project, otherwise eslint may not setup properly
		`,
	)
	.option('-R, --remove', 'removes all ESLint setup from current project')
	.action(onESLint);

program
	.command('editorconfig')
	.description(
		`
		${chalk.blue.bold.underline('WHAT IT DOES')}:
		- adds \`.editorconfig\` file in the root level (w/ default configurations)

		-R, --remove (removes editorconfig from current project)

		${chalk.blue.bold.underline('BEFORE YOU RUN')}:
		- only run this command from the root of your project, otherwise editorconfig may not setup properly
		`,
	)
	.option('-R, --remove', 'removes editorconfig from current project')
	.action(onEditorConfig);

program
	.command('gh-actions <addOrRemove>')
	.description(
		`
		${chalk.blue.bold.underline('WHAT IT DOES')}:
		Generates a list of GitHub Actions workflows

		-CT, --create-tag
		${chalk.yellow.underline('Description')}:
		> automatically bumps patch version and creates tag on merge to \`master\` branch
		> when we directly push a commit OR merge a pull request to \`master\` branch, this workflow gets triggered automatically
		${chalk.yellow.underline('Example(s)')}:
		> \`tools gh-actions add --create-tag\`
		> \`tools gh-actions remove --create-tag\`

		-NP, --npm-publish
		${chalk.yellow.underline('Description')}:
		> publishes a new release version to NPM after it is created and published
		> when we create a new release note from Github and publish it, this workflow gets triggered automatically to push the new release version up to NPM
		${chalk.yellow.underline('Example(s)')}:

		> \`tools gh-actions add --npm-publish\`
		> \`tools gh-actions remove --npm-publish\`

		${chalk.blue.bold.underline('BEFORE YOU RUN')}:
		- only run this command from the root of your project, otherwise Github Actions workflow may not setup properly
		- only applicable for NPM package
		`,
	)
	.option(
		'-CT, --create-tag',
		'automatically bumps patch version and creates tag on merge to `master` branch',
	)
	.option(
		'-NP, --npm-publish',
		'publishes a new release version to NPM after it is created and published',
	)
	.action(onGitHubActions);

program.parse();
