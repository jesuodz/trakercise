const NODE_ENV = process.env.NODE_ENV || 'development';

let dbKeys;
if (NODE_ENV == 'production') {
  try {
    dbKeys = require('./keys_production');
  } catch {
    console.log('Module ./keys_production.js not found');
    process.exit(1);
  }
} else {
  dbKeys = require('./keys_dev');
}

const config = () => {
  return {
    NODE_ENV: NODE_ENV,
    PORT: process.env.PORT || 5000,
    ...dbKeys
  }
};

module.exports = config;
