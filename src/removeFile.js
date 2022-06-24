const doesFileExist = require('./doesFileExist');
const executeCommand = require('./executeCommand');

const removeFile = async (path) => {
	if (!doesFileExist(path)) return;
	await executeCommand(`rm -rf ${path}`)
};

module.exports = removeFile;
