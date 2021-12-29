function trans(n1) {
    result=[]
    n=Number(n1);
    if (n >((2-Math.pow(2,-23))*Math.pow(2,127)) || n == Infinity) {
        result.push("0", "11111111", "00000000000000000000000");
        return(result);
    }
    else if (n < -((2-Math.pow(2,-23))*Math.pow(2,127)) || n == -Infinity) {
        result.push("1", "11111111", "00000000000000000000000");
        return(result);
    }
    else if (isNaN(n)) {
        result.push("0", "11111111", "10000000000000000000000");
        return(result);
    }
    //определение знака
    let sign = (n < 0) ? 1 : 0;
    result.push(sign);

    n=Math.abs(n)
    let n_round=Math.round(n);
    let n_bin=(n).toString(2);
    let ord=0;
    let ord_bin =0;

    //выделение порядка
    n_round = n_round.toString(2);
    if (n > 1) {
        ord = n_round.length - 1;
    } else {
        for (let i = 2; i < n_bin.length; i++) {
            if (n_bin[i] == "1") {
                ord = (i - 1) * (-1);
                break;
            }
        }
    }
    ord_bin = (ord + 127).toString(2)
    if (ord_bin.length < 8){
        ord_bin='0'.repeat(8-ord_bin.length)+ord_bin
    }

    result.push(ord_bin);

    //приведение числа к стандартному виду
    if (n > 1) {
        let new_bin="";
        for (let i = 0; i < n_bin.length; i++) {
            if (n_bin[i]=="."){
                continue;
            }
            else{
                new_bin+=n_bin[i];
            }
        }
        n_bin = new_bin.substring(1);
    } else {
        n_bin = n_bin.substring(Math.abs(ord) + 2);
    }

    //выделение мантиссы

    while (n_bin.length < 23) {
        n_bin += "0";
    }
    if (n_bin.length > 23) {
        n_bin = n_bin.substring(0, 23)
    }
    result.push(n_bin);

    return(result);
}

function calc(n){
        let result = []
        let exp=[];
        let counter=0;
        for (let i=0; i<3; i++){
            exp[i]="";
        }
        for (let i=0; i<n.length; i++){
            if (n[i]=="-"){
                if(n[i+1]=="-"){
                    counter=2;
                    i++;
                    continue;
                }
                if(! isNaN(n[i+1])){
                    if(exp[0]!=""){
                        counter=2;
                    }
                    exp[counter]+=n[i];
                }
                continue;
            }
            else if (! isNaN(n[i])){
                exp[counter]+=n[i];
                continue;
            }
            else if (n[i]=="+"){
                counter=2;
                continue;
            }
            else if (n[i]==","){
                exp[counter]+=".";
                continue;
            }
            else if (n[i]=="."){
                exp[counter]+=n[i];
                continue;
            }
            else{
                result.push("1", "11111111", "10000000000000000000000");
                return(result);
            }
        }
        exp[1]="+";
        if (exp[0]=="" || exp[2]==""){
            result.push("1", "11111111", "10000000000000000000000");
            return(result);
        }
        n1=exp[0];
        n2=exp[2]
        let res1 = trans(n1);
        let res2 = trans(n2);
        let ord1_dec = 0;
        let ord2_dec = 0;
        let ord_bin = 0;

        let sign = 0;
        if (Number(res1[0]) + Number(res1[0]) == 0) {
            sign = 0;
        }
        if (Number(res1[0]) + Number(res1[0]) == 2) {
            sign = 1;
        }
        result.push(sign)

        for (let i = 0; i < 8; i++) {
            ord1_dec += Number(res1[1][i]) * Math.pow(2, 7 - i);
            ord2_dec += Number(res2[1][i]) * Math.pow(2, 7 - i);
        }
        ord1_dec -= 128;
        ord2_dec -= 128;
        if (n1 == 0) {
            ord_bin = res2[1];
            res1[2] = "0" + res1[2];
            res2[2] = "1"+res2[2];
        } else if (n2 == 0) {
            ord_bin = res1[1];
            res2[2] = "0" + res2[2];
            res1[2] = "1"+res1[2];
        } else if (ord1_dec < ord2_dec) {
            res1[2] = ("0".repeat(ord2_dec - ord1_dec) + "1" + res1[2]).substring(0, 24);
            ord_bin = res2[1];
            res2[2] = "1" + res2[2];
        } else if (ord1_dec > ord2_dec) {
            res2[2] = ('0'.repeat(ord1_dec - ord2_dec) + "1" + res2[2]).substring(0, 24);
            ord_bin = res1[1];
            res1[2] = "1" + res1[2];
        } else {
            ord_bin = (ord1_dec + 128).toString(2);
            if (ord_bin.length < 8) {
                ord_bin = "0".repeat(8 - ord_bin.length) + ord_bin;
            }
            res1[2] = ("1" + res1[2]).substring(0, 24);
            res2[2] = ("1" + res2[2]).substring(0, 24);
        }
        let ord_bin_count = 0;
        let add="1";
        let res_bin = "";
        let temp = 0;
        if (Number(res1[0]) + Number(res2[0]) == 0 || Number(res1[0]) + Number(res2[0]) == 2) {
            for (let i = 23; i >= 0; i--) {
                let s = Number(res1[2][i]) + Number(res2[2][i]) + temp;
                if (s == 0) {
                    res_bin = "0" + res_bin;
                } else if (s == 1) {
                    res_bin = "1" + res_bin;
                    temp = 0;
                } else if (s == 2) {
                    res_bin = "0" + res_bin;
                    temp = 1;
                } else if (s == 3) {
                    res_bin = "1" + res_bin;
                    temp = 1;
                }
            }

            if (temp == 1) {
                res_bin = "1" + res_bin;
                let ord_bin_count = 0;
                for (let i = 0; i < 8; i++) {
                    ord_bin_count += Number(ord_bin[i]) * Math.pow(2, 7 - i);
                }
                ord_bin = (++ord_bin_count).toString(2);
            }
            result.push(ord_bin);
            result.push(res_bin.substring(1, 24))
        } else {
            let min = [];
            let sub = [];
            if (Math.abs(n1) < Math.abs(n2)) {
                min = res2;
                sub = res1;
            } else {
                min = res1;
                sub = res2;
            }
            let temp = 0;
            for (let i = 23; i >= 0; i--) {
                let dif = Number(min[2][i]) - Number(sub[2][i]) - temp;
                if (dif == 1) {
                    res_bin = "1" + res_bin;
                } else if (dif == 0) {
                    res_bin = "0" + res_bin;
                    temp = 0;
                } else if (dif == -1) {
                    res_bin = "1" + res_bin;
                    temp = 1;
                } else {
                    res_bin = "0" + res_bin;
                    temp = 1;
                }
            }
            if ((temp == 1 && min[0] == "0") || (temp == 0 && min[0] == "1")) {
                result[0] = 1;
            } else {
                result[0] = 0
            }
            if (res_bin.indexOf("1") > 0) {
                for (let i = 0; i < 8; i++) {
                    ord_bin_count += Number(ord_bin[i]) * Math.pow(2, 7 - i);
                }
                ord_bin_count -= 128
                ord_bin_count = ord_bin_count - res_bin.indexOf("1");
                ord_bin = (ord_bin_count + 128).toString(2);
                res_bin = res_bin.substring(res_bin.indexOf("1") + 1);
            }
            if (res_bin.length < 23) {
                res_bin += "0".repeat(23 - res_bin.length)
            }
            if (res_bin.length == 24) {
                if (res_bin[0]=="0"){
                    add="0";
                }
                res_bin = res_bin.substring(1);
            }
            if (ord_bin.length < 8) {
                ord_bin = "0".repeat(8 - ord_bin.length) + ord_bin
            }
            result.push(ord_bin);
            result.push(res_bin)
        }
        let degree = Math.pow(2,parseInt(result[1],2)-127);
        let mantissa = Number(parseInt(add+result[2],2)/Math.pow(2,23));
        let r=((degree*mantissa).toFixed(2)).toString();
        if (result[0]==1){
            r*=(-1)
        }
        result.push("~"+r)
        return(result)
}


let fs = require('fs');
let text = fs.readFileSync("input.txt").toString();
text=text.split(" ");
let n =text[1];
let func=text[0];
let result=[];
let res=[];
let output="";


if (func=="trans"){
	if (text[2])
		n=text[1]+text[2];
    res=trans(n);
    output+=res[0]+" "+res[1]+" "+res[2]
    fs.writeFileSync("output.txt", output);
}

if (func=="calc") {
    res=calc(n)
    output+=res[0]+" "+res[1]+" "+res[2]+" "+res[3]
    fs.writeFileSync("output.txt", output);
}
