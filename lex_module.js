/* Analizador Léxico para SQL
 *	
 * Autores:
 * -Carlos Augusto Mendoza Sánchez
 * -César Alejandro Robles Soltero
 */


/*
 * Función - Clase para el analizador léxico.
 */
function lex(s){
	/* Expresiones regulares para clasificar tokens. 
	   To-Do: Checar si las expresiones están completas.
	*/
	var commands_regex = /(select|insert|create)/;
	var reserved_regex = /(table|database|into|from|values|null|varchar)/;
	var symbols_regex = /(\(|\)|,|;|\*)/;
	var values_regex = /(\"\w*\"|\'\w*\')/;
	var identifiers_regex = /(\w+)/;
	
	/* Expresión global para descomponer el String en tokens sin clasificar.
		To-Do: Checar si se pueden concatenar las variables de las expresiones.
	*/
	var G_expresion = /(select|insert|create|table|database|\"\w*\"|\'\w*\'|into|null|from|values|varchar|\w+|\S)/g;

	/*Funciones para detectar tipo*/
	function isCommand(s){
		return commands_regex.test(s);
	}

	function isReserved(s){
		return reserved_regex.test(s);
	}

	function isSymbol(s){
		return symbols_regex.test(s);
	}

	function isValue(s){
		return values_regex.test(s);
	}

	function isIdentifier(s){
		return identifiers_regex.test(s);
	}

	/* ---------------------------- Main ------------------------------------ */
	var tokens;
	s = s.toLowerCase();
	tokens = s.match(G_expresion);

	//Clasificar tokens
	for(var i = 0; i < tokens.length; i++){
		var token = {value: null, type: null};
		token.value = tokens[i];

		if(isCommand(token.value)){
			token.type = "command";
			tokens[i] = token;
		}else if(isReserved(token.value)){
			token.type = "reseved";
			tokens[i] = token;
		}else if(isSymbol(token.value)){
			token.type = "symbol";
			tokens[i] = token;
		}else if(isValue(token.value)){
			token.type = "value";
			tokens[i] = token;
		}else if(isIdentifier(token.value)){
			token.type = "identifier";
			tokens[i] = token;
		}else{
			//Salir al primer caracter que no cumple con la grámatica y marcar error.
			console.log("Error en col " + (s.search(token.value) + 1) + ": Símbolo '"+token.value+"' no permitido.");
			return null;
		}
	}

	return tokens;
};


/*Función basura (prueba)*/
var isCommand = function(s){
	s = s.toLowerCase();
	var commands = [];
	commands["select"] = true;
	commands["create"] = true;
	commands["insert"] = true;
	commands["delete"] = true;

	if(commands[s]){
		return true;
	}

	return false;
}