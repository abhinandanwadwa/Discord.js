const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        // To Access the 'Client' instance here, use: 'interaction.client'.
        await interaction.reply('Pong!');
    },
};