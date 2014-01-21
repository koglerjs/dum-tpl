var lib = module.exports = {};

lib.makeStr = function(str) {
	var maxlength = 2000;
	var errbuffPrintL = 45;

	if(str.length>maxlength) {
		throw new Error("You have a really long template and there's a good chance you're doing something stupid.");
	}
	var rtrn = '';

	var arr = str.split(/(\{\{|\}\})/g);

	var stack = [];

	var errbuff = '';
	var codebuff = '';

	var on = false;
	var variable = '';
	var token = '';

	var propsChecked = {};


	var isValid = function(prop){if(!(typeof obj[prop]=='number'||typeof obj[prop]=='string')){throw new Error('only nums and strings, yo');}};

	var rtrn = "function(obj){var rtrn='';var isValid=" + isValid + ";";


	for(var i = 0; i<arr.length; i++) {
		token = arr[i]; 
		errbuff += token;

		if(token=='{{') {
			if(on) {
				throw new Error("Parse error -- unclosed bracket :" + errbuff.slice(errbuffPrintL));
			}

			on = true;
			continue;
		}

		if(token=='}}') {
			on = false;
			continue;
		}

		if(on) {
			//There is no reason for you to have an object property
			//that is not also a valid javascript variable name
			if(!/[a-zA-Z_$][0-9a-zA-Z_$]*/.test(token)) {

				//(There is also no reason for you to use a variable name
				//that doesn't match this regex.)  
				throw new Error("Parse error -- Invalid variable name: " + token);
			}



			if(token[0]=="#"||token[0]=="^") {
				variable = token.slice(1);

				if(stack.indexOf(variable)!==-1) {
					throw new Error("Stack error -- attempted to nest conditionals for variable: " + variable);
				}
				stack.push(variable);

				codebuff += "if(";
				codebuff += token[0]=="^"?"!":"";
				codebuff +="obj."+variable+"){";

				continue;
			}

			if(token[0]=="/") {
				if(stack.pop()!=token.slice(1)) {
					throw new Error("Parse error -- closing conditional mismatch: " + token.slice(1));
				}

				codebuff += "}";

				continue;
			}

			//Implicit third condition
			//////					
			if(!propsChecked[token]) {
				codebuff += "isValid(\"" + token + "\");";
				propsChecked[token] = true;
			}
			codebuff +="rtrn+=" + "obj."+token+";";
		}
		else {
			if(codebuff.length!=0) {
				codebuff += "rtrn+=\"" + token.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0') + "\";";
			}
		}
	}

	if(stack.length!==0) {
		throw new Error("Parse error -- unclosed conditional(s): " + stack);
	}

	rtrn += codebuff + "return rtrn;}";

	return rtrn;
};

lib.makeFn = function(str) {
	return eval(lib.makeStr(str));
}

lib.render = function(str, obj) {
	return lib.makeFn(str)(obj);
}