
module.exports = {
  development: {
    use_env_variable: "More_Recipe",
    dialet: "postgres"
  },
  test: {
    use_env_variable: "More_Recipe_Test"
  },
  production: {
    use_env_variable: "DATABASE_URL"
  }
};
