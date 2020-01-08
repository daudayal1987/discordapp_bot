/*
This module is exporting handler function for message event of BOT
it currently support 
1. hi with reply hey
2. message which starts with !google
3. message which starts with !recent

All the supported message handlers are reside in commands folder on root of the application
*/

//load module to support !recent command
let recent = require('../commands/recent');

//load module to support !google command
let google = require('../commands/google');

//Handler to support message event of bot
module.exports = (client, message) => {

    //reply hey for hi
    if(message.content === 'hi'){
        return message.reply('hey')
    }

    //Hand over the call to recent module if message start with !recent
    if(message.content.startsWith('!recent ')){
        return recent(message);
    }

    //Hand over the call to google module if message start with !google
    if(message.content.startsWith('!google ')){
        return google(message);
    }
}