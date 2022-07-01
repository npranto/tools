const { exec } = require('child_process');
const process = require('process');

const executeCommand = (command, options = {}) =>
	new Promise((resolve) => {
		exec(
			`${command}`,
			{ cwd: options?.cwd || process.cwd() },
			(error, stdout, stderr) => {
				if (error) {
					resolve({
						success: false,
					});
				}
				if (stderr) {
					resolve({
						success: false,
					});
				}
				resolve({
					success: true,
					output: stdout,
				});
			},
		);
	});

module.exports = executeCommand;
