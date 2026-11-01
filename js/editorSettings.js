
var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
	mode: "turkish",
	extraKeys: {"Ctrl-Space": "autocomplete"},
	styleActiveLine: true,
	lineNumbers: true,
	lineWrapping: true,
	autoCloseBrackets: true,
	viewportMargin: Infinity,	// editör kodun boyuna göre uzar
	theme: 'tpd'
});

var translate = CodeMirror.fromTextArea(document.getElementById('translateCoutput'), {
	mode: "simplemode",
	lineNumbers: true,
	viewportMargin: Infinity,
	theme: 'tpd',
	readOnly: true
});

editor.setOption("extraKeys", {
	"Ctrl-Space": "autocomplete",
	"Ctrl-Enter": function(cm) {
		bastanCalistir();
	},
	"Cmd-Enter": function(cm) {
		bastanCalistir();
	}
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
});

// C çevirisi paneli: kod her değiştiğinde (yazarken, örnek yüklenince) güncellenir.
// Kodda sözdizimi hatası varsa son geçerli çeviri kalır.
function ceviriyiGuncelle(){
	if(typeof parser == 'undefined' || !parser)
		return;	// gramer henüz yüklenmedi; yüklenince çağrılır
	try{
		translate.getDoc().setValue(translateCHelper(parser.parse(editor.getValue()), 0));
	}catch(err){
	}
}
editor.on("change", ceviriyiGuncelle);
