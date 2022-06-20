const fs = require('fs');

function writeToFile(filePath, content = '') {
	try {
		fs.writeFileSync(filePath, content);
	} catch (err) {
		console.error(err);
	}
}
module.exports = writeToFile;
