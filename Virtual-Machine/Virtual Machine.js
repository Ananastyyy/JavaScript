let fs = require('fs');
let mem = new Array();
let j=0, s=0;
let arg = process.argv;
let count = 1;
mem=fs.readFileSync(arg[2]).toString().split(/\s+/);

for (let i = 0; i<mem.length; i++) {
   console.log(i, mem[i]);
   s++;     //количество строк программы
}

while (j<s) {
    switch (mem[j]) {
        case "set":
            mem[Number(mem[j+1])]=Number(arg[count+2]);
            count++;
            j+=2;
            break;
        case "const":
            mem[Number(mem[j+1])]=Number(mem[j+2]);
            j+=3;
            break;
        case "ifeq":
            if (mem[Number(mem[j+1])]===mem[Number(mem[j+2])]) {
                j+=3;
            }
            else
                j+=5;
            break;
        case "sort":
            let temp=0;
            if(mem[Number(mem[j+1])]>mem[Number(mem[j+2])]){
                temp=mem[Number(mem[j+1])];
                mem[Number(mem[j+1])]=mem[Number(mem[j+2])];
                mem[Number(mem[j+2])]=temp;
            }
            j+=3;
            break;
        case "diff":
            mem[Number(mem[j+3])] = mem[Number(mem[j+1])] - mem[Number(mem[j+2])];
            j+=4;
            break;
        case "mul":
            mem[Number(mem[j+3])]=mem[Number(mem[j+1])]*mem[Number(mem[j+2])];
            j+=4;
            break;
        case "goto":
            for (let p=0; p<s; p++){
                if (mem[j+1]===mem[p] && mem[p-1]==="func"){
                    j=p;
                    break;
                }
            }
            break;
        case "if!eq":
            if (mem[Number(mem[j+1])]!==mem[Number(mem[j+2])]) {
                j+=3;
            }
            else
                j+=5;
            break;
        case "func":
            j+=1;
            break;
        case "out":
           console.log(mem[Number(mem[j+1])]);
            j+=2;
            break;
        case "exit":
            j=s;
            break;
    }
}

