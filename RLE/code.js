let fs = require('fs');
let inText;//строка
let n=1;// количество символов
let i=0;//позиция
let code='';//закодированная строка
let t=0;//количество "полных" символов
let s=1;//количество взятых символов (из-за того, что переменная n в процессе выполнения кода изменяется, а в конце нужно перейти на новые символы, то нужна переменная, хранящая количество взятых символов

inText=fs.readFileSync('input.js');  
inText=inText.toString();
while (i<inText.length){
	//считаем кол-во подряд идущих символов
	while (inText.charAt(i) == inText.charAt(i+n))
		n++;
	s=n;
	if (inText.charAt(i)=='#'){
		t=Math.floor(n/255);
		if (t>0)
			code+=('#'+ String.fromCharCode(255)+inText.charAt(i)).repeat(t);
		n-=255*t;
		if(n>0)
			code+='#'+ String.fromCharCode(n)+inText.charAt(i);
	}
	else{
		if (n>=4){
			t=Math.floor(n/259);
			if (t>0)
				code+=('#'+ String.fromCharCode(255)+inText.charAt(i)).repeat(t);
			n-=259*t;
			if(n>=4)
				code+='#'+ String.fromCharCode(n-4)+inText.charAt(i);
			else
				code+=inText.charAt(i).repeat(n);
		}
		else
			code+=inText.charAt(i).repeat(n);
	}
	i=i+s;
	n=1;
	s=1;
};
fs.writeFileSync('output1.js', code)		
	
	
	
	
	
	
	
