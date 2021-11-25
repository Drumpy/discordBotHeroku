import express from "express";
import fetch from "node-fetch";
const app = express();
import { config } from "dotenv";
config();

app.listen(process.env.PORT);

import Discord from "discord.js";
const client = new Discord.Client();
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

client.on("ready", () => {
  console.log("Connected as " + client.user.tag);

  // Current Activity
  client.user.setActivity("Black Mirror", { type: "WATCHING" });

  // client.guilds.cache.forEach((guild) => {
  //   console.log(guild.name);
  //   guild.channels.cache.forEach((channel) => {
  //     console.log(` - ${channel.name} ${channel.type} ${channel.id} `);
  //   });
  // });
});

client.on("message", async (receivedMessage) => {
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

  // PASAR ESTO A UNA FUNCION
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
