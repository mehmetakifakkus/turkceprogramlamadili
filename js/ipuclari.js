/*
 * Örneklere özel ipuçları ve "Kendin dene" önerileri.
 * Anahtar, examples.js içindeki örnek adıdır (name). Aynı ada sahip örnekler
 * aynı kodu paylaştığı için aynı metni kullanır.
 */

var IPUCLARI = {

	/* ---------- Başlangıç seviye ---------- */

	"Yurt dışından yapılan alışverişin tutarı": {
		ipucu: "Parantez içindeki işlem önce yapılır: önce iki ürünün dolar fiyatları toplanır, sonra toplam kurla çarpılır.",
		dene: "<code>dolarKuru</code>'nu 30 yap ve tekrar çalıştır. Toplam tutar 10800 oldu mu?"
	},
	"Aylık ev bütçesi hesabı": {
		ipucu: "Giderlerin hepsini parantez içinde toplayıp gelirden bir kerede çıkarıyoruz. Parantez olmasaydı sadece ilk gider çıkarılır, diğerleri eklenirdi.",
		dene: "Yeni bir gider ekle: <code>değişken internet = 90</code> satırını yaz ve <code>internet</code>'i de parantezin içine ekle. Kalan para 690'a düştü mü?"
	},
	"Celcius sıcaklık birimini Fahrenheit'e çevirme": {
		ipucu: "Çarpma, toplamadan önce yapılır: önce <code>celcius * 1.8</code> hesaplanır, sonra 32 eklenir.",
		dene: "<code>celcius</code>'u 100 yap: suyun kaynama noktası Fahrenheit'te kaç derece?"
	},
	"Fahrenheit sıcaklık biriminden Celcius'a çevirme": {
		ipucu: "Buradaki parantez önemli: önce 32 çıkarılır, sonra 1.8'e bölünür. Ondalıklı sayılarda virgül değil nokta kullanılır: <code>1.8</code> gibi.",
		dene: "<code>fahrenheit</code>'ı 32 yap. Sonuç neden 0 çıktı?"
	},
	"Dikdörtgen çevresi hesabı": {
		ipucu: "Değişken adlarını sen seçersin; burada sonucun adı <code>sonat</code>. <code>çevre</code> gibi anlamlı bir ad seçmek kodu okumayı kolaylaştırır.",
		dene: "Dikdörtgenin alanını da hesapla: <code>değişken alan = boy * en</code> ve <code>yaz alan</code> satırlarını ekle. Alan 700 çıktı mı?"
	},
	"Dairenin çevresi ve alanı": {
		ipucu: "<code>r * r</code> yarıçapın karesidir. İstersen bunu <code>üstel(r, 2)</code> ile de yazabilirsin.",
		dene: "<code>r</code>'yi iki katına (80) çıkar. Çevre 2 katına çıkarken alan kaç katına çıktı?"
	},
	"Silindir alanı ve hacmi": {
		ipucu: "Hacim, taban alanı ile yüksekliğin çarpımıdır. Daha önce hesapladığımız <code>silindir_taban_alanı</code> değişkenini burada tekrar kullanıyoruz.",
		dene: "<code>h</code>'yi 10 yap. Hangi sonuç değişti, hangisi aynı kaldı? Neden?"
	},
	"Arabanın ne yaktığını bulma": {
		ipucu: "Bölmenin sonucu tam sayı çıkmayabilir. Buradaki sonuç, 1 km yol için harcanan yakıt parasıdır (TL).",
		dene: "100 km yolun ne kadar tutacağını bulmak için en alta <code>yaz fiyat * 100</code> satırını ekle."
	},
	"Koordinat düzleminde simetriler": {
		ipucu: "Bir sayıyı -1 ile çarpmak işaretini değiştirir. x eksenine göre simetride y'nin, y eksenine göre simetride x'in işareti değişir; orijine göre ikisi de değişir.",
		dene: "<code>x</code>'i -3 yap. Orijine göre simetrik nokta (3, -5) oldu mu? Bu nokta hangi bölgede?"
	},
	"Üçgen Eşitsizliği": {
		ipucu: "<code>mutlak(...)</code> bir sayının işaretsiz değerini verir: <code>mutlak(4 - 5)</code> de <code>mutlak(5 - 4)</code> de 1'dir. Bu yüzden x ile y'den hangisinin büyük olduğu önemli değil.",
		dene: "x ile y'nin değerlerini yer değiştir (<code>x = 4</code>, <code>y = 5</code>). Sonuç değişti mi?"
	},

	/* ---------- Orta seviye ---------- */

	"Ehliyet almaya yeterli misin?": {
		ipucu: "<code>eğer</code>'in parantezindeki koşul doğruysa hemen altındaki satır, yanlışsa <code>değilse</code>'nin altındaki satır çalışır. <b>Adım adım</b> ile hangisinin seçildiğini izleyebilirsin.",
		dene: "<code>yaş</code>'ı 18 yap. Sonuç ne oldu? 18 yaşındakilerin de ehliyet alabilmesi için koşulu nasıl değiştirirdin? (İpucu: <code>&gt;=</code>)"
	},
	"Öğrencinin notunu hesaplama": {
		ipucu: "<code>puan = puan + 10</code> satırı, puan'ın eski değerine 10 ekleyip sonucu yine puan'a koyar.",
		dene: "<code>puan</code>'ı önce 81, sonra 80 yap. 80 alan öğrenci neden ödül alamadı?"
	},
	"Öğrenci'nin dersi geçip geçmediği": {
		ipucu: "Ortalama için iki notu önce parantez içinde toplayıp sonra 2'ye bölüyoruz. Parantez olmasaydı önce <code>not2 / 2</code> hesaplanırdı.",
		dene: "<code>not2</code>'yi 30 yap ve tekrar çalıştır. Ortalama kaç oldu, öğrenci geçti mi?"
	},
	"İki rasyonel sayının toplamı": {
		ipucu: "Kesirleri toplamak için paydaları eşitliyoruz: ortak payda iki paydanın çarpımı (<code>a</code>), paylar da diğer kesrin paydasıyla genişletiliyor (<code>b</code> ve <code>c</code>).",
		dene: "1/2 + 1/3 işlemini dene: <code>pay1 = 1</code>, <code>payda1 = 2</code>, <code>pay2 = 1</code>, <code>payda2 = 3</code> yap. Sonuç 5/6 çıktı mı?"
	},
	"3 sayıdan en büyüğünü bulalım": {
		ipucu: "<code>no</code> değişkeni “şimdiye kadar gördüğümüz en büyük sayıyı” tutar. Her <code>eğer</code>, yeni sayı daha büyükse <code>no</code>'yu günceller.",
		dene: "<code>sayı1</code>'i 20 yap. Hiçbir <code>eğer</code>'in içi çalışmadı ama sonuç yine doğru; neden?"
	},
	"Koordinat düzleminde bölge tespiti": {
		ipucu: "<code>değilse eğer</code> zinciri koşulları yukarıdan aşağıya sırayla dener: ilk doğru koşulun altındaki satır çalışır, geri kalanı atlanır.",
		dene: "<code>x = -2</code>, <code>y = -7</code> yap ve hangi bölgede olduğunu bul. Sonra <code>x = 0</code>, <code>y = 0</code> ile dene ve programın en sondaki <code>değilse</code>'ye düştüğünü izle."
	},
	"10'dan 30'a 4'er 4'er": {
		ipucu: "Döngü, koşul (<code>no &lt; 30</code>) doğru olduğu sürece süslü parantez içindeki iki satırı tekrarlar. <code>no</code> 30 olunca koşul yanlış olur ve döngü biter.",
		dene: "<code>no = no + 4</code> satırını <code>no = no + 5</code> yap. Hangi sayılar yazıldı? Son sayı neden 30'u geçti?"
	},
	"Faktoriyel bulma": {
		ipucu: "Döngü her turda sonucu <code>sayı</code> ile çarpıp <code>sayı</code>'yı 1 azaltır: 4 · 3 · 2 = 24. <code>sayı</code> 1'e inince döngü durur.",
		dene: "<code>sayı</code>'yı 6 yap: 6! kaç çıktı? (Merak edersen <code>sayı</code>'yı 0 yapıp neden döngünün hiç bitmediğini düşün.)"
	},
	"Faktoriyel bulma 2": {
		ipucu: "Bu sefer <code>sayaç</code> 1'den başlayıp <code>sayı</code>'ya kadar artıyor: 1 · 2 · 3 · 4 · 5. Önceki örnekte ise sayı aşağı doğru azalıyordu; ikisi de aynı sonuca ulaşır.",
		dene: "<code>sayı</code>'yı 0 yap. 0! kaç çıktı? Döngü kaç tur döndü?"
	},

	/* ---------- İleri seviye ---------- */

	"1'den 50'ye kadar 7'ye bölünen sayılar": {
		ipucu: "<code>%</code> işleci bölümden kalanı verir. <code>sayı % 7 == 0</code> ise sayı 7'ye tam bölünüyor demektir.",
		dene: "7 yerine 5 yaz. Kaç tane sayı yazıldı?"
	},
	"Kareler toplamı": {
		ipucu: "<code>toplam</code> her turda <code>sayı * sayı</code> kadar büyür: 1 + 4 + 9 + … + 100. Başlangıçta <code>toplam</code>'ın 0 olması bu yüzden önemli.",
		dene: "Kodda <code>n</code> tanımlı ama kullanılmıyor. Koşulu <code>yinele(sayı &lt;= n)</code> yapıp <code>n</code>'yi 3 yap: 1 + 4 + 9 = 14 çıktı mı?"
	},
	"Çarpmaya göre tersler toplamı": {
		ipucu: "<code>1/sayı</code>, sayının çarpmaya göre tersidir: 1, 1/2, 1/3… Sayılar büyüdükçe terslerinin toplama katkısı azalır.",
		dene: "Koşulu <code>yinele(sayı &lt;= n)</code> yapıp <code>n</code>'yi 2 yap: 1 + 1/2 = 1.5 çıkmalı."
	},
	"2 sayının Ebob'unu bulalım": {
		ipucu: "Büyük sayıdan küçüğü çıkarmak EBOB'u değiştirmez. Sayılar eşitlenene kadar bunu tekrarlarız; eşit oldukları değer EBOB'dur.",
		dene: "<code>sayı1 = 48</code>, <code>sayı2 = 18</code> ile dene ve hafıza kutularında sayıların nasıl küçüldüğünü <b>Adım adım</b> izle. EBOB 6 çıktı mı?"
	},
	"10 luk -> 2 lik sayı sistemi": {
		ipucu: "Her turda sayının 2'ye bölümünden kalanı (0 ya da 1) yazıp sayıyı yarıya indiriyoruz. Yazılan kalanlar aşağıdan yukarıya okununca sayının ikilik karşılığı çıkar.",
		dene: "<code>sayı</code>'yı 6 yap. Kalanlar 0, 1, 1 çıktı mı? Aşağıdan yukarı okuyunca 110, yani 6'nın ikilik karşılığı."
	},
	"Asal olma testi": {
		ipucu: "<code>asalMı</code> başta doğru varsayılır. 2'den başlayarak sayıyı tam bölen bir sayı bulunursa yanlış yapılır; döngü bitince hâlâ doğruysa sayı asaldır.",
		dene: "<code>sayı</code>'yı 37 yap: doğru çıkmalı. Sonra 1 ile dene: 1 asal değildir ama program ne diyor? Neden?"
	},

	/* ---------- Kullanıcıların gönderdikleri ---------- */

	"Padişahın borçlu olduğu buğday miktarı": {
		ipucu: "Satranç hikâyesinde her karede buğday iki katına çıkar. <code>kat</code> her turda 2 ile çarpılıp toplama eklenir; sayıların ne kadar hızlı büyüdüğüne dikkat et.",
		dene: "32 yerine 4 yaz: döngü 3 tur döner ve 2 + 4 + 8 = 14 çıkar. Sonra tekrar 32 yapıp <b>Hızlı</b> çalıştır ve <code>kat</code> kutusunu izle."
	},
	"Kedilerin mama tüketimini bulan kod": {
		ipucu: "Çarpmada sıranın önemi yoktur: kedi sayısı, günlük mama ve gün sayısını hangi sırayla çarparsan çarp sonuç aynıdır.",
		dene: "Mamayı kilogram olarak görmek için en alta <code>yaz tüketilenmama / 1000 + \" kg\"</code> satırını ekle."
	},
	"Ardışık sayıların toplamını bulan kod": {
		ipucu: "Ardışık sayıların toplamı = ortadaki değer × terim sayısı. 4 + 5 + 6 + 7 için ortanca 5.5, terim sayısı 4: 5.5 × 4 = 22.",
		dene: "<code>ilkterim = 1</code>, <code>sonterim = 100</code> yap. 1'den 100'e kadar sayıların toplamı kaç?"
	},
	"Diyabette karbonhidrat sayımı": {
		ipucu: "Bu kod hiçbir şey yazdırmıyor; hesaplanan değerleri sağdaki hafıza kutularında görebilirsin. Bu yalnızca bir programlama örneğidir, tıbbi kararlar için kullanılmamalıdır.",
		dene: "En alta <code>yaz hızlıetkiliinsülin</code> satırını ekle ve sonucu konsolda gör."
	},
	"Öğrenci Notu Hesaplama (Üniversite)": {
		ipucu: "Koşullar büyükten küçüğe sıralı. 90 için ilk koşul (<code>not &gt; 89</code>) doğru olduğundan AA yazılır ve zincirin geri kalanı hiç denenmez.",
		dene: "<code>not</code>'u 85, sonra 50 yap. Hangi harf notlarını aldın?"
	},
	"Faktoriyel hesabı": {
		ipucu: "Döngü, <code>b</code> değişkeni <code>c</code>'ye (a + 1) eşit olana kadar sürer; böylece <code>b</code> 1'den a'ya kadar her değeri alır ve faktöriyel bunlarla çarpılır.",
		dene: "<code>a</code>'yı 10 yap. 10! kaç basamaklı bir sayı?"
	},
	"Araç yakıtı hesaplama": {
		ipucu: "<code>yakıttutar / yapılankm</code>, 1 km için harcanan parayı TL olarak verir. Kuruş olarak görmek için sonucu 100 ile çarpmak gerekir.",
		dene: "Son satırı <code>yaz sonuç * 100 \" krş\"</code> yap: 1 km yaklaşık 28.57 kuruşa mal oluyor."
	},
	"Kenar uzunluklarından üçgen alanı": {
		ipucu: "Heron formülü, üç kenarı bilinen üçgenin alanını verir: önce çevrenin yarısı (<code>u</code>) bulunur, sonra <code>karekök</code> ile alan hesaplanır.",
		dene: "Kenarları 5, 5 ve 6 yap. Alan 12 çıktı mı?"
	},
	"Vücut kitle endeksi hesapmala": {
		ipucu: "<code>ve</code> ile birleştirilen koşul ancak iki parçası da doğruysa doğru olur. <code>boy * boy</code> yerine <code>üstel(boy, 2)</code> de yazabilirsin.",
		dene: "<code>kilo</code>'yu 80 yap. Hangi sonucu aldın? Endeksin kendisini görmek için en alta <code>yaz BMI</code> ekle."
	}
};
