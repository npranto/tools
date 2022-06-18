const { exec } = require('child_process');

const executeCommand = (command) =>
	new Promise((resolve) => {
		exec(`${command}`, (error, stdout, stderr) => {
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
		});
	});

module.exports = executeCommand;
