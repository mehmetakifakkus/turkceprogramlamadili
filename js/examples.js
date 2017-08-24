beginner  = [
	{
      "name": "3 sayının ortalamasını alma",
      "description": '3 kişinin sahip olduğu paranın ortalamasını bulalım.<br><br>',
	  "code": "değişken para1 = 5\ndeğişken para2 = 7\ndeğişken para3 = 12\n\ndeğişken ort = (para1 + para2 + para3) / 3\n\nyaz ort"
    },{
      "name": "Yurt dışından yapılan alışverişin tutarı",
      "description": 'Yurtdışından dolar para birimi üzerinden satılan bir kaç ürün almak isteyelim. Bunların TL karşılığında neye tekabül ettiğini bulalım. Tabiki doların TL karşılığını değişken değeri olarak vereceğiz. Almak istediğimiz ürünlerin de dolar cinsinden tutarına sahibiz.<br><br>',
	  "code": "değişken dolarKuru = 3.45\ndeğişken saatFiyati = 60\ndeğişken telefonFiyati = 300\ndeğişken toplam = (saatFiyati + telefonFiyati) dolarKuru\n\nyaz toplam"
    },{
      "name": "Celcius sıcaklık birimini Fahrenheit'e çevirme",
      "description": 'Celcius sıcaklık birimini Fahrenheit sıcaklık birimine çeviren kodu yazalım.<br><br>',
	  "code": "değişken celcius = 30\n\ndeğişken fahrenheit = celcius * 1.8 + 32\n\nyaz fahrenheit"
    },{
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
    },{
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
    }
	,{
      "name": "Arabanın ne yaktığını bulma",
      "description": 'Kendi arabamız ya da aile arabamızın ne kadar yaktığını hesaplayalım. Varsayalım ki babanız sizden böyle bir program yazmanızı istedi. <br><br>Genel yaklaşım -ya da algoritma diyelim- şu şekilde olabilir: <br>Bir miktar yol katederiz, bunun bir şekilde kaydını tutarız, o sırada ne kadar tutarda yakıt harcadığımızı tespit ederiz. Örneğin, 236 km yol aldık ve 75 TL yakıt harcadık. <br><br> Hadi 1 km yolu ne kadarlık yakıtla katettiğimizi bulalım.<br><br>',
	  "code": "değişken toplamYol = 236\ndeğişken toplamTutar = 75\ndeğişken fiyat = toplamTutar / toplamYol\n\nyaz fiyat"
    },
	{
      "name": "Ehliyet almaya yeterli misin?",
      "description": 'Ehliyet kursu yönetiyoruz. Öğrenciler bize ehliyet alabilmek için başvuruyor. Kodumuz ehliyet başvuru sisteminde çalışıyor varsayalım. Kişinin yaş bilgisine göre, "ehliyet alabilirsiniz" ya da "yaşınız ehliyet almaya yeterli değildir" gibi durum mesajlarını yazdırmak istiyoruz.<br><br>',
	  "code": 'değişken yaş = 19\n\neğer(yaş > 18)\n	yaz "Ehliyet alabilirsiniz"\ndeğilse\n	yaz "Yaşınız ehliyet almaya yeterli değildir"'
    },
	{
      "name": "Öğrencinin notunu hesaplama",
      "description": 'Öğretmeniz bize bir sınav yapsın. Sınavdan önce şöyle bir şey desin: <br><br>"80 den fazla not alanları ödüllendireceğim ve 10 puan ekstra vereceğim, altında alan her kişiden ise ceza amaçlı 5 puan kıracağım." Kişinin son puan durumunu hesaplayan kodu yazalım.<br><br>',
	  "code": "değişken puan = 75\n\neğer(puan > 80)\n	puan = puan + 10\ndeğilse\n	puan = puan - 5\n\nyaz puan"
    },
	{
      "name": "3 sayıdan en büyüğünü bulalım",
      "description": 'Birbirlerine kıyasla başlangış değerlerini bilmediğimiz 3 sayı arasından en büyüğünü bulan programı geliştirelim.<br><br>',
	  "code": "değişken num1 = 12\ndeğişken num2 = 10\ndeğişken num3 = 15\n\ndeğişken no = 0\n\neğer(num1 > no)\n	no = num1\n\neğer(num2 > no)\n	no = num2\n\neğer(num3 > no)\n	no = num3\n\nyaz no"
    },
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
    }
];






ortaSeviye = [
	{
		"name": "Faktoriyel bulma",
        "description": 'Bize verilen bir sayının faktoriyelini bulalım.<br><br>'+
		'Tanım olarak 1 den n\'e kadar olan doğal sayıların çarpımına <strong>n faktöriyel</strong> denir ve  n! şeklinde gösterilir.<br>'+
		'Yani 5! dediğimizde şuna eşit olur:<br><br>'+
		'5! = 5 x 4 x 3 x 2 x 1 = 120<br><br>',

		"code": "değişken sayı = 4    // faktöriyeli bulunacak değer\ndeğişken sonuç = 1  // sonuç burada saklanacak\n\nyinele(sayı != 1)\n{\n  sonuç = sonuç * sayı\n  sayı = sayı - 1\n}\n\nyaz sonuç"
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
		"code": "değişken num1 = 12\ndeğişken num2 = 6\n\nyinele(num1 != num2)\n{\n  eğer(num1 > num2)\n    num1 = num1 - num2\n  değilse\n    num2 = num2 - num1\n}\n\nyaz num1"
	},
	{
		"name": "10 luk -> 2 lik sayı sistemi",
        "description":  "10 luk sayı sistemini 2 lik sayı sistemine çeviren kodu yazınız<br>",
		"code": "değişken sayı = 5\n"+
				"değişken kalan = 0\n"+
				"\n"+
				"yinele(sayı != 0)\n"+
				"{\n"+
				"  kalan = sayı % 2;\n"+
				"  sayı = taban(sayı / 2)\n"+
				"  yaz kalan \n"+
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
	}


]


'var not = 90\n\n'+
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


userSend = [
	{
		name: 'Öğrenci Notu Hesaplama (Üniversite)',
		description: '-',
		username: 'Ahmet Sarıcı',
		code: 'var not = 90\n\n'+
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
		name: 'Faktoriyel hesabı',
		description: '-',
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
		description: '-',
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
		description: '-',
		username: 'Sonat Türkan',
		code: "değişken boy = 20\n"+
			  "değişken en = 35\n"+
			  "\n"+
			  "değişken sonat = (boy + en) * 2\n"+
			  "\n"+
			  "yaz sonat\n",
		date: '21.08.2017'
	}

]



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
