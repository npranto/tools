const fs = require('fs');

const doesDirectoryExist = (dir) => {
	try {
		return fs.existsSync(dir);
	} catch (e) {
		return false;
	}
};

module.exports = doesDirectoryExist;
