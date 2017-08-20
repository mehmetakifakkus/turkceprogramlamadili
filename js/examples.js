beginner  = [
	{
      "name": "3 sayının ortalamasını alma",
      "description": '3 kişinin sahip olduğu paranın ortalamasını bulalım.',
	  "code": "değişken para1 = 35\ndeğişken para2 = 45\ndeğişken para3 = 25\n\ndeğişken ort = (para1 + para2 + para3) / 3\n\nyaz ort"
    },{
      "name": "Yurt dışından yapılan alışverişin tutarı",
      "description": 'Yurtdışından dolar para birimi üzerinden satılan bir kaç ürün almak isteyelim. Bunların TL karşılığında neye tekabül ettiğini bulalım. Tabiki doların TL karşılığını değişken değeri olarak vereceğiz. Almak istediğimiz ürünlerin de dolar cinsinden tutarına sahibiz.',
	  "code": "değişken dolarKuru = 3.45\ndeğişken saatFiyati = 60\ndeğişken telefonFiyati = 300\ndeğişken toplam = (saatFiyati + telefonFiyati) dolarKuru\n\nyaz toplam"
    },{
      "name": "Celcius sıcaklık birimini Fahrenheit'e çevirme",
      "description": 'Celcius sıcaklık birimini Fahrenheit sıcaklık birimine çeviren kodu yazalım.',
	  "code": "değişken celcius = 30\n\ndeğişken fahrenheit = celcius * 1.8 + 32\n\nyaz fahrenheit"
    },{
      "name": "Arabanın ne yaktığını bulma",
      "description": 'Kendi arabamız ya da aile arabamızın ne kadar yaktığını hesaplayalım. Varsayalım ki babanız sizden böyle bir program yazmanızı istedi. <br>Genel yaklaşım -ya da algoritma diyelim- şu şekilde olabilir: <br>Bir miktar yol katederiz, bunun bir şekilde kaydını tutarız, o sırada ne kadar tutarda yakıt harcadığımızı tespit ederiz. Örneğin, 236 km yol aldık ve 75 TL yakıt harcadık. <br><br> Hadi 1 km yolu ne kadarlık yakıtla katettiğimizi bulalım.',
	  "code": "değişken toplamYol = 236\ndeğişken toplamTutar = 75\ndeğişken fiyat = toplamTutar / toplamYol\n\nyaz fiyat"
    },
	{
      "name": "Ehliyet almaya yeterli misin?",
      "description": 'Ehliyet kursu yönetiyoruz. Öğrenciler bize ehliyet alabilmek için başvuruyor. Kodumuz ehliyet başvuru sisteminde çalışıyor varsayalım. Kişinin yaş bilgisine göre, "ehliyet alabilirsiniz" ya da "yaşınız ehliyet almaya yeterli değildir" gibi durum mesajlarını yazdırmak istiyoruz.',
	  "code": 'değişken yaş = 19\n\neğer(yaş > 18)\n	yaz "Ehliyet alabilirsiniz"\ndeğilse\n	yaz "Yaşınız ehliyet almaya yeterli değildir"'
    },
	{
      "name": "Öğrencinin notunu hesaplama",
      "description": 'Öğretmeniz bize bir sınav yapsın. Sınavdan önce şöyle bir şey desin: "80 den fazla not alanları ödüllendireceğim ve 10 puan ekstra vereceğim, altında alan her kişiden ise ceza amaçlı 5 puan kıracağım." Kişinin son puan durumunu hesaplayan kodu yazalım.',
	  "code": "değişken puan = 75\n\neğer(puan > 80)\n	puan = puan + 10\ndeğilse\n	puan = puan - 5\n\nyaz puan"
    },
	{
      "name": "3 sayıdan en büyüğünü bulalım",
      "description": 'Birbirlerine kıyasla başlangış değerlerini bilmediğimiz 3 sayı arasından en büyüğünü bulan programı geliştirelim.',
	  "code": "değişken num1 = 12\ndeğişken num2 = 10\ndeğişken num3 = 15\n\ndeğişken no = 0\n\neğer(num1 > no)\n	no = num1\n\neğer(num2 > no)\n	no = num2\n\neğer(num3 > no)\n	no = num3\n\nyaz no"
    }
];






ortaSeviye = [
	{
		"name": "Faktoriyel bulma",
        "description": 'Bize verilen bir sayının faktoriyelini bulalım.<br><br>'+
		'Tanım olarak 1 den n\'e kadar olan doğal sayıların çarpımına <strong>n faktöriyel</strong> denir ve  n! şeklinde gösterilir.',
		"code": "değişken sayı = 4    // faktöriyeli bulunacak değer\ndeğişken sonuç = 1  // sonuç burada saklanacak\n\nyinele(sayı != 1)\n{\n  sonuç = sonuç * sayı\n  sayı = sayı - 1\n}\n\nyaz sonuç"
	},
	{
		"name": "Faktoriyel bulma 2",
        "description": 'Bize verilen bir sayının faktoriyelini bulalım. Bu sefer birazcık farklı bir yöntem izliyoruz.',
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
        "description": "Bize verilen 2 sayının en büyük ortak bölenini yani EBOB'unu bulalım.",
		"code": "değişken num1 = 12\ndeğişken num2 = 6\n\nyinele(num1 != num2)\n{\n  eğer(num1 > num2)\n    num1 = num1 - num2\n  değilse\n    num2 = num2 - num1\n}\n\nyaz num1"
	},
	{
		"name": "10 luk -> 2 lik sayı sistemi",
        "description": '10 luk sayı sistemini 2 lik sayı sistemine çeviren kodu yazınız',
		"code": "değişken sayı = 5\n"+
				"değişken kalan = 0\n"+
                "\n"+
                "yinele(sayı != 0)\n"+
                "{\n"+
                "  kalan = sayı % 2;\n"+
                "  sayı = taban(sayı / 2)\n"+
                "  yaz kalan \n"+
                "}\n"
	}
]








adaySorular = [
	{
      "name": "Ebob bulma",
      "description": 'Verilen iki sayının en büyük ortak bölenini bulan kodu yazalım.',
	  'code': 'değişken num1 = 12\ndeğişken num2 = 10\n\nyinele(num1 != num2){\n  eğer(num1 > num2)\n    num1 = num1 - num2\n  değilse\n    num2 = num2 - num1\n yaz num1}'
	}
]
