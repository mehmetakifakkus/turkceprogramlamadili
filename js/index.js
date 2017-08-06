var editor = CodeMirror.fromTextArea(document.getElementById('codemirror'), {
//  mode: "javascript",
  mode: "simplemode",
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

editor.on("gutterClick", function(cm, n) {
  var info = cm.lineInfo(n);
  cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : makeMarker());
});

function setEditorArea(){
	editor.focus();

	document.getElementById('mainContainer').style.height = 171 + editor.lineCount() * 24 + 'px';
	document.getElementById('column-left').style.height = 76 + editor.lineCount() * 24 + 'px';

	$( "column-right" ).ready(function(){
		evaluate.setValue('');
		document.getElementById('column-right').style.height = 76 + editor.lineCount() * 24 + 'px';
	});

	var len = editor.lineCount();
	insertNewLines(len-1);
}
setEditorArea();

editor.on('cursorActivity', function(){
   	var start_cursor = editor.getCursor();  //I need to get the cursor position
   	console.log(start_cursor);  //Cursor position

	var cursorLine = start_cursor.line;
	var cursorCh = start_cursor.ch;
	setEditorArea();
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

window.highlightLine = highlightLine;

//highlightLine(10);

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

  if(isLoop)
    doc.replaceRange(text+',', {line:number-1, ch:20});
  else
    doc.replaceRange(text+'', {line:number-1, ch:20});
}

insertNewLines(editor.lineCount()-1);

var grammer = null;

$.get("grammer.pegjs", function(response) {
	grammer = response;
	//console.log(response)
});


window.parse = function() {

	console.clear();

	for(var i=0; i < markedLines.length; i++) // it removes markes lines
		markedLines[i].clear();


	logicals = [];

	try{
 		evaluate.setValue('');
    	insertNewLines(editor.lineCount()-1);

    	var text = editor.getValue();
    	var parser = PEG.buildParser(grammer);
    	var result = parser.parse(text);
    	//document.getElementById("result").textContent = JSON.stringify(result, null, 2);
		 console.log(result)
  }catch(err){
  		//document.getElementById("result").textContent = err.toString();
	  	console.log(err)
  }
}

window.temizle = function(){
	editor.setValue('');
}

window.kaydet = function(){
	var blob = new Blob([editor.getValue()], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "merhaba dünya.txt");
}



