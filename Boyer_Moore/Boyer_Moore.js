let arg = process.argv;
let s = arg[2];
let t = arg[3];
let rpr=[];
let s1=[];	//Shift1
let s2=[];	//Shift2
let result =[];
m=t.length;
//заполняем Shift1
for ( let i=0; i<m; i++){
    s1[t.charAt(i)]=i;
}
console.log(s1);

rpr[0]=m;
s2[0]=1
//Заполняем Shift2
//l - длина хорошего суффикса, k - индекс вхождения t в s, f - флаг совпадений,
//k1 - индекс сравниваемого символа в t, i - индекс сравниваемого символа в s
//h - индекс сравниваемого символа в t, если какая-то часть t вышла в область *
for (let l=1; l<=m-1; l++){
	for (let k=m-l-1; k>=2-l-1; k--){
		let f=0;
		if (k>=0){
			k1=m-l;
			for (i=k; i<=k+l-1; i++){
				if (t[i]==t[k1]){
					k1++;
				}
				else{
					f=1
					break
				}
			}
		}
		if (k<=0){
			k1=m-l-k
			h=k1
			for (i=0; i<m-k1; i++){
				if (t[i] == t[h]){
					h++;
				}
				else{
					f=1;
					break
				}
			}
		}
		if (k<=m-l && f==0 && ((k>=1 && t[k-1]!=t[m-l-1]) || k<1)){
			rpr[l]=k+1;
		break;
		}
		if (f==1 && k<=m-l){
			rpr[l]=1-l;
		}
	}
	s2[l]=m-rpr[l]-l+1;
}

console.log(s2)

//сравниваем подстроку со строкой
//k - индекс вхождения t в s, i - индекс сравниваемого символа в s
//q - вспомогательный счётчик для итерированию по символам в t
//l - количество совпавших символов
for (let k=0; k<=s.length-m; k++){
	let q=0;
	let l=0;
	for (let i=k+m-1; i>=k; i--){
		q++;
		if (s[i]==t[m-q]){
			l++;
		}
		else{
			k+=s2[l]-1;
			break;
		}
		if (l==m){
			result.push(k+1);
			if (m-s1[s.charAt(i)]>s2[l-1]){
				k+=m-s1[s.charAt(i)]-1;
			}
			else{
				k+=s2[l-1]-1
			}
		}
	}
}
//отсчёт начинается с 1
if (result.length==0){
	console.log('Совпадений не найдено')
}
else
	console.log('Совпадения с позиций', result)