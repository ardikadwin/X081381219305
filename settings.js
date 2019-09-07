exports.config = function() {
	var config = {
		subject: "[ Recent Activity ] The Client Area has been Requested to Reset the Apple ID Password. [{textrandom,11,1,up}] ", // Ini untuk subjectnya ✅ Thank You! Your Subscription YouTube Red at Store on <#date#> was Successfull.
		letter: __dirname + "/letter/us.html", // ini letternya
		list: __dirname + "/lists/x.txt", // ini listnya
		smtp: __dirname + "/smtp/smtp.txt", // ini list smtpnya
		watchhtml: "<b><b/>", // ini tampilan untuk apple watch
		fromname: "Apple Care",
		fromemail: "noreply-care<#numeric11#>@serviceid-accountattemptmailnotification.inboxhost-<#numeric23#>.1566073685.com", // ini email pengirim
		// kalo mau tambah attachments tinggal ketik gini
		
		url: ["https://google.com"], // ini untuk random shorturl kalo punya banyak url
		headers: {
			// ini untuk custom headers. biasanya untuk racikan biar gampang inbox atau focused di hotfams
		},
		priority: "high", // ini email priority
		timezone: "Hawaii/USA", // ini untuk setting zona waktu date time di letter
		maxConnections: 1, // ini koneksi yang di pake maximal 5 biar cepet
		maxMessages: 1,   // ini maximal email yang dikirim dalam 1 koneksi
		rateDelta: 60000,  // ini delay dalam skala miliseconds. 1000 = 1 detik
		rateLimit: 10,  // ini maksudnya kalo udah 15 email maka akan delay waktu sesuai "rateDelta"
		debug: false, // ini untuk debuging, bikin false aja kalo gapaham, coz ini ga ngaruh sama inbox
		logger: false // ini untuk nampilin debug nya, false aja
	};
	return config;
}


