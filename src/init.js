const chalk = require('chalk');
const { program } = require('commander');
const setupHusky = require('./setupHusky');
const setupPrettier = require('./setupPrettier');

program
	.command('setup-husky')
	.description(
		`
		 Installs up husky and sets up git hooks with it

		 ${chalk.blue.bold.underline('BEFORE YOU RUN')}:
		 - only run this command from the root of your project, otherwise husky may not setup properly
		`,
	)
	.action(setupHusky);

program
	.command('setup-prettier')
	.description(
		`
		 Installs prettier package as a devDependency, adds \`.prettierrc\` file w/ default configurations, adds \`.prettierignore\` with default ignore files, adds \`format\` npm script inside package.json file to auto formats all the files w/in your project

		 ${chalk.blue.bold.underline('BEFORE YOU RUN')}:
		 - only run this command from the root of your project, otherwise husky may not setup properly
		`,
	)
	.action(setupPrettier);

program.parse();
