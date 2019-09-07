exports.randomBrowser = function (){
	var browser = ['Internet Explorer','Firefox','Safari','Chrome','Edge','Opera','Netscape'];
	return browser[Math.floor((Math.random() * browser.length - 1) + 1)];
};