const chalk = require('chalk');
const { program } = require('commander');
const setupHusky = require('./setupHusky');
const setupPrettier = require('./setupPrettier');

program
	.command('setup-husky')
	.description(
		`
		 ${chalk.blue.bold.underline('WHAT IT DOES')}:
		 - Installs prettier package as a devDependency
		 - Initializes \`git init\`
		 - Setups up all the git hooks w/ husky

		 ${chalk.blue.bold.underline('BEFORE YOU RUN')}:
		 - only run this command from the root of your project, otherwise husky may not setup properly
		`,
	)
	.action(setupHusky);

program
	.command('setup-prettier')
	.description(
		`
		 ${chalk.blue.bold.underline('WHAT IT DOES')}:
		 - Installs prettier package as a devDependency
		 - adds \`.prettierrc\` file w/ default configurations
		 - adds \`.prettierignore\` with default ignore files
		 - adds \`format\` npm script inside package.json file to auto formats all the files w/in your project

		 -C, --custom (to setup your own prettier configurations w/ a set of questionnaires)

		 ${chalk.blue.bold.underline('BEFORE YOU RUN')}:
		 - only run this command from the root of your project, otherwise husky may not setup properly
		`,
	)
	.option(
		'-C, --custom',
		'setup your own prettier configurations w/ a set of questionnaires',
	)
	.action(setupPrettier);

program.parse();
