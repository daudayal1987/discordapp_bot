/*
This is db layer to save recent search queries in mongodb 
It exports two functions
1. save queries
2. find recent queries
These two functions accept the author/user who is performing the request and the phrase after their command
*/
const mongoose = require('mongoose');
mongoose.connect('mongodb://'+process.env.MONGO_HOST+':'+process.env.MONGO_PORT+'/'+process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (err)=>{
    console.log("Error in connecting with mongodb");
    console.log(err);
    process.exit(1);
});

db.once('open', ()=>{
    console.log("Connection with mongodb succeeded");
});

let searchSchema = mongoose.Schema({
    userid: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    created_on:{
        type: Date,
        default: Date.now
    }
});

let searchModel = mongoose.model('Search', searchSchema);

function saveQuery(content, author){

    let search = new searchModel;
    search.userid = author.id; 
    search.username = author.username;
    search.content = content;
    search.save();
}

async function findRecentQueries(userid, phrase){

    return new Promise((resolve, reject)=>{
        // let q = searchModel.find({
        //     $text: {
        //         $search: phrase
        //     },
        //     userid: userid
        // });

        let q = searchModel.find({
            content: new RegExp(phrase, "gi"),
            userid: userid
        });

        q.then(function(docs){
            return resolve(docs);
        })
    })
}

module.exports.saveQuery = saveQuery;
module.exports.findRecentQueries = findRecentQueries;