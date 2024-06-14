const rule = require("./noProfanity");
const RuleTester = require("eslint").RuleTester;
const ruleTester = new RuleTester();

ruleTester.run("no-profanity", rule, {
  valid: [
    {
      code: "const flower = \"daisy\";"
    },
    {
      code: "const fuck = \"foo\";",
      options: [{ allowVariables: true }]
    },
    {
      code: "shit.foo = \"bar\";",
      options: [{ allowVariables: true }]
    },
    {
      code: "foo.ass = \"bar\";",
      options: [{ allowProperties: true }]
    },
    {
      code: "const foo = { bitch: \"bar\" };",
      options: [{ allowProperties: true }]
    },
    {
      code: "cunt();",
      options: [{ allowFunctions: true }]
    },
    {
      code: "function bitch() {}",
      options: [{ allowFunctions: true }]
    },
    {
      code: "const foo = { bar: \"ass\" };",
      options: [{ allowStrings: true }]
    },
    {
      code: "foo.bar = \"shit\";",
      options: [{ allowStrings: true }]
    },
    {
      code: "const flower = \"daisy\"; // FUCK",
      options: [{ allowComments: true }]
    },
    {
      code: "/* SHIT ASS BITCH CUNT SHOOBEEDOOWAH */",
      options: [{ allowComments: true }]
    }
  ],

  invalid: [
    {
      code: "const fuck = \"foo\";",
      errors: [{ message: /Variable name '([^']+)' contains profanity/ }]
    },
    {
      code: "shit.foo = \"bar\";",
      errors: [{ message: /Variable name '([^']+)' contains profanity/ }]
    },
    {
      code: "foo.ass = \"bar\";",
      errors: [{ message: /Property name '([^']+)' contains profanity/ }]
    },
    {
      code: "const foo = { bitch: \"bar\" };",
      errors: [{ message: /Property name '([^']+)' contains profanity/ }]
    },
    {
      code: "cunt();",
      errors: [{ message: /Function name '([^']+)' contains profanity/ }]
    },
    {
      code: "function bitch() {}",
      errors: [{ message: /Function name '([^']+)' contains profanity/ }]
    },
    {
      code: "const foo = { bar: \"ass\" };",
      errors: [{ message: /String '([^']+)' contains profanity/ }]
    },
    {
      code: "foo.bar = \"shit\";",
      errors: [{ message: /String '([^']+)' contains profanity/ }]
    },
    {
      code: "const flower = \"daisy\"; // FUCK",
      errors: [{ message: /Comment '([^']+)' contains profanity/ }]
    },
    {
      code: "/* SHIT ASS BITCH CUNT SHOOBEEDOOWAH */",
      errors: [{ message: /Comment '([^']+)' contains profanity/ }]
    }
  ]
});
