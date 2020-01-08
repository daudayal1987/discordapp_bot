//load .env file for create environment variables
require('dotenv').config();

//Require winston for logging
const logger = require('winston');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

//load discord.js
const Discord = require('discord.js');
const client = new Discord.Client();

/*
All the event handlers are put in events folder with the name of {event}.js
using fs module load all the events and attach handlers to event
*/
const fs = require('fs');
fs.readdir('./events/', (err, files) => {
    files.forEach(file => {
        const eventHandler = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, (...arg) => eventHandler(client, ...arg));
    })
})

//login discord bot
client.login(process.env.BOT_TOKEN);
