
String.prototype.turkishToEnglish = function(){
	var string = this;
	var letters = { "İ": "I", "I": "I", "Ş": "S", "Ğ": "G", "Ü": "U", "Ö": "O", "Ç": "C","i": "i", "ş": "s", "ğ": "g", "ü": "u", "ö": "o", "ç": "c", "ı": "i" };
	string = string.replace(/(([İIŞĞÜÇÖiışğüçö]))/g, function(letter){ return letters[letter]; })
	return string.toLowerCase();
}

function translatePython(items, level){

	//debugger
	var resultText = '';

	items.forEach(function(el){
		if(el.type == 'logical')
		{
			if(el.mainType == 'if')
			{
				resultText += 'if(' + el.text + '):\n';

				if(el.truePart)
					resultText += translatePython([el.truePart], level+1)
				if(el.falsePart)
				{
					//debugger
					if(el.falsePart.mainType == 'if')
					{
						resultText += 'el';
						resultText += translatePython([el.falsePart], level)
					}
					else
					{
						resultText += 'else:\n';
						resultText += translatePython([el.falsePart], level+1)
					}
				}
				resultText += '\n';
			}
			else if(el.mainType == 'while')
			{
//				while(eval(item.text)){
//					drawLine(item, false, eval(item.text));
//
//					if(eval(item.text))
//						recursivelyProcess(item.statements)
//				}
//				drawLine(item, false, eval(item.text));
			}
			else if(el.mainType == 'for')
			{
//				while(eval(item.text)){
//					if(eval(item.text))
//						recursivelyProcess(items.slice(1))
//					drawLine(item, eval(item.text));
//				}
//				drawLine(item, eval(item.text));
			}
//			else
//				drawLine(item, false, eval(item.text));
		}
		if(el.type == 'declaration' || el.type == 'assignment')
		{
			resultText += el.lhs + ' = '+el.rhs;
		}
		if(el.type == 'expression')
		{
			resultText += el.lhs + ' = '+el.rhs;

//			window.eval(item.text);
//			item['#evaluation']++;
//
//			console.log('['+ item.type + '] text:'+ item.text +' line '+item.lineNumber +' is getting processed, result is: '+ eval(item.text));
//
//			if(item.up == 'while')
//				drawLine(item, true, eval(item.text));
//			else
//				drawLine(item, false, eval(item.text));
			console.error(el.text)
		}
		if(el.type == 'print')
		{
			var resu = '';
			var tabSpace = '';

			for(var i=0; i < el.list.length-1; i++)
			{
				resu += el.list[i].subtype == 'var' ? el.list[i].text : '\"'+el.list[i].text + '\"';
				resu += ',';
			}
			resu += el.list[i].subtype == 'var' ? el.list[i].text : '\"'+el.list[i].text + '\"';


			for(var i=0; i<level;i++)
				tabSpace += '\t';

			resultText += tabSpace + 'print ' + resu + '\n';
			//drawLine(item, false, resu);
		}
	});
	return resultText;
}

function translateCHelper(items, level){
var resultText = '#include <stdio.h>\n\n'+ 'int main(){\n\n';
	resultText += translateC(items, level);
	resultText += '\nreturn 0;\n}\n';
return resultText;
}

function translateC(items, level){
	var resultText = '';

	function isInt(n) {
	   return n % 1 === 0;
	}

	var tabSpace = '';
	for(var i=0; i<level;i++)
		tabSpace += '\t';

	items.forEach(function(el){
		if(el.type == 'logical')
		{
			if(el.mainType == 'if')
			{
				resultText += 'if(' + el.text + ')\n';

				if(el.truePart)
					resultText += translateC([el.truePart], level+1)
				if(el.falsePart)
				{
					resultText += 'else\n';
					resultText += translateC([el.falsePart], level+1)
				}
				resultText += '\n';
			}
			else if(el.mainType == 'while')
			{
				resultText += 'while(' + el.text.turkishToEnglish() + ')\n';
				resultText += '{\n';
				resultText += translateC(el.statements, level+1);
				resultText += '}\n';
			}
			else if(el.mainType == 'for')
			{
				resultText += 'for(int ' + el.initialize.lhs + '=' + el.initialize.rhs + '; ' + el.text + '; ' + el.increment.text + ')\n';
				resultText += '{\n';
				resultText += translateC(el.statements, level+1);
				resultText += '}\n';
			}
//			else
//				drawLine(item, false, eval(item.text));
		}
		if(el.type == 'declaration')
		{
			window.eval(el.text);
			if(isInt(eval(el.rhs)))
				resultText += tabSpace + 'int '+el.lhs.turkishToEnglish() + ' = '+el.rhs.turkishToEnglish()+';\n';
			else
				resultText += tabSpace + 'float '+el.lhs.turkishToEnglish() + ' = '+el.rhs.turkishToEnglish()+';\n';
		}
		if(el.type == 'assignment')
		{
			resultText += tabSpace + el.lhs.turkishToEnglish() + ' = '+el.rhs.turkishToEnglish()+';\n';
		}
		if(el.type == 'expression')
		{
			resultText += el.lhs.turkishToEnglish() + ' = '+el.rhs.turkishToEnglish();
		}
		if(el.type == 'print')
		{
			var leftPart = '\"';
			var rightPart = '';

			for(var i=0; i < el.list.length; i++)
			{
				if(el.list[i].subtype == 'var')
				{
					if(isInt(eval(el.list[i].text)))
						leftPart += "%d";
					else
						leftPart += "%f";

					rightPart += ', ' + el.list[i].text.turkishToEnglish();
				}
				else
					leftPart += el.list[i].text.turkishToEnglish() + '';
			}
			leftPart += '\\n\"';

			resultText += tabSpace + 'printf(' + leftPart + rightPart + ');\n';
			//drawLine(item, false, resu);
		}
	});

	return resultText;
}
