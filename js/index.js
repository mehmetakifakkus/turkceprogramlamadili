/*
*
*	#######################      	Kodlama Sayfası      #######################
*
*	Örneklerin yüklenmesi, programın çalıştırılıp adım adım gösterilmesi,
*	hafıza kutuları, koşul açıklamaları ve tema.
*/

var parser;

// Sürüm etiketi: dosyalar değiştiğinde tarayıcı önbellekteki eski kopyayı kullanmasın
// (index.html içindeki ?v= değerleriyle birlikte güncellenmeli)
var SURUM = '20261102';

$.get("grammer.pegjs?v=" + SURUM, function(response) {
	parser = PEG.buildParser(response);
	ceviriyiGuncelle();
	durumYaz('Hazır', '');
});

function el(id){ return document.getElementById(id); }
function kacir(metin){
	return String(metin).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ---------- Tema ---------- */

function temaUygula(tema){
	if(tema == 'gece') document.documentElement.setAttribute('data-tema', 'gece');
	else document.documentElement.removeAttribute('data-tema');
	el('temaDugmesi').textContent = tema == 'gece' ? '☀︎' : '☾';
	el('temaDugmesi').title = tema == 'gece' ? 'Gündüz modu' : 'Gece modu';
	el('temaDugmesi').setAttribute('aria-label', el('temaDugmesi').title);
}
el('temaDugmesi').onclick = function(){
	var tema = document.documentElement.getAttribute('data-tema') == 'gece' ? 'gunduz' : 'gece';
	try { localStorage.setItem('tema', tema); } catch(e) {}
	temaUygula(tema);
};
temaUygula(document.documentElement.getAttribute('data-tema') == 'gece' ? 'gece' : 'gunduz');

/* ---------- Örnekler ---------- */

function kategoriListesi(dizi, ilk, tersten){
	var liste = [];
	for(var i = ilk; i < dizi.length; i++) liste.push(dizi[i]);
	return tersten ? liste.reverse() : liste;
}

var KATEGORILER = [
	{kod: 'baslangic', ad: 'Başlangıç seviye', ornekler: kategoriListesi(beginner, 1)},
	{kod: 'orta', ad: 'Orta seviye', ornekler: kategoriListesi(ortaSeviye, 0)},
	{kod: 'ileri', ad: 'İleri seviye', ornekler: kategoriListesi(ileriSeviye, 0)},
	{kod: 'kullanici', ad: 'Kullanıcıların gönderdikleri', ornekler: kategoriListesi(userSend, 0, true)}
];
var secili = {kategori: 1, sira: 2};

function ornegiYukle(k, s, adresiGuncelle){
	var kategori = KATEGORILER[k], ornek = kategori.ornekler[s];
	secili = {kategori: k, sira: s};

	el('ornekKategori').textContent = kategori.ad;
	el('ornekAdi').textContent = ornek.name;
	el('ornekSira').textContent = (s + 1) + ' / ' + kategori.ornekler.length;
	el('ornekSira').hidden = false;
	el('gorevBaslik').textContent = ornek.name;

	var aciklama = (ornek.description || '').replace(/(\s*<br\s*\/?>\s*)+$/i, '').trim();
	el('gorevMetni').innerHTML = (aciklama && aciklama != '-') ? aciklama : 'Kodu incele, çalıştır ve her satırın ne yaptığını izle.';
	el('gorevKisi').textContent = ornek.username ? ornek.username + ' gönderdi · ' + ornek.date : '';
	el('gorevKisi').hidden = !ornek.username;

	editor.setValue(ornek.code);
	editor.clearHistory();
	bastan();

	if(adresiGuncelle !== false && history.replaceState)
		history.replaceState(null, '', '#' + kategori.kod + '-' + (s + 1));
}

function komsuOrnek(yon){
	var k = secili.kategori, s = secili.sira + yon;
	if(s < 0) { k = (k + KATEGORILER.length - 1) % KATEGORILER.length; s = KATEGORILER[k].ornekler.length - 1; }
	if(s >= KATEGORILER[k].ornekler.length) { k = (k + 1) % KATEGORILER.length; s = 0; }
	ornegiYukle(k, s);
}
el('oncekiOrnek').onclick = function(){ komsuOrnek(-1); };
el('sonrakiOrnek').onclick = function(){ komsuOrnek(1); };

// Rehberdeki "Kodlama sayfasında dene" düğmeleri kodu adresle gönderir: #kod=...
function adrestenKod(){
	if(location.hash.indexOf('#kod=') != 0) return null;
	try { return decodeURIComponent(location.hash.slice(5)); } catch(e) { return null; }
}

function rehberKodunuYukle(kod){
	el('ornekKategori').textContent = 'Rehber';
	el('ornekAdi').textContent = 'Rehberden gelen örnek';
	el('ornekSira').hidden = true;
	el('gorevBaslik').textContent = 'Rehberden gelen örnek';
	el('gorevMetni').innerHTML = 'Bu kodu <a href="rehber.html">Kodlama Rehberi</a>\'nden açtın. <b>Çalıştır</b> ya da <b>Adım adım</b> ile neler olduğunu izle, sonra kodu değiştirip yeniden dene.';
	el('gorevKisi').hidden = true;
	editor.setValue(kod);
	editor.clearHistory();
	bastan();
}

// Adresten örnek: #orta-3, eski kısa bağlantılar (#padisahinbugdaylari) de çalışır
function adrestenOrnek(){
	var parca;
	try { parca = decodeURIComponent(location.hash.slice(1)); } catch(e) { return null; }
	for(var k = 0; k < KATEGORILER.length; k++){
		var kat = KATEGORILER[k];
		for(var s = 0; s < kat.ornekler.length; s++)
			if(parca == kat.kod + '-' + (s + 1) || (kat.ornekler[s].shortlink && parca == kat.ornekler[s].shortlink))
				return {kategori: k, sira: s};
	}
	return null;
}

/* Örnekler penceresi */

function ornekListesiniCiz(){
	var aranan = el('ornekAra').value.toLocaleLowerCase('tr').trim(), html = '';
	KATEGORILER.forEach(function(kat, k){
		var satirlar = '';
		kat.ornekler.forEach(function(ornek, s){
			if(aranan && ornek.name.toLocaleLowerCase('tr').indexOf(aranan) < 0) return;
			var sec = (k == secili.kategori && s == secili.sira) ? ' class="secili"' : '';
			satirlar += '<button data-k="' + k + '" data-s="' + s + '"' + sec + '><span class="no">' + (s + 1) + '.</span>' +
				kacir(ornek.name) + (ornek.username ? '<small>' + kacir(ornek.username) + '</small>' : '') + '</button>';
		});
		if(satirlar) html += '<h3>' + kat.ad + '</h3>' + satirlar;
	});
	el('ornekListesi').innerHTML = html || '<p class="bos" style="padding:10px">Bu aramaya uyan örnek yok.</p>';
}
function pencereyiAc(){
	el('ornekAra').value = '';
	ornekListesiniCiz();
	el('ornekPenceresi').hidden = false;
	el('ornekAra').focus();
	var sec = el('ornekListesi').querySelector('.secili');
	if(sec) sec.scrollIntoView({block: 'center'});
}
function pencereyiKapat(){ el('ornekPenceresi').hidden = true; }

el('ornekleriAc').onclick = pencereyiAc;
el('pencereyiKapat').onclick = pencereyiKapat;
el('ornekAra').oninput = ornekListesiniCiz;
el('ornekAra').onkeydown = function(e){
	if(e.key == 'Enter'){
		var ilk = el('ornekListesi').querySelector('button');
		if(ilk) ilk.click();
	}
};
el('ornekListesi').onclick = function(e){
	var b = e.target.closest('button[data-k]');
	if(!b) return;
	pencereyiKapat();
	ornegiYukle(+b.getAttribute('data-k'), +b.getAttribute('data-s'));
};
el('ornekPenceresi').onclick = function(e){ if(e.target === this) pencereyiKapat(); };
document.addEventListener('keydown', function(e){
	if((e.ctrlKey || e.metaKey) && (e.key == 'k' || e.key == 'K')) { e.preventDefault(); pencereyiAc(); }
	else if(e.key == 'Escape' && !el('ornekPenceresi').hidden) pencereyiKapat();
});

/* ---------- Bu kodda kullanılanlar ---------- */

var KOMUTLAR = ['değişken', 'yaz', 'eğer', 'değilse', 'yinele', 'sayarakYinele', 've', 'veya', 'değil',
	'doğru', 'yanlış', 'eşit', 'eşitdeğil', 'büyük', 'küçük', 'büyükeşit', 'küçükeşit',
	'karekök', 'üstel', 'mutlak', 'taban', 'tavan'];

function kullanilanlariGuncelle(){
	// metinler ve yorumlar sayılmaz
	var kod = editor.getValue().replace(/"(?:\\.|[^"\\])*"/g, '').replace(/\/\/.*$/gm, '');
	var kelimeler = kod.match(/[A-Za-zçğıöşüÇĞİÖŞÜâîû_][\wçğıöşüÇĞİÖŞÜâîû]*/g) || [];
	var bulunan = KOMUTLAR.filter(function(k){ return kelimeler.indexOf(k) >= 0; });
	el('kullanilanlar').innerHTML = bulunan.length
		? bulunan.map(function(k){ return '<span>' + k + '</span>'; }).join('')
		: '<span class="soluk" style="background:none;padding:0">henüz komut yok</span>';
}

/* ---------- Durum satırı ---------- */

function durumYaz(metin, tur){
	el('durum').textContent = metin;
	el('durum').className = 'durum' + (tur ? ' ' + tur : '');
	el('durum').title = metin;
}

/* ---------- Oynatıcı ---------- */

var plan = null;	// {olaylar, hata, konum}
var zamanlayici = null;
var hiz = 500;		// iki adım arası milisaniye
var calisanSatir = null, kosulIsareti = null, hataliSatir = null;

function oynuyorMu(){ return zamanlayici !== null; }

function dugmeleriGuncelle(){
	var b = el('calistirDugmesi');
	if(oynuyorMu()) b.textContent = '⏸ Duraklat';
	else if(plan && plan.konum > 0 && plan.konum < plan.olaylar.length) b.textContent = '▶ Devam et';
	else b.textContent = '▶ Çalıştır';
}

function vurgulariTemizle(){
	if(calisanSatir !== null) { editor.removeLineClass(calisanSatir, 'background', 'satir-calisiyor'); calisanSatir = null; }
	if(hataliSatir !== null) { editor.removeLineClass(hataliSatir, 'background', 'satir-hatali'); hataliSatir = null; }
	if(kosulIsareti) { kosulIsareti.clear(); kosulIsareti = null; }
}

function ekraniSifirla(){
	vurgulariTemizle();
	el('konsol').innerHTML = '<span class="imlec">▍</span>';
	hafizayiCiz({}, [], null);
	el('kosulBaslik').textContent = 'Koşul';
	el('kosulIcerik').innerHTML = '<p class="bos">Bir <b>eğer</b> ya da <b>yinele</b> satırına gelindiğinde koşulun nasıl hesaplandığı burada açıklanır.</p>';
}

function hazirla(){
	if(!parser) { durumYaz('Gramer yükleniyor, birazdan tekrar dene…', ''); return false; }
	ekraniSifirla();
	var ast;
	try {
		ast = parser.parse(editor.getValue());
	} catch(err) {
		plan = null;
		var satir = err.location ? err.location.start.line : null;
		durumYaz(satir ? '✗ Satır ' + satir + ': yazım hatası, lütfen kontrol et.' : '✗ Kod anlaşılamadı.', 'kotu');
		if(satir) {
			hataliSatir = satir - 1;
			editor.addLineClass(hataliSatir, 'background', 'satir-hatali');
		}
		return false;
	}
	var sonuc = programiCalistir(ast);
	plan = {olaylar: sonuc.olaylar, hata: sonuc.hata, konum: 0};
	return true;
}

function adimGoster(){
	var olay = plan.olaylar[plan.konum++];
	olayiGoster(olay, plan.olaylar[plan.konum - 2]);
	if(plan.konum >= plan.olaylar.length) bitir();
	else durumYaz((oynuyorMu() ? '▶ Çalışıyor' : '⏸ Duraklatıldı') + ' · adım ' + plan.konum + ' / ' + plan.olaylar.length +
		(plan.hata && plan.hata.uzun ? ' · ⚠ sonsuz döngü olabilir' : ''), 'calisiyor');
}

function bitir(){
	durdur();
	if(calisanSatir !== null) { editor.removeLineClass(calisanSatir, 'background', 'satir-calisiyor'); calisanSatir = null; }
	if(plan.hata){
		durumYaz((plan.hata.uzun ? '⚠ ' : '✗ ') + (plan.hata.satir ? 'Satır ' + plan.hata.satir + ': ' : '') + plan.hata.mesaj, 'kotu');
		konsolaYaz(plan.hata.mesaj, 'hata');
		if(plan.hata.satir) {
			hataliSatir = plan.hata.satir - 1;
			editor.addLineClass(hataliSatir, 'background', 'satir-hatali');
		}
	}
	else durumYaz('✓ Bitti · ' + plan.olaylar.length + ' adım', 'iyi');
	dugmeleriGuncelle();
}

function oynat(){
	if(!plan || plan.konum >= plan.olaylar.length) {
		if(!hazirla()) return;
		if(plan.olaylar.length == 0) { bitir(); return; }
	}
	zamanlayici = setInterval(adimGoster, hiz);
	dugmeleriGuncelle();
	adimGoster();
}

function durdur(){
	if(zamanlayici !== null) { clearInterval(zamanlayici); zamanlayici = null; }
	dugmeleriGuncelle();
}

function duraklat(){
	durdur();
	if(plan && plan.konum < plan.olaylar.length)
		durumYaz('⏸ Duraklatıldı · adım ' + plan.konum + ' / ' + plan.olaylar.length, 'calisiyor');
}

function adimAt(){
	if(oynuyorMu()) { duraklat(); return; }
	if(!plan || plan.konum >= plan.olaylar.length) {
		if(!hazirla()) return;
		if(plan.olaylar.length == 0) { bitir(); return; }
	}
	adimGoster();
	dugmeleriGuncelle();
}

function bastan(){
	durdur();
	plan = null;
	ekraniSifirla();
	if(parser) durumYaz('Hazır', '');
	dugmeleriGuncelle();
}

function bastanCalistir(){
	bastan();
	oynat();
}
window.parse = bastanCalistir;	// eski adla çağıranlar için

el('calistirDugmesi').onclick = function(){ oynuyorMu() ? duraklat() : oynat(); };
el('adimDugmesi').onclick = adimAt;
el('bastanDugmesi').onclick = bastan;
el('konsoluTemizle').onclick = function(){ el('konsol').innerHTML = '<span class="imlec">▍</span>'; };

el('hiz').onclick = function(e){
	var b = e.target.closest('button[data-hiz]');
	if(!b) return;
	hiz = +b.getAttribute('data-hiz');
	[].forEach.call(this.querySelectorAll('button'), function(x){ x.classList.toggle('secili', x === b); });
	try { localStorage.setItem('hiz', hiz); } catch(e) {}
	if(oynuyorMu()) { clearInterval(zamanlayici); zamanlayici = setInterval(adimGoster, hiz); }
};
(function(){
	var kayitli = null;
	try { kayitli = localStorage.getItem('hiz'); } catch(e) {}
	var b = kayitli && el('hiz').querySelector('button[data-hiz="' + kayitli + '"]');
	if(b) b.click();
})();

// Kod değişince hazırlanan çalıştırma geçersiz olur
editor.on('change', function(){
	if(plan || hataliSatir !== null) bastan();
	kullanilanlariGuncelle();
});

/* ---------- Bir adımı ekranda göster ---------- */

function olayiGoster(olay, onceki){
	if(calisanSatir !== null) editor.removeLineClass(calisanSatir, 'background', 'satir-calisiyor');
	if(kosulIsareti) { kosulIsareti.clear(); kosulIsareti = null; }
	calisanSatir = olay.satir - 1;
	editor.addLineClass(calisanSatir, 'background', 'satir-calisiyor');
	editor.scrollIntoView({line: calisanSatir, ch: 0}, 80);

	hafizayiCiz(olay.degiskenler, olay.sira, olay.tur == 'atama' ? olay.ad : null);

	if(olay.tur == 'yaz') konsolaYaz(olay.metin, 'yeni');
	if(olay.tur == 'kosul') kosuluGoster(olay);
	if(olay.tur == 'ifade') ifadeyiGoster(olay);
}

function konsolaYaz(metin, sinif){
	var konsol = el('konsol');
	var imlec = konsol.querySelector('.imlec');
	[].forEach.call(konsol.querySelectorAll('.yeni'), function(x){ x.classList.remove('yeni'); });
	var satir = document.createElement('span');
	satir.className = sinif;
	satir.textContent = metin + '\n';
	konsol.insertBefore(satir, imlec);
	konsol.scrollTop = konsol.scrollHeight;
}

function degerGosterimi(deger){
	if(typeof deger == 'number' && !Number.isInteger(deger)) {
		var kisa = String(+deger.toFixed(6));
		return kisa.length < String(deger).length ? kisa : String(deger);
	}
	if(typeof deger == 'string') return '"' + deger + '"';
	return degerMetni(deger);
}
function turAdi(deger){
	if(typeof deger == 'number') return Number.isInteger(deger) ? 'tam sayı' : 'ondalıklı sayı';
	if(typeof deger == 'string') return 'metin';
	if(typeof deger == 'boolean') return 'doğru / yanlış';
	return '';
}

function hafizayiCiz(degiskenler, sira, degisen){
	if(!sira.length) {
		el('hafiza').innerHTML = '<p class="bos">Program çalışınca değişkenler burada kutular halinde görünecek.</p>';
		return;
	}
	el('hafiza').innerHTML = sira.map(function(ad){
		var gosterim = degerGosterimi(degiskenler[ad]);
		return '<div class="kutu' + (ad === degisen ? ' degisti' : '') + '" title="' + kacir(ad + ' = ' + degerMetni(degiskenler[ad])) + '">' +
			'<div class="ad">' + kacir(ad) + '</div>' +
			'<div class="deger' + (gosterim.length > 8 ? ' uzun' : '') + '">' + kacir(gosterim) + '</div>' +
			'<div class="tur">' + turAdi(degiskenler[ad]) + '</div></div>';
	}).join('');
}

// Koşul metnindeki değişkenlerin yerine o anki değerlerini yazar
var KELIMELER = KOMUTLAR.concat(['ve', 'veya']);
function degerleriYerlestir(metin, degiskenler){
	return metin.replace(/"(?:\\.|[^"\\])*"|[A-Za-zçğıöşüÇĞİÖŞÜâîû_][\wçğıöşüÇĞİÖŞÜâîû]*/g, function(parca){
		if(parca.charAt(0) == '"' || KELIMELER.indexOf(parca) >= 0 || !degiskenler.hasOwnProperty(parca)) return parca;
		return degerGosterimi(degiskenler[parca]);
	});
}

function kosulMetni(olay){
	var satir = editor.getLine(olay.satir - 1) || '';
	return satir.substring(olay.start, olay.end).trim();
}

function kosuluGoster(olay){
	var metin = kosulMetni(olay);
	var degerli = degerleriYerlestir(metin, olay.degiskenler);
	var aciklama;
	if(olay.anaTur == 'if') {
		if(olay.sonuc) aciklama = 'Koşul doğru olduğu için <b>eğer</b> kısmı çalışacak' + (olay.degilseVar ? ', <b>değilse</b> kısmı atlanacak.' : '.');
		else aciklama = 'Koşul yanlış olduğu için <b>eğer</b> kısmı atlanacak' + (olay.degilseVar ? ', <b>değilse</b> kısmı çalışacak.' : '.');
	}
	else if(olay.anaTur == 'while' || olay.anaTur == 'for') {
		var dongu = olay.anaTur == 'for' ? 'sayarakYinele' : 'yinele';
		if(olay.sonuc) aciklama = 'Koşul doğru: <b>' + dongu + '</b> döngüsü ' + olay.kacinci + '. turunu dönecek.';
		else aciklama = 'Koşul yanlış: <b>' + dongu + '</b> döngüsü ' + olay.kacinci + ' tur döndükten sonra bitti, sonraki satıra geçiliyor.';
	}
	else aciklama = 'Bu satırdaki karşılaştırmanın sonucu.';

	el('kosulBaslik').textContent = 'Koşul · satır ' + olay.satir;
	el('kosulIcerik').innerHTML =
		'<div class="ifade">' + kacir(metin) + '</div>' +
		(degerli != metin ? '<div class="ifade-degerli">→ ' + kacir(degerli) + '</div>' : '') +
		'<div class="sonuc ' + (olay.sonuc ? 'dogru">✓ doğru' : 'yanlis">✗ yanlış') + '</div>' +
		'<p>' + aciklama + '</p>';

	if(metin)
		kosulIsareti = editor.markText({line: olay.satir - 1, ch: olay.start}, {line: olay.satir - 1, ch: olay.end},
			{className: olay.sonuc ? 'kosul-dogru' : 'kosul-yanlis'});
}

function ifadeyiGoster(olay){
	var metin = kosulMetni(olay) || (editor.getLine(olay.satir - 1) || '').trim();
	el('kosulBaslik').textContent = 'İfade · satır ' + olay.satir;
	el('kosulIcerik').innerHTML =
		'<div class="ifade">' + kacir(metin) + '</div>' +
		'<div class="sonuc notr">= ' + kacir(degerGosterimi(olay.deger)) + '</div>' +
		'<p>Bu satır bir değer hesaplıyor ama bir yere kaydetmiyor ya da yazdırmıyor.</p>';
}

/* ---------- C karşılığı ---------- */

function cPaneliniAyarla(acik){
	el('cAnahtari').checked = acik;
	el('cKarti').hidden = !acik;
	if(acik) translate.refresh();
	try { localStorage.setItem('cAcik', acik ? '1' : ''); } catch(e) {}
}
el('cAnahtari').onchange = function(){ cPaneliniAyarla(this.checked); };
try { cPaneliniAyarla(localStorage.getItem('cAcik') == '1'); } catch(e) {}

/* ---------- Kaydet ---------- */

window.kaydet = function(){
	var blob = new Blob([editor.getValue()], {type: "text/plain;charset=utf-8"});
	saveAs(blob, (el('ornekAdi').textContent || 'kodum') + '.txt');
};
el('kaydetDugmesi').onclick = window.kaydet;

/* ---------- Başlangıç ---------- */

(function(){
	var kod = adrestenKod(), adres = adrestenOrnek();
	if(kod !== null) { secili = {kategori: 1, sira: 2}; rehberKodunuYukle(kod); }
	else if(adres) ornegiYukle(adres.kategori, adres.sira, false);
	else ornegiYukle(1, 2, false);	// Orta seviye: Öğrenci'nin dersi geçip geçmediği
})();
window.addEventListener('hashchange', function(){
	var kod = adrestenKod();
	if(kod !== null) { rehberKodunuYukle(kod); return; }
	var adres = adrestenOrnek();
	if(adres && (adres.kategori != secili.kategori || adres.sira != secili.sira)) ornegiYukle(adres.kategori, adres.sira, false);
});
