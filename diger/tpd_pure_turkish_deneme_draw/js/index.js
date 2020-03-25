var time = 0.5, speed = 1000;
// matrix: new Matrix(1,0,0,-1, 200, 250) // gerekirse eklenecek

paper.install(window)    
paper.setup('canvas-1')

var scene_height = view.size.height;
var shape_last_x = 7;
var shape_last_y = 0;
var drawings = [];

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

function drawLine(line, isLoop, result, result2, color){
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
	else if(line.type == "drawing")
    {
        highlightLine(line);
        var myShape;
        
        if(line.shape == "rastgele")
        {            
            window.createPaths();
        }
        if(line.shape == "dikdörtgen")
        {
//            myShape = new Path.Rectangle({
//                point: [shape_last_x, 70 - result2 / 2],
//                size: [res, result2]
//            });
            
            myShape = new Path.Rectangle([shape_last_x, 70 - result2 / 2], [res, result2]);
            
            shape_last_x += myShape.bounds.width;
        }
        if(line.shape == "daire")
        {           
            myShape = new Path.Circle([shape_last_x + res, 70], res);
                                                                                                  
            shape_last_x += 2*res;
        }
        if(line.shape == "üçgen")
        {
            myShape = new Path.RegularPolygon({
                center: [shape_last_x + res / 2, 70],
                sides: 3,
                radius: res / 1.732
            });
            
            shape_last_x += myShape.bounds.width;
        }
        if(line.shape == "boşluk")
            shape_last_x += res;
        
        myShape.style = {
                fillColor:  color,
                strokeColor: 'black',
                strokeWidth: 1
            };
        
        drawings.push(myShape)
    }
    else{
		var result = window.eval(line.text);
		highlightLine(line);
  		insertTextAtCursor(result, line.lineNumber, false);
	}
   }, speed * time)

time++;
}


function processOneItem(obj){
    
    var item;
    if(typeof obj.draw_type != "undefined")
        item = obj.shape_object[0];
    else
        item = obj;
    
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
    if(item.type == 'drawing')
    {
        //console.log(item)
        if(item.shape == "rastgele")
        {            
            drawLine(item, false, "", item.color);
        }
        if(item.shape == "dikdörtgen")
        {
            //console.log('['+ item.type + '] shape:'+ item.shape +' line '+item.lineNumber +' is getting processed, result1 is: '+ eval(item.vars[0].text) + ', result2 is: '+ eval(item.vars[1].text));
            
            drawLine(item, false, eval(item.vars[0].text), eval(item.vars[1].text), item.color);
        }
        if(item.shape == "daire")
        {
            drawLine(item, false, eval(item.vars[0].text), "", item.color);
        }
        if(item.shape == "üçgen")
        {
            drawLine(item, false, eval(item.vars[0].text), "", item.color);
        }
        if(item.shape == "boşluk")
        {       
            drawLine(item, false, eval(item.vars[0].text), "", "");
        }
        
    }
}

function recursivelyProcess(items){
    	
    if(items instanceof Array)
	{
		for(var i=0; i < items.length; i++)
			processOneItem(items[i]);
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
    	insertNewLines(editor.lineCount()+3);
    	var text = editor.getValue();

        result = parser.parse(text);
    	//document.getElementById("result").textContent = JSON.stringify(result, null, 2);

        console.log(result)

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
	saveAs(blob, "benimResmim.txt");
}

window.loadExample = function(from, no){
	temizle();
	document.getElementById('code-description').innerHTML = eval(from+'['+no+'].name');
	editor.setValue(eval(from+'['+no+'].code'));
}

window.refreshSpeed = function(value){
	speed = 1000 / value;
}

window.trashImageArea = function(){
    var len = drawings.length;
    
    for(var i = 0; i < len; i++)
		drawings[i].remove(); // remove drawings
    
    console.info(drawings.length)
    
    shape_last_x = 7;
    view.update();
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

window.loadExample('userSend', 0);
window.refreshSpeed(100);

