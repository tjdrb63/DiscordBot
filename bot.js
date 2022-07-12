
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


let maxComment = 130938;

client.on('ready',() => {
    client.channels.cache.get('963395504815869962').send("작동 시작");               
    var task = cron.schedule('30 * * * *',function(){       
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
                    client.channels.cache.get('963395504815869962').send("30분 기준 체크하는지 확인");
                
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
