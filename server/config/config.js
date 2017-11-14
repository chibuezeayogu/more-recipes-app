
require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'DEV_DB',
    dialect: 'postgres'
  },
  test: {
    use_env_variable: 'TEST_DB',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL'
    
  }

};
