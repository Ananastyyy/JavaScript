let arg = process.argv;
let exp = arg[2].toString();
let rec =[];
let num="";
let stack=[];
let prior =[];
prior["+"]=0;
prior["-"]=0;
prior["/"]=1;
prior["*"]=1;
prior["^"]=2;
let res=0;
let count=0;

for (let i=0; i<exp.length; i++){
    if (isNaN(exp[i])){
        if (exp[i]=="("){
            if (exp[i+1]=="-"){
                count++;
                i++;
                continue;
            }
            stack.push(exp[i]);
            continue;
        }
        if (exp[i]=="^"){
            stack.push(exp[i]);
            continue;
        }
        if ((prior[exp[i]]<=prior[stack[stack.length-1]] || stack[stack.length-1]=="(" || stack.length==0) && count!=1){
            while (prior[exp[i]]<=prior[stack[stack.length-1]]) {
                rec.push(stack[stack.length - 1]);
                stack.pop();
            }
            stack.push(exp[i]);
            continue;
        }
        if (prior[exp[i]]>prior[stack[stack.length-1]]){
            stack.push(exp[i]);
            continue;
        }
        if (exp[i]==")"){
            if (count==1){
                continue;
            }
            while (stack[stack.length-1]!="("){
                rec.push(stack[stack.length-1]);
                stack.pop();
            }
            stack.pop();
            continue;
        }
    }
    else{
        num+=exp[i];
        if (isNaN(exp[i+1])){
            if (count==1){
                rec.push(Number(num)*(-1));
                count=0;
                i++;
            }
            else{
                rec.push(Number(num));
            }
            num="";
        }
    }

}
while (stack.length!=0){
    rec.push(stack[stack.length-1]);
    stack.pop();
}
console.log(rec);
let k=0;
while(rec.length!=1){
    if (isNaN(rec[k])){
        if (rec[k]=="+"){
            res=rec[k-1]+rec[k-2];
        }
        if (rec[k]=="-"){
            res=rec[k-2]-rec[k-1];
        }
        if (rec[k]=="*"){
            res=rec[k-1]*rec[k-2];
        }
        if (rec[k]=="/"){
            if (rec[k-1]=="0"){
                console.log("Ошибка, попытка разделить на 0");
                break;
            }
            res=rec[k-2]/rec[k-1];
        }
        if (rec[k]=="^"){
            res=Math.pow(rec[k-2], rec[k-1]);
        }
        rec.splice(k-2, 3, res)
        k-=2;
    }
    k++;
}
console.log(rec)
