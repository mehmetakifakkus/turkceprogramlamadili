// Hata satiri ayiklayicisi
// 
// Accepts expressions like 
// Line 1, column 23: Expected ")", "*", "+", "-", or "/" but "p" found.

// ReferenceError: a is not defined
// ReferenceError: no is not defined

start 
 = errorLineExpected
 / referenceError 


errorLineExpected 
 = 'Line ' line:Integer ',' _ 'column ' col:Integer ': Expected ' StringList _ 'or' _ String  _ 'but' _ errorChar:String _ 'found.' {
    return 'Satır '+line+ ', sıra '+col + ': Hatalı karakter: '+errorChar.value;
 }

referenceError
 = _ errorName:name _ 'is not defined' _ 
{
	return 'Hey! \''+errorName + '\' maalesef tanımlı değil.'
}


///// Name = Variable

name = l:letter i:Integer {return l+i}
     / l:letter {return l;} 

dogru = 'doğru' {return true;}
yanlis = 'yanlış' {return false;}


letter "letter" 
  = [a-zA-Z_|ş|ğ|ç|ö|ü|ı|ü]+ {return text()} 



/////  String

StringList = (String ', ')*

String "string"
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

Integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ \t\n\r]*
              