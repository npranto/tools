const chalk = require('chalk');

const setupPrettier = async () => {
	console.log(chalk.green.bold('👉 Setting up prettier...'));

	// TODO:
	// - install prettier package as a devDependency
	// - adds \`.prettierrc\` file w/ default configurations
	// - adds \`.prettierrc\` with default ignore files
	// - adds \`format\` npm script inside package.json file to auto formats all the files w/in your project

	console.log(chalk.green.bold('✅ Success! Prettier is setup now!'));
};

module.exports = setupPrettier;
