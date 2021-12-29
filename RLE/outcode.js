let fs = require('fs');
let inText;
let str='';
let i=0;


inText=fs.readFileSync('output1.js');
inText=inText.toString();
while (i<inText.length){
	//если встретилась #
	if ((inText.charAt(i)=='#')) {
		if (inText.charAt(i+2)=='#'){
			str+=(inText.charAt(i+2)).repeat(inText.charCodeAt(i+1))
			i=i+3
		}
		else {
			//если встретилась не #
			str+=(inText.charAt(i+2)).repeat(inText.charCodeAt(i+1)+4)
			i=i+3
		}
	}
	else {
		str+=inText.charAt(i)
		i++
	}
};
fs.writeFileSync('output2.js', str)
