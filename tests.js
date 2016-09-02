function lex_test(input){
	
	var result = lex(input);
	var tokens = result.tokens;
	var ouput ="";
	for(i in tokens){
		ouput += JSON.stringify(tokens[i]) + "<br>";
	}
	ouput += "-------------------------------------------------<br>";
	ouput += "Errors: "+result.number_errors+"<br>";

	for(i in result.errors){
		ouput += JSON.stringify(result.errors[i]) + "<br>";
	}

	document.getElementById("lex-output").innerHTML= ouput;
}