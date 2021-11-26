import express from "express";
import fetch from "node-fetch";
const app = express();
import { config } from "dotenv";
config();

app.listen(process.env.PORT);

import Discord, { Intents } from "discord.js";
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

const client = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log("Connected as " + client.user.tag);

  // Current Activity
  client.user.setActivity("Black Mirror", { type: "WATCHING" });

  let commands = client.application?.commands;
  commands?.create({
    name: "ping",
    description: "Replies with pong",
  });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === "ping") {
    interaction.reply({
      content: "pong",
    });
  }
});

client.on("messageCreate", async (receivedMessage) => {
  // Prevent bot from responding to its own messages
  if (receivedMessage.author == client.user) return;

  const joke = fetch("https://v2.jokeapi.dev/joke/Programming?type=single")
    .then((res) => res.json())
    .then((data) => {
      return data.joke;
    });

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

  // Command: !joke
  if (receivedMessage.content.startsWith(`${prefix}joke`)) {
    joke.then((data) => {
      receivedMessage.channel.send(data);
    });
  }
});

client.login(DISCORD_TOKEN);
