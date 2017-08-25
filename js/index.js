var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
//  mode: "javascript",
	mode: "turkish",
  extraKeys: {"Ctrl-Space": "autocomplete"},
  styleActiveLine: true,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseBrackets: true,
  theme: 'eclipse',
  gutters: ["CodeMirror-linenumbers", "breakpoints"]
});

var evaluate = CodeMirror.fromTextArea(document.getElementById('evaluate'), {
  mode: "simplemode",
  lineNumbers: false,
  theme: 'eclipse',
  readOnly: true
});

var parseResult = CodeMirror.fromTextArea(document.getElementById('parseResult'), {
  mode: "simplemode",
  lineNumbers: false,
  theme: 'eclipse',
  readOnly: true
});

var konsol = CodeMirror.fromTextArea(document.getElementById('konsol'), {
  mode: "simplemode",
  lineNumbers: false,
  theme: '3024-night',
  readOnly: true
});

editor.setOption("extraKeys", {
	"Ctrl-Enter": function(cm) {
		console.log('enter');
		parse();
	},
	"Cmd-Enter": function(cm) {
		console.log('enter');
		parse();
	}
});

editor.on("gutterClick", function(cm, n) {
  var info = cm.lineInfo(n);
  cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : makeMarker());
});

function setEditorArea(){
	editor.focus();

//	document.getElementById('mainContainer').style.height = 130 + editor.lineCount() * 24 + 'px';
	document.getElementById('column-left').style.height = 40 + editor.lineCount() * 22 + 'px';

	$( "column-right" ).ready(function(){
		evaluate.setValue('');
		document.getElementById('column-right').style.height = 40 + editor.lineCount() * 22 + 'px';
	});

	var len = editor.lineCount();
	insertNewLines(len-1);
}
setEditorArea();

editor.on('cursorActivity', function(){
   	var start_cursor = editor.getCursor();  //I need to get the cursor position
   	//console.log(start_cursor);  //Cursor position

	var cursorLine = start_cursor.line;
	var cursorCh = start_cursor.ch;
	setEditorArea();

});

editor.on("keyup", function (cm, event) {
	/*Enter - do not open autocomplete list just after item has been selected in it*/
	if (!editor.state.completionActive
		&& event.keyCode != 13 // enter
		&& event.keyCode != 37 // left
		&& event.keyCode != 38 // up
		&& event.keyCode != 39 // right
		&& event.keyCode != 40 // down
		&& event.keyCode != 27
		&& event.keyCode != 32 // space
		&& event.keyCode != 8 // tab
		&& event.keyCode != 9
		&& event.keyCode != 17 // ctrl
		&& event.keyCode != 93 // cmd+enter
	    ){
            CodeMirror.commands.autocomplete(editor, null, {completeSingle: false});
     }

	//if(event.keyCode != 37 && event.keyCode != 38 && event.keyCode != 39 && event.keyCode != 40)
		//parse();

	console.log(event.keyCode)
});


function makeMarker() {
  var marker = document.createElement("div");
  marker.style.color = "#822";
  marker.innerHTML = ">>";
  return marker;
}

var markedLine, markedLines = [], logicals = [];
function highlightLine(line, type, result) { // type is used for logical,  result is logical true or false

  var lineNumber = line.lineNumber;

  if(markedLine)
    markedLine.clear();

	for(var i=0; i < logicals.length; i++)
	{
		if(logicals[i].eval)
			markedLine = editor.markText({line: logicals[i].line.lineNumber-1, ch: logicals[i].line.start}, {line: logicals[i].line.lineNumber-1, ch: logicals[i].line.end}, {className: "styled-background-logical-true"});
		else
			markedLine = editor.markText({line: logicals[i].line.lineNumber-1, ch: logicals[i].line.start}, {line: logicals[i].line.lineNumber-1, ch: logicals[i].line.end}, {className: "styled-background-logical-false"});
	}

	//if(type == 'logical')
	{
		if(result)
			markedLine = editor.markText({line: lineNumber-1, ch: line.start}, {line: lineNumber-1, ch: line.end}, {className: "styled-background-logical-true"});
		else
			markedLine = editor.markText({line: lineNumber-1, ch: line.start}, {line: lineNumber-1, ch: line.end}, {className: "styled-background-logical-false"});

		logicals.push({line: line, eval: result});
	}
	//else
  		markedLine = editor.markText({line: lineNumber-1, ch: 0}, {line: lineNumber-1, ch: 50}, {className: "styled-background-normal"});

	markedLines.push(markedLine);
}


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

		if(line.subtype == 'string')
			insertText(line.text);
		else if(line.subtype == 'var')
			insertText(res);
	}
	else{
		var result = window.eval(line.text);
		highlightLine(line);
  		insertTextAtCursor(result, line.lineNumber, false);
	}

   }, speed * time)

time++;
}

function deleteLines(number){

    var doc = evaluate.getDoc();

	for(var i=0;i < number; i++)
	{
		doc.replaceRange('',  {line:0, ch:0}, {line:1, ch:0});
	}
}

function insertNewLines(number) {
    var doc = evaluate.getDoc();

    for(var i=0; i < number; i++)
//      doc.replaceRange('-'+(i+1)+'-\n', { line: evaluate.lineCount(), ch: 0 });// set the character position to the end of the line
      doc.replaceRange('\n', { line: evaluate.lineCount(), ch: 0 });// set the character position to the end of the line

}

function insertTextAtCursor(text, number, isLoop) {
    var doc = evaluate.getDoc();

	if(typeof(text) == 'boolean')
		 text = text ? 'doğru':'yanlış'

	var pos = { // create a new object to avoid mutation of the original selection
        line: number-1,
        ch: 1 // set the character position to the end of the line
    }

	var currentText = editor.doc.getLine(number-1);

  if(currentText.length > 0 && !isLoop) // delete the line first
  {
	  doc.replaceRange('// ',  {line:number-1, ch:0}, {line:number-1, ch:20});

  }

  if(isLoop)
    doc.replaceRange(text+' ', {line:number-1, ch:1000});
  else
    doc.replaceRange(text+'', {line:number-1, ch:1000});
}

function insertText(text) {
    konsol.getDoc().replaceRange(text+' ', {line: 0, ch:500});
}

insertNewLines(editor.lineCount()-1);

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
			while(eval(item.text)){
				if(eval(item.text))
					recursivelyProcess(items.slice(1))
				drawLine(item, eval(item.text));
			}
			drawLine(item, eval(item.text));
		}
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

	if(item.type == 'print')
	{
		var res = item.subtype == 'var' ? eval(item.text) : item.text;
		console.log('[print] line '+item.lineNumber +' is getting processed, result is: '+ res);

		drawLine(item, false, res);
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


var parseDoc = parseResult.getDoc();
var parseStr = '';

function parse() {

	console.clear();
	time = 0.25;

	//for(var i=0; i < markedLines.length; i++) // it removes markes lines
		//markedLines[i].clear();

	logicals = [];

	try{
 		evaluate.setValue('');
		konsol.setValue('');

    	insertNewLines(editor.lineCount()-1);

    	var text = editor.getValue();
    	result = parser.parse(text);
    	//document.getElementById("result").textContent = JSON.stringify(result, null, 2);

		parseStr = '//     '+'Kod hatasız, çalıştırma başarılı.';

		$("#redLight").css("display", "none");
		$("#greenLight").css("display", "block");


		$("#run").css("display", "none");
		$("#runJunk").css("display", "block");

		recursivelyProcess(result);

		setTimeout(function(){
			$("#run").css("display", "block");
			$("#runJunk").css("display", "none");
   		}, speed * (time-1))
		time++;

		setTimeout(function(){
			highlightLine({lineNumber: 100});
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
  }
	parseDoc.setValue(parseStr)
}

window.temizle = function(){
	evaluate.setValue('');
	konsol.setValue('');

	console.clear();
	time = 1;
	logicals = [];
}

window.kaydet = function(){
	var blob = new Blob([editor.getValue()], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "merhaba dünya.txt");
}

window.loadExample = function(from, no){
	window.temizle();
	document.getElementById('code-description').innerHTML = eval(from+'['+no+'].name');
	editor.setValue(eval(from+'['+no+'].code'));
}

loadExample('beginner', 0);

for(var i=0; i < userSend.length; i++){
	var str = '<a href="javascript:hideshow(document.getElementById(\'userSend'+i+'\'))">' +
		      '<h4 style = "margin: 0.25em 0 .75em 0; border-bottom: 2pt silver; ">' + (i+1) +'. '+ userSend[i].name + '</a>  <span style=" font-size: 1.25rem;  color: #888;">  ' + userSend[i].date+ ' tarihinde, ' + userSend[i].username + ' tarafından)' + '</span></h4>' +
			  '<p style = "font-size: 14px; display: none; "id="userSend'+ i +'">' +
		         	  ''+userSend[i].description + ' Hemen incelemek isterseniz, ' +
			  		'<a href="#" onclick = "loadExample(\'userSend\', '+ i +')"> kodları buradan yükleyin</a>.<br><br>' +
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

/*


*/

