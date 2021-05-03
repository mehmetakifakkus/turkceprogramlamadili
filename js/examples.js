
userSend = [
	{
		name: 'Padişahın borçlu olduğu buğday miktarı',
		description: 'Sorunun hikayesine şuradan göz atabilirsiniz:\n http://www.satrancokulu.com/yazilar/satranc-hikayeleri/satranc-ve-bugday-hikayesi/\n\n',
		shortlink: 'padisahinbugdaylari',
		username: 'Süer Eker',
		code: 
		"değişken kat = 1\n"+
		"değişken toplam = 0\n"+
		"değişken kere = 1\n"+
		"\n"+
		"yinele(kere < 32) // satranc tahtasinda kutu sayisi\n"+
		"{\n"+
		"	kat = kat * 2\n"+
		"	toplam = toplam + kat\n"+
		"	kere = kere + 1\n"+
		"}\n"+
		"\n"+
		"yaz toplam\n",
		date: '02.05.2021'
	},
    {
		name: 'Kedilerin mama tüketimini bulan kod',
		description: '-',
		shortlink: 'kedilerinmamatuketimi',
		username: 'Sena Arslan',
		code:         
            "değişken kedisayısı = 4\n"+
            "değişken mamamiktarı = 80\n"+
            "değişken günsayısı = 30\n"+
            "değişken tüketilenmama = kedisayısı * mamamiktarı * günsayısı\n"+
            "\n"+
            "yaz tüketilenmama\n",
		date: '29.03.2020'
	},
    {
		name: 'Ardışık sayıların toplamını bulan kod',
		description: '-',
		shortlink: 'ardisiksayilartop',
		username: 'Eren Zeren',
		code:         
              "değişken ilkterim = 4\n"+
              "değişken sonterim = 7\n"+
              "değişken artışmiktarı = 1\n"+
              "\n"+
              "değişken terimsayısı = (sonterim - ilkterim) / artışmiktarı + 1\n"+
              "değişken ortanca = (sonterim + ilkterim) / 2\n"+
              "değişken toplam = ortanca * terimsayısı\n"+
              "\n"+
              "yaz toplam\n",
		date: '28.03.2020'
	},
	{
		name: 'Diyabette karbonhidrat sayımı',
		description: '-',
		shortlink: 'diyabetkarbonhidrat',
		username: 'İrem Sayındı',
		code:         
            "değişken insulinkarbonhidratoranı = 500 / 42\n"+
            "değişken insulinduyarlılıkfaktoru = 1700 / 42\n"+
            "değişken karbonhidratmiktarı = 100\n"+
            "değişken yemekbolusu = (karbonhidratmiktarı / insulinkarbonhidratoranı)\n"+
            "\n"+
            "değişken kanşekeri = 280\n"+
            "değişken hedefkanşekeri = 150\n"+
            "değişken düzeltmebolusu = (kanşekeri - hedefkanşekeri) / insulinduyarlılıkfaktoru \n"+
            "\n"+
            "değişken hızlıetkiliinsülin = (yemekbolusu + düzeltmebolusu)\n",
		date: '27.03.2020'
	},
    {
		name: 'Öğrenci Notu Hesaplama (Üniversite)',
		description: '-',
		shortlink: 'universiteogrencinotu',
		username: 'Ahmet Sarıcı',
		code: 'değişken not = 90\n\n'+
			  'eğer(not > 89)\n'+
			  '	yaz "AA"\n'+
			  'değilse eğer(not > 84)\n'+
			  '	yaz "BA"\n'+
			  'değilse eğer(not > 79)\n'+
			  '	yaz "BB"\n'+
			  'değilse eğer(not > 74)\n'+
			  '	yaz "CB"\n'+
			  'değilse eğer(not > 64)\n'+
			  '	yaz "CC"\n'+
			  'değilse eğer(not > 57)\n'+
			  '	yaz "DC"\n'+
			  'değilse eğer(not > 49)\n'+
			  '	yaz "DD"\n'+
			  'değilse eğer(not > 39)\n'+
			  '	yaz "FD"\n'+
			  'değilse \n'+
			  '	yaz "FF"\n',

		date: '7.08.2017'
	},
	{
		name: 'Fahrenheit sıcaklık biriminden Celcius\'a çevirme',
		description: '-',
		shortlink: 'fahrenheitdencelciusacevirme',
		username: 'Hüseyin Cahit Kebapçıoğlu',
		code: "değişken fahrenheit = 120\n"+
			  "değişken celcius= (fahrenheit-32) / 1.8\n"+
			  "yaz celcius\n",
		date: '17.08.2017'
	},
	{
		name: 'Faktoriyel hesabı',
		description: "Bize verilen bir sayının faktoriyelini bulalım.<br><br>Tanım olarak 1 den n'e kadar olan doğal sayıların çarpımına n faktöriyel denir ve n! şeklinde gösterilir. Yani 5! dediğimizde şuna eşit olur:<br><br>"+
		"5! = 5 x 4 x 3 x 2 x 1 = 120<br>",
		shortlink: 'huseyinfaktoriyel',
		username: 'Hüseyin Cahit Kebapçıoğlu',
		code: "değişken a = 5\n"+
			  "değişken c = a+1\n"+
			  "değişken b = 1\n"+
			  "değişken faktöriyel = 1\n"+
			  "yinele( c!= b)\n"+
			  "{\n"+
			  "faktöriyel = faktöriyel * b\n"+
			  "b = b + 1\n"+
			  "}\n"+
			  "yaz faktöriyel\n",
		date: '19.08.2017'
	},
	{
		name: 'Aylık ev bütçesi hesabı',
		description: 'Gelirleri ve giderleri belirli olan birisinin aylık harcamaları sonrasında ne kadar parasının kaldığını bulan kod.<br><br>',
		shortlink: 'evbutcesihesaplama',
		username: 'Çağatay Özevim',
		code:	"değişken aylıkgelir = 1400\n" +
				"değişken harçlık = 10\n"+
				"değişken elektirik = 100\n"+
				"değişken su = 50\n"+
				"değişken dogalgaz = 60\n"+
				"değişken gıda = 400\n"+
				"\n"+
				"değişken kalanpara = aylıkgelir - (harçlık + elektirik + su + dogalgaz + gıda)\n"+
				"\n"+
				"yaz kalanpara\n",
		date: '20.08.2017'
	},
	{
		name: 'Dikdörtgen çevresi hesabı',
		description: 'Eni ve boyu bilinen bir dikdörtgenin çevresini bulalım.<br><br>',
		shortlink: 'dikdortgencevresi',
		username: 'Sonat Türkan',
		code: "değişken boy = 20\n"+
			  "değişken en = 35\n"+
			  "\n"+
			  "değişken sonat = (boy + en) * 2\n"+
			  "\n"+
			  "yaz sonat\n",
		date: '21.08.2017'
	},
	{
		name: 'Öğrenci\'nin dersi geçip geçmediği',
		description: 'Bir öğrencinin ortalamasının 50 puanı aşması durumunda geçti, diğer durumda ise kaldı yazan kod uygulaması.',
		shortlink: 'ogrencidersigecipgecmedigi',
		username: 'Berkay Çatak',
		code: "değişken not1 = 60\n"+
			  "değişken not2 = 90\n"+
			  "değişken ort = (not1 + not2) / 2\n\n"+
			  "eğer(ort >= 50)\n"+
			  '	yaz "geçti"\n'+
			  "değilse\n"+
			  '	yaz "kaldı"\n'+
			  "\n"+
			  "yaz ort",
		date: '24.08.2017'
	},
	{
		name: 'Araç yakıtı hesaplama',
		description: 'Kendi arabamız ya da aile arabamızın ne kadar yaktığını hesaplayalım. Varsayalım ki babanız sizden böyle bir program yazmanızı istedi. Genel yaklaşım -ya da algoritma diyelim- şu şekilde olabilir: Bir miktar yol katederiz, bunun bir şekilde kaydını tutarız, o sırada ne kadar tutarda yakıt harcadığımızı tespit ederiz. Örneğin, 236 km yol aldık ve 75 TL yakıt harcadık. Hadi 1 km yolu ne kadarlık yakıtla katettiğimizi bulalım.',
		shortlink: 'aracyakithesaplama',
		username: 'Osman Kalhan',
		code: "değişken yapılankm = 70\n"+
			  "değişken yakıttutar = 20\n\n"+
			  "değişken sonuç = yakıttutar / yapılankm\n\n"+
			  'yaz sonuç " krş"\n',
		date: '24.08.2017'
	},
	{
		name: 'Kenar uzunluklarından üçgen alanı',
		description: 'Heron yöntemi adı verilen yöntemi kullanarak üçgen alanı hesaplamak mümkündür.',
		shortlink: 'uzunluktanucgenalani',
		username: 'Harun Kaya',
		code: "//Heron yöntemi ile üçgen alanı hesaplama. \n\n"+
			  "değişken a = 3 // birinci kenar\n"+
			  "değişken b = 4 // ikinci kenar\n"+
			  "değişken c = 5 // üçüncü kenar\n"+
			  "değişken u =(a+b+c) / 2 // çevre uzunluğunun yarısı\n"+
			  "değişken alan = karekök(u * (u-a) * (u-b) * (u-c))\n"+
			  "yaz alan \n",
		date: '26.08.2017'
	},
	{
		name: 'Vücut kitle endeksi hesapmala',
		description: 'Vücut kitle endeksi bir bireyin boy ve kilosunun ortalaması ile elde edilen bir hesaplamadır. Bu hesaplama ile bir kişinin kabaca kilo yönünden ne durumda olduğu hakkında kabaca bilgi edinebiliriz. Bu bilgiler kısaca zayıf, ideal kilo, şişman ve aşırı şişman şeklinde olacaktır.',
		shortlink: 'vucutkitleendeksi',
		username: 'Mehmet Akif AKKUŞ',
		code: 'değişken kilo = 70   // kg cinsinden\n'+
			  'değişken boy = 1.72  // metre cinsinden\n'+
			  '\n'+
			  'değişken BMI = kilo / (boy * boy)\n'+
			  '\n'+
			  'eğer(BMI < 19)\n'+
			  '  yaz "zayıf"\n'+
			  'değilse eğer(BMI >= 19 ve BMI < 25)\n'+
			  '  yaz "ideal kilo"\n'+
			  'değilse eğer(BMI >= 25 ve BMI < 30)\n'+
			  '  yaz "şişman"\n'+
			  'değilse eğer(BMI >= 30 ve BMI < 35)\n'+
			  '  yaz "aşırı şişman"\n'+
  			  'değilse\n'+
              '  yaz "müthiş obez"\n',
		date: '28.08.2017'
	},
	{
		name: 'Koordinat düzleminde bölge tespiti',
		description: '<img src="images/koordinat-sistemi-bolgeler.jpg" style="border-radius: 5px; margin:0px 0px 20px 20px;" alt="Metematik Operasyonlari" width="340" height="240"><br><br>' +
		'Kodumuzda x ve y değerlerini değişken olarak tanımlarız ve bunların değerine göre kodumuzun bize konsol çıktısı olarak hangi bölgede olduğumuzu bulmasını bekleriz. Ha şunu da belirtelim: Noktamız koordinat bölgelerinin yanı sıra koordinat eksenleri üzerinde de yer alabilir, hatta orjin noktasında da bulunabilir.<br><br>',
		shortlink: 'koordinatduzlemi',
		username: 'Hüseyin Kebapçıoğlu',
		code: 'değişken x = 5\n'+
			  'değişken y = 0\n'+
			  '\n'+
			  'eğer(x > 0 ve y > 0)\n'+
			  '  yaz "Birinci Bölge"\n'+
			  'değilse eğer(x < 0 ve y > 0)\n'+
			  '  yaz "İkinci Bölge"\n'+
			  'değilse eğer(x < 0 ve y < 0)\n'+
			  '  yaz "Üçüncü Bölge"\n'+
			  'değilse eğer(x > 0 ve y < 0)\n'+
			  '  yaz "Dördüncü Bölge"\n'+
			  'değilse eğer(x == 0 ve y != 0)\n'+
			  '  yaz "y ekseni üzerinde"\n'+
			  'değilse eğer(x != 0 ve y == 0)\n'+
			  '  yaz "x ekseni üzerinde"\n'+
			  'değilse \n'+
			  '  yaz "Origin"\n',
		date: '31.08.2017'
	},
	{
		name: 'Koordinat düzleminde simetriler',
		description: 'Koordinat düzleminde herhangi bir noktanın koordinat eksenlerine göre simetrisini bulabilmekteyiz. X eksenine göre simetri alırken y koordinatı eksi ile çarpılır, Y eksenine göre simetri alınırken x koordinatı eksi ile çarpılır.<br><br> Örneğin 3,4 noktasının x eksenine göre simetrisi 3,-4 olur. <br><br>' ,
		shortlink: 'koordinatduzlemindesimetriler',
		username: 'Osman Yusuf Akkuş',
		code: 'değişken x = 4\n'+
			  'değişken y = 5\n'+
			  '\n'+
			  'yaz "x eksenine göre simetri: " x "," y * -1\n'+
			  'yaz "y eksenine göre simetri: " x * -1 "," y\n'+
			  'yaz "orjine göre simetriği  : " x * -1 "," y * -1\n',
		date: '02.09.2017'
	},
	{
		name: 'Üçgen Eşitsizliği',
		description: 'Bildiğiniz gibi her kenar uzunluğundan üçgen elde edemeyiz. Örneğin kenar uzunlukları 3,4,5 olan bir üçgen geçerli bir üçgen iken, 2,4,7 kenar uzunluklarına sahip bir üçgen ise elde edilememektedir. <br><br>Bu kod verilen iki kenar uzunluğunda üçüncü kenar hangi değer aralığında olursa tanımlı bir üçgen elde edebilir bunu bulmaktadır.<br><br>',
		shortlink: 'ucgenesitsizligi',
		username: 'Osman Yusuf Akkuş',
		code: 'değişken x = 5\n'+
			  'değişken y = 4\n'+
			  ' \n'+
			  'yaz "İki kenarından biri " x ", diğeri " y " olan üçgenin üçüncü kenarı "\n'+
			  'yaz mutlak(x-y) " < z < "(x+y) " aralığındadır."\n',
		date: '03.09.2017'
	},
	{
	  name: "İki rasyonel sayının toplamı",
      description: 'Pay ve payda bilgisini bildiğimiz iki rasyonel sayıyı toplayalım. İlk rasyonel sayının pay1 ve payda1 adlı, ikinci rasyonel sayının ise pay2 ve payda adlı değşikeni bulunmaktadır.<br><br>',
      shortlink: 'rasyonelsayilarintoplanmasi',
	  username: 'Osman Yusuf Akkuş',
	  code: 'değişken pay1 = 2\n'+
			  'değişken payda1 = 3\n'+
			  'değişken pay2 = 5\n'+
			  'değişken payda2 = 2\n'+
			  '\n'+
			  'değişken a = payda1 * payda2\n'+
			  'değişken b = pay1 * payda2 \n'+
			  'değişken c = pay2 * payda1\n'+
			  '\n'+
		  	  'yaz pay1"/"payda1 " + "pay2"/"payda2 " = " b+c "/" a\n',
	   date: '09.09.2017'
	}
]



beginner  = [
	{
      "name": "3 sayının ortalamasını alma",
      "description": '3 kişinin sahip olduğu paranın ortalamasını bulalım.<br><br>',
	  "code": 'değişken sayı1 = 5\ndeğişken sayı2 = 7\ndeğişken sayı3 = 12\n\ndeğişken ort = (sayı1 + sayı2 + sayı3) / 3\n\nyaz "ortalama: " ort'
    },
	{
      "name": "Yurt dışından yapılan alışverişin tutarı",
      "description": 'Yurtdışından dolar para birimi üzerinden satılan bir kaç ürün almak isteyelim. Bunların TL karşılığında neye tekabül ettiğini bulalım. Tabiki doların TL karşılığını değişken değeri olarak vereceğiz. Almak istediğimiz ürünlerin de dolar cinsinden tutarına sahibiz.<br><br>',
	  "code": "değişken dolarKuru = 3.45\ndeğişken saatFiyati = 60\ndeğişken telefonFiyati = 300\ndeğişken toplam = (saatFiyati + telefonFiyati) * dolarKuru\n\nyaz toplam"
    },
	getExample('evbutcesihesaplama'),
	{
      "name": "Celcius sıcaklık birimini Fahrenheit'e çevirme",
      "description": 'Celcius sıcaklık birimini Fahrenheit sıcaklık birimine çeviren kodu yazalım.<br><br>',
	  "code": "değişken celcius = 30\n\ndeğişken fahrenheit = celcius * 1.8 + 32\n\nyaz fahrenheit"
    },
	getExample('fahrenheitdencelciusacevirme'),
	getExample('dikdortgencevresi'),
	{
      "name": "Dairenin çevresi ve alanı",
      "description": 'Yarıçapı bilinen bir dairenin çevresini ve alanını hesaplayalım.<br><br>',
	  "code": "değişken r = 40\n"+
		      "değişken pi = 3.14\n"+
		      "\n"+
		      "değişken daire_alanı = pi * r * r\n"+
		      "değişken daire_çevresi = 2 * pi * r\n"+
		      "\n"+
		      "yaz daire_alanı\n"+
		      "yaz daire_çevresi\n"
    },
	{
      "name": "Silindir alanı ve hacmi",
      "description": 'Taban yarıçapı ve yüksekliği verilmiş olan silindirin alanını ve hacmini hesaplayınız.<br><br>',
	  "code": "değişken h = 5\n"+
		      "değişken r = 40\n"+
		      "değişken pi = 3.14\n"+
		      "\n"+
		      "değişken silindir_taban_alanı = pi * r * r\n"+
		      "değişken silindir_hacmi = silindir_taban_alanı * h\n"+
		      "\n"+
		      "yaz silindir_hacmi \n"+
		      "yaz silindir_taban_alanı\n"
    },
	{
      "name": "Arabanın ne yaktığını bulma",
      "description": 'Kendi arabamız ya da aile arabamızın ne kadar yaktığını hesaplayalım. Varsayalım ki babanız sizden böyle bir program yazmanızı istedi. <br><br>Genel yaklaşım -ya da algoritma diyelim- şu şekilde olabilir: <br>Bir miktar yol katederiz, bunun bir şekilde kaydını tutarız, o sırada ne kadar tutarda yakıt harcadığımızı tespit ederiz. Örneğin, 236 km yol aldık ve 75 TL yakıt harcadık. <br><br> Hadi 1 km yolu ne kadarlık yakıtla katettiğimizi bulalım.<br><br>',
	  "code": 'değişken toplamYol = 236\n'+
			  'değişken toplamTutar = 75\n'+
			  'değişken fiyat = toplamTutar / toplamYol\n\n'
			  +'yaz fiyat'
    },
	getExample('koordinatduzlemindesimetriler'),
	getExample('ucgenesitsizligi')
];

ortaSeviye = [
	{
      "name": "Ehliyet almaya yeterli misin?",
      "description": 'Ehliyet kursu yönetiyoruz. Öğrenciler bize ehliyet alabilmek için başvuruyor. Kodumuz ehliyet başvuru sisteminde çalışıyor varsayalım. Kişinin yaş bilgisine göre, "ehliyet alabilirsiniz" ya da "yaşınız ehliyet almaya yeterli değildir" gibi durum mesajlarını yazdırmak istiyoruz.<br><br>',
	  "code": 'değişken yaş = 19\n\n'+
			  'eğer(yaş > 18)\n'+
			  '	yaz "Ehliyet alabilirsiniz"\n'+
			  'değilse\n'+
			  '	yaz "Yaşınız ehliyet almaya yeterli değildir"'
    },
	{
      "name": "Öğrencinin notunu hesaplama",
      "description": 'Öğretmeniz bize bir sınav yapsın. Sınavdan önce şöyle bir şey desin: <br><br>"80 den fazla not alanları ödüllendireceğim ve 10 puan ekstra vereceğim, altında alan her kişiden ise ceza amaçlı 5 puan kıracağım." Kişinin son puan durumunu hesaplayan kodu yazalım.<br><br>',
	  "code": "değişken puan = 75\n\neğer(puan > 80)\n	puan = puan + 10\ndeğilse\n	puan = puan - 5\n\nyaz puan"
    },
	getExample('ogrencidersigecipgecmedigi'),
	getExample('rasyonelsayilarintoplanmasi'),
	{
      "name": "3 sayıdan en büyüğünü bulalım",
      "description": 'Birbirlerine kıyasla başlangış değerlerini bilmediğimiz 3 sayı arasından en büyüğünü bulan programı geliştirelim.<br><br>',
	  "code": "değişken sayı1 = 12\n" +
			  "değişken sayı2 = 10\n" +
			  "değişken sayı3 = 15\n\n" +
			  "değişken no = sayı1\n\n" +
			  "eğer(sayı2 > no)\n	no = sayı2\n\neğer(sayı3 > no)\n	no = sayı3\n\nyaz no"
    },
	getExample('koordinatduzlemi'),
	{
      "name": "10'dan 30'a 4'er 4'er",
      "description": 'Yinele komutunu kullanarak 10 dan 30\'a kadar 4\'er 4\'er artırarak oluşan sayı dizisini üretmeye çalışalım. Dizi şu şekilde olmalı:<br><br>'
		+'10 14 18 22 26 30<br><br>',
	  "code": "değişken no = 6\n"+
              "\n"+
              "yinele(no < 30)\n"+
              "{\n"+
              "	no = no + 4\n"+
              "	yaz no\n"+
              "}\n"
    },
	{
		"name": "Faktoriyel bulma",
        "description": 'Bize verilen bir sayının faktoriyelini bulalım.<br><br>'+
		'Tanım olarak 1 den n\'e kadar olan doğal sayıların çarpımına <strong>n faktöriyel</strong> denir ve  n! şeklinde gösterilir.<br>'+
		'Yani 5! dediğimizde şuna eşit olur:<br><br>'+
		'5! = 5 x 4 x 3 x 2 x 1 = 120<br><br>',

		"code": 'değişken sayı = 4   // faktöriyeli bulunacak değer\n'+
				'değişken sonuç = 1  // sonuç burada saklanacak\n\n'+
				'yinele(sayı != 1)\n'+
				'{\n'+
				'  sonuç = sonuç * sayı\n'+
				'  sayı = sayı - 1\n'+
				'}\n\n'+
				'yaz sonuç'
	},
	{
		"name": "Faktoriyel bulma 2",
        "description": 'Bize verilen bir sayının faktoriyelini bulalım. Bu sefer birazcık farklı bir yöntem izliyoruz.<br><br>',
		"code": "değişken sayı = 5   // faktöriyeli bulunacak değer\n"+
				"değişken sonuç = 1  // sonuç burada saklanacak\n"+
				"değişken sayaç = 1\n"+
				"\n"+
				"yinele(sayaç <= sayı)\n"+
				"{\n"+
				"  sonuç = sonuç * sayaç\n"+
				"  sayaç = sayaç + 1\n"+
				"}\n"+
				"\n"+
				"yaz sonuç"
	}
]

ileriSeviye = [
	{
		"name": "1'den 50'ye kadar 7'ye bölünen sayılar",
        "description": '1 sayısı ile 50 sayısı arasında bulunup, 7\'ye kalansız olarak bölünebilen sayıları bulan kodu yazalım.<br>',
		"code": 'değişken sayı = 1\n'+
				'\n'+
				'yinele(sayı <= 50)\n'+
				'{\n'+
				'    eğer(sayı % 7 == 0)\n'+
				'      yaz sayı\n'+
				'\n'+
				'    sayı = sayı + 1\n'+
				'}\n'
	},
	{
		"name": "Kareler toplamı",
        "description": "1'den başlayarak n sayısını kadar olan sayıların karelerini toplamak istiyoruz. Yani 1^2 + 2^2 + 3^2 + .... + n^2 <br><br>Bunu yinele döngüsü kullanarak yazabiliriz.<br>",
		"code": 'değişken sayı = 1\n'+
				'değişken n = 10\n'+
				'değişken toplam = 0\n'+
				'\n'+
				'yinele(sayı <= 10)\n'+
				'{\n'+
				'	toplam = toplam + sayı * sayı\n'+
				'    sayı = sayı + 1\n'+
				'}\n'+
				'yaz toplam\n'
	},
	{
		"name": "Çarpmaya göre tersler toplamı",
        "description": "1'den başlayarak n sayısını kadar olan sayıların çarpmaya göre terslerini toplamak istiyoruz. Yani 1 + 1/2 + 1/3 + .... + 1/n <br><br>Bunu yinele döngüsü kullanarak yazabiliriz.<br>",
		"code": 'değişken sayı = 1\n'+
				'değişken n = 10\n'+
				'değişken toplam = 0\n'+
				'\n'+
				'yinele(sayı <= 10)\n'+
				'{\n'+
				'	toplam = toplam + 1/sayı\n'+
				'    sayı = sayı + 1\n'+
				'}\n'+
				'yaz toplam\n'
	},
	{
		"name": "2 sayının Ebob'unu bulalım",
        "description": 'Verilen iki sayının en büyük ortak bölenini bulan kodu yazalım.' +
	                   "Hatırlarsanız en büyük ortak böleni bulmak için 2 sayıyı birden bölebilmenin yollarını arıyoruz. En azından lisede böyle öğrendik. <br><br>"+
	                   "Ama daha kolay bir yöntemi Euler şöyle önermiş:<br><br>"+
	                   "2 sayıyı al birbirinden farklı olduğu sürece bunları birbrinden çıkar, ve güncelle. Nasıl mı? Örnek verelim:<br><br>"+
	                   "14, 6 olsun sayılarımız<br>"+
	                   "8, 6<br>"+
	                   "2, 6<br>"+
	                   "2, 4<br>"+
	                   "2, 2<br><br>"+
	                   "İşte son durum, yani sayıların eşitlendiği durum bizim en büyük ortak bölenimizi veriyor. <br><br>",
		"code": 'değişken sayı1 = 12\n'+
				'değişken sayı2 = 6\n\n'+
				'yinele(sayı1 != sayı2)\n'+
				'{\n'+
				'  eğer(sayı1 > sayı2)\n'+
				'    sayı1 = sayı1 - sayı2\n'+
				'  değilse\n'+
				'    sayı2 = sayı2 - sayı1\n'+
				'}\n\n'+
				'yaz sayı1'
	},
	{
		"name": "10 luk -> 2 lik sayı sistemi",
        "description":  "10 luk sayı sistemini 2 lik sayı sistemine çeviren kodu yazınız<br>",
		"code": "değişken sayı = 5\n"+
				"değişken kalan = 0\n"+
				"\n"+
				"yinele(sayı != 0)\n"+
				"{\n"+
				"  kalan = sayı % 2\n"+
				"  yaz kalan \n"+
				"  sayı = taban(sayı / 2)\n"+
				"}\n"
	},
	{
		"name": "Asal olma testi",
        "description": 'Bir sayının asal olup olmaması onun bölenlerine bağlıdır. Yani bir sayı 1\'e ve yalnız kendisine bölünüyorsa bu asaldır. '+
		'Örnek verecek olursak: <br><br> 4 sayısı asal değildir. Çünkü böleni 2. <br>Fakat 7 sayısı asaldır. Çünkü 7 ve 1 dan başka böleni yoktur. <br><br>'+
		'Peki bunu kodlamaya nasıl dökeriz? Bir değişken oluşturur buna test etmek istediğimiz sayıyı koyarız. Sonra 2 den başlayarak kendisinden bir önceki sayıya kadarki tüm sayılara bölünüyor mu tek tek bakarız. Eğer arada tek bir sayı bölerse asal değildir.<br><br>',

		"code": "değişken sayı = 35\n"+
				"değişken böl = 2\n"+
				"değişken asalMı = doğru // şimdilik öyle varsayalım\n"+
				"\n"+
				"yinele(böl < sayı)\n"+
				"{\n"+
				"  değişken kalan = sayı % böl;\n"+
				"  eğer(kalan == 0) // tam böldü\n"+
				"    asalMı = yanlış\n"+
				"\n"+
				"  böl = böl + 1\n"+
				"}\n"+
				"\n"+
				"yaz asalMı\n"
	},

]

function getExample(str)
{
	for(var i=0; i<userSend.length; i++)
		if(userSend[i].shortlink == str)
			return userSend[i];
	return userSend[0];
}

/*
değişken x = 4
değişken y = 5

yaz "x eksenine göre simetri"
yaz x
yaz y * -1

yaz "y eksenine göre simetri"
yaz x * -1
yaz y

yaz "x ve y eksenine göre simetriği"
yaz x * -1
yaz y * -1


////



*/
/*

değişken x = 5
değişken y = 0

eğer(x > 0)
{
  	eğer(y > 0)
  		yaz "Birinci Bölge"
	değilse
 		yaz "Dördüncü Bölge"
}
değilse eğer(x < 0)
{
	eğer(y > 0)
		yaz "İkinci Bölge"
	değilse
		yaz "Üçüncü Bölge"
}
değilse eğer(y != 0)
  yaz "y ekseni üzerinde"
değilse
  yaz "Origin"

eğer(y == 0 ve x != 0)
  yaz "x ekseni üzerinde"


*/

/*
http://www.matematikciler.com/images/7/koordinat-sistemi-bolgeler.jpg
*/

adaySorular = [
	{
      "name": "Ebob bulma",
      "description": 'Verilen iki sayının en büyük ortak bölenini bulan kodu yazalım.' +
	  "Hatırlarsanız en büyük ortak böleni bulmak için 2 sayıyı birden bölebilmenin yollarını arıyoruz. En azından lisede böyle öğrendik. \n\n"+
	  "Ama daha kolay bir yöntemi Euler şöyle önermiş:\n"+
	  "2 sayıyı al birbirinden farklı olduğu sürece bunları birbrinden çıkar, ve güncelle. Nasıl mı? Örnek verelim:\n"+
	  "14, 6 olsun sayılarımız\n"+
	  "8, 6\n"+
	  "2, 6\n"+
	  "2, 4\n"+
	  "2, 2\n"+
	  "İşte son durum, yani sayıların eşitlendiği durum bizim en büyük ortak bölenimizi veriyor.	\n",


	  'code': 'değişken num1 = 12\ndeğişken num2 = 10\n\nyinele(num1 != num2){\n  eğer(num1 > num2)\n    num1 = num1 - num2\n  değilse\n    num2 = num2 - num1\n yaz num1}'
	},
	{
	"name": "soru",
	"description": '-',
	"code": '// 15 5 100 2\n'+
			'// 30 10 90 4\n'+
			'// 45 15 80 8\n'+
			'// 60 20 70 16\n'+
			'// 75 25 60 32\n'+
			'// 90 30 50 64\n'+
			'\n'+
			'sayarakYinele(değişken no=1, no <= 6, no=no+1)\n'+
			'{\n'+
			' yaz 15*no + " " + 5*no + " " + 100 - 10*(no-1) + " " + üstel(2, no) \n'+
			'}\n'
	}
]


/*

'<br>İkilik tabanda ise şu şekilde ifade edilir:<br><br>'+
						'<pre>'+
						'1   1   1   0<br>'+
						'|   |   |   |<br>'+
						'|   |   |   |<br>'+
						'v   v   v   v<br>'+
						'2^3 2^2 2^1 2^0 = 13</pre><br>'+
						'Bizim kodumuz ise bunun tam tersini yapacak<br><br>',


*/
