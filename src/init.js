const chalk = require('chalk');
const { program } = require('commander');
const setupHusky = require('./setupHusky');

program
	.command('setup-husky')
	.description(
		`
		 Installs up husky and sets up git hooks with it

		 ${chalk.blue.bold.underline('BEFORE YOU RUN')}:
		 - only run this command from the root of your project, otherwise husky may not setup properly
		`
	)
	.action(setupHusky);

program.parse();
