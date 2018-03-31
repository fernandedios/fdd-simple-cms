if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = 'development';
}

if (process.env.NODE_ENV === 'production') {
	module.exports = require('./prod'); // export prod keys
}
else if (process.env.NODE_ENV === 'development') {
	module.exports = require('./dev'); // export dev keys
}
else if (process.env.NODE_ENV === 'test') {
	module.exports = require('./testkeys'); // export test keys
}
