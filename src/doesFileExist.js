const fs = require('fs');

const doesFileExist = (filePath) => {
	try {
		return fs.existsSync(filePath);
	} catch (e) {
		return false;
	}
};

module.exports = doesFileExist;
