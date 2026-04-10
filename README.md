## Discord Translate Bot

Translates messages in a server by running the command `/translate [message_link] [translate_to]`

`translate_to` is an optional argument and will default to English if there is no selection.

Copy message link:
![alt text](image-2.png)


Input command and paste link, and optionally pick language to translate to:
![alt text](image-1.png)


Output of Translate Bot:
![alt text](image.png)


Potential future extensions:
- make the output look a little prettier by using TextDisplayBuiler which lets you do markdown
- have the option to input message ID or the content of the message
- deploy the bot so it runs 24/7
- default message behaviour so that only you can see it, with options to dismiss or to make it viewable by the rest of the server

Resources:
- https://discordjs.guide/legacy
- https://docs.cloud.google.com/translate/docs/translate-text#basic_tx + the vast maze of google api docs