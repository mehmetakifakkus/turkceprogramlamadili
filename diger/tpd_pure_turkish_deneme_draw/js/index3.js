var time = 0.5, speed = 1000;

paper.install(window)    
paper.setup('canvas-1')

paper.settings.applyMatrix = false;
project.activeLayer.transform( new Matrix(1,0,0,-1, 0, view.size.height));


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

    //console.info(line)
    //console.info(res + ' ' + color)
    
  	if(line.type == 'declaration' || line.type == 'assignment')
	{
  		//insertTextAtCursor(res, line.lineNumber, isLoop);
	}
	else if(line.type == 'logical')
 	{
		//insertTextAtCursor(res, line.lineNumber, false);
	}
	else if(line.type == 'print')
	{
		//outputConsole(res);
	}
	else if(line.type == 'expression')
	{
  		//insertTextAtCursor(res, line.lineNumber, false);
	}
	else if(line.type == "drawing")
    {
        var myShape = new Path.Rectangle(0,0,1,1);
        
        if(line.name == "rastgele")
        {            
            window.createPaths();
        }
        if(line.name == "dikdörtgen")
        {
//            myShape = new Path.Rectangle({
//                point: [shape_last_x, 70 - result2 / 2],
//                size: [res, result2]
//            });
            
            myShape = new Path.Rectangle([70 - res/2, shape_last_y], [res, result2]);
            
            shape_last_y += myShape.strokeBounds.height;
        }
        if(line.name == "daire")
        {           
            myShape = new Path.Circle([70, shape_last_y + res], res);                                                                       
            shape_last_y += myShape.strokeBounds.height; //2*res;
        }
        if(line.name == "üçgen")
        {
            myShape = new Path.RegularPolygon({
                center: [70, res / 2],
                sides: 3,
                radius: res / 1.732
            });
            
            shape_last_y += myShape.strokeBounds.height;
        }
        if(line.name == "boşluk")
            shape_last_y += res;
        
        myShape.style = {
                fillColor:  color,
                strokeColor: 'black',
                strokeWidth: 1
            };
        
        drawings.push(myShape)
    }
}

function processOneItem(item){
    
//    var item;
//    if(typeof obj.draw_type != "undefined")
//        item = obj.shape_object[0];
//    else
//        item = obj;
    
    
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
        if(item.rhs.type != 'undefined')
            window.eval(item.lhs + "=" + JSON.stringify(item.rhs));
        else{
            window.eval(item.text);
            item['#evaluation']++;

            console.log('['+ item.type + '] text:'+ item.text +' line '+item.lineNumber +' is getting processed, result is: '+ eval(item.lhs));

            if(item.up == 'while')
                drawLine(item, true, eval(item.lhs));
            else
                drawLine(item, false, eval(item.lhs));
        }

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
    if(item.type == 'çiz') // that means "çiz"
    {
        //console.log(item.shape_object[0])
        
        if(typeof item.shape_object == "string")
        {
            var dd = window.eval(item.shape_object);
            //console.log(dd)
            drawLine(dd, false, eval(dd.vars[0].text), "", dd.color);
            return;
        }
        else{
//            console.log(typeof item.shape_object)
//            return
        }
        
        if(item.shape_object.shape.name == "rastgele")
        {            
            drawLine(item.shape_object, false, "", item.shape_object.color);
        }
        if(item.shape_object.shape.name == "dikdörtgen")
        {
            //console.log('['+ item.type + '] shape:'+ item.shape +' line '+item.lineNumber +' is getting processed, result1 is: '+ eval(item.vars[0].text) + ', result2 is: '+ eval(item.vars[1].text));
            
            drawLine(item.shape_object.shape, false, eval(item.shape_object.shape.vars[0].text), eval(item.shape_object.shape.vars[1].text), item.shape_object.shape.color);
        }
        if(item.shape_object.shape.name == "daire")
        {
            drawLine(item.shape_object.shape, false, eval(item.shape_object.shape.vars[0].text), "", item.shape_object.shape.color);
        }
        if(item.shape_object.shape == "üçgen")
        {
            drawLine(item.shape_object, false, eval(item.shape_object.vars[0].text), "", item.shape_object.color);
        }
        if(item.shape_object.shape.name == "boşluk")
        {       
            drawLine(item.shape_object.shape, false, eval(item.shape_object.shape.vars[0].text), "", "");
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

window.parse = function() {

	temizle();

	try{
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
    
    //console.info(drawings.length)
    
    shape_last_x = 7;
    shape_last_y = 2;
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

window.loadExample('userSend', 5);
window.refreshSpeed(100);

