let arg = process.argv;
let s = arg[2].toString();
let t = arg[3].toString();
let sumT=0;
let sumS=0;
data=new Array();

for (let i=1; i<=t.length; i++){
    sumT+=t.charCodeAt(i-1)*Math.pow(2, t.length-i);
}

for (let i=1; i<=t.length; i++){
    sumS+=s.charCodeAt(i-1)*Math.pow(2, t.length-i);
}
for (let i=1; i<s.length-t.length+2; i++){
    if (sumS===sumT){
        let a=-1;
        let k=0;
        for (let j=1; j<t.length+1; j++){
            a++;
            if (t[j-1]===s[a+i-1]){
                k++
            }
            else
                break;
        }
        if (k===t.length){
            data.push(i);
        }
    }
    sumS=(sumS-s.charCodeAt(i-1)*Math.pow(2, t.length-1))*2+s.charCodeAt(i+t.length-1)
}
console.log(data)