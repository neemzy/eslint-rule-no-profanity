const profanities = ["fuck", "shit", "ass", "bitch", "cunt"]; // eslint-disable-line
const profanityRegex = new RegExp(`${profanities.join("|")}`);

function isProfanity(string) {
  return string.toLowerCase().match(profanityRegex);
}

function reportProfanity(context, tokens, messageId, node) {
  tokens.forEach(token => {
    if (isProfanity(token.value)) {
      context.report({
        messageId,
        node: node ?? token,
        data: { token: token.value }
      })
    }
  });
}

function reportProfanityAtNode(context, node, messageId) {
  reportProfanity(context, context.sourceCode.getTokens(node), messageId, node);
}

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Recommends against the use of profanity in code",
    },
    messages: {
      variable: "Variable name '{{ token }}' contains profanity",
      property: "Property name '{{ token }}' contains profanity",
      function: "Function name '{{ token }}' contains profanity",
      string: "String '{{ token }}' contains profanity",
      comment: "Comment '{{ token }}' contains profanity"
    },
    schema: [
      {
        type: "object",
        properties: {
          allowVariables: { type: "boolean" },
          allowProperties: { type: "boolean" },
          allowFunctions: { type: "boolean" },
          allowStrings: { type: "boolean" },
          allowComments: { type: "boolean" }
        },
        additionalProperties: false
      }
    ]
  },
  create(context) {
    if (!context.options[0]?.allowComments) {
      reportProfanity(context, context.sourceCode.getAllComments(), "comment");
    }

    return {
      Identifier(node) {
        switch (node.parent.type) {
          case "VariableDeclarator":
            if (!context.options[0]?.allowVariables) {
              reportProfanityAtNode(context, node, "variable");
            }
            break;

          case "Property":
            if (!context.options[0]?.allowProperties) {
              reportProfanityAtNode(context, node, "property");
            }
            break;

          case "MemberExpression":
            if (node.parent.property === node) {
              if (!context.options[0]?.allowProperties) {
                reportProfanityAtNode(context, node, "property");
              }
            } else if (node.parent.object === node) {
              if (!context.options[0]?.allowVariables) {
                reportProfanityAtNode(context, node, "variable");
              }
            }
            break;

          case "FunctionDeclaration":
          case "CallExpression":
            if (!context.options[0]?.allowFunctions) {
              reportProfanityAtNode(context, node, "function");
            }
            break;
        }
      },

      Literal(node) {
        if (!context.options[0]?.allowStrings) {
          reportProfanityAtNode(context, node, "string");
        }
      }
    };
  }
};
