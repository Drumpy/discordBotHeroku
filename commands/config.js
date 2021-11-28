import DiscordJS from "discord.js";

export const commandsList = [
  {
    name: "ping",
    description: "Replies with pong",
  },
  {
    name: "joke",
    description: "Replies with a random joke",
  },
  {
    name: "broma",
    description: "Responde con un chiste traducido",
  },
  {
    name: "tip",
    description: "Responde con Tips de Desarrollo",
  },
  {
    name: "enviar",
    description: "Contribuye con tu propio Tip de Desarrollo para la Comunidad",
    options: [
      {
        name: "texto",
        description: "Ingresa el texto con el Tip a contribuir",
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
    ],
  },
];
