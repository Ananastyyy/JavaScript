let fs = require('fs');//s-строка. т-подстрока
let arg = process.argv;
let s = arg[2].toString();
let t = arg[3].toString();

let lenT = t.length;
let lenS = s.length;

alph = new Array();

//Определяем алфавит строки T
for(i = 0; i < lenT; i++)
	alph[t.charAt(i)] = 0;

//В двумерном массиве del храним таблицу переходов
del = new Array(lenT+1);
for(j = 0; j <= lenT; j++)
	del[j] = new Array();

//Инициализируем таблицу переходов
for(i in alph)
	del[0][i] = 0;

//Формируем таблицу переходов
for(j = 0; j < lenT; j++){
	prev = del[j][t.charAt(j)];
	del[j][t.charAt(j)] = j + 1;
	for(i in alph)
		del[j+1][i] = del[prev][i];
}

//Выводим таблицу переходов
for(j=0; j <= lenT; j++){
	let out = " ";
	for (i in alph)
		out += del[j][i] + " ";
	console.log(j, out);
}

let state = 0;
result = new Array();
for (i = 0; i <= lenS; i++){
	if(s.charAt(i) in alph ){
		state = del[state][s.charAt(i)];
		if (state == lenT){
			result.push(i - lenT + 2);
		}
	}
}

console.log('Индексы вхождений подстроки:',result)// счёт начинается с 1