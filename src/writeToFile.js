const fse = require('fs-extra');

function writeToFile(filePath, content = '') {
	try {
		fse.outputFileSync(filePath, content);
	} catch (err) {
		console.error(err);
	}
}
module.exports = writeToFile;
