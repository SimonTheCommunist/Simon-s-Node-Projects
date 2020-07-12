//BOT shit 
require('dotenv').config();
const request = require("request");
const Discord = require('discord.js');
const { resolve } = require('path');
const bot = new Discord.Client();
const prefix="?";
const TOKEN = "redacted"//process.env.TOKEN;
//APi stoff
const url1 ="https://uselessfacts.jsph.pl/random.json?language=en";
const url2 = 'https://api.nasa.gov/planetary/apod?api_key=oyF4ZF1NgvKcZuj64Al9TmdJslmp1AHFPCCvxbTI'
const url3 = 'https://api.covid19api.com/summary';
const url5 = 'https://fdo.rocketlaunch.live/json/launches/next/5';



bot.once('ready', () => {
	console.log('Ready!');
});

bot.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
  

	if (command === 'fact') {
        
        const fact= await factf(); 
        message.channel.send(fact);
	} else if (command === 'apod') {
        const apod = await nasaf();
        message.channel.send(apod);
        
	}else if (command === 'covid'){
        const covid19 = await covidf();
        message.channel.send(covid19);
    }else if (command === 'next5'){
        const next5l = await next5();
        message.channel.send(next5l);
    }else if (command === "help"){
        var description = "```?fact: gives a random fact \n" + "?apod: Gives nasas picture of the day\n" + "?covid: gives stats on covid19\n" + "?next5: list the next 5 upcoming spaceflight launches\n```"
        message.channel.send(description);
    }
	// other commands...
});


function factf(){
    return new Promise(resolve => { 
        request.get(url1, (error, response, body) => {
            let json = JSON.parse(body);
            resolve(json["text"]);
            
            
        })
    })
}

function nasaf(){
    return new Promise(resolve =>{
        request.get(url2, (error, responces, body) => {
            let json = JSON.parse(body);
            imgurl = (json["url"]);
            imgexp = (json["explanation"]);
            resolve(imgurl + " " + imgexp);
        })
    })
}

function covidf(){
    return new Promise(resolve =>{
        request.get(url3, (error, responces, body) =>{
            let data = JSON.parse(body);
            coDate = (data["Date"]);
            NC = (data["Global"]["NewConfirmed"]);
            TC = (data["Global"]["TotalConfirmed"]);
            ND = (data["Global"]["NewDeaths"]);
            TD = (data["Global"]["TotalDeaths"]);
            NR = (data["Global"]["NewRecovered"]);
            TR = (data["Global"]["TotalRecovered"]);
            GblSum = ("New Confirmed = " + NC + ". Total Confirmed = " + TC + ". New Deaths = " + ND + ". Total Deaths = " + TD + ". New Recovered = " + NR + ". Total Recovered = " + TR);
            resolve(GblSum + " The date this data was published: " + coDate);
        })
    })
}
function next5(){
    return new Promise(resolve =>{
        request.get(url5, (error, responces, body)=>{
            let data = JSON.parse(body);
            next1_name = (data["result"][0]["name"]);
            next1_vehicle = (data["result"][0]["vehicle"]["name"]);
            next1_provider = (data["result"][0]["provider"]["name"]);
            next1_launch_des = (data["result"][0]["launch_description"]);
            
            //second 
            next2_name = (data["result"][1]["name"]);
            next2_provider = (data["result"][1]["provider"]["name"]);
            next2_vehicle = (data["result"][1]["vehicle"]["name"]);
            next2_launch_des = (data["result"][1]["launch_description"]);
            //third
            next3_name = (data["result"][2]["name"]);
            next3_provider = (data["result"][2]["provider"]["name"]);
            next3_vehicle = (data["result"][2]["vehicle"]["name"]);
            next3_launch_des = (data["result"][2]["launch_description"]);
            //fourth
            next4_name = (data["result"][3]["name"]);
            next4_provider = (data["result"][3]["provider"]["name"]);
            next4_vehicle = (data["result"][3]["vehicle"]["name"]);
            next4_launch_des = (data["result"][3]["launch_description"]);
                //Fifth
            next5_name = (data["result"][4]["name"]);
            next5_provider = (data["result"][4]["provider"]["name"]);
            next5_vehicle = (data["result"][4]["vehicle"]["name"]);
            next5_launch_des = (data["result"][4]["launch_description"]);
            next1 = ("**First**: " +next1_name +" launching on,  " + next1_vehicle + " by, " + next1_provider + ". " + next1_launch_des)
            next2 = ("**Second**: " +next2_name +" launching on,  " + next2_vehicle + " by, " + next2_provider + ". " + next2_launch_des)
            next3 = ("**Third**: " +next3_name +" launching on,  " + next3_vehicle + " by, " + next3_provider + ". " + next3_launch_des)
            next4 = ("**Fourth**: " +next4_name +" launching on,  " + next4_vehicle + " by, " + next4_provider + ". " + next4_launch_des)
            next5th = ("**Fifth**: " +next5_name +" launching on,  " + next5_vehicle + " by, " + next5_provider + ". " + next5_launch_des)
            resolve("" + next1 +" \n" +next2 +" \n" + next3 +" \n" + next4 +" \n" +next5th +" \n")
        })
    })
}
bot.login(TOKEN);
