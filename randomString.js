exports.randomString = function (len = 10,type = "alphabet"){
	switch(type){
		case "alphabet":
			var str = "abcdefghijklmnopqrstuvwxyz";
			var string = "";
			for(i=0;i<len;i++){
				string = string + str[Math.floor((Math.random() * str.length - 1) + 1)];
			}
			return string;
		break;
		case "ALPHABET":
			var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			var string = "";
			for(i=0;i<len;i++){
				string = string + str[Math.floor((Math.random() * str.length - 1) + 1)];
			}
			return string;
		break;
		case "numeric":
			var str = "0123456789";
			var string = "";
			for(i=0;i<len;i++){
				string = string + str[Math.floor((Math.random() * str.length - 1) + 1)];
			}
			return string;
		break;
		case "alphanumeric":
			var str = "abcdefghijklmnopqrstuvwxyz0123456789";
			var string = "";
			for(i=0;i<len;i++){
				string = string + str[Math.floor((Math.random() * str.length - 1) + 1)];
			}
			return string;
		break;
		case "ALPHANUMERIC":
			var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
			var string = "";
			for(i=0;i<len;i++){
				string = string + str[Math.floor((Math.random() * str.length - 1) + 1)];
			}
			return string;
		break;
		default:
			return false;
		break;
	}
};