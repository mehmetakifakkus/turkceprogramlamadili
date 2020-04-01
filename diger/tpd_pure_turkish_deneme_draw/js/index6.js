var time = 0.5, speed = 1000;
//document.getElementById("myCanvas").height = height*60+10;


paper.install(window)    
paper.setup('canvas-1')

paper.settings.applyMatrix = false;
project.activeLayer.transform( new Matrix(1,0,0,-1, 0, view.size.height));

var values = {
	paths: 10,
	minPoints: 5,
	maxPoints: 15,
	minRadius: 10,
	maxRadius: 30
};

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
}

function processOneItem(item, topleft, downright){
    
    function myRect(item){
        var x = eval(item.vars[0].text);
        var y = eval(item.vars[1].text); 

        myShape = new Path.Rectangle([downright.x, topleft.y], [x, y]);
            myShape.style = {
                fillColor:  item.color,
                strokeColor: 'black',
                strokeWidth: 1
            };

            drawings.push(myShape)
        return myShape.strokeBounds;
    }
    
    function myCircle(item){
        var radius = eval(item.vars[0].text);
        myShape = new Path.Circle([downright.x, topleft.y + radius], radius);
            myShape.style = {
                fillColor:  item.color,
                strokeColor: 'black',
                strokeWidth: 1
            };

            drawings.push(myShape)
        return myShape.strokeBounds.height; //2*res
    }
    
    function myTriangle(item){
        var width = eval(item.vars[0].text);

        myShape = new Path.RegularPolygon({
            center: [downright.x + width/2, topleft.y + (width / 1.732) / 2],
            sides: 3,
            radius: width / 1.732
        });

        myShape.rotate(60, [downright.x + width/2, topleft.y + (width / 1.732) / 2]);
        myShape.style = {
                fillColor:  item.color,
                strokeColor: 'black',
                strokeWidth: 1
            };
        drawings.push(myShape)
        return myShape.bounds;
    }
       
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
    if(item.type == 'üste_çiz') // that means "çiz"
    {
        console.log(item)
        var myShape = new Path.Rectangle(0,0,1,1);
        
        function myModifier(it)
            {
                if(typeof it == 'string')
                    return {'type': "üste_çiz", 'shape_object': window.eval(it), 'lineNumber': item.lineNumber, 'start': item.start, 'end': item.end}
                else if((typeof it.shape))
                    return {'type': "üste_çiz", 'shape_object': it, 'lineNumber': item.lineNumber, 'start': item.start, 'end': item.end}
            }
        
        function myPro(item){
            if(Array.isArray(item)) // this array is string list
                item.forEach(element => main(myModifier(element)));

            if(item.name == "rastgele"){            
                drawLine(item.shape_object, false, "", item.shape_object.color);
            }
            if(item.name == "dikdörtgen"){
                topleft.y += myRect(item).height;
            }
            if(item.name == "daire"){
                topleft.y += myCircle(item);        
            }
            if(item.name == "üçgen"){
                topleft.y += myTriangle(item).height;
            }
            if(item.name == "boşluk")    
                topleft.y += eval(item.vars[0].text);
        }

        function main(item)
        {
            if(Array.isArray(item.shape_object))
            {
                for(var i=0; i < item.shape_object.length; i++)
                {
                    var el = item.shape_object[i];
                    if(typeof el == 'string')
                    {
                        var tmp = window.eval(el);
                        if(tmp.type == "üste_çiz" || tmp.type == "yana_çiz")
                            processOneItem(tmp) //main(tmp);
                        else
                            myPro(tmp);
                    }
                    else if((typeof el.type) && (el.type == "üste_çiz" || el.type == "yana_çiz"))
                        processOneItem(el)  //myPro(el.shape_object)
                    else if((typeof el.type) != 'undefined')
                        myPro(el)
                }
            }
            else
                myPro(item.shape_object);
        }
        main(item)
        
    }
    if(item.type == 'yana_çiz') // that means "çiz"
    {
        console.log(item)
        
        var myShape = new Path.Rectangle(0,0,1,1);
              
            function myModifier(it)
            {
                if(typeof it == 'string')
                    return {'type': "yana_çiz", 'shape_object': window.eval(it), 'lineNumber': item.lineNumber, 'start': item.start, 'end': item.end}
                else if((typeof it.shape))
                    return {'type': "yana_çiz", 'shape_object': it, 'lineNumber': item.lineNumber, 'start': item.start, 'end': item.end}
            }
        
        function myPro(item){
            if(Array.isArray(item)) // this array is string list
                item.forEach(element => main(myModifier(element)));

            if(item.name == "rastgele"){            
                drawLine(item.shape_object, false, "", item.shape_object.color);
            }
            if(item.name == "dikdörtgen"){
                downright.x += myRect(item).width;
            }
            if(item.name == "daire"){
                downright.x += myCircle(item);        
            }
            if(item.name == "üçgen"){
                downright.x += myTriangle(item).width;
            }
            if(item.name == "boşluk")    
                downright.x += eval(item.vars[0].text);
        }
        
        function main(item)
        {
            if(Array.isArray(item.shape_object))
            {
                for(var i=0; i < item.shape_object.length; i++)
                {
                    var el = item.shape_object[i];
                    if(typeof el == 'string')
                    {
                        var tmp = window.eval(el);
                        if(tmp.type == "yana_çiz" || tmp.type == "üste_çiz")
                            processOneItem(tmp)
                        else
                            myPro(tmp);
                    }
                    else if((typeof el.type) && (el.type == "yana_çiz" || el.type == "üste_çiz"))
                        processOneItem(el)  //myPro(el.shape_object)
                    else if((typeof el.type) != 'undefined')
                        myPro(el)
                }
            }
            else
                myPro(item.shape_object);
        }
        main(item)
    }
}

function recursivelyProcess(items){
    	
    console.log(new Point(2,1) + {x:1,y:2})
    
    if(items instanceof Array)
	{
		for(var i=0; i < items.length; i++)
			processOneItem(items[i],  {x:0, y:0}, {x:30, y:0});
	}
	else
		processOneItem(items, {x:30, y:0}, {x:30, y:0});
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

window.loadExample('userSend', 1);
window.refreshSpeed(300);

