exampleCodes  = [
	{
      "name": "3 sayının ortalamasını alma",
      "description": '3 kişinin sahip olduğu paranın ortalamasını bulalım.',
	  "code": "değişken para1 = 35\ndeğişken para2 = 45\ndeğişken para3 = 25\n\ndeğişken ort = (para1 + para2 + para3) / 3\n\nyaz ort"
    },{
      "name": "Yurt dışından yapılan alışverişin tutarı",
      "description": 'Yurtdışından dolar para birimi üzerinden satılan bir kaç ürün almak isteyelim. Bunların TL karşılığında neye tekabül ettiğini bulalım. Tabiki doların TL karşılığını değişken değeri olarak vereceğiz. Almak istediğimiz ürünlerin de dolar cinsinden tutarına sahibiz.',
	  "code": "değişken dolarKuru = 3.45\ndeğişken saatFiyati = 60\ndeğişken telefonFiyati = 300\ndeğişken toplam = saatFiyati * dolarKuru + telefonFiyati * dolarKuru\n\nyaz toplam"
    },{
      "name": "Celcius sıcaklık birimini Fahrenheit'e çevirme",
      "description": 'Celcius sıcaklık birimini Fahrenheit sıcaklık birimine çeviren kodu yazalım.',
	  "code": "değişken celcius = 30\n\ndeğişken fahrenheit = celcius * 1.8 + 32\n\nyaz fahrenheit"
    },{
      "name": "Arabanın ne yaktığını bulma",
      "description": 'Kendi arabamız ya da aile arabamızın ne kadar yaktığını hesaplayalım. Varsayalım ki babanız sizden böyle bir program yazmanızı istedi. Genel yaklaşım -ya da algoritma diyelim- şu şekilde olabilir: Bir miktar yol katederiz, bunun bir şekilde kaydını tutarız, o sırada ne kadar tutarda yakıt harcadığımızı tespit ederiz. Örneğin, 236 km yol aldık ve 75 TL yakıt harcadık. Hadi 1 km yolu ne kadarlık yakıtla katettiğimizi bulalım.',
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
	  "code": "değişken num1 = 12\ndeğişken num2 = 10\n değişken num3 = 15\n\ndeğişken no = 0\n\neğer(num1 > no)\n\n	no = num1\neğer(num2 > no)\n\n	no = num2\neğer(num3 > no)\n\n	no = num3\n\nyaz no"
    }
];
