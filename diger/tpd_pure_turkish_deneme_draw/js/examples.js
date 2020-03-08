
userSend = [
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
		code: "fahrenheit 120 olsun\n"+
			  "celcius (fahrenheit-32) / 1.8 olsun\n"+
			  "celcius yaz\n",
		date: '17.08.2017'
	},
	{
		name: 'Faktoriyel hesabı',
		description: "Bize verilen bir sayının faktoriyelini bulalım.<br><br>Tanım olarak 1 den n'e kadar olan doğal sayıların çarpımına n faktöriyel denir ve n! şeklinde gösterilir. Yani 5! dediğimizde şuna eşit olur:<br><br>"+
		"5! = 5 x 4 x 3 x 2 x 1 = 120<br>",
		shortlink: 'huseyinfaktoriyel',
		username: 'Hüseyin Cahit Kebapçıoğlu',
		code: "a 5 olsun\n"+
			  "c a+1 olsun\n"+
			  "b 1 olsun\n"+
			  "faktöriyel 1 olsun\n\n"+
			  "(c!= b) olduğu sürece\n"+
			  "{\n"+
			  "  faktöriyel faktöriyel * b olsun\n"+
			  "  b (b + 1) olsun\n"+
			  "}\n\n"+
			  "faktöriyel yaz\n",
		date: '19.08.2017'
	},
	{
		name: 'Aylık ev bütçesi hesabı',
		description: 'Gelirleri ve giderleri belirli olan birisinin aylık harcamaları sonrasında ne kadar parasının kaldığını bulan kod.<br><br>',
		shortlink: 'evbutcesihesaplama',
		username: 'Çağatay Özevim',
		code:	"aylıkgelir 1400 olsun\n" +
				"harçlık 10 olsun\n"+
				"elektirik 100 olsun\n"+
				"su 50 olsun\n"+
				"dogalgaz 60 olsun\n"+
				"gıda 400 olsun\n"+
				"\n"+
				"kalanpara (aylıkgelir - (harçlık + elektirik + su + dogalgaz + gıda)) olsun\n"+
				"\n"+
				"kalanpara yaz\n",
		date: '20.08.2017'
	},
	{
		name: 'Dikdörtgen çevresi hesabı',
		description: 'Eni ve boyu bilinen bir dikdörtgenin çevresini bulalım.<br><br>',
		shortlink: 'dikdortgencevresi',
		username: 'Sonat Türkan',
		code: "boy 20 olsun\n"+
			  "en 35 olsun\n\n"+
			  "sonat (boy + en) * 2 olsun\n"+
			  "\n"+
			  "sonat yaz\n",
		date: '21.08.2017'
	},
	{
		name: 'Öğrenci\'nin dersi geçip geçmediği',
		description: 'Bir öğrencinin ortalamasının 50 puanı aşması durumunda geçti, diğer durumda ise kaldı yazan kod uygulaması.',
		shortlink: 'ogrencidersigecipgecmedigi',
		username: 'Berkay Çatak',
		code: "not1 60 olsun\n"+
			  "not2 90 olsun\n"+
			  "ort (not1+not2)/2 olsun\n\n"+
			  "(ort > 50) ise\n"+
              ' "geçti" yaz\n'+
              "değilse\n"+
              ' "kaldı" yaz\n\n'+
			  "ort yaz\n"+
              "çiz rastgele\n"+
            "çiz rastgele\n"+
            "çiz rastgele\n"+
              "çiz dikdörtgen 30 not1\n"+
             "çiz daire 99 not1",
		date: '24.08.2017'
	},
	{
		name: 'Araç yakıtı hesaplama',
		description: 'Kendi arabamız ya da aile arabamızın ne kadar yaktığını hesaplayalım. Varsayalım ki babanız sizden böyle bir program yazmanızı istedi. Genel yaklaşım -ya da algoritma diyelim- şu şekilde olabilir: Bir miktar yol katederiz, bunun bir şekilde kaydını tutarız, o sırada ne kadar tutarda yakıt harcadığımızı tespit ederiz. Örneğin, 236 km yol aldık ve 75 TL yakıt harcadık. Hadi 1 km yolu ne kadarlık yakıtla katettiğimizi bulalım.',
		shortlink: 'aracyakithesaplama',
		username: 'Osman Kalhan',
		code: "yapılankm 70 olsun\n"+
			  "yakıttutar 20 olsun\n\n"+
			  "sonuç yakıttutar / yapılankm olsun\n\n"+
			  'sonuç yaz\n',
		date: '24.08.2017'
	},
	{
		name: 'Kenar uzunluklarından üçgen alanı',
		description: 'Heron yöntemi adı verilen yöntemi kullanarak üçgen alanı hesaplamak mümkündür.',
		shortlink: 'uzunluktanucgenalani',
		username: 'Harun Kaya',
		code: "//Heron yöntemi ile üçgen alanı hesaplama. \n\n"+
			  "a 3 olsun// birinci kenar\n"+
			  "b 4 olsun// ikinci kenar\n"+
			  "c 5 olsun// üçüncü kenar\n"+
			  "u (a+b+c) / 2 olsun// çevre uzunluğunun yarısı\n"+
			  "alan karekök(u * (u-a) * (u-b) * (u-c)) olsun\n"+
			  "alan yaz \n",
		date: '26.08.2017'
	},
	{
		name: 'Vücut kitle endeksi hesapmala',
		description: 'Vücut kitle endeksi bir bireyin boy ve kilosunun ortalaması ile elde edilen bir hesaplamadır. Bu hesaplama ile bir kişinin kabaca kilo yönünden ne durumda olduğu hakkında kabaca bilgi edinebiliriz. Bu bilgiler kısaca zayıf, ideal kilo, şişman ve aşırı şişman şeklinde olacaktır.',
		shortlink: 'vucutkitleendeksi',
		username: 'Mehmet Akif AKKUŞ',
		code: 'kilo 70 olsun  // kg cinsinden\n'+
			  'boy 1.72 olsun // metre cinsinden\n'+
			  '\n'+
			  'BMI (kilo / (boy * boy)) olsun\n'+
			  '\n'+
			  '(BMI < 19) ise\n'+
			  '  "zayıf" yaz\n'+
			  'değilse eğer(BMI >= 19 ve BMI < 25) yaz\n'+
			  '  "ideal kilo"\n'+
			  'değilse eğer(BMI >= 25 ve BMI < 30) yaz\n'+
			  '  "şişman"\n'+
			  'değilse eğer(BMI >= 30 ve BMI < 35)\n'+
			  '  "aşırı şişman" yaz\n'+
  			  'değilse\n'+
              '  "müthiş obez" yaz\n',
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
		code: 'x 4 olsun\n'+
			  'y 5 olsun\n'+
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
		code: 'x = 5 olsun\n'+
			  'y = 4 olsun\n'+
			  ' \n'+
			  '"İki kenarından biri " x ", diğeri " y " olan üçgenin üçüncü kenarı "\n'+
			  'mutlak(x-y) " < z < "(x+y) " aralığındadır." yaz\n',
		date: '03.09.2017'
	},
	{
	  name: "İki rasyonel sayının toplamı",
      description: 'Pay ve payda bilgisini bildiğimiz iki rasyonel sayıyı toplayalım. İlk rasyonel sayının pay1 ve payda1 adlı, ikinci rasyonel sayının ise pay2 ve payda adlı değşikeni bulunmaktadır.<br><br>',
      shortlink: 'rasyonelsayilarintoplanmasi',
	  username: 'Osman Yusuf Akkuş',
	  code:   'pay1 2 olsun\n'+
			  'payda1 3 olsun\n'+
			  'pay2 5 olsun\n'+
			  'payda2 2 olsun\n'+
			  '\n'+
			  'a payda1 * payda2 olsun\n'+
			  'b pay1 * payda2 olsun\n'+
			  'c pay2 * payda1 olsun\n'+
			  '\n'+
		  	  'pay1"/"payda1 " + "pay2"/"payda2 " = " b+c "/" a yaz\n',
	   date: '09.09.2017'
	},
	{
	  name: "Haydi Çocuklar Çizim Yapalım",
      description: 'Daire, dikdörtgenlerden ve üçgenden oluşan bir resim yapalım.<br><br>',
      shortlink: 'cizimyapalim',
	  username: 'Mehmet Akif Akkuş',
	  code:    'çiz dikdörtgen 40 50\nçiz daire 20\nçiz daire 30\nçiz daire 50',
	   date: '08.02.2020'
	}
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
