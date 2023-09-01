const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => {

    console.log('🤖 Bot fonctionnel !')
    client.user.setActivity('👜 Super U');

})

client.on('interactionCreate', async interaction => {
    
})

client.login(TOKEN)