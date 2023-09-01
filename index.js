const { discord, Client, Intents, MessageEmbed   } = require("discord.js");
const client = new Client({ intents: [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_BANS,
  Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  Intents.FLAGS.GUILD_INTEGRATIONS,
  Intents.FLAGS.GUILD_WEBHOOKS,
  Intents.FLAGS.GUILD_INVITES,
  Intents.FLAGS.GUILD_VOICE_STATES,
  Intents.FLAGS.GUILD_PRESENCES,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.GUILD_MESSAGE_TYPING,
  Intents.FLAGS.DIRECT_MESSAGES,
  Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  

]});

require('dotenv').config();

const fs = require('fs');
const articles = require('./articles.json'); // Remplacez le chemin par le chemin de votre fichier JSON

const TOKEN = process.env.TOKEN;

client.on('ready', async () => {

    console.log('🤖 Bot fonctionnel !')
    client.user.setActivity('👜 Super U');

    const commands = [
        {
            name: 'fiche',
            description: '/fiche [CODE ARTICLE]',
            options: [
                {
                    name: "fiche",
                    type: "STRING",
                    description: "Code de l\'article",
                    required: true,
                }
                ]
        },

        {
            name: 'edit',
            description: '/edit [CODE ARTICLE]',
        }
    ]

    try {
        const guildID = '1133274357880324166'
        const commandReponse = await client.guilds.cache.get(guildID)?.commands.set(commands)
        console.log('Slash commande enregistré')

    } catch (error) {
        console.error(error)
    }

})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand) return;

    const {commandName, options} = interaction

    if (commandName === 'fiche') {
        const codeArticle = options.getString('fiche');
        console.log("Code article reçu : " + codeArticle);

        const article = articles.find(article => article.Code.toString() === codeArticle);
        
        if (article) {
            console.log(article)
            const embed = new MessageEmbed()
                .setTitle(`Fiche de l'article - Code ${article.Code}`)
                .addFields(
                    {name: "Nom de l'article ", value: article.Nom.toString()},
                    { name: 'Code', value: article.Code.toString() },
                    { name: 'Gencod', value: article.Gencod.toString() },
                    { name: 'Conditionnement', value: article.Conditionnement.toString() },
                    { name: 'VMS', value: article.VMS.toString() },
                    { name: 'Stock', value: article.Stock.toString() }
                )
                

            await interaction.reply({ embeds: [embed] });
        } else {
            await interaction.reply('Aucun article trouvé avec ce code.');
        }
    } else if (commandName === 'edit') {

    }
})

client.login(TOKEN)