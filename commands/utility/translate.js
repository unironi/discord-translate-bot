const { SlashCommandBuilder } = require('discord.js');
const { Translate } = require('@google-cloud/translate').v2;

const translate = new Translate();

let cachedLanguages = null;

async function getLanguages() {
	if (!cachedLanguages) {
		const [languages] = await translate.getLanguages();
		cachedLanguages = languages;
	}
	return cachedLanguages;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('translate')
		.setDescription('Translates a message to English')
		.addStringOption((option) => option
			.setName('message_link')
			.setDescription('Enter link of message')
			.setRequired(true))
		.addStringOption((option) => option
			.setName('translate_to')
			.setDescription('Pick the language you\'d like to translate to')
			.setAutocomplete(true)),

	async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused().toLowerCase();

		const languages = await getLanguages();

		const filtered = languages
			.filter((choice) => {
				const query = focusedValue;
				return choice.name.toLowerCase().startsWith(query)
				|| choice.code.toLowerCase().startsWith(query);
			})
			.slice(0, 25);

		await interaction.respond(filtered.map((choice) => ({ name: choice.name, value: choice.code })));
	},
	
	async execute(interaction) {
		await interaction.deferReply(); // delay response since waiting for fetches takes longer than default 3 second timer for responding

		const messageLink = interaction.options.getString('message_link');
		const ids = messageLink.slice('https://discord.com/channels/'.length).split('/');
		const [, channelId, messageId] = ids;

		const channel = await interaction.guild.channels.fetch(channelId);
		const message = await channel.messages.fetch(messageId);

		const text = message.content;
		const target = interaction.options.getString('translate_to') || 'en';

		let [ translations ] = await translate.translate(text, target);
		translations = Array.isArray(translations) ? translations : [translations];

		console.log(`translation: ${translations}`);

		await interaction.editReply(`Message by ${message.author.globalName}:\n${text}\n\nTranslation:\n${translations}`);
	},
};