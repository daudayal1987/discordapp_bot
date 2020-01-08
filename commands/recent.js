/*
This module supports the messages which starts with !recent
it look for the author of message and search in db for their recent search queries
all the releated search queries then returned to BOT
*/
let db = require('../db');
module.exports = async function(message) {

    let phrase = message.content.replace('!recent ', '');
    let queries = await db.findRecentQueries(message.author.id, phrase);
    let reply = queries.reduce(function(acc, q){
        return acc + ' "' + q.content + '"';
    }, "");

    message.reply(reply);
}