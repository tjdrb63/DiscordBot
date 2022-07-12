
const  axios = require('axios');
const  cheerio = require('cheerio');
const discord = require('discord.js');
const cron = require('node-cron');
const { Client, Intents } = require('discord.js');
const request = require('request');

require('dotenv').config();

const client = new Client({ intents: [
                            Intents.FLAGS.GUILDS,
                            Intents.FLAGS.GUILD_MESSAGES ]});


let maxComment = 0;

client.on('ready',() => {
    var task = cron.schedule('10 * * * * *',function(){       
        axios.get("http://www.emuline.org/topic/1915-arcade-pc-sdvx-vivid-wave/page/100/")
        .then(res=>{
            const $ = cheerio.load(res.data);
            $('article.cPost').each(function(index,element){
                var commentNum = element.attribs['id'].substring(10)
                if(maxComment < commentNum){
                    maxComment = commentNum
                    // 시간
                    // console.log($(this).find("div.cAuthorPane_content > div").text())
                    var time = $(this).find("div.cAuthorPane_content > div").text();
                    // 내용
                    let comment = $(this).find("div[data-role=commentContent]>p").text()
                    const embed = new discord.MessageEmbed()
                    .setTitle('SDVX 스크랩')
                    .setDescription(time+comment)
                    .setURL('http://www.emuline.org/topic/1915-arcade-pc-sdvx-vivid-wave/page/100/');
                    client.channels.cache.get('963395504815869962').send({embeds : [embed]});
                }
                else{
                    console.log("체크 결과 : 새로운 코맨트 없음")
                }
            }) 
        }) 
    },{
        scheduled:false 
    })
    task.start();
});

client.on('message',msg =>{
  
})

client.login(process.env.CLIENT_TOKEN);
