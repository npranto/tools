const chalk = require('chalk');
const { program } = require('commander');
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
		 - only run this command from the root of your project, otherwise husky may not setup properly
		`,
	)
	.option(
		'-C, --custom',
		'setup your own prettier configurations w/ a set of questionnaires',
	)
	.option('-R, --remove', 'removes all prettier setup from current project')
	.action(onPrettier);

program.parse();
