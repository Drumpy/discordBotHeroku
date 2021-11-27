import express from "express";
const app = express();
import Discord, { Intents } from "discord.js";
import fetch from "node-fetch";
import { config } from "dotenv";
config();

app.listen(process.env.PORT);

import getJoke from "./getJoke.js";
import getTranslation from "./getTranslation.js";

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const JOKE_URL = "https://v2.jokeapi.dev/joke/Programming?type=single";
const TRANSLATION_URL = "https://libretranslate.de/translate";

const client = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", async () => {
  console.log("Connected as " + client.user.tag);

  // Current Activity
  client.user.setActivity("Black Mirror", { type: "WATCHING" });

  let commands = client.application?.commands;
  // Command 'Ping'
  commands?.create({
    name: "ping",
    description: "Replies with pong",
  });
  // Command 'Joke'
  commands?.create({
    name: "joke",
    description: "Replies with a random joke",
  });
  // Command 'Broma'
  commands?.create({
    name: "broma",
    description: "Responde con un chiste traducido",
  });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === "ping") {
    interaction.reply({
      content: "pong",
      ephemeral: true,
    });
  }

  // Command 'Joke'
  if (commandName === "joke") {
    const jokeMessage = await getJoke(JOKE_URL);

    interaction.reply({
      content: jokeMessage,
    });
  }

  // Command 'Broma'
  if (commandName === "broma") {
    await interaction.deferReply();

    const jokeMessage = await getJoke(JOKE_URL);
    const translatedJoke = await getTranslation(TRANSLATION_URL, jokeMessage);

    interaction.editReply({
      content: translatedJoke,
    });
  }
});

client.on("messageCreate", async (receivedMessage) => {
  // Prevent bot from responding to its own messages
  if (receivedMessage.author == client.user) return;

  // Commands
  const prefix = "!";

  const tongoReply = [
    "¿Sale k3? 🥱",
    "Tuve acceso a una cuenta de Pornhub Premium. ¿Hacemos negocio? 😏",
    "Tonguito cacheton, te estamos esperando 😝",
    "¿Notaste que hora es, no? 🤏",
    "Moshi Moshi 🐰",
    "Vanish... 💨",
    "Meeeh 😪",
    "Mordekaiser número uno HueHueHue",
    "¿Sale ARAM o GTA? 🎮",
    "Alto shupapija el @kche#3119 🍆",
    "Me siento más turbado que nunca 👀",
    '"Masturbarse es positivo, si fuera negativo sería menosturbarse" - Rafael Alberti',
  ];

  // Random Text from Array
  const randomText = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  // TODO: PASAR ESTO A UNA FUNCION
  if (receivedMessage.content.startsWith(`${prefix}tongo`)) {
    receivedMessage.channel.send(randomText(tongoReply));
  }
});

client.login(DISCORD_TOKEN);
