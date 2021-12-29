let fs = require('fs');
let arg = process.argv;
let inputData; 
let i = 0, n = 1;
let sum = 0
let entr = 0//переменная с энтропией
let alph = new Array()

inputData = fs.readFileSync('input.txt');
inputData = inputData.toString();
//инициализируем алфавит
for (i = 0 ; i<inputData.length; i++)
	alph[inputData.charAt(i)] = 0

//считаем число повторов букв, количество всех объектов
for (i = 0 ; i<inputData.length; i++)
	alph[inputData.charAt(i)]++;
console.log(alph);

for (i in alph){
	alph[i]/=inputData.length;
	sum++;
}

//высчитываем энтропию
if (sum>1){
	for (i in alph)
		entr-=(alph[i])*(Math.log(alph[i]));
	entr/=Math.log(sum);
}
else
	entr=0
console.log(entr)
