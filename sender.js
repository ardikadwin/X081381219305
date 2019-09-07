const nodemailer = require("nodemailer");
const file = require("fs");
const figlet = require("figlet");
var moment = require("moment-timezone");
var moment = require("moment");
const smtpPool = require('nodemailer-smtp-pool');
const browser = require("./randomBrowser");
const str = require("./randomString");
const os = require("./randomOs");
const country = require("./randomCountry");
const settings = require("./settings.js");
var config = settings.config();
const font = ["Whimsy","Bloody","Stop","Small Poison","S Blood","Roman","Nancyj-Fancy","Nancyj-Underlined","NV Script","Marquee","Georgia11","Def Leppard","3D-ASCII","ANSI Shadow","Swamp Land","Graffiti"];
const fontcolor = ["red","green","blue","yellow","purple"];
var time = moment().tz(config['timezone']);
function parseSMTP(smtp){
	if(smtp.match(/\|/g)){
		smtp = smtp.split("|");
		if(smtp.length == 5){
			return {
				host: smtp[0],
				port: smtp[1],
				secure: smtp[2],
				user: smtp[3],
				pass: smtp[4]
			}
		}
	}
}

function secure(status){
	if(status == 1){
		return true;
	} else {
		return false;
	}
}

function stringReplace(string,email = "",url = ""){
	var content = string;
	var ip = (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255) + 0)+"."+(Math.floor(Math.random() * 255) + 0)+"."+(Math.floor(Math.random() * 255) + 0);
	content = content.replace(/<#email#>/g,email);
	content = content.replace(/<#url#>/g,url[Math.floor((Math.random() * url.length - 1) + 1)]);
	content = content.replace(/<#ip#>/g, ip);
	content = content.replace(/<#browser#>/g,browser.randomBrowser());
	content = content.replace(/<#os#>/g,os.randomOs());
	content = content.replace(/<#date#>/g,time.format("llll"));
	content = content.replace(/<#country#>/g,country.randomCountry());
	content = content.replace(/<#(numeric|alphabet|alphanumeric|NUMERIC|ALPHABET|ALPHANUMERIC)(\d+)#>/g, function(match, str1,str2){
		return str.randomString(str2,str1);
	});
	return content;
}

function readFile(name){
	return file.readFileSync(name).toString();
}

function sendEmail(address,smtpnumber,number){
	var smtp = parseSMTP(smtpnumber);
	let transporter = nodemailer.createTransport(
		smtpPool(
			{
				pool: true,
				host: smtp['host'],
				port: smtp['port'],
				secure: secure(smtp['secure']),
				auth: {
					user: smtp['user'],
					pass: smtp['pass']
				},
				maxConnections: config['maxConnections'],
				maxMessages: config['maxMessages'],
				rateDelta: config['rateDelta'],
				rateLimit: config['rateLimit'],					
				logger: config['logger'],
				debug: config['debug']
			}
		)
    );
	var message = {
		forceEmbeddedImages: true,
		to: address,
		subject: stringReplace(config['subject'],address,config['url']),
		html: stringReplace(readFile(config['letter']),address,config['url']),
		watchHtml: stringReplace(config['watchhtml'],address,config['url']),
		priority: config['priority']		
	}
	if(config['fromemail'] != ""){
		message['from'] = stringReplace(config['fromname']) + "<" + stringReplace(config['fromemail']) + ">";
	} else {
		message['from'] = config['fromname'] + " <" + smtp['user'] + ">";
	}
	
	if(typeof config['attachments'] !== 'undefined' && config['attachments'] !== null){
		message['attachments'] = config['attachments'];
	}
	if(typeof config['headers'] !== 'undefined' && config['headers'] !== null){
		message['headers'] = config['headers'];
	}
	transporter.sendMail(message, function(error, info) {
		if(error){
			console.log(color("FAILED","bred") + " : " + color(address,"yellow") + " | " + color("INFO","byellow") + " : " + color(error,"red") + " | " + color("Req No","bpurple") + " : " + color("[" + number + "] " + smtp['user'],"purple"));
		} else {
			console.log(color("SUCCESS","bgreen") + " : " + color(address,"yellow") + " | " + color("INFO","byellow") + " : " + color(info.response,"green") + " | " + color("Req No","bpurple") + " : " + color("[" + number + "] " + smtp['user'],"purple"));
		}
		transporter.close();
	});
	transporter.on('idle', function(){
		while (transporter.isIdle() && message.length) {
			transporter.sendMail (message.shift());
		}
	});	
}

function color(text,color = "blue"){
	switch(color){
		case "red":
			return "\x1b[91m" + text + "\x1b[0m";
		break;
		case "green":
			return "\x1b[92m" + text + "\x1b[0m";
		break;
		case "blue":
			return "\x1b[94m" + text + "\x1b[0m";
		break;
		case "yellow":
			return "\x1b[93m" + text + "\x1b[0m";
		break;
		case "purple":
			return "\x1b[95m" + text + "\x1b[0m";
		break;
		case "bred":
			return "\x1b[41m" + text + "\x1b[0m";
		break;
		case "bgreen":
			return "\x1b[42m" + text + "\x1b[0m";
		break;
		case "bblue":
			return "\x1b[44m" + text + "\x1b[0m";
		break;
		case "byellow":
			return "\x1b[43m" + text + "\x1b[0m";
		break;
		case "bpurple":
			return "\x1b[45m" + text + "\x1b[0m";
		break;
	}
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
console.log("\n");
console.log(color(figlet.textSync('XNXX.COM', {
    font: font[Math.floor((Math.random() * font.length - 1) + 1)],
    horizontalLayout: 'default',
    verticalLayout: 'default'
}),fontcolor[Math.floor((Math.random() * fontcolor.length - 1) + 1)]));
console.log("\n");
var array_email = readFile(config['list']).split("\n");
var array_smtp = readFile(config['smtp']).split("\n");
var counter = 0;
var number = 0;
var info = "";
info = info + color(" Email ","bpurple") + color(" " + array_email.length + " ","bgreen") + " ";
info = info + color(" SMTP ","bpurple") + color(" " + array_smtp.length + " ","bgreen") + " ";
info = info + color(" Delay ","bpurple") + color(" " + config['rateLimit'] + "emails/" + config['rateDelta'] + "ms ","bgreen") + " ";
info = info + color(" Started at ","bpurple") + color(" " + time.format("llll") + " ","bgreen") + " ";
info = info + color(" Coded by ","bpurple") + color(" FathurFreakz ","bred") + " ";
console.log(info);
console.log("\n");
const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
var start = new Date().getTime();
asyncForEach(array_email, async (num) => {
	var end = new Date().getTime();
	if(number % array_smtp.length == 0){
		counter = 0;
	}
	if(number % config['rateLimit'] == 0 && number != 0){
		console.log(color("Delay for " + config['rateDelta'] + "ms, time differences form start until now " + (end-start) + "ms","bblue"));
		await waitFor(config['rateDelta']);
	} else{
		sendEmail(num.trim(),array_smtp[counter].trim(),"E/S : " + number + "/" + counter);
	}
	await waitFor(500);
	number++;
	counter++;
});

