const path = require('path');
const chalk = require('chalk');
const doesFileExist = require('./doesFileExist');
const writeToFile = require('./writeToFile');
const removeFile = require('./removeFile');

const DEFAULT_EDITOR_CONFIG = `root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = tab
indent_size = 2
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
`;

const addEditorConfigFile = () => {
	const editorConfigFilePath = path.join(process.cwd(), '.editorconfig');
	if (doesFileExist(editorConfigFilePath)) {
		console.log(
			chalk.gray.bold(
				`(ℹ) Looks like \`.editorconfig\` file already exists, skipping`,
			),
		);
		return;
	}
	console.log(chalk.gray(`> Adding \`.editorconfig\` file...`));
	writeToFile(path.join(process.cwd(), '.editorconfig'), DEFAULT_EDITOR_CONFIG);
};

const removeEditorConfigFile = async () => {
	const eslintIgnoreFilePath = path.join(process.cwd(), '.editorconfig');
	if (!doesFileExist(eslintIgnoreFilePath)) {
		console.log(
			chalk.gray.bold(
				`(ℹ) Looks like \`.editorconfig\` file does not exist, skipping`,
			),
		);
		return;
	}
	console.log(chalk.gray(`> Removing \`.editorconfig\` file...`));
	await removeFile(path.join(process.cwd(), '.editorconfig'));
};

function setupEditorConfig() {
	console.log(chalk.green.bold('👉 Setting up editorconfig...'));
	addEditorConfigFile();
	console.log(chalk.green.bold('✅ Success! Editorconfig is setup now!'));
}

function removeEditorConfig() {
	console.log(chalk.green.bold('👉 Removing editorconfig...'));
	removeEditorConfigFile();
	console.log(chalk.green.bold('✅ Success! Editorconfig has been removed!'));
}

const onEditorConfig = (options = {}) => {
	const { remove = false } = options;
	if (remove) removeEditorConfig();
	else setupEditorConfig();
};

module.exports = onEditorConfig;
