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

var konsol = CodeMirror.fromTextArea(document.getElementById('konsol'), {
  mode: "simplemode",
  lineNumbers: false,
  theme: '3024-night',
  readOnly: true
});

var parseResult = CodeMirror.fromTextArea(document.getElementById('parseResult'), {
  mode: "simplemode",
  lineNumbers: false,
  theme: 'eclipse',
  readOnly: true
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
	if (!editor.state.completionActive &&  event.keyCode != 13 && event.keyCode != 37 && event.keyCode != 38 && event.keyCode != 39 && event.keyCode != 40 && event.keyCode != 27 && event.keyCode != 32 && event.keyCode != 8 && event.keyCode != 9) {
            CodeMirror.commands.autocomplete(editor, null, {completeSingle: false});
     }
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

	if(type == 'logical')
	{
		if(result)
			markedLine = editor.markText({line: lineNumber-1, ch: line.start}, {line: lineNumber-1, ch: line.end}, {className: "styled-background-logical-true"});
		else
			markedLine = editor.markText({line: lineNumber-1, ch: line.start}, {line: lineNumber-1, ch: line.end}, {className: "styled-background-logical-false"});

		logicals.push({line: line, eval: result});
	}
	else
  		markedLine = editor.markText({line: lineNumber-1, ch: 0}, {line: lineNumber-1, ch: 50}, {className: "styled-background-normal"});

	markedLines.push(markedLine);
}
//highlightLine(10);


var time = 1
function drawLine(line, isLoop){

   setTimeout(function(){

	var result = window.eval(line.text);

  	if(line.type == 'logical')
 	{
		console.log('[logical] line '+line.lineNumber +' is getting processed, result is: '+ result);
		highlightLine(line, 'logical', result);
		insertTextAtCursor(result, line.lineNumber, false);
	}
	else if(line.type == 'declaration' || line.type == 'assignment')
	{
		var result = eval(line.lhs);
		highlightLine(line);
  		insertTextAtCursor(result, line.lineNumber, isLoop);
	}
	else
	{
		highlightLine(line);
  		insertTextAtCursor(result, line.lineNumber, false);
	}
	//insertTextAtCursor(item.text, item.lineNumber, isLoop);

   }, 750 * time)

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

window.insertTextAtCursor = function(text, number, isLoop) {
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

  console.log(isLoop)

  if(isLoop)
    doc.replaceRange(text+',', {line:number-1, ch:30});
  else
    doc.replaceRange(text+'', {line:number-1, ch:30});
}

insertNewLines(editor.lineCount()-1);

var grammer = null;
var errorGrammer = null;

$.get("grammer.pegjs", function(response) {
	grammer = response;
	//console.log(response)
});

$.get("hataAyikla.pegjs", function(response) {
	errorGrammer = response;
});

function processOneItem(item){

	if(item.type == 'logical')
	{
		console.log('[logical] line '+item.lineNumber +' is getting processed, text is: '+ item.text);

		if(item.mainType == 'if')
		{
			drawLine(item, false);

			if(eval(item.text))
				recursivelyProcess(item.truePart)
			else
				if(item.falsePart)
					recursivelyProcess(item.falsePart)
		}
		else if(item.mainType == 'while')
		{
			while(eval(item.text)){
				drawLine(item, false);

				if(eval(item.text))
					recursivelyProcess(item.statements)
			}
			drawLine(item, false);
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
			drawLine(item, true);
		else
			drawLine(item, false);

	}

	if(item.type == 'print')
	{
		console.log('[print] line '+item.lineNumber +' is getting processed, result is: '+ eval(item.text));
		drawLine(item);
		//insertTextAtCursor(item.text, item.lineNumber, isLoop);
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
var parseStr = '//   ';

window.parse = function() {

	console.clear();
	time = 1;

	for(var i=0; i < markedLines.length; i++) // it removes markes lines
		markedLines[i].clear();

	logicals = [];

	try{
 		evaluate.setValue('');
    	insertNewLines(editor.lineCount()-1);

    	var text = editor.getValue();
    	var parser = PEG.buildParser(grammer);
    	result = parser.parse(text);
    	//document.getElementById("result").textContent = JSON.stringify(result, null, 2);

		recursivelyProcess(result);


		parseStr = '//   '+'Kod hatasız, çalıştırma başarılı.';

		//$("#run").style = 'display:none';
		$("#run").css("display", "none");
		$("#runJunk").css("display", "block");



		setTimeout(function(){
			$("#run").css("display", "block");
			$("#runJunk").css("display", "none");
   		}, 750 * (time-1))

time++;


  }catch(err){
  		//document.getElementById("result").textContent = err.toString();
	  	console.log('asas'+err.message + 'ssdasd')

		if(err.location)
			parseStr = '//   '+"Satır "+err.location.start.line+' hata içeriyor. Lütfen kontrol edin.';
	  	else{

		 	var parser2 = PEG.buildParser(errorGrammer);
    		result = parser2.parse(err.message);

			parseStr = '//   '+result;
		}
  }
	parseDoc.setValue(parseStr)

}

window.temizle = function(){
	editor.setValue('');
}

window.kaydet = function(){
	var blob = new Blob([editor.getValue()], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "merhaba dünya.txt");
}

window.loadExample = function(from, no){
	document.getElementById('code-description').innerHTML = eval(from+'['+no+'].name');
	editor.setValue(eval(from+'['+no+'].code'));
}

loadExample('beginner', 0);

for(var i=1; i < beginner.length; i++){
	var str = '<a href="javascript:hideshow(document.getElementById(\'baslangicSeviyeSoru'+i+'\'))">' +
		      '<h3 style = "margin: 0.25em 0 .75em 0; border-bottom: 2pt dotted silver; ">' + i +'. '+ beginner[i].name + '</h3></a>' +
			  '<p id="baslangicSeviyeSoru'+ i +'" style = "display: none;">' +
		         	beginner[i].description + ' Hemen incelemek isterseniz, ' +
			  		'<a href="#" onclick = "loadExample(\'beginner\', '+ i +')"> kodları buradan yükleyin</a>.' +
			  '</p> <br>';

	document.getElementById('baslangic').innerHTML += str;
}



for(var i=0; i < ortaSeviye.length; i++){
	var str = '<a href="javascript:hideshow(document.getElementById(\'ortaSeviyeSoru'+i+'\'))">' +
			  '<h3 style = "margin: 0.25em 0 .75em 0; border-bottom: 2pt dotted silver;">' + (i+1) +'. '+ ortaSeviye[i].name + '</h3></a>' +
			  '<p id="ortaSeviyeSoru'+ i +'" style = "display: none;">' +
					ortaSeviye[i].description + ' Hemen incelemek isterseniz, ' +
					'<a href="#" onclick = "loadExample(\'ortaSeviye\', '+ i +')"> kodları buradan yükleyin</a>.' +
			  '</p> <br>';

	document.getElementById('ortaSeviyeSorular').innerHTML += str;
}



/*


*/
