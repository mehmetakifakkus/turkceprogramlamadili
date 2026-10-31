/*
 * Simple Turkish Grammar
 * ==========================

değişken no = 2
değişken no2 = no + 3
değişken ad = "Ali"

no = 14
yaz no

eğer(no > 10 veya no2 eşit 5)
{
  no = no + 3
}
değilse
  no = no - 10

yinele(no < 20)
  no = no + 1

sayarakYinele(değişken i = 0, i < 3, i = i + 1)
  yaz "i: " + i

yaz ad + " " + no   // yorum satırı

*/

{
  // Değişken adı olarak kullanılamayan kelimeler
  var ayrilmisKelimeler = [
    'değişken', 'değ', 'var', 'eğer', 'değilse', 'yinele', 'sayarakYinele',
    'yaz', 'print', 'doğru', 'yanlış', 've', 'veya',
    'büyük', 'küçük', 'büyükeşit', 'küçükeşit', 'eşit', 'eşitdeğil',
    'taban', 'tavan', 'karekök', 'mutlak', 'üstel', 'değil'
  ];

  // head (op operand)* dizisinden JavaScript metni kurar
  function ikiliMetin(head, tail, opIndex, operandIndex) {
    var metin = head;
    for (var i = 0; i < tail.length; i++)
      metin += ' ' + tail[i][opIndex] + ' ' + tail[i][operandIndex];
    return metin;
  }
}

// Baştaki boş satırlar atlanır
start = [ \t\r\n]* s:statement* { return s; }

statement 
  =	block_item
  

if_statement
  = _ 'eğer' !harfRakam _ '(' _ los:logical_statement  _ ')' _ nl
  		_ lines1:(compound_statement / block_item) _ nl
  lines2:( _ degilse_kelimesi _ nl 
  		_ (compound_statement / block_item) )? nl
{      
  los.mainType = 'if';
  
  if(lines2 && typeof(lines2[5]) != "undefined")
     lines2 = lines2[5] 
		
	return {'type': 'logical', 
			'mainType': 'if',
		    'text': los.text,
			'truePart':lines1,
			'falsePart': lines2,
			'lineNumber': los.lineNumber,
			'start': los.start,
			'end': los.end
		   };	
}
 
// Tek eleman olarak kalmalı: if_statement eylemi lines2[5]'i okuyor
degilse_kelimesi = 'değilse' !harfRakam

while_statement
 = _ 'yinele' !harfRakam _ '(' los:logical_statement ')' _ nl 
   _ lines:(compound_statement / block_item) _ nl
{ 
    if(lines instanceof Array)
     for(var i=0; i < lines.length; i++)
		lines[i].up = 'while';
	else
	    lines.up = 'while';
	
	return {'type': 'logical', 
		'mainType': 'while',
		'text': los.text,
		'statements': lines,
		'lineNumber': los.lineNumber,
		'start': los.start,
		'end': los.end
	   };	
} 
 
for_statement
 = _ 'sayarakYinele' !harfRakam _ '(' _ dec1:declaration _ ',' _ los:logical_statement _ ',' _ dec2:declaration ')' _ nl
 	lines:(compound_statement / block_item) _ nl
 {
     //console.log({'dec1': dec1, 'los': los, 'dec2':dec2})
	 los.mainType = 'for';
	
	if(lines instanceof Array)
     for(var i=0; i < lines.length; i++)
		lines[i].up = 'for';
	else
	    lines.up = 'for';
	
	return {'type': 'logical', 
		'mainType': 'for',
		'initialize' : dec1,
		'increment' : dec2,
		'text': los.text,
		'statements': lines,
		'lineNumber': los.lineNumber,
		'start': los.start,
		'end': los.end
	   };
 } 
 
compound_statement
 = nl _'{' _ [ \n]* _ b:block_item_list _ '}' _ nl _{  // block itemlar yerine bos da olabilir
 	return b
 }

block_item_list = (block_item)* 

block_item
 = declaration
 / if_statement
 / while_statement
 / for_statement
 / print_statement
 / ifade_satiri
 / null_statement
 / comment

// Tek başına bir ifade ya da koşul satırı: değerini gösterir.
// Satır sonu zorunlu, böylece `yazz x` gibi yazım hataları iki ayrı
// ifadeye bölünmek yerine sözdizimi hatası verir.
ifade_satiri
 = _ k:kosul bitis:sutun _ satirSonu {
	return {'type': k.mantiksal ? 'logical' : 'expression', '#evaluation': 0, 'text': k.text, 'lineNumber': location().start.line, 'start': location().start.column-1, 'end': bitis};
 }

satirSonu
 = comment / "\n" nl / !.

// Bulunulan sütun (0'dan başlar), hiçbir şey tüketmez
sutun
 = "" { return location().start.column - 1; }

null_statement
 = ';' _ comment? nl {
 	return {'type': 'null', 'text': '', 'lineNumber': location().start.line};
 }

declaration
 =  _ ('var' !harfRakam / 'değişken' !harfRakam / 'değ' !harfRakam) _ dec:init_declarator_list _ nl{
	return {'type': 'declaration', '#evaluation': 0, 'text':'var '+dec.lhs+' = ' + dec.rhs, 'lhs':dec.lhs, 'rhs': dec.rhs, 'lineNumber': location().start.line};
 }
 /
  _ ass:init_declarator_list  {
	return {'type': 'assignment', '#evaluation': 0, 'text': ass.lhs+' = '+ass.rhs, 'lhs':ass.lhs, 'rhs': ass.rhs, 'lineNumber': location().start.line};
 }

init_declarator_list
 = 	init:init_declarator (',' _ init_declarator)* {return init;}

init_declarator
	= _ left:name _"="_ exp: (StringLiteral / kosul) nl{

	if(exp.type == 'Literal')
        return {'lhs': left, 'rhs': JSON.stringify(exp.value)};
    else 
        return {'lhs': left, 'rhs': exp.text};        
}   

print_statement = _ ("yaz" !harfRakam / "print" !harfRakam) _ exp:( _  '+'? _ (StringLiteral / expression_statement_no_nl))+ _ comment? _ nl {
	//console.log(exp)
    var list = []
    
    for(var i=0; i < exp.length; i++)
	{
      if(exp[i][3].type == 'Literal')
          list.push( {'subtype': 'string', 'text': exp[i][3].value, 'lineNumber': location().start.line}); 
      else
          list.push({ 'subtype': 'var', 'text': exp[i][3].text, 'lineNumber': location().start.line});        
    }
	
    return {'type':'print', 'list': list, 'lineNumber': location().start.line}
}

expression_statement_no_nl = head:Term tail:(_ ("+" / "-") _ Term)* {
   	return {'type':'expression', '#evaluation': 0, 'text': ikiliMetin(head, tail, 1, 3), 'lineNumber': location().start.line, 'start':location().start.column-1, 'end':location().end.column-1};
}

// Term ve Factor, ifadenin JavaScript metnini döndürür
Term
  = head:Factor tail:(_ ("*" / "/" / "%") _ Factor)* { return ikiliMetin(head, tail, 1, 3); }

Factor
  = "(" _ expr:expression_statement_no_nl _ ")" { return '(' + expr.text + ')'; }
  / m:math_functions { return m.text; }
  / f:Float { return f.text.trim(); }
  / i:Integer { return i.text.trim(); }
  / dogru { return 'true'; }
  / yanlis { return 'false'; }
  / n:name { return n; }
  / "-" _ f:Factor { return '-' + f; }
  

logical_statement = _ k:kosul _ nl
{
	return {'type':'logical', 'text': k.text, 'lineNumber': location().start.line, 'start': location().start.column-1, 'end': location().end.column-1};
}

// Koşullar. Öncelik: veya < ve < değil < karşılaştırma.
// Her biri {text: JavaScript metni, mantiksal: sonuç doğru/yanlış mı} döndürür.
kosul
  = head:kosulVe tail:(_ veya_operatoru _ kosulVe)* {
	if (tail.length == 0) return head;
	return {text: ikiliMetin(head.text, tail.map(function(t){ return [t[0], t[1], t[2], t[3].text]; }), 1, 3), mantiksal: true};
  }

kosulVe
  = head:kosulTekil tail:(_ ve_operatoru _ kosulTekil)* {
	if (tail.length == 0) return head;
	return {text: ikiliMetin(head.text, tail.map(function(t){ return [t[0], t[1], t[2], t[3].text]; }), 1, 3), mantiksal: true};
  }

kosulTekil
  = degil_operatoru _ k:kosulTekil { return {text: '!(' + k.text + ')', mantiksal: true}; }
  / a:expression_statement_no_nl _ op:operator _ b:expression_statement_no_nl { return {text: a.text + ' ' + op + ' ' + b.text, mantiksal: true}; }
  / e:expression_statement_no_nl { return {text: e.text, mantiksal: /^(true|false)$/.test(e.text)}; }
  // Düz ifadeden sonra gelmeli: "(a + b) / 2" ifade olarak okunmalı
  / "(" _ k:kosul _ ")" { return {text: '(' + k.text + ')', mantiksal: k.mantiksal}; }


//// math functions

math_functions
 = taban / tavan/ karekok / mutlakDeger / ustel

taban = 'taban' !harfRakam _ '(' _ exp:expression_statement_no_nl _ ')'{
 	return {'type':'math_func', '#evaluation': 0, 'text': 'Math.floor(' + exp.text + ')', 'C': 'floor(' + exp.text + ')', 'lineNumber': location().end.line, 'start':location().start.column, 'end':location().end.column-1}; 
}
tavan = 'tavan' !harfRakam _ '(' _ exp:expression_statement_no_nl _ ')'{
 	return {'type':'math_func', '#evaluation': 0, 'text': 'Math.ceil(' + exp.text + ')', 'C': 'ceil(' + exp.text + ')', 'lineNumber': location().end.line, 'start':location().start.column, 'end':location().end.column-1}; 
}
karekok = 'karekök' !harfRakam _ '(' _ exp:expression_statement_no_nl _ ')'{
 	return {'type':'math_func', '#evaluation': 0, 'text': 'Math.sqrt(' + exp.text + ')', 'C': 'sqrt(' + exp.text + ')', 'lineNumber': location().end.line, 'start':location().start.column, 'end':location().end.column-1}; 
}
mutlakDeger = 'mutlak' !harfRakam _ '(' _ exp:expression_statement_no_nl _ ')'{
 	return {'type':'math_func', '#evaluation': 0, 'text': 'Math.abs(' + exp.text + ')', 'C': 'fabs(' + exp.text + ')', 'lineNumber': location().end.line, 'start':location().start.column, 'end':location().end.column-1}; 
}
ustel = 'üstel' !harfRakam _ '(' _ exp1:expression_statement_no_nl _ ',' _ exp2:expression_statement_no_nl _ ')'{
 	return {'type':'math_func', '#evaluation': 0, 'text': 'Math.pow(' + exp1.text + ','  + exp2.text + ')', 'C': 'pow(' + exp1.text + ','  + exp2.text + ')', 'lineNumber': location().end.line, 'start':location().start.column, 'end':location().end.column-1}; 
}




///// Name = Variable

name = ad:$(harf harfRakam*) !{ return ayrilmisKelimeler.indexOf(ad) >= 0; } {return ad;}

dogru = 'doğru' !harfRakam {return true;}
yanlis = 'yanlış' !harfRakam {return false;}


harf "letter"
  = [a-zA-Z_çğıöşüâîûÇĞİÖŞÜÂÎÛ]

harfRakam
  = [a-zA-Z0-9_çğıöşüâîûÇĞİÖŞÜÂÎÛ]

StringLiteral "string"
  = '"' chars:DoubleStringCharacter* '"' {
      return { type: "Literal", value: chars.join("") };
    }

DoubleStringCharacter
  = !('"' / "\\" / LineTerminator) SourceCharacter { return text(); }
  / "\\" sequence:EscapeSequence { return sequence; }
  / LineContinuation

LineContinuation
  = "\\" LineTerminatorSequence { return ""; }  
  
LineTerminatorSequence "end of line"
  = "\n"
  / "\r\n"
  / "\r"
  / "\u2028"
  / "\u2029"  
  
LineTerminator
  = [\n\r\u2028\u2029]  
 
SourceCharacter
  = . 
 
EscapeSequence
  = CharacterEscapeSequence

CharacterEscapeSequence
  = SingleEscapeCharacter

SingleEscapeCharacter
  = "'" / '"'  / "\\"  
  / "b"  { return "\b"; }
  / "f"  { return "\f"; }
  / "n"  { return "\n"; }
  / "r"  { return "\r"; }
  / "t"  { return "\t"; }
  / "v"  { return "\v"; } 
  
  
Float "float" 
  = _ '-'? [0-9]+ '.' [0-9]* { return {type: 'float', text: text()}; }

Integer "integer"
  = _ '-'? [0-9]+ { return {type: 'integer', text: text()}; }
   

_ "whitespace"
  = [ \t\r]* {return null;}
  
nl "newline"
  = comment? [\n]* {return null;}

comment 
   = _ "//" _ value:$[^\n]* nl {return {type: 'comment', value: value}; }
  
operator
  = operator_text / operator_symbol
  
veya_operatoru
  = "veya" !harfRakam		{ return "||"; }
	/ "||"					{ return "||"; }

ve_operatoru
  = "ve" !harfRakam			{ return "&&"; }
	/ "&&"					{ return "&&"; }

degil_operatoru
  = "değil" !harfRakam
	/ "!" !"="

operator_text
  =  "büyükeşit" !harfRakam	{ return ">="; }
	/ "küçükeşit" !harfRakam	{ return "<="; }
	/ "küçük" !harfRakam		{ return "<"; }
	/ "büyük" !harfRakam		{ return ">"; }
	/ "eşitdeğil" !harfRakam	{ return "!="; }
	/ "eşit" !harfRakam		{ return "=="; }
  
operator_symbol
  = "<="					{ return text(); }
	/ "<"					{ return text(); }
	/ ">="					{ return text(); }
	/ ">"					{ return text(); }
	/ "=="					{ return text(); }
	/ "!="					{ return text(); }