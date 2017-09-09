
module.exports = {
  development: {
    use_env_variable: "MORERECIPEDEV",
    dialet: "postgres"
  },
  test: {
    use_env_variable: "MORERECIPETEST"
  },
  production: {
    use_env_variable: "DATABASE_URL"
  }
};
