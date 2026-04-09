const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('translate')
		.setDescription('Translates a message to English')
		.addStringOption((option) => option.setName('message_link').setDescription('Enter link of message').setRequired(true)),
	
	async execute(interaction) {
		const messageLink = interaction.options.getString('message_link');
		const ids = messageLink.slice('https://discord.com/channels/'.length).split('/');
		const [, channelId, messageId] = ids;

		const channel = await interaction.guild.channels.fetch(channelId);
		console.log(channel);

		const message = await channel.messages.fetch(messageId);
		console.log(message);

		await interaction.reply(`${message.content}`);
	},
};