const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: GatewayIntentBits.Guilds });

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
    // After this, listening for other events is as easy as creating a new file in the events folder. The event handler will automatically retrieve and register it whenever you restart your bot.


    // In most cases, you can access your client instance in other files by obtaining it from one of the other discord.js structures, e.g. interaction.client in the interactionCreate event.
}

// client.once('ready', (c) => {
//     console.log(`Ready! Logged in as ${c.user.tag}`);
// });

// client.on('interactionCreate', interaction => {
//     console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered and interaction!!`);
// });

client.login(token);