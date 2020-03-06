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
		highlightLine(line);
		outputConsole(res);
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


var parseDoc = parseResult.getDoc(), parseStr = '';

function parse() {

	temizle();

	try{
    	insertNewLines(editor.lineCount()-1);

    	var text = editor.getValue();
    	result = parser.parse(text);
    	//document.getElementById("result").textContent = JSON.stringify(result, null, 2);

		console.log(result)
		//console.log(translateCHelper(result, 0))

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



değişken sayı = 1
değişken n = 10
değişken toplam = 0

yinele(sayı <= 10)
{
	toplam = toplam + 1/sayı
    sayı = sayı + 1
}
yaz toplam
*/
