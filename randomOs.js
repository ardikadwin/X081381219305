exports.randomOs = function (){
	var os = ['Windows 10','Windows 8.1','Windows 8','Windows 7','Windows Vista','Windows Server 2003/XP x64','Windows XP','Windows XP','Mac OS X','Mac OS 9','Linux','Ubuntu','iPhone','iPod','iPad','Android','BlackBerry','Mobile'];
	return os[Math.floor((Math.random() * os.length - 1) + 1)];
};