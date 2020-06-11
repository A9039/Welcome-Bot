const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
/**
 * Module Imports
 */
const Discord = require("discord.js");
const Canvas = require("canvas");
const {
  TOKEN,
  WelcomeChannel,
  WelcomeMessage,
  AutoRole,
  AutoRoleName,
  SetStatus
} = require("./config.json");
const client = new Discord.Client({ disableEveryone: true });

client.login(TOKEN);


/**
 * Client Events
 */
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(SetStatus, { type: 'PLAYING' });
 // client.user.setStatus("idle"); // YOU CAN CHOUSE: online, idle, invisible, dnd (do not disturb)
});
client.on("warn", (info) => console.log(info));
client.on("error", console.error);


/**
 * CODE OF THE BOT
 */
client.on("guildMemberAdd", async member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === WelcomeChannel);
  if (!channel) return;
  let role = member.guild.roles.cache.find(role => role.name == AutoRoleName);
  let background = await Canvas.loadImage("./welcome.png");
  let avatar = await Canvas.loadImage(
    member.user.displayAvatarURL({ format: "png" })
  );
  let canvas = Canvas.createCanvas(800, 300);
  let ctx = canvas.getContext("2d");
  ctx.patternQuality = "bilinear";
  ctx.filter = "bilinear";
  ctx.antialias = "subpixel";
  ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 2;
  ctx.stroke();
  ctx.beginPath();
  ctx.drawImage(background, 0, 0, 800, 300);
  ctx.font = "36px Arial";
  ctx.fontSize = "72px";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText(member.user.username, 545, 177);
  ctx.font = "16px Arial Bold";
  ctx.fontSize = "72px";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText(`${member.guild.memberCount} Members`, 580, 200);
  ctx.beginPath();
  ctx.arc(169.5, 148, 126.9, -100, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(avatar, 36, 21, 260, 260);
  var welcomeMsg = WelcomeMessage.replace("[[user]]", member.user);
  welcomeMsg = welcomeMsg.replace("[[server]]", member.guild.name);
  welcomeMsg = welcomeMsg.replace("[[members]]",member.guild.memberCount);
  let file = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png");
  setTimeout(() => {
    channel.send(welcomeMsg, file);
  }, 2000);
  
if(AutoRole === true){
if (!role)return console.log("**Couldn't find that role**");
if (role) return member.roles.add(role);    
}else return;  
});
