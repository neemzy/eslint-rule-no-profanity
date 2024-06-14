const noProfanity = require("./noProfanity");

module.exports = [
  {
    plugins: {
      osef: {
        rules: {
          "no-profanity": noProfanity
        }
      }
    },
    rules: {
      "osef/no-profanity": "error"
    }
  }
];
