/*
*
*	#######################      	Rehber ve Hakkında sayfaları      #######################
*
*	Tema düğmesi, içindekiler / bölüm sekmelerinde okunan bölümün vurgulanması,
*	kod örneklerinin renklendirilip çalıştırılması (çıktıları gerçek motorla
*	üretilir) ve açılmayan profil fotoğrafları yerine baş harfler.
*/

var SURUM = '20261102';

function el(id){ return document.getElementById(id); }

/* ---------- Tema ---------- */

(function(){
	var dugme = el('temaDugmesi');
	if(!dugme) return;
	function uygula(tema){
		if(tema == 'gece') document.documentElement.setAttribute('data-tema', 'gece');
		else document.documentElement.removeAttribute('data-tema');
		dugme.textContent = tema == 'gece' ? '☀︎' : '☾';
		dugme.title = tema == 'gece' ? 'Gündüz modu' : 'Gece modu';
		dugme.setAttribute('aria-label', dugme.title);
	}
	dugme.onclick = function(){
		var tema = document.documentElement.getAttribute('data-tema') == 'gece' ? 'gunduz' : 'gece';
		try { localStorage.setItem('tema', tema); } catch(e) {}
		uygula(tema);
		document.querySelectorAll('.CodeMirror').forEach(function(x){ x.CodeMirror.refresh(); });
	};
	uygula(document.documentElement.getAttribute('data-tema') == 'gece' ? 'gece' : 'gunduz');
})();

/* ---------- Okunan bölümü vurgula ---------- */

// baglantilar: href="#id" olan bağlantılar; okunan bölümünkine "aktif" sınıfı verilir
function okunanBolumuIzle(baglantilar, ilerlemeCubugu, ilerlemeYazisi, anaBolumler){
	var hedefler = [];
	baglantilar.forEach(function(a){
		var hedef = document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)));
		if(hedef) hedefler.push({a: a, hedef: hedef});
	});
	if(!hedefler.length) return;

	function guncelle(){
		var sinir = 120, secili = hedefler[0];
		hedefler.forEach(function(h){ if(h.hedef.getBoundingClientRect().top <= sinir) secili = h; });
		// Sayfanın sonuna gelindiyse son bölüm
		if(window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) secili = hedefler[hedefler.length - 1];
		hedefler.forEach(function(h){ h.a.classList.toggle('aktif', h === secili); });

		if(ilerlemeCubugu){
			var oran = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
			ilerlemeCubugu.style.width = Math.round(Math.min(1, oran) * 100) + '%';
		}
		if(ilerlemeYazisi && anaBolumler){
			var kacinci = 0;
			anaBolumler.forEach(function(b, i){ if(b.getBoundingClientRect().top <= sinir) kacinci = i + 1; });
			ilerlemeYazisi.textContent = 'Bölüm ' + Math.max(1, kacinci) + ' / ' + anaBolumler.length;
		}
	}
	window.addEventListener('scroll', guncelle, {passive: true});
	window.addEventListener('resize', guncelle);
	guncelle();
}

if(el('icindekiler'))
	okunanBolumuIzle([].slice.call(document.querySelectorAll('#icindekiler a[href^="#"]')),
		el('ilerlemeCubugu'), el('ilerlemeYazisi'), [].slice.call(document.querySelectorAll('.makale > section')));
if(el('sekmeler'))
	okunanBolumuIzle([].slice.call(document.querySelectorAll('#sekmeler a[href^="#"]')));

/* ---------- Profil fotoğrafı açılmazsa baş harfler ---------- */

document.querySelectorAll('.kisi img').forEach(function(img){
	function yerine(){
		var harfler = (img.alt || '?').split(/\s+/).map(function(s){ return s.charAt(0); }).join('').slice(0, 2);
		var kutu = document.createElement('span');
		kutu.className = 'bas-harf';
		kutu.textContent = harfler.toLocaleUpperCase('tr');
		img.replaceWith(kutu);
	}
	if(img.complete && img.naturalWidth === 0) yerine();
	else img.addEventListener('error', yerine);
});

/* ---------- Kod örnekleri ---------- */

(function(){
	var alanlar = [].slice.call(document.querySelectorAll('textarea.kod'));
	if(!alanlar.length || typeof CodeMirror == 'undefined') return;

	var ornekler = alanlar.map(function(alan){
		var kod = alan.value.replace(/^\n+/, '').replace(/\s+$/, '');
		var kutu = document.createElement('div');
		kutu.className = 'kod-ornegi';
		kutu.innerHTML = '<div class="baslik"><span>Örnek kod</span>' +
			'<button class="dugme kopyala" type="button">⧉ Kopyala</button>' +
			'<a class="dugme ana" href="index.html#kod=' + encodeURIComponent(kod) + '">▶ Kodlama sayfasında dene</a></div>';
		alan.parentNode.insertBefore(kutu, alan);
		kutu.appendChild(alan);
		alan.value = kod;
		CodeMirror.fromTextArea(alan, {mode: 'turkish', theme: 'tpd', lineNumbers: true, readOnly: true, viewportMargin: Infinity});

		kutu.querySelector('.kopyala').onclick = function(){
			var b = this;
			function tamam(){ b.textContent = '✓ Kopyalandı'; setTimeout(function(){ b.textContent = '⧉ Kopyala'; }, 1500); }
			if(navigator.clipboard) navigator.clipboard.writeText(kod).then(tamam, function(){});
			else {
				var gecici = document.createElement('textarea');
				gecici.value = kod; document.body.appendChild(gecici); gecici.select();
				try { document.execCommand('copy'); tamam(); } catch(e) {}
				gecici.remove();
			}
		};
		return {kod: kod, kutu: kutu};
	});

	// Çıktıları gerçek ayrıştırıcı ve çalıştırıcıyla üret
	if(typeof PEG == 'undefined' || typeof programiCalistir == 'undefined') return;
	var istek = new XMLHttpRequest();
	istek.open('GET', 'grammer.pegjs?v=' + SURUM);
	istek.onload = function(){
		if(istek.status != 200) return;
		var parser = PEG.buildParser(istek.responseText);
		ornekler.forEach(function(o){
			var satir = document.createElement('div'), metin, hata = false;
			try {
				var sonuc = programiCalistir(parser.parse(o.kod));
				var yazilanlar = sonuc.olaylar.filter(function(x){ return x.tur == 'yaz'; });
				var ifadeler = sonuc.olaylar.filter(function(x){ return x.tur == 'ifade'; });
				if(sonuc.hata) { metin = sonuc.hata.mesaj; hata = true; }
				else if(yazilanlar.length) metin = yazilanlar.map(function(x){ return x.metin; }).join('\n');
				else if(ifadeler.length) metin = degerMetni(ifadeler[ifadeler.length - 1].deger);
				else return;
				satir.innerHTML = '<b>' + (yazilanlar.length || hata ? 'Çıktı' : 'Sonuç') + '</b>';
			} catch(e) {
				metin = 'Bu kodda yazım hatası var' + (e.location ? ' (satır ' + e.location.start.line + ')' : '') + '.';
				hata = true;
				satir.innerHTML = '<b>Çıktı</b>';
			}
			satir.className = 'cikti' + (hata ? ' hata' : '');
			satir.appendChild(document.createTextNode(metin));
			o.kutu.appendChild(satir);
		});
	};
	istek.send();
})();
