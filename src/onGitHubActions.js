const path = require('path');
const process = require('process');
const chalk = require('chalk');
const { copySync } = require('fs-extra');
const { program } = require('commander');
const doesFileExist = require('./doesFileExist');
const removeFile = require('./removeFile');

const addCreateTagWorkflow = async () => {
	console.log(chalk.green.bold('👉 Setting up "Create Tag" workflow...'));
	const createTagFilePath = path.join(
		process.cwd(),
		'.github',
		'workflows',
		'create-tag.yml',
	);
	if (doesFileExist(createTagFilePath)) {
		console.log(
			chalk.gray.bold(
				`(ℹ) Looks like \`.github/workflows/create-tag.yml\` file already exists, skipping`,
			),
		);
		return;
	}
	console.log(
		chalk.gray(`> Adding \`.github/workflows/create-tag.yml\` file...`),
	);
	copySync(
		path.join(process.cwd(), 'content/create-tag.yml'),
		path.join(process.cwd(), '.github/workflows/create-tag.yml'),
	);
	console.log(
		chalk.green.bold('✅ Success! "Create Tag" workflow is setup now!'),
	);
};

const addNPMPublishWorkflow = async () => {
	console.log(chalk.green.bold('👉 Setting up "NPM Publish" workflow...'));
	const npmPublishFilePath = path.join(
		process.cwd(),
		'.github',
		'workflows',
		'npm-publish.yml',
	);
	if (doesFileExist(npmPublishFilePath)) {
		console.log(
			chalk.gray.bold(
				`(ℹ) Looks like \`.github/workflows/npm-publish.yml\` file already exists, skipping`,
			),
		);
		return;
	}
	console.log(
		chalk.gray(`> Adding \`.github/workflows/npm-publish.yml\` file...`),
	);
	copySync(
		path.join(process.cwd(), 'content/npm-publish.yml'),
		path.join(process.cwd(), '.github/workflows/npm-publish.yml'),
	);
	console.log(
		chalk.green.bold('✅ Success! "NPM Publish" workflow is setup now!'),
	);
};

const removeCreateTagWorkflow = async () => {
	console.log(chalk.green.bold('👉 Removing "Create Tag" workflow...'));
	const createTagFilePath = path.join(
		process.cwd(),
		'.github',
		'workflows',
		'create-tag.yml',
	);
	if (!doesFileExist(createTagFilePath)) {
		console.log(
			chalk.gray.bold(
				`(ℹ) Looks like \`.github/workflows/create-tag.yml\` file does NOT exist, skipping`,
			),
		);
		return;
	}
	console.log(
		chalk.gray(`> Removing \`.github/workflows/create-tag.yml\` file...`),
	);
	await removeFile(
		path.join(process.cwd(), '.github/workflows/create-tag.yml'),
	);
	console.log(
		chalk.green.bold('✅ Success! "Create Tag" workflow has been removed!'),
	);
};

const addGitHubActions = (options = {}) => {
	const { createTag = false, npmPublish = false } = options;
	if (createTag) addCreateTagWorkflow();
	if (npmPublish) addNPMPublishWorkflow();
};

const removeGitHubActions = (options = {}) => {
	const { createTag = false } = options;
	if (createTag) removeCreateTagWorkflow();
};

const onGitHubActions = (addOrRemove = 'add', options = {}) => {
	if (addOrRemove === 'add') {
		addGitHubActions(options);
	} else if (addOrRemove === 'remove') {
		removeGitHubActions(options);
	} else {
		program.help();
	}
};

module.exports = onGitHubActions;
