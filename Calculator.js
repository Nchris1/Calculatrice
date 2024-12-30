const actions = document.querySelector('.actions'); // récupère le tableau contenant l'ensemble des boutons
const ans = document.querySelector('.ans'); // zone de texte
const historic = document.querySelector('.his');
const sinBtn = document.getElementById("sine");
const cosBtn = document.getElementById("cosine");
const tanBtn = document.getElementById("tane");
const rootBtn = document.getElementById("sqrt");
console.log(actions);
console.log(ans);
let expression = ''; // contient l'expression afficher dans la zone de texte
let a=0;
actions.addEventListener('click', (e) => { // ajoute cette évenement à tous les boutons contenus dans le tableau
		console.log(e.target);
		const value = e.target.dataset['value'];  // récupère la valeur du "value" de l'élémént cliqué

		if(value !== undefined) {
            let hist = ''; // contient la nouvelle ligne de l'historique
			// I'm good to go.
			if(value == 'ce') { // réinitialise l'expression
				expression = '';
				ans.value = 0;
				return true;
			}
			else if(value == 'x^2'){ // élève au carré l'expression précédente
				expression =square(); 
			}else if(value == 'e'){
                var e = '';
                if(expression != '0' && expression != '' && expression[expression.length - 1].match(/\d/)){
                    e = '*';
                }
                e += Math.E;
                expression += e;
                
            }else if(value == "log"){ // logarithme de base
                hist += "log2(";
                hist += expression;
                hist += ")";
                hist += " = ";
                expression = Math.log2(expression);
                hist += expression;
            }else if(value == "log base"){

            }else if(value == "10x"){
                hist += "10^(";
                hist += expression;
                hist += ")";
                hist += " = ";
                expression = Math.pow(10, eval(expression));
                hist += expression;
            }
			else if(value == 'root'){ // racine carré
                hist += "√(";
                hist += expression;
                hist += ")";
                hist += " = ";
				expression = Math.sqrt(expression);
                hist += expression;
			}
			else if(value == 'ln'){ // logarithme népérien
                hist += "ln(";
                hist += expression;
                hist += ")";
                hist += " = ";
				expression = Math.log(expression);
                hist += expression;
			}
			else if(value == 'sin'){
                hist += "sin(";
                hist += expression;
                hist += ")";
                hist += " = ";
				expression = Math.sin(expression);
                hist += expression;
			}
			else if(value == 'cos'){
                hist += "cos(";
                hist += expression;
                hist += ")";
                hist += " = ";
				expression = Math.cos(expression);
                hist += expression;
			}
			else if(value == 'tan'){
                hist += "tan(";
                hist += expression;
                hist += ")";
                hist += " = ";
				expression = Math.tan(expression);
                hist += expression;
			}
            else if(value == '-1sin'){
                hist += "sin⁻¹(";
                hist += expression;
                hist += ")";
                hist += " = ";
				expression = Math.asin(expression);
                hist += expression;
			}
			else if(value == '-1cos'){
                hist += "cos⁻¹(";
                hist += expression;
                hist += ")";
                hist += " = ";
				expression = Math.acos(expression);
                hist += expression;
			}
			else if(value == '-1tan'){
                hist += "tan⁻¹(";
                hist += expression;
                hist += ")";
                hist += " = ";
				expression = Math.atan(expression);
                hist += expression;
			}else if(value == 'inv'){Math.
                hist += "Inv(";
                hist += expression;
                hist += ")";
                hist += " = ";
                expression = Math.pow(expression, -1); // calcule l'inverse d'un nombre
                hist += expression;
            }else if(value == 'exp'){
                hist += "exp(";
                hist += expression;
                hist += ")";
                hist += " = ";
                expression = Math.exp(expression);
                hist += expression;
            }else if(value == "3.14"){
                expression += Math.PI;
            }else if(value == "1/x"){
                hist += `1/(${expression})`;
                hist += " = ";
				const answer = eval(`1/${eval(expression)}`);
				expression = answer;
                hist += expression;
            }else if(value == '|x|'){
                hist += `|${expression}|`;
                hist += " = ";
                const answer = Math.abs(eval(expression));
                expression = answer;
                hist += expression;
            }
			else if(value == '=') {
                hist += expression;
                hist += " = ";
                while(expression.includes("yroot")){
                    let newE = expression.replace("yroot", "V");
                    let rootIndex = newE.indexOf("V");
                    console.log(newE);
                    let startE = 0;
                    let endE = 0;
                    for (let i = rootIndex; i < newE.length; i++) {
                        if(!newE[i].match(/\d/)){
                            endE = i - 1;
                            break;
                        }else if(i == newE.length - 1){
                            endE = i;
                        }
                    }

                    for (let i = rootIndex; i >= 0; i++) {
                        if(!newE[i].match(/\d/)){
                            startE = i + 1;
                            break;
                        }else if(i == 0){
                            startE = i;
                        }
                    }

                    let rootExpression = newE.substring(startE, endE);
                    let part = newE.split('V');
                    let a = parseFloat(part[1]);
                    let b = parseFloat(part[0]);
                    console.log(`a = ${a}; b = ${b}`);
                    if(!isNaN(a) && !isNaN(b)){
                        let result = Math.pow(b, 1/a);
                        expression = expression.replace(rootExpression.replace('V', 'yroot'), result.toString());
                    }
                }
                console.log(expression);
				const answer = eval(expression);
				expression = answer;
                hist += expression;
			}else {
				expression += value;
			}

			if(expression == undefined) { // si il l'expression est vide alors on le réinitialise
				expression = '';
				ans.value = 0;
			} else { //sinon on affiche l'expression
				ans.value = expression;
			}
            if(hist != ''){ // affiche une nouvelle ligne de l'historique
                hist += '\n';
                hist = hist.replace(`%`, ` MOD `);
                historic.value += hist;
            }
			// expression += value;


		}

});

function secondFunction(){
    

    if(sinBtn.dataset['value'] == "sin"){
        sinBtn.innerHTML = "sin⁻¹";
        sinBtn.dataset['value'] = '-1sin';
    }else{
        sinBtn.innerHTML = "sin";
        sinBtn.dataset['value'] = 'sin';
    }

    if(cosBtn.dataset['value'] == "cos"){
        cosBtn.innerHTML = "cos⁻¹";
        cosBtn.dataset['value'] = "-1cos";
    }else{
        cosBtn.innerHTML = "cos";
        cosBtn.dataset['value'] = "cos";
    }

    if(tanBtn.dataset['value'] == "tan"){
        tanBtn.innerHTML = "tan⁻¹";
        tanBtn.dataset['value'] = "-1tan";
    }else{
        tanBtn.innerHTML = "tan";
        tanBtn.dataset['value'] = "tan";
    }

    if(rootBtn.dataset['value'] == "root"){
        rootBtn.dataset['value'] = "yroot";
        rootBtn.innerHTML = "ⁿ√x";
        
    }else{
        rootBtn.innerHTML = "√x"
        rootBtn.dataset['value'] = "root"
    }
}

const square =()=> {
    // Sert à lire un string ,l'execute comme un code Js et retourne le résultat 
	return eval(expression*expression); 
}