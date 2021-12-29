let fs = require('fs');
let text = fs.readFileSync("code.txt").toString();
let str="";

//выделяем из всего текста только буквы
for (let s=0; s<text.length; s++){
    if(text[s].match(/^[a-z]+$/)) {
        str += text[s];
    }
}
str=str.toLowerCase();

//заносим данные канонических частот
let freq_can=[];
let alph = fs.readFileSync('alph.txt', 'utf8').split('\r\n');
for (let i = 0; i < alph.length; i++) {
    let lett = alph[i].split(' ')[0];
    let freq = alph[i].split(' ')[1];
    freq_can[lett.charCodeAt(0)] = parseFloat(freq);
}

//инициализируем фактический алфавит
let alph_fact=[];
for (let i=0; i<str.length; i++){
    alph_fact[str.charCodeAt(i)]=0;
}

//заполняем фактический алфавит количеством символов
let count=0;
for (let i=0; i<str.length; i++){
    alph_fact[str.charCodeAt(i)]++;
    count++;
}

//считаем фактическую частоту
let freq_fact=[];
alph_fact.forEach((item, index) => {
    freq_fact[index] = Number(((alph_fact[index] / count) * 100).toFixed(2));
});

//выявляем наилучшее совпадение
let min=100005;
let coun =-1;
for (let k=0; k<26; k++){
    let dif=0;
    let sum=0;
    alph_fact.forEach((item, index) => {
        if (index+k>122){
            dif=freq_fact[index]-freq_can[index+k-26];
        }
        else {
            dif = freq_fact[index] - freq_can[index + k];
        }
        sum+=dif;
    });
    sum=Math.pow(sum, 2);
    if (sum<min){
        min=sum;
        coun=k;
    }
}

//составляем таблицу смещений
let trans=[];
alph_fact.forEach((item, index) => {
    if (index+coun<123) {
        trans[index] = index + coun;
    }
    else{
        trans[index] = index + coun-26;
    }
});

//расшифровываем
let res="";
for (let s=0; s<text.length; s++){
    if(text[s].match(/^([a-zA-Z]+)$/i)) {
        if (text[s]==text[s].toLowerCase()) {
            res += String.fromCharCode(trans[text.charCodeAt(s)])
        }
        else{
            res += String.fromCharCode(trans[text.charCodeAt(s)+32]-32)
        }
    }
    else{
        res+=text[s];
    }
}
fs.writeFileSync('decode.txt', res);