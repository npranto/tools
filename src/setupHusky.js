const chalk = require('chalk');
const path = require('path');
const process = require('process');
const { exec } = require('child_process');

// path.exists('foo.txt', function (exists) {
// 	if (exists) {
// 		// do something
// 	}
// });

// // or

// if (path.existsSync('foo.txt')) {
// 	// do something
// }

const executeCommand = (command) => {
	return new Promise((resolve) => {
		exec(`${command}`, (error, stdout, stderr) => {
			if (error) {
				// console.log(`error: ${error.message}`);
				resolve({
					success: false,
				});
			}
			if (stderr) {
				// console.log(`stderr: ${stderr}`);
				resolve({
					success: false,
				});
			}
			// console.log(`stdout: ${stdout}`);
			resolve({
				success: true,
				output: stdout,
			});
		});
	});
};

const setupHusky = async () => {
	const currentDir = process.cwd();
	console.log({ currentDir });

	const { success, output } = await executeCommand('ls -la');

	console.log("after executeCommand('ls -la')...", { success, output });

	return;

	// - npm install husky --save-dev
	// - git init
	// - npx husky install
	// - npx husky add .husky/pre-commit ""
	// - git add .husky/pre-commit

	if (!fs.existsSync(currentDir)) {
		console.log(chalk.red.bold(''));
	}
};

module.exports = setupHusky;
