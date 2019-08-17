module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/no-unused-components": "off",
    quotes: "off",
    "space-before-function-paren": "off",
    "space-unary-ops": [
      1,
      {
        nonwords: true
      }
    ],
    semi: "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
