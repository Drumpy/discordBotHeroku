import {} from "dotenv/config";
import express from "express";
const app = express();
import DiscordJS, { Intents } from "discord.js";

app.listen(process.env.PORT);

import getJoke from "./utils/getJoke.js";
import getTranslation from "./utils/getTranslation.js";
import { addItem, getDatabase } from "./utils/notion.js";
import randomText from "./utils/randomText.js";
import { commandsList } from "./commands/config.js";

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const JOKE_URL = "https://v2.jokeapi.dev/joke/Programming?type=single";
const TRANSLATION_URL = "https://libretranslate.de/translate";

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", async () => {
  console.log("Connected as " + client.user.tag);

  // Current Activity
  client.user.setActivity("Policias en Acción", { type: "WATCHING" });

  let commands = client.application?.commands;

  // Create new commands
  commandsList.forEach((command) => {
    if (command.options === undefined) {
      commands?.create({
        name: command.name,
        description: command.description,
      });
    } else {
      commands?.create({
        name: command.name,
        description: command.description,
        options: [
          {
            name: command.options[0].name,
            description: command.options[0].description,
            required: command.options[0].required,
            type: command.options[0].type,
          },
        ],
      });
    }
  });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  // Command 'Ping'
  if (commandName === "ping") {
    interaction.reply({
      content: "pong 🏓",
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

  // Command 'Tip'
  if (commandName === "tip") {
    const tipsFromDataBase = await getDatabase();
    const randomTip = randomText(tipsFromDataBase);

    interaction.reply({
      content: randomTip,
    });
  }

  // Command 'Enviar'
  if (commandName === "enviar") {
    await interaction.deferReply();
    const tipFromUser = await options.getString("texto");
    await addItem(tipFromUser);

    interaction.editReply({
      content: "**¡Tip recibido!** 😃 \n¡Gracias por tu aporte para la Comunidad!",
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

  // TODO: PASAR ESTO A UNA FUNCION
  if (receivedMessage.content.startsWith(`${prefix}tongo`)) {
    receivedMessage.channel.send(randomText(tongoReply));
  }
});

client.login(DISCORD_TOKEN);
