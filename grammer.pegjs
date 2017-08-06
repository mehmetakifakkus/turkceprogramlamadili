/*
 * Simple Turkish Grammar
 * ==========================

var bayrak = yanlis
var no = 2
var no2 = no + 3

no = 14
yaz no

eger(bayrak)
{
  no = no + 3
}
degilse
  no = no - 10

yinele(no < 20)
  no = no + 1

yaz no


var bayrak = yanlis
var no = 2

sayarakYinele(var t=0, t < 3, t = t+1)
{
  no = no+1
  yaz t
}

yaz no
*/

{

var time = 1;

function drawLine(line, result, isLoop){
	
   setTimeout(function(){
    
    if(line.type == 'assignment')
   	{
		console.log('[assignment] '+ line.lhs +' line '+line.lineNumber +' is getting processed, result is: '+ result); 
		highlightLine(line);
		insertTextAtCursor(result, line.lineNumber, isLoop);
	}
  	else if(line.type == 'declaration')
 	{
		console.log('[declaration] '+ line.lhs +' line '+line.lineNumber +' is getting processed, result is: '+ result);
		highlightLine(line);
		insertTextAtCursor(result, line.lineNumber);
	}
  	else if(line.type == 'logical')
 	{
		console.log('[logical] line '+line.lineNumber +' is getting processed, result is: '+ result);
		highlightLine(line, 'logical', result);
		insertTextAtCursor(result, line.lineNumber);
	}
	else if(line.type == 'print')
 	{
		console.log('[print] line '+line.lineNumber +' is getting processed, result is: '+ result); 
		highlightLine(line);
		insertTextAtCursor(result, line.lineNumber);
	}
   }, 750 * time)	

time++;
}

   function myEval(line, isLoop){
       window.eval(line.text);
       line['#evaluation']++;
       
       if(line.type == 'logical')
       		drawLine(line, window.eval(line.text), isLoop);
       else if(line.type == 'print')
	   		drawLine(line, window.eval(line.text));
	   else
	   		drawLine(line, window.eval(line.lhs), isLoop);
   }

}


start
 = statement*

statement 
  =	if_statement
  / while_statement
  / for_statement
  / item:block_item {
 
 
        if(item.type == 'print')
            drawLine(item, item.subtype == 'string'? item.text:window.eval(item.text));
 		else if(item.type == 'assignment' || item.type == 'declaration')
		{
			window.eval(item.text); 
			item['#evaluation']++;
			if( typeof(window.eval(item.lhs)) == 'boolean')
		  		drawLine(item, window.eval(item.lhs) ? 'dogru':'yanlış');
			else
		 		drawLine(item, window.eval(item.lhs));
		}
        else if(item.type == 'logical')
           drawLine(item, window.eval(item.text) ? 'dogru':'yanlış');
        
		console.log(item); 
		
	   return item;
  }
  / comment

if_statement
  = 'eğer(' _ los:logical_statement  _ ')' _ nl
  		_ lines1:(compound_statement / block_item) _ nl
  lines2:( _ 'değilse' _ nl 
  		_ (compound_statement / block_item) )? nl
  {    
  
  myEval(los);
  
  if(lines2 && typeof(lines2[5]) != "undefined")
     lines2 = lines2[5] 
  
     if(window.eval(los.text)){
        if(lines1.constructor.name == "Array")
         for(var i=0; i < lines1.length; i++)
			myEval(lines1[i]);
        else
			myEval(lines1);
            
    	return [los, lines1];
    }
    else if(lines2 && typeof(lines2) != "undefined"){

        if(lines2.constructor.name == "Array")
         for(var i=0; i < lines2.length; i++)
			myEval(lines2[i]);
        else
			myEval(lines2); 
        
    	return [los, lines2];
    }
    return 'false returned if statement'; 
}
 
while_statement
 = 'yinele(' los:logical_statement ')' _ nl 
 	_ lines:(compound_statement / block_item) _ nl
 { 
	while(window.eval(los.text)){
   
   		myEval(los);  // calculate the current value
         
      	if(lines.constructor.name == "Array")
        	for(var k=0; k < lines.length; k++)
				myEval(lines[k], true);
       	else
    	     myEval(lines, true);
	}
	
	myEval(los);  // calculate the value after loop
	return [los, lines];    
} 
 
for_statement
 = 'sayarakYinele(' _ dec1:declaration _ ',' _ los:logical_statement _ ',' _ dec2:declaration ')' _ 
 	lines:(compound_statement / block_item) _ nl
 {
     console.log({'dec1': dec1, 'los': los, 'dec2':dec2})

	window.eval(dec1.text);	 // initialization part
		
	while(window.eval(los.text)){
   
      	myEval(los);  // calculate the current value
		
        //drawLine(los, window.eval(los.text)); // calculate the current value
      	
		if(lines.constructor.name == "Array")
        	for(var k=0; k < lines.length; k++)
				myEval(lines[k], true);
       	else
    	     myEval(lines, true);
			 
		window.eval(dec2.text); // increment part
	}
	myEval(los);  // calculate the value after loop
	
	//        drawLine(los, window.eval(los.text)); // calculate the current value

	
    return lines; 
 }
 
 
compound_statement
 = nl _'{' nl _ b:block_item_list '}' _ nl _{
 	return b
 }

block_item_list = (block_item)* 

block_item
 = declaration
 / print_statement
 / expression_statement
 / logical_statement

declaration
 =  _ "var " dec:init_declarator_list {
	return {'type': 'declaration', '#evaluation': 0, 'text':'var '+dec.lhs+' = ' + dec.rhs, 'lhs':dec.lhs, 'rhs': dec.rhs, 'lineNumber': location().start.line};
 }
 /
  _ ass:init_declarator_list  {
	return {'type': 'assignment', '#evaluation': 0, 'text': ass.lhs+' = '+ass.rhs, 'lhs':ass.lhs, 'rhs': ass.rhs, 'lineNumber': location().start.line};
 }

init_declarator_list
 = 	init:init_declarator (',' _ init_declarator)* {return init;}

init_declarator
	= _ left:name _"="_ exp:expression_statement nl{
                   
    if( typeof(exp.result) == 'boolean')
    	return {'lhs': left, 'rhs': exp.result.toString()}; // evaluate it, then return it       
    else 
        return {'lhs': left, 'rhs': exp.text};        
}   

print_statement = _ "yaz" _ exp:(expression_statement / StringLiteral) _ comment? nl {

	if(typeof(exp.value) == 'string')
		return {'type':'print', 'subtype': 'string', 'text': exp.value, 'lineNumber': location().start.line}; // evaluate it, then return it       
	return {'type':'print', 'subtype': 'var', 'text': exp.text, 'lineNumber': location().start.line}; // evaluate it, then return it       
}

expression_statement = _ t:term (expression_statement)* _ nl{ // ()* gerek var mi?
 	return {'type':'expression', '#evaluation': 0, 'text':t, 'result': eval(t), 'lineNumber': location().end.line}; // evaluate it, then return it        
} 

logical_statement = _ f1:factor2 f2:(_ operator _ factor2)* _ nl
{
	var text = f1+' ';
    if(f2[0])
	    text += f2[0][1] + ' ' + f2[0][3];
        
    return {'type':'logical', 'text': text, 'lineNumber': location().end.line, 'start': location().start.column-1, 'end': location().end.column-1}; // evaluate it, then return it       
}

term = f1:factor f2:(_ ("*" / "+" / "/" / "-") _ factor)* 
{
	var text = f1+' ';
    for(var i=0; i<f2.length; i++)
	   text += ' ' + f2[i][1] + ' ' + f2[i][3];

	return text;
}
    
factor = "(" expression_statement ")" 
	   / dogru / yanlis
	   / name
       / integer 
	  

factor2 = "(" logical_statement ")" 
	   / name
       / integer

///// Name = Variable

name = l:letter i:integer {return l+i}
     / l:letter {return l;} 

dogru = 'doğru' {return true}
yanlis = 'yanlış' {return false}


letter "letter" 
  = [a-zA-Z]+ {return text()} 

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
  = "'"
  / '"'
  / "\\"
  / "b"  { return "\b"; }
  / "f"  { return "\f"; }
  / "n"  { return "\n"; }
  / "r"  { return "\r"; }
  / "t"  { return "\t"; }
  / "v"  { return "\v"; } 
  

integer "integer"
  = [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ \t\r]* {return null;}
  
nl "newline"
  = comment? [\n]* {return null;}
  
comment 
  = _ "//" _ [a-zA-Z0-9 ]* _ nl
  
operator
  = operator_text / operator_symbol
  
operator_text
  = "ve"					{ return "&&"; }
	/ "veya"				{ return "||"; }
	/ "kucuk"				{ return "<"; }
	/ "kucuk esit"			{ return "<="; }
	/ "buyuk"	 			{ return ">"; }
	/ "buyuk esit" 			{ return ">="; }
	/ "esit"				{ return "=="; }
	/ "esit degil"			{ return "!="; }  
  
operator_symbol
  = "&&"					{ return text(); }
	/ "||"					{ return text(); }
	/ "<="					{ return text(); }
	/ "<"					{ return text(); }
	/ ">="					{ return text(); }
	/ ">"					{ return text(); }
	/ "=="					{ return text(); }
	/ "!="					{ return text(); }