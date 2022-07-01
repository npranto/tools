const path = require('path');
const process = require('process');
const chalk = require('chalk');
const { copySync } = require('fs-extra');
const inquirer = require('inquirer');
const doesDirectoryExist = require('./doesDirectoryExist');
const initializeGit = require('./initializeGit');

const createVanillaProject = ({ name, gitInit } = {}) => {
	console.log(chalk.red('Generating `vanilla` project...'));
	copySync(
		path.join(process.cwd(), 'content/vanilla-app'),
		path.join(process.cwd(), `${name}`),
	);
	if (gitInit) {
		initializeGit({ path: path.join(process.cwd(), `${name}`) });
	}
	console.log(
		chalk.green.bold('✅ Success! `vanilla` project has been created!'),
	);
};

const onCreateProject = () => {
	console.log(chalk.green.bold("👉 Let's create a project..."));
	return inquirer
		.prompt([
			{
				type: 'input',
				name: 'name',
				message: `${chalk.blue('Name?')} (i.e., 'todo-app')`,
				validate(value) {
					if (
						!value ||
						typeof value !== 'string' ||
						!value.length ||
						!/^[a-zA-Z-\d]+$/.test(value)
					) {
						return 'Please enter a valid project name (only letter, numbers and hyphens allowed)';
					}
					if (doesDirectoryExist(path.join(process.cwd(), `${value}`))) {
						return `(ℹ) Looks like \`${value}\` directory already exists. Please retry creating a project with a different name`;
					}
					return true;
				},
			},
			{
				type: 'list',
				name: 'template',
				message: `${chalk.blue('Choose a template?')}`,
				choices: [
					{
						key: 'v',
						name: `${chalk.yellow.bold(
							'Vanilla',
						)} (generates a vanilla JavaScript project w/ support for HTML, CSS and JavaScript)`,
						value: 'vanilla',
					},
				],
			},
			{
				type: 'list',
				name: 'gitInit',
				message: `${chalk.blue.bold(
					'Do you want to initialize git in your project?',
				)}`,
				choices: [
					{
						name: 'true',
						value: true,
					},
					{
						name: 'false',
						value: false,
					},
				],
			},
		])
		.then((projectOptions = {}) => {
			const { name, template, gitInit = false } = projectOptions;
			if (template === 'vanilla') {
				createVanillaProject({ name, gitInit });
			}
		})
		.catch((error) => {
			throw error;
		});
};

module.exports = onCreateProject;
