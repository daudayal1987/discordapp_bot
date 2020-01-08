/*
This module supports the messages which starts with !google
it search for the web for given query and return top 5 results to BOT channel
it also saves the queries in mongodb using db module
it using googleapis module to make calls to google apis for custom search
*/
const {google} = require('googleapis');
let db = require('../db');

module.exports = async message => {

    let search_query = message.content.replace('!google ', '');
    db.saveQuery(search_query, message.author);

    const customsearch = google.customsearch('v1');
    const results = await customsearch.cse.list({
        cx: process.env.GOOGLE_SEARCH_ENGINE_ID,
        q: search_query,
        auth: process.env.GOOGLE_SEARCH_API_KEY,
        alt: "json",
        google_domain: "www.gogole.com", 
        location: "IN",
        hl: "lang_en",
        gl: "lang_en",
        safe: "off",
        num: 5,
        start: 1,
    });
    
    let links = results.data.items.reduce(function(acc, item){
        return acc + item.link + "\r\n";
    },"");

    message.channel.send(links);
}