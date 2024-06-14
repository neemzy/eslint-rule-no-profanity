# eslint-rule-no-profanity

ESLint rule example and tutorial

## Setup

```sh
$ npm i
$ cp config.json.dist config.json
```

Edit the newly created file:

```json
{
  "port": 3000,
  "slack": {
    "signing_secret": "Slack signing secret",
    "bot_token": "Slack bot token",
    "app_token": "Slack app token",
    "channel": "Slack channel id"
  },
  "openai": {
    "key": "OpenAI API key",
    "model": "OpenAI model name", // e.g. "gpt-3.5-turbo-instruct"
    "temperature": 0 // 0-1
  }
}
```

## Usage

```sh
$ npm start
```

`@mention`ing the bot in the chosen channel (once the former has joined the latter) will have it reply using ChatGPT.

## Tutorial

Read [the tutorial](tutorial.md) to learn how to create a Slack application, get all the information required above, and make your own bot with whatever feature you fancy!
