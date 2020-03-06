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

var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
//  mode: "javascript",
	mode: "turkish",
  extraKeys: {"Ctrl-Space": "autocomplete"},
  styleActiveLine: true,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseBrackets: true,
  theme: 'eclipse'
});

var evaluate = CodeMirror.fromTextArea(document.getElementById('evaluate'), {
  mode: "simplemode",
  lineNumbers: false,
  theme: 'eclipse',
  readOnly: true
});

var translate = CodeMirror.fromTextArea(document.getElementById('translateCoutput'), {
  mode: "simplemode",
//	mode: "turkish",
  lineNumbers: true,
  theme: 'eclipse',
  readOnly: true
});

var parseResult = CodeMirror.fromTextArea(document.getElementById('parseResult'), {
  mode: "simplemode",
  lineNumbers: false,
  theme: 'eclipse',
  scrollbarStyle: "null",
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

var lineHeight = 22;
function setEditorArea(){
	editor.focus();

//	document.getElementById('mainContainer').style.height = 130 + editor.lineCount() * 24 + 'px';
	document.getElementById('column-left').style.height = 40 + editor.lineCount() * lineHeight + 'px';

	$( "column-right" ).ready(function(){
		evaluate.setValue('');
		document.getElementById('column-right').style.height = 40 + editor.lineCount() * lineHeight + 'px';
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

	try{
		var text = editor.getValue();
    	result = parser.parse(text);
		translate.getDoc().setValue(translateCHelper(result, 0))

	}catch(err){
		console.error(err)
	}
    	//document.getElementById("result").textContent = JSON.stringify(result, null, 2);
});

/*
*
*	#######################      	Editor Functions   	  #######################
*
*/

function makeMarker() {
  var marker = document.createElement("div");
  marker.style.color = "#822";
  marker.innerHTML = ">>";
  return marker;
}

var markedLine, markedLogic, logicals = [];
function highlightLine(line, type, result) { // type is used for logical,  result is logical true or false

  var ln = line.lineNumber-1;

  if(markedLine)
    markedLine.clear();

	if(result)
		markedLogic = editor.markText({line: ln, ch: line.start}, {line: ln, ch: line.end}, {className: "styled-background-logical-true"});
	else
		markedLogic = editor.markText({line: ln, ch: line.start}, {line: ln, ch: line.end}, {className: "styled-background-logical-false"});

	logicals.push(markedLogic);

	markedLine = editor.markText({line: ln, ch: 0}, {line: ln, ch: 50}, {className: "styled-background-normal"});
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


function toFixed(value, precision) {
    var power = Math.pow(10, precision || 0);
    return String(Math.round(value * power) / power);
}

function isInt(n) {
   return n % 1 === 0;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

function insertTextAtCursor(text, number, isLoop) {
    var doc = evaluate.getDoc();

	if(typeof(text) == 'boolean')
		 text = text ? 'doğru':'yanlış'
	else if(isFloat(text))
		text = toFixed(text, 2);

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

var konsolLine = 0
function outputConsole(text) {
    konsol.getDoc().replaceRange(text, {line: konsolLine++, ch:500});
}

insertNewLines(editor.lineCount()-1);

/*
*
*	#######################      	Change User Style     #######################
*
*/

function makeFullScreen(){

	$('body').css('padding-left', '0px');
	$('body').css('padding-right', '0px');

	$('.mycontainer').css('width', '95%');
	$('.mycontainer').css('margin-left', '2.5%');

	$('.CodeMirror').css('font-size', '18px');

	$('#fullScreenB').css('display', 'none');
	$('#compactB').css('display', 'inline-block');

	helper();
	lineHeight = 28;
}

function makeCompact(){

	$('body').css('padding', '40px');

	$('.mycontainer').css('width', '75%');
	$('.mycontainer').css('margin-left', '12.5%');

	$('.CodeMirror').css('font-size', '16px');

	$('#fullScreenB').css('display', 'inline-block');
	$('#compactB').css('display', 'none');

	helper();
	lineHeight = 23;
}



