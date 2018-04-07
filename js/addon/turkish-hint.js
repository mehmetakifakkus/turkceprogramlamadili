// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})	(function(CodeMirror) {
  var Pos = CodeMirror.Pos;

 function forEach(arr, f) {
    for (var i = 0, e = arr.length; i < e; ++i) f(arr[i]);
  }

 function arrayContains(arr, item) {
    if (!Array.prototype.indexOf) {
      var i = arr.length;
      while (i--) {
        if (arr[i] === item) {
          return true;
        }
      }
      return false;
    }
    return arr.indexOf(item) != -1;
  }

function scriptHint(editor, keywords, getToken, options) {
    // Find the token at the cursor
    var cur = editor.getCursor(), token = getToken(editor, cur);
    if (/\b(?:string|comment|number)\b/.test(token.type)) return;
    token.state = CodeMirror.innerMode(editor.getMode(), token.state).state;

    // If it's not a 'word-style' token, ignore the token.
    if (!/^[\w$_]*$/.test(token.string)) {
      token = {start: cur.ch, end: cur.ch, string: "", state: token.state, type: token.string == "." ? "property" : null};
    } else if (token.end > cur.ch) {
      token.end = cur.ch;
      token.string = token.string.slice(0, cur.ch - token.start);
    }

    var tprop = token;
    // If it is a property, find out what it is a property of.

    while (tprop.type == "property") {
      tprop = getToken(editor, Pos(cur.line, tprop.start));
      if (tprop.string != ".") return;
      tprop = getToken(editor, Pos(cur.line, tprop.start));
      if (!context) var context = [];
      context.push(tprop);
    }


	///////////////////////////////////////////       here is the local variables    //////////////////////////////////////

	var WORD = /[a-zA-Z|\_|Ç|Ş|Ğ|Ç|Ö|I|Ü|ç|ş|ğ|ç|ö|ı|ü$]+/, RANGE = 500;
	var word = options && options.word || WORD;
    var range = options && options.range || RANGE;
	var curLine = editor.getLine(cur.line);
    var end = cur.ch, start = end;
    while (start && word.test(curLine.charAt(start - 1))) --start;
    var curWord = start != end && curLine.slice(start, end);

    var list2 = options && options.list || [], seen = {};
    var re = new RegExp(word.source, "g");
    for (var dir = -1; dir <= 1; dir += 2) {
      var line = cur.line, endLine = Math.min(Math.max(line + dir * range, editor.firstLine()), editor.lastLine()) + dir;
      for (; line != endLine; line += dir) {
        var text = editor.getLine(line), m;
        while (m = re.exec(text)) {
          if (line == cur.line && m[0] === curWord) continue;
          if ((!curWord || m[0].lastIndexOf(curWord, 0) == 0) && !Object.prototype.hasOwnProperty.call(seen, m[0])) {
            seen[m[0]] = true;
            list2.push(m[0]);
          }
        }
      }
    }

	//////////////////////////////////////////    here is the predefined keywords    //////////////////////////////////////

	var list1 = getCompletions(token, context, keywords, options)

	///////////////////////////////////////////////////    merge them     /////////////////////////////////////////////////


	for(var i=0; i < list2.length; i++) //  add list2 to the list1
		if(list1.indexOf(list2[i]) == -1 )
			list1.push(list2[i]);

    return {list: list1, from: Pos(cur.line, token.start), to: Pos(cur.line, token.end)};
 }


 function javascriptHint(editor, options) {
    return scriptHint(editor, javascriptKeywords,
                      function (e, cur) {return e.getTokenAt(cur);},
                      options);
  };


CodeMirror.registerHelper("hint", "turkish", javascriptHint);


  var stringProps = ("charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight " +
                     "toUpperCase toLowerCase split concat match replace search").split(" ");

  var arrayProps = ("length concat join splice push pop shift unshift slice reverse sort indexOf " +
                    "lastIndexOf every some filter forEach map reduce reduceRight ").split(" ");

  var funcProps = "prototype apply call bind".split(" ");

  var javascriptKeywords = ("mutlak karekök taban tavan üstel değişken değ eğer değilse yinele sayarakYinele yordam yaz terket devamet yakala sil doğru yanlış" +
						   " ve veya eşit eşitdeğil küçük küçükeşit büyük büyükeşit").split(" ");


function forAllProps(obj, callback) {
    if (!Object.getOwnPropertyNames || !Object.getPrototypeOf) {
      for (var name in obj) callback(name)
    } else {
      for (var o = obj; o; o = Object.getPrototypeOf(o))
        Object.getOwnPropertyNames(o).forEach(callback)
    }
  }

function getCompletions(token, context, keywords, options) {

    var found = [], start = token.string, global = options && options.globalScope || window;

    function maybeAdd(str) {
      if (str.lastIndexOf(start, 0) == 0 && !arrayContains(found, str)) found.push(str);
    }

    function gatherCompletions(obj) {

		console.log(obj)
		console.log(typeof(obj))

      if (typeof obj == "string"){
		  forEach(stringProps, maybeAdd);
		  console.log('string')
	  }
      else if (obj instanceof Array){
		  forEach(arrayProps, maybeAdd);
  		  console.log('array')
	  }
      else if (obj instanceof Function){
		  forEach(funcProps, maybeAdd);
		  console.log('function')
	  }
      forAllProps(obj, maybeAdd)
    }

    if (context && context.length) {
      // If this is a property, see if it belongs to some object we can
      // find in the current environment.
      var obj = context.pop(), base;
      if (obj.type && obj.type.indexOf("variable") === 0) {
        if (options && options.additionalContext)
          base = options.additionalContext[obj.string];
        if (!options || options.useGlobalScope !== false)
          base = base || global[obj.string];
      } else if (obj.type == "string") {
        base = "";
      } else if (obj.type == "atom") {
        base = 1;
      } else if (obj.type == "function") {
        if (global.jQuery != null && (obj.string == '$' || obj.string == 'jQuery') &&
            (typeof global.jQuery == 'function'))
          base = global.jQuery();
        else if (global._ != null && (obj.string == '_') && (typeof global._ == 'function'))
          base = global._();
      }
      while (base != null && context.length)
        base = base[context.pop().string];
      if (base != null) gatherCompletions(base);
    } else {
      // If not, just look in the global object and any local scope
      // (reading into JS mode internals to get at the local and global variables)
      for (var v = token.state.localVars; v; v = v.next)  			maybeAdd(v.name);
      for (var v = token.state.globalVars; v; v = v.next)   		maybeAdd(v.name);
      if (!options || options.useGlobalScope !== false)
        ;//gatherCompletions(global);

		forEach(keywords, maybeAdd);
    }
    return found;
  }



});
