//var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
////  mode: "javascript",
//	mode: "turkish",
//  extraKeys: {"Ctrl-Space": "autocomplete"},
//  styleActiveLine: true,
//  lineNumbers: true,
//  lineWrapping: true,
//  autoCloseBrackets: true,
//  theme: 'eclipse',
//  gutters: ["CodeMirror-linenumbers", "breakpoints"]
//});
//

var time = 0.5, speed = 1000;
function drawLine(line, isLoop, result){

	var res = result;

  setTimeout(function(){

  	if(line.type == 'declaration' || line.type == 'assignment')
	{
		highlightLine(line);
  		insertTextAtCursor(res, line.lineNumber, isLoop);
	}
	else if(line.type == 'logical')
 	{
		highlightLine(line, 'logical', res);
		insertTextAtCursor(res, line.lineNumber, false);
	}
	else if(line.type == 'print')
	{
		console.log(line)
		highlightLine(line);

//		var resu = '';
//		for(var i=0; i < line.list.length; i++)
//			resu += line.list[i].subtype == 'var' ? eval(line.list[i].text) : line.list[i].text;

		//console.log(resu)
		//console.log(eval(line.list[i].text))
		insertText(res);
	}
	else if(line.type == 'expression')
	{
		highlightLine(line, false, true);
  		insertTextAtCursor(res, line.lineNumber, false);
	}
	else{
		var result = window.eval(line.text);
		highlightLine(line);
  		insertTextAtCursor(result, line.lineNumber, false);
	}

   }, speed * time)

time++;
}

var grammer = null, errorGrammer = null;
var parser, parser2;

$.get("grammer.pegjs", function(response) {
	grammer = response;
	parser = PEG.buildParser(grammer);
});
$.get("hataAyikla.pegjs", function(response) {
	errorGrammer = response;
	parser2 = PEG.buildParser(errorGrammer);
});

function processOneItem(item){

	if(item.type == 'logical')
	{
		console.log('[logical] line '+item.lineNumber +' is getting processed, text is: '+ item.text);

		if(item.mainType == 'if')
		{
			drawLine(item, false, eval(item.text));

			if(eval(item.text))
				recursivelyProcess(item.truePart)
			else
				if(item.falsePart)
					recursivelyProcess(item.falsePart)
		}
		else if(item.mainType == 'while')
		{
			while(eval(item.text)){
				drawLine(item, false, eval(item.text));

				if(eval(item.text))
					recursivelyProcess(item.statements)
			}
			drawLine(item, false, eval(item.text));
		}
		else if(item.mainType == 'for')
		{
			window.eval(item.initialize.text)

			while(eval(item.text)){
				drawLine(item, false, eval(item.text));


				if(eval(item.text))
					recursivelyProcess(item.statements)

				eval(item.increment.text)
			}
			drawLine(item, false, eval(item.text));
		}
		else
			drawLine(item, false, eval(item.text));
	}
	if(item.type == 'declaration' || item.type == 'assignment')
	{
		window.eval(item.text);
		item['#evaluation']++;

		console.log('['+ item.type + '] text:'+ item.text +' line '+item.lineNumber +' is getting processed, result is: '+ eval(item.lhs));

		if(item.up == 'while')
			drawLine(item, true, eval(item.lhs));
		else
			drawLine(item, false, eval(item.lhs));
	}
	if(item.type == 'expression')
	{
		window.eval(item.text);
		item['#evaluation']++;

		console.log('['+ item.type + '] text:'+ item.text +' line '+item.lineNumber +' is getting processed, result is: '+ eval(item.text));

		if(item.up == 'while')
			drawLine(item, true, eval(item.text));
		else
			drawLine(item, false, eval(item.text));
		console.error(item)
	}
	if(item.type == 'print')
	{
		var resu = '';
		for(var i=0; i < item.list.length; i++)
			resu += item.list[i].subtype == 'var' ? eval(item.list[i].text) : item.list[i].text;

		resu += '\n';
		drawLine(item, false, resu);
	}
}

function recursivelyProcess(items){
	if(items instanceof Array)
	{
		for(var i=0; i < items.length; i++)
		{
			var item = items[i];
			processOneItem(item);
		}
	}
	else
		processOneItem(items);
}


/*
*
*	#######################      	User Interface   	  #######################
*
*/

function temizle(){
	evaluate.setValue('');
	konsol.setValue('');

	//console.clear();
	time = 0.25;

	for(var i=0; i<logicals.length; i++)
		logicals[i].clear();

	logicals = [];
}



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

var parseDoc = parseResult.getDoc(), parseStr = '';

function parse() {

	temizle();

	try{
    	insertNewLines(editor.lineCount()-1);

    	var text = editor.getValue();
    	result = parser.parse(text);
    	//document.getElementById("result").textContent = JSON.stringify(result, null, 2);

		console.log(result)
		console.log(translateCHelper(result, 0))

		parseStr = '//     '+'Kod hatasız, çalıştırma başarılı.';

		$("#redLight").css("display", "none");       // bekle butonunu aç
		$("#greenLight").css("display", "block");


		$("#run").css("display", "none");
		$("#runJunk").css("display", "block");

		recursivelyProcess(result);

		setTimeout(function(){
			$("#run").css("display", "block");      // tekrar calıştırmak için çalşıtır butonunu aç
			$("#runJunk").css("display", "none");
   		}, speed * (time-1))
		time++;

		setTimeout(function(){
			highlightLine({lineNumber: 1000});
			parseDoc.setValue("//     Bitti.");
		}, speed * (time-1))
		time++;

  }catch(err){

  		$("#redLight").css("display", "block");
		$("#greenLight").css("display", "none");


		if(err.location)
			parseStr = '//     '+"Satır "+err.location.start.line+' hata içeriyor. Lütfen kontrol edin.';
	  	else{
    		result = parser2.parse(err.message);
			parseStr = '//     '+result;
		}

	  	console.error(err)
	  	$("#run").css("display", "block");  // tekrar calıştırmak için çalşıtır butonunu aç
		$("#runJunk").css("display", "none");
  }
	parseDoc.setValue(parseStr)
}

window.kaydet = function(){
	var blob = new Blob([editor.getValue()], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "merhaba dünya.txt");
}

window.loadExample = function(from, no){
	temizle();
	document.getElementById('code-description').innerHTML = eval(from+'['+no+'].name');
	editor.setValue(eval(from+'['+no+'].code'));
}

window.refreshSpeed = function(value){
	speed = 1000 / value;
}


for(var i=0; i < userSend.length; i++){
	var ind = userSend.length-1-i;
	var str = '<a href="javascript:hideshow(document.getElementById(\'userSend'+i+'\'))">' +
		      '<h4 id="'+userSend[ind].shortlink+'"style = "margin: 0.25em 0 .75em 0; border-bottom: 2pt silver; ">' + (i+1) +'. '+ userSend[ind].name + '</a>  <span style=" font-size: 1.25rem;  color: #888;">  ' + userSend[ind].date+ ' tarihinde, ' + userSend[ind].username + ' tarafından' + '</span></h4>' +
			  '<p style = "font-size: 14px; display: none; "id="userSend'+ i +'">' +
		         	  ''+userSend[ind].description + ' Hemen incelemek isterseniz, ' +
			  		'<a href="#" onclick = "loadExample(\'userSend\', '+ ind +')"> kodları buradan yükleyin</a>.<br><br>' +
			  '</p>';

	document.getElementById('userQuestions').innerHTML += str;
}

for(var i=1; i < beginner.length; i++){
	var str = '<a href="javascript:hideshow(document.getElementById(\'baslangicSeviyeSoru'+i+'\'))">' +
		      '<h4 style = "margin: 0.25em 0 .75em 0; border-bottom: 2pt silver; ">' + i +'. '+ beginner[i].name + '</h4></a>' +
			  '<p style = "font-size: 14px; display: none; "id="baslangicSeviyeSoru'+ i +'">' +
		         	beginner[i].description + ' Hemen incelemek isterseniz, ' +
			  		'<a href="#" onclick = "loadExample(\'beginner\', '+ i +')"> kodları buradan yükleyin</a>.<br><br>' +
			  '</p>';

	document.getElementById('baslangic').innerHTML += str;
}

for(var i=0; i < ortaSeviye.length; i++){
	var str = '<a href="javascript:hideshow(document.getElementById(\'ortaSeviyeSoru'+i+'\'))">' +
			  '<h4 style = "margin: 0.25em 0 .75em 0; border-bottom: 2pt silver;">' + (i+1) +'. '+ ortaSeviye[i].name + '</h4></a>' +
			  '<p style = "font-size: 14px; display: none;" id="ortaSeviyeSoru'+ i +'">' +
					ortaSeviye[i].description + ' Hemen incelemek isterseniz, ' +
					'<a href="#" onclick = "loadExample(\'ortaSeviye\', '+ i +')"> kodları buradan yükleyin</a>.<br><br>' +
			  '</p>';

	document.getElementById('ortaSeviyeSorular').innerHTML += str;
}

for(var i=0; i < ileriSeviye.length; i++){
	var str = '<a href="javascript:hideshow(document.getElementById(\'ileriSeviyeSoru'+i+'\'))">' +
			  '<h4 style = "margin: 0.25em 0 .75em 0; border-bottom: 2pt silver;">' + (i+1) +'. '+ ileriSeviye[i].name + '</h4></a>' +
			  '<p style = "font-size: 14px; display: none;" id="ileriSeviyeSoru'+ i +'">' +
					ileriSeviye[i].description + ' Hemen incelemek isterseniz, ' +
					'<a href="#" onclick = "loadExample(\'ileriSeviye\', '+ i +')"> kodları buradan yükleyin</a>.<br><br>' +
			  '</p>';

	document.getElementById('ileriSeviyeSorular').innerHTML += str;
}


window.loadExample('ortaSeviye', 2);
//window.loadExample('adaySorular', 1);


/*

değişken ort = 6
eğer(ort > 5 ve ort < 10)
  yaz "merhaba"

yaz ort


*/
