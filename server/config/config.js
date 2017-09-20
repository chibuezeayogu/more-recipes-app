
module.exports = {
  development: {
    use_env_variable: "MORE_RECIPE_DEV",
  },
  test: {
    use_env_variable: "MORE_RECIPE_TEST",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    
  }
};
