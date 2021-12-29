let fs = require('fs');
let arg = process.argv;
let shift=arg[2];
let text = fs.readFileSync("text.txt").toString();
let res="";
for (let s=0; s<text.length; s++){
    if(text[s].match(/^([a-zA-Z]+)$/i)) {
        if ((text.charCodeAt(s) - shift < 97 && text.charCodeAt(s) >= 97) || (text.charCodeAt(s) - shift < 65 && text.charCodeAt(s) >= 65)) {
            res += String.fromCharCode(text.charCodeAt(s) + 26 - shift)
        } else {
            res += String.fromCharCode(text.charCodeAt(s) - shift)
        }
    }
    else{
        res+=text[s];
    }
}
fs.writeFileSync('code.txt', res);