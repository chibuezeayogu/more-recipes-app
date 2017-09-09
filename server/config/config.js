
module.exports = {
  development: {
    use_env_variable: "DATABASE_URL",
    dialet: "postgres"
  },
  test: {
    use_env_variable: "DATABASE_URL""
  },
  production: {
    use_env_variable: "DATABASE_URL"
  }
};
