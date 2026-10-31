
function translatePython(items, level){

	//debugger
	var resultText = '';

	items.forEach(function(el){
		if(el.type == 'logical')
		{
			if(el.mainType == 'if')
			{
				resultText += 'if(' + el.text + '):\n';

				if(el.truePart)
					resultText += translatePython([el.truePart], level+1)
				if(el.falsePart)
				{
					//debugger
					if(el.falsePart.mainType == 'if')
					{
						resultText += 'el';
						resultText += translatePython([el.falsePart], level)
					}
					else
					{
						resultText += 'else:\n';
						resultText += translatePython([el.falsePart], level+1)
					}
				}
				resultText += '\n';
			}
			else if(el.mainType == 'while')
			{
//				while(eval(item.text)){
//					drawLine(item, false, eval(item.text));
//
//					if(eval(item.text))
//						recursivelyProcess(item.statements)
//				}
//				drawLine(item, false, eval(item.text));
			}
			else if(el.mainType == 'for')
			{
//				while(eval(item.text)){
//					if(eval(item.text))
//						recursivelyProcess(items.slice(1))
//					drawLine(item, eval(item.text));
//				}
//				drawLine(item, eval(item.text));
			}
//			else
//				drawLine(item, false, eval(item.text));
		}
		if(el.type == 'declaration' || el.type == 'assignment')
		{
			resultText += el.lhs + ' = '+el.rhs;
		}
		if(el.type == 'expression')
		{
			resultText += el.lhs + ' = '+el.rhs;

//			window.eval(item.text);
//			item['#evaluation']++;
//
//			console.log('['+ item.type + '] text:'+ item.text +' line '+item.lineNumber +' is getting processed, result is: '+ eval(item.text));
//
//			if(item.up == 'while')
//				drawLine(item, true, eval(item.text));
//			else
//				drawLine(item, false, eval(item.text));
			console.error(el.text)
		}
		if(el.type == 'print')
		{
			var resu = '';
			var tabSpace = '';

			for(var i=0; i < el.list.length-1; i++)
			{
				resu += el.list[i].subtype == 'var' ? el.list[i].text : '\"'+el.list[i].text + '\"';
				resu += ',';
			}
			resu += el.list[i].subtype == 'var' ? el.list[i].text : '\"'+el.list[i].text + '\"';


			for(var i=0; i<level;i++)
				tabSpace += '\t';

			resultText += tabSpace + 'print ' + resu + '\n';
			//drawLine(item, false, resu);
		}
	});
	return resultText;
}

/*
*
*	#######################      	C Çevirisi      #######################
*
*	Ayrıştırıcının ürettiği düğümlerden C kodu üretir. Düğümlerdeki ifadeler
*	JavaScript metni olarak tutulur; burada küçük bir ifade ayrıştırıcısıyla
*	ağaca çevrilir, böylece her ifadenin C türü bilinir (bölme, mod ve printf
*	biçimleri buna göre seçilir). Değişkenlerin türü, programın yalıtılmış bir
*	kopyası adım sınırıyla çalıştırılıp aldığı değerlere bakılarak bulunur.
*/

var C_AYRILMIS = ['auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do',
	'double', 'else', 'enum', 'extern', 'float', 'for', 'goto', 'if', 'inline', 'int', 'long',
	'register', 'restrict', 'return', 'short', 'signed', 'sizeof', 'static', 'struct', 'switch',
	'typedef', 'union', 'unsigned', 'void', 'volatile', 'while', 'bool', 'true', 'false', 'main',
	'printf', 'sqrt', 'pow', 'floor', 'ceil', 'fabs', 'fmod', 'abs', 'llabs', 'NULL'];

var C_HARFLER = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u', 'â': 'a', 'î': 'i', 'û': 'u',
	'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U', 'Â': 'A', 'Î': 'I', 'Û': 'U' };

function translateCHelper(items, level){
	// Çeviri hatası programın çalışmasını engellemesin
	try {
		return cCevir(items);
	} catch(e) {
		return '// Bu kod C diline çevrilemedi.\n// ' + e.message + '\n';
	}
}

function cCevir(program){

	var ekler = {stdbool: false, math: false, stdlib: false};

	function govde(x){
		if(x === null || x === undefined) return [];
		return x instanceof Array ? x : [x];
	}

	/* ---------- JavaScript ifade metni -> ağaç ---------- */

	var agacOnbellek = {};
	function ifadeAgaci(metin){
		if(agacOnbellek.hasOwnProperty(metin)) return agacOnbellek[metin];

		var tokenlar = metin.match(/Math\.[a-z]+|"(?:\\.|[^"\\])*"|[0-9]+(?:\.[0-9]*)?|[A-Za-z_çğıöşüâîûÇĞİÖŞÜÂÎÛ][A-Za-z0-9_çğıöşüâîûÇĞİÖŞÜÂÎÛ]*|&&|\|\||[=!<>]=|[-+*\/%<>!(),]/g) || [];
		var konum = 0;
		function bak(){ return tokenlar[konum]; }
		function al(){
			if(konum >= tokenlar.length) throw new Error('C çevirisi: ifade eksik: ' + metin);
			return tokenlar[konum++];
		}
		function ikili(altKural, operatorler){
			return function(){
				var sol = altKural();
				while(operatorler.indexOf(bak()) >= 0){
					var op = al();
					sol = {tur: 'ikili', op: op, sol: sol, sag: altKural()};
				}
				return sol;
			};
		}
		function tekli(){
			if(bak() == '-' || bak() == '!'){
				var op = al();
				return {tur: 'tekli', op: op, ic: tekli()};
			}
			return birincil();
		}
		var carpim = ikili(tekli, ['*', '/', '%']);
		var toplam = ikili(carpim, ['+', '-']);
		var karsilastirma = ikili(toplam, ['<', '<=', '>', '>=', '==', '!=']);
		var ve = ikili(karsilastirma, ['&&']);
		var veya = ikili(ve, ['||']);

		function birincil(){
			var t = al();
			if(t == '('){
				var ic = veya();
				al();	// ')'
				return {tur: 'grup', ic: ic};
			}
			if(/^Math\./.test(t)){
				al();	// '('
				var argumanlar = [veya()];
				while(bak() == ','){ al(); argumanlar.push(veya()); }
				al();	// ')'
				return {tur: 'cagri', ad: t.slice(5), arg: argumanlar};
			}
			if(t.charAt(0) == '"') return {tur: 'metin', deger: t};
			if(/^[0-9]/.test(t)) return {tur: 'sayi', deger: t};
			if(t == 'true' || t == 'false') return {tur: 'mantiksal', deger: t};
			return {tur: 'degisken', ad: t};
		}

		var agac = veya();
		if(konum != tokenlar.length) throw new Error('C çevirisi: ifade anlaşılamadı: ' + metin);
		return agacOnbellek[metin] = agac;
	}

	function agactakiAdlar(agac, liste){
		if(agac.tur == 'degisken') liste.push(agac.ad);
		if(agac.ic) agactakiAdlar(agac.ic, liste);
		if(agac.sol) { agactakiAdlar(agac.sol, liste); agactakiAdlar(agac.sag, liste); }
		if(agac.arg) agac.arg.forEach(function(a){ agactakiAdlar(a, liste); });
		return liste;
	}

	/* ---------- Değişkenlerin kullanıldığı yerler ---------- */

	// Her değişkenin geçtiği düğümler, program sırasıyla
	var gecisler = {}, sira = [];
	function gecis(ad, dugum){
		if(!gecisler[ad]) { gecisler[ad] = []; sira.push(ad); }
		gecisler[ad].push(dugum);
	}
	function ifadeGecisleri(metin, dugum){
		agactakiAdlar(ifadeAgaci(metin), []).forEach(function(ad){ gecis(ad, dugum); });
	}
	function gecisleriTopla(dugum){
		switch(dugum.type){
			case 'declaration':
			case 'assignment':
				ifadeGecisleri(dugum.rhs, dugum);
				gecis(dugum.lhs, dugum);
				break;
			case 'print':
				dugum.list.forEach(function(oge){ if(oge.subtype == 'var') ifadeGecisleri(oge.text, dugum); });
				break;
			case 'expression':
				ifadeGecisleri(dugum.text, dugum);
				break;
			case 'logical':
				if(dugum.mainType == 'for'){
					gecisleriTopla(dugum.initialize);
					ifadeGecisleri(dugum.text, dugum);
					govde(dugum.statements).forEach(gecisleriTopla);
					gecisleriTopla(dugum.increment);
				}
				else {
					ifadeGecisleri(dugum.text, dugum);
					govde(dugum.truePart).forEach(gecisleriTopla);
					govde(dugum.falsePart).forEach(gecisleriTopla);
					govde(dugum.statements).forEach(gecisleriTopla);
				}
				break;
		}
	}
	program.forEach(gecisleriTopla);

	function altDugumler(dugum, liste){
		liste.push(dugum);
		if(dugum.initialize) { altDugumler(dugum.initialize, liste); altDugumler(dugum.increment, liste); }
		govde(dugum.truePart).concat(govde(dugum.falsePart), govde(dugum.statements)).forEach(function(d){ altDugumler(d, liste); });
		return liste;
	}

	// Değişkenin tanımlandığı düğüm. Bulunamazsa main'in başında tanımlanır.
	// - En üst seviyedeki ilk 'değişken' satırında
	// - sayarakYinele'nin ilk kısmında, değişken yalnızca o döngüde kullanılıyorsa
	var tanimDugumu = {};
	program.forEach(function(dugum){
		if(dugum.type == 'declaration' && gecisler[dugum.lhs][0] === dugum)
			tanimDugumu[dugum.lhs] = dugum;
	});
	program.forEach(function bul(dugum){
		if(dugum.mainType == 'for'){
			var ad = dugum.initialize.lhs, icerik = altDugumler(dugum, []);
			if(gecisler[ad][0] === dugum.initialize && gecisler[ad].every(function(d){ return icerik.indexOf(d) >= 0; }))
				tanimDugumu[ad] = dugum.initialize;
		}
		govde(dugum.truePart).concat(govde(dugum.falsePart), govde(dugum.statements)).forEach(bul);
	});

	/* ---------- C adları ---------- */

	var cAdlari = {}, kullanilan = {};
	sira.forEach(function(ad){
		var c = ad.replace(/[çğıöşüâîûÇĞİÖŞÜÂÎÛ]/g, function(h){ return C_HARFLER[h]; });
		if(C_AYRILMIS.indexOf(c) >= 0) c += '_';
		var aday = c, n = 2;
		while(kullanilan[aday]) aday = c + '_' + n++;
		kullanilan[aday] = true;
		cAdlari[ad] = aday;
	});

	/* ---------- Değişken türleri: programı yalıtılmış olarak çalıştır ---------- */

	function degerTuru(v){
		if(typeof v == 'string') return 'metin';
		if(typeof v == 'boolean') return 'bool';
		if(typeof v != 'number' || !isFinite(v) || v % 1 !== 0) return 'double';
		if(Math.abs(v) <= 2147483647) return 'int';
		if(Math.abs(v) <= 9007199254740991) return 'long';
		return 'double';
	}
	var SAYISAL_SIRA = ['bool', 'int', 'long', 'double'];
	function birlestir(a, b){
		if(!a) return b;
		if(!b || a == b) return a;
		if(a == 'metin' || b == 'metin') return 'metin';
		return SAYISAL_SIRA.indexOf(a) > SAYISAL_SIRA.indexOf(b) ? a : b;
	}

	var degiskenTuru = {};
	function jsKod(dugumler){
		return dugumler.map(function(d){
			switch(d.type){
				case 'declaration':
				case 'assignment':
					return d.lhs + ' = (' + d.rhs + '); __kaydet(' + JSON.stringify(d.lhs) + ', ' + d.lhs + ');';
				case 'logical':
					if(d.mainType == 'if')
						return 'if (' + d.text + ') {' + jsKod(govde(d.truePart)) + '} else {' + jsKod(govde(d.falsePart)) + '}';
					if(d.mainType == 'while')
						return 'while (' + d.text + ') { __adim(); ' + jsKod(govde(d.statements)) + '}';
					if(d.mainType == 'for')
						return jsKod([d.initialize]) + ' while (' + d.text + ') { __adim(); ' + jsKod(govde(d.statements)) + jsKod([d.increment]) + '}';
					return '';
				default:
					return '';
			}
		}).join('\n');
	}
	try {
		var adim = 0, DUR = {};
		var calistir = new Function('__kaydet', '__adim',
			(sira.length ? 'var ' + sira.join(', ') + ';\n' : '') + jsKod(program));
		calistir(
			function(ad, deger){ degiskenTuru[ad] = birlestir(degiskenTuru[ad], degerTuru(deger)); },
			function(){ if(++adim > 100000) throw DUR; });
	} catch(e) {
		// Sonsuz döngü, tanımsız değişken vb.: o ana kadar görülen türler kullanılır
	}

	/* ---------- İfadeleri C'ye çevir ---------- */

	function sayisal(tur){ return tur == 'bool' ? 'int' : tur; }

	function cIfade(agac){
		var x, sol, sag;
		switch(agac.tur){
			case 'sayi':
				if(agac.deger.indexOf('.') >= 0)
					return {c: agac.deger.replace(/\.$/, '.0'), tur: 'double'};
				x = degerTuru(Number(agac.deger));
				return {c: agac.deger + (x == 'long' ? 'LL' : ''), tur: x};
			case 'metin':
				return {c: agac.deger, tur: 'metin'};
			case 'mantiksal':
				ekler.stdbool = true;
				return {c: agac.deger, tur: 'bool'};
			case 'degisken':
				return {c: cAdlari[agac.ad] || agac.ad, tur: degiskenTuru[agac.ad] || 'int'};
			case 'grup':
				x = cIfade(agac.ic);
				return {c: '(' + x.c + ')', tur: x.tur};
			case 'tekli':
				x = cIfade(agac.ic);
				if(agac.op == '!') return {c: '!' + x.c, tur: 'bool'};
				return {c: '-' + x.c, tur: sayisal(x.tur)};
			case 'cagri':
				var argumanlar = agac.arg.map(cIfade);
				var cArg = argumanlar.map(function(a){ return a.c; }).join(', ');
				if(agac.ad == 'abs'){
					x = sayisal(argumanlar[0].tur);
					if(x == 'int') { ekler.stdlib = true; return {c: 'abs(' + cArg + ')', tur: 'int'}; }
					if(x == 'long') { ekler.stdlib = true; return {c: 'llabs(' + cArg + ')', tur: 'long'}; }
					ekler.math = true;
					return {c: 'fabs(' + cArg + ')', tur: 'double'};
				}
				ekler.math = true;	// sqrt, pow, floor, ceil
				return {c: agac.ad + '(' + cArg + ')', tur: 'double'};
			case 'ikili':
				sol = cIfade(agac.sol);
				sag = cIfade(agac.sag);
				var op = agac.op;
				if(op == '&&' || op == '||'){
					// a || b && c  ->  a || (b && c): anlam aynı, derleyici uyarısı yok
					if(op == '||'){
						if(agac.sol.tur == 'ikili' && agac.sol.op == '&&') sol.c = '(' + sol.c + ')';
						if(agac.sag.tur == 'ikili' && agac.sag.op == '&&') sag.c = '(' + sag.c + ')';
					}
					return {c: sol.c + ' ' + op + ' ' + sag.c, tur: 'bool'};
				}
				if(['<', '<=', '>', '>=', '==', '!='].indexOf(op) >= 0)
					return {c: sol.c + ' ' + op + ' ' + sag.c, tur: 'bool'};
				var tur = birlestir(sayisal(sol.tur), sayisal(sag.tur));
				if(op == '/'){
					// JavaScript'te bölme her zaman kesirlidir; C'de iki tam sayının bölümü kesirli kısmı atar
					if(tur != 'double')
						sag.c = (agac.sag.tur == 'sayi') ? sag.c.replace(/LL$/, '') + '.0' : '(double)' + sag.c;
					return {c: sol.c + ' / ' + sag.c, tur: 'double'};
				}
				if(op == '%' && tur == 'double'){
					ekler.math = true;
					return {c: 'fmod(' + sol.c + ', ' + sag.c + ')', tur: 'double'};
				}
				return {c: sol.c + ' ' + op + ' ' + sag.c, tur: tur};
		}
		throw new Error('C çevirisi: bilinmeyen ifade');
	}
	function cMetin(metin){ return cIfade(ifadeAgaci(metin)); }

	// Hiç çalışmamış (ör. hiç girilmeyen bir daldaki) değişkenlerin türü atandıkları ifadeden çıkarılır
	program.forEach(function(dugum){
		altDugumler(dugum, []).forEach(function(d){
			if((d.type == 'declaration' || d.type == 'assignment') && !degiskenTuru[d.lhs])
				degiskenTuru[d.lhs] = cMetin(d.rhs).tur;
		});
	});

	function tipOnEki(ad){
		var tur = degiskenTuru[ad] || 'int';
		if(tur == 'bool') ekler.stdbool = true;
		return {int: 'int ', long: 'long long ', double: 'double ', bool: 'bool ', metin: 'char *'}[tur];
	}

	/* ---------- Komutları C'ye çevir ---------- */

	var satirlar = [];
	function yaz(girinti, metin){
		satirlar.push(new Array(girinti + 1).join('    ') + metin);
	}

	function atama(dugum){
		return (tanimDugumu[dugum.lhs] === dugum ? tipOnEki(dugum.lhs) : '') + cAdlari[dugum.lhs] + ' = ' + cMetin(dugum.rhs).c;
	}

	function printfMetni(metin){
		return metin.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/%/g, '%%')
			.replace(/\n/g, '\\n').replace(/\t/g, '\\t').replace(/\r/g, '\\r');
	}

	function komut(dugum, girinti){
		switch(dugum.type){
			case 'declaration':
			case 'assignment':
				yaz(girinti, atama(dugum) + ';');
				break;
			case 'print':
				var bicim = '', argumanlar = [];
				dugum.list.forEach(function(oge){
					if(oge.subtype != 'var') { bicim += printfMetni(oge.text); return; }
					var x = cMetin(oge.text);
					if(x.tur == 'bool') { bicim += '%s'; argumanlar.push(x.c + ' ? "true" : "false"'); }
					else { bicim += {int: '%d', long: '%lld', double: '%g', metin: '%s'}[x.tur]; argumanlar.push(x.c); }
				});
				yaz(girinti, 'printf("' + bicim + '\\n"' + argumanlar.map(function(a){ return ', ' + a; }).join('') + ');');
				break;
			case 'expression':
				yaz(girinti, cMetin(dugum.text).c + ';');
				break;
			case 'comment':
				yaz(girinti, '// ' + dugum.value);
				break;
			case 'logical':
				if(dugum.mainType == 'if'){
					yaz(girinti, 'if (' + cMetin(dugum.text).c + ') {');
					blok(dugum.truePart, girinti + 1);
					var degilse = dugum.falsePart;
					while(degilse && !(degilse instanceof Array) && degilse.mainType == 'if'){
						yaz(girinti, '} else if (' + cMetin(degilse.text).c + ') {');
						blok(degilse.truePart, girinti + 1);
						degilse = degilse.falsePart;
					}
					if(degilse){
						yaz(girinti, '} else {');
						blok(degilse, girinti + 1);
					}
					yaz(girinti, '}');
				}
				else if(dugum.mainType == 'while'){
					yaz(girinti, 'while (' + cMetin(dugum.text).c + ') {');
					blok(dugum.statements, girinti + 1);
					yaz(girinti, '}');
				}
				else if(dugum.mainType == 'for'){
					yaz(girinti, 'for (' + atama(dugum.initialize) + '; ' + cMetin(dugum.text).c + '; ' + atama(dugum.increment) + ') {');
					blok(dugum.statements, girinti + 1);
					yaz(girinti, '}');
				}
				else
					yaz(girinti, cMetin(dugum.text).c + ';');
				break;
		}
	}
	function blok(dugumler, girinti){
		govde(dugumler).forEach(function(d){ komut(d, girinti); });
	}

	// main'in başında tanımlanacak değişkenler
	sira.forEach(function(ad){
		if(!tanimDugumu[ad]) yaz(1, tipOnEki(ad) + cAdlari[ad] + ';');
	});
	if(satirlar.length) satirlar.push('');
	blok(program, 1);

	var basliklar = ['#include <stdio.h>'];
	if(ekler.stdbool) basliklar.push('#include <stdbool.h>');
	if(ekler.stdlib) basliklar.push('#include <stdlib.h>');
	if(ekler.math) basliklar.push('#include <math.h>');

	return basliklar.join('\n') + '\n\nint main() {\n' + satirlar.join('\n') + '\n\n    return 0;\n}\n';
}
