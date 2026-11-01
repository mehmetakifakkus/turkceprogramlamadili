/*
*
*	#######################      	Çalıştırıcı      #######################
*
*	Ayrıştırıcının ürettiği düğümleri JavaScript koduna çevirip çalıştırır ve
*	her adımı (atama, yazdırma, koşul, ifade) bir "olay" olarak kaydeder.
*	Arayüz bu olayları istediği hızda ya da adım adım oynatır.
*
*	Kod yalıtılmış bir kapsamda çalışır: kullanıcının değişkenleri sayfanın
*	global değişkenleriyle karışmaz, tanımlanmamış bir değişken okunursa
*	Türkçe bir hata verilir. Sonsuz döngüye karşı olay sayısı sınırlıdır.
*/

var AZAMI_OLAY = 10000;

// Değeri konsolda ve hafıza kutularında gösterilecek metne çevirir
function degerMetni(deger){
	if(typeof deger == 'boolean') return deger ? 'doğru' : 'yanlış';
	if(deger === undefined) return 'tanımsız';
	return String(deger);
}

function programiCalistir(program){

	var dugumler = [];
	function govde(x){
		if(x === null || x === undefined) return [];
		return x instanceof Array ? x : [x];
	}

	/* ---------- Düğümleri JavaScript koduna çevir ---------- */

	function kod(liste){
		return govde(liste).map(komut).join('\n');
	}
	function komut(d){
		var n = dugumler.push(d) - 1;
		var satir = '__t.s(' + d.lineNumber + ');';
		switch(d.type){
			case 'declaration':
			case 'assignment':
				return satir + '__t.ata(' + n + ', ' + d.lhs + ' = (' + d.rhs + '));';
			case 'print':
				return satir + '__t.yaz(' + n + ', [' + d.list.map(function(oge){
					return oge.subtype == 'var' ? '(' + oge.text + ')' : JSON.stringify(oge.text);
				}).join(', ') + ']);';
			case 'expression':
				return satir + '__t.ifade(' + n + ', (' + d.text + '));';
			case 'logical':
				var kosul = '__t.kosul(' + n + ', (' + d.text + '))';
				if(d.mainType == 'if')
					return satir + 'if (' + kosul + ') {\n' + kod(d.truePart) + '\n} else {\n' + kod(d.falsePart) + '\n}';
				if(d.mainType == 'while')
					return 'while (' + satir.slice(0, -1) + ', ' + kosul + ') {\n' + kod(d.statements) + '\n}';
				if(d.mainType == 'for')
					return komut(d.initialize) + '\nwhile (' + satir.slice(0, -1) + ', ' + kosul + ') {\n' +
						kod(d.statements) + '\n' + komut(d.increment) + '\n}';
				return satir + '__t.ifade(' + n + ', (' + d.text + '));';
			default:
				return '';	// yorum, boş komut
		}
	}

	/* ---------- Çalıştır ve olayları kaydet ---------- */

	var degerler = {}, sira = [], olaylar = [], suankiSatir = 0, turlar = {};
	var COK_UZUN = {};

	function TanimsizHata(ad){ this.ad = ad; }

	function olay(o){
		o.degiskenler = {};
		for(var ad in degerler) o.degiskenler[ad] = degerler[ad];
		o.sira = sira.slice();
		olaylar.push(o);
		if(olaylar.length >= AZAMI_OLAY) throw COK_UZUN;
	}

	var yardimci = {
		s: function(satir){ suankiSatir = satir; },
		ata: function(n, deger){
			var d = dugumler[n];
			olay({tur: 'atama', satir: d.lineNumber, ad: d.lhs, deger: deger});
		},
		yaz: function(n, parcalar){
			olay({tur: 'yaz', satir: dugumler[n].lineNumber, metin: parcalar.map(degerMetni).join('')});
		},
		ifade: function(n, deger){
			var d = dugumler[n];
			olay({tur: 'ifade', satir: d.lineNumber, start: d.start, end: d.end, deger: deger});
		},
		kosul: function(n, deger){
			var d = dugumler[n], sonuc = !!deger, kacinci = 0;
			if(d.mainType == 'while' || d.mainType == 'for'){
				if(sonuc) kacinci = turlar[n] = (turlar[n] || 0) + 1;
				else { kacinci = turlar[n] || 0; turlar[n] = 0; }
			}
			olay({tur: 'kosul', satir: d.lineNumber, start: d.start, end: d.end, sonuc: sonuc,
				anaTur: d.mainType, degilseVar: !!d.falsePart, kacinci: kacinci});
			return sonuc;
		}
	};

	// Kullanıcı kodundaki her ad bu nesnede aranır (Math ve yardımcı nesne hariç)
	var kapsam = new Proxy(degerler, {
		has: function(hedef, ad){ return typeof ad == 'string' && ad != 'Math' && ad != '__t'; },
		get: function(hedef, ad){
			if(typeof ad != 'string') return undefined;
			if(!Object.prototype.hasOwnProperty.call(degerler, ad)) throw new TanimsizHata(ad);
			return degerler[ad];
		},
		set: function(hedef, ad, deger){
			if(!Object.prototype.hasOwnProperty.call(degerler, ad)) sira.push(ad);
			degerler[ad] = deger;
			return true;
		}
	});

	var hata = null;
	try {
		var calistir = new Function('__k', '__t', 'with (__k) {\n' + kod(program) + '\n}');
		calistir(kapsam, yardimci);
	} catch(e) {
		if(e === COK_UZUN)
			hata = {satir: suankiSatir, uzun: true,
				mesaj: 'Program ' + AZAMI_OLAY + ' adımda bitmedi. Sonsuz bir döngü olabilir: döngü koşulunun bir gün yanlış olduğundan emin ol.'};
		else if(e instanceof TanimsizHata)
			hata = {satir: suankiSatir, mesaj: "'" + e.ad + "' tanımlı değil. Önce 'değişken " + e.ad + " = ...' ile tanımlamayı unutma."};
		else if(e instanceof SyntaxError)
			hata = {satir: suankiSatir, mesaj: 'Kod çalıştırılamadı. Değişken adlarından biri kullanılamayan bir kelime olabilir (' + e.message + ').'};
		else
			hata = {satir: suankiSatir, mesaj: 'Çalışırken bir hata oluştu: ' + (e && e.message)};
	}

	return {olaylar: olaylar, hata: hata};
}
