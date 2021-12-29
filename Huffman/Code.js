inputData='abrakadabra';
function Node (_letter, freq, used, father, code){
//создание пустых объектов
	this.letter=_letter;
	this.freq=freq;
	this.used=used;
	this.father=father;
	this.code=code;
}
let alph = new Array();
let tree = new Array();
let i, num1, num2 = 0;
let str = '';
console.log(Node);

for (i=0; i<inputData.length;i++){
	alph[inputData.charAt(i)]=0;
}

for (i=0; i<inputData.length;i++){
	alph[inputData.charAt(i)]++;
}

for (i in alph){
	let n = new Node(i, alph[i], false, null, '');
	tree.push(n);
}

while (tree[tree.length-1].freq != inputData.length){
	min1=inputData.length;
	min2=inputData.length;
	for (i in tree){
		if (tree[i].freq<=min1 && tree[i].used==0){
			min1=tree[i].freq;
			num1=i;
		}
	}
	tree[num1].used=true;
	for (i in tree){
		if (tree[i].freq<=min2 && tree[i].used==0){
			min2=tree[i].freq;
			num2=i;
		}
	}
	tree[num2].used=true;

	n = new Node(tree[num1].letter+tree[num2].letter, tree[num1].freq+tree[num2].freq, 0, null, '');
	tree.push(n);
	tree[num1].father=tree.length-1;
	tree[num2].father=tree.length-1;
	let s=(tree[num1].letter).length;
	tree[num1].code='1';
	tree[num2].code='0';
}
for (i=tree.length-2; i!=-1; i--) {
	tree[i].code=tree[tree[i].father].code+tree[i].code;
	if ((tree[i].letter).length==1)
		alph[tree[i].letter]=tree[i].code;
}

for (i=0; i<inputData.length; i++)
	str+=alph[inputData[i]];

console.log(tree)
console.log(alph)
console.log(str)

//раскодирование

let out='';
let p='';

for (i=0;i<=str.length; i++){
	p+=str[i];
	for (j in alph){
		if (p==alph[j]){
			out+=j
			p='';
		}
	}
}
console.log(out)

		
		






