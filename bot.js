
const { default: axios } = require('axios');
const  cheerio = require('cheerio');
const { Client, Intents } = require('discord.js');
// const request = require('request');
require('dotenv').config();

const client = new Client({ intents: [
                            Intents.FLAGS.GUILDS,
                            Intents.FLAGS.GUILD_MESSAGES ]});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
   

});
// div.market-type-list.market-info-type-list.relative
// div.market-info-list-cont p a
// div.market-info-list-cont

client.on('message',msg =>{
    if(msg.content==='hi')
    {   
        axios.get("https://quasarzone.com/bbs/qb_tsy")
        .then(res=>{
            const $ = cheerio.load(res.data);
            $bodyList = $("div.market-info-list-cont","div.market-type-list").each(function(index,elem){
                console.log($("span.text-orange",this).html())
                console.log($("span.ellipsis-with-reply-cnt",this).html())
            });
        })        
    }
})
client.login(process.env.CLIENT_TOKEN);
