userSend = [	
    {
	  name: "Haydi Çocuklar Çizim Yapalım-2",
      description: 'Daire, dikdörtgenlerden ve üçgenden oluşan bir resim yapalım.<br><br>',
      shortlink: 'cizimyapalim',
	  username: 'Mehmet Akif Akkuş',
	  code:    "sd (siyah dikdörtgen 40 20) olsun\nkü (kırmızı üçgen 40) olsun\nyana_çiz (sd kü)",
	   date: '08.02.2020'
	}, 
	{
	  name: "Haydi Çocuklar Çizim Yapalım-2",
      description: 'Daire, dikdörtgenlerden ve üçgenden oluşan bir resim yapalım.<br><br>',
      shortlink: 'cizimyapalim',
	  username: 'Mehmet Akif Akkuş',
	  code:    "sd (siyah dikdörtgen 40 20) olsun\nkü (kırmızı üçgen 40) olsun\nçiz sd\nçiz kü",
	   date: '08.02.2020'
	},
    {
	  name: "Haydi Çocuklar Çizim Yapalım-2",
      description: 'Daire, dikdörtgenlerden ve üçgenden oluşan bir resim yapalım.<br><br>',
      shortlink: 'cizimyapalim',
	  username: 'Mehmet Akif Akkuş',
	  code:    "kd (kırmızı daire 20) olsun\nyd (yeşil daire 20) olsun\nçiz yd\nçiz kd",//'çiz kırmızı daire 20\nçiz daire 30\nçiz mavi daire 50\nçiz boşluk 10\nçiz turuncu dikdörtgen 70 30',
	   date: '08.02.2020'
	},
	{
	  name: "Haydi Çocuklar Çizim Yapalım-1",
      description: 'Daire, dikdörtgenlerden ve üçgenden oluşan bir resim yapalım.<br><br>',
      shortlink: 'cizimyapalim',
	  username: 'Mehmet Akif Akkuş',
	  code:    'çiz dikdörtgen 40 50\nçiz üçgen 20\nçiz daire 30\nçiz daire 50',
	   date: '08.02.2020'
	}
]

userSend_part2 = [ 
    {
	  name: "Haydi Çocuklar Çizim Yapalım-7",
      description: 'Daire, dikdörtgenlerden ve üçgenden oluşan bir resim yapalım.<br><br>',
      shortlink: 'cizimyapalim',
	  username: 'Mehmet Akif Akkuş',
	  code:  "yükseklik 1 olsun\n"+
             "\n"+
             "(yükseklik < 11) olduğu_sürece\n"+
             "{\n"+
             "  çiz mavi dikdörtgen 6 (yükseklik * yükseklik)\n"+
             "  yükseklik (yükseklik+1) olsun\n"+
             "}\n"+
             "(yükseklik > 0) olduğu_sürece\n"+
             "{\n"+
             "  çiz kırmızı dikdörtgen 8 (yükseklik * yükseklik)\n"+
             "  yükseklik (yükseklik-1) olsun\n"+
             "}\n",
	   date: '08.02.2020'
	},    
    {
	  name: "Haydi Çocuklar Çizim Yapalım-6",
      description: 'Daire, dikdörtgenlerden ve üçgenden oluşan bir resim yapalım.<br><br>',
      shortlink: 'cizimyapalim',
	  username: 'Mehmet Akif Akkuş',
	  code:    "yükseklik 40 olsun\n"+
                "\n"+
                "(yükseklik < 80) olduğu_sürece\n"+
                "{\n"+
                "  çiz dikdörtgen 30 yükseklik\n"+
                "  yükseklik (yükseklik+20) olsun\n"+
                "}",
	   date: '08.02.2020'
	},
    {
	  name: "Haydi Çocuklar Çizim Yapalım-5",
      description: 'Daire, dikdörtgenlerden ve üçgenden oluşan bir resim yapalım.<br><br>',
      shortlink: 'cizimyapalim',
	  username: 'Mehmet Akif Akkuş',
	  code:    "say 1 olsun\n"+
                "\n"+
                "(say <= 10) olduğu_sürece\n"+
                "{\n"+
                "  çiz dikdörtgen 20 20+say*5\n"+
                "  say (say+1) olsun\n"+
                "}",
	   date: '08.02.2020'
	},
	{
	  name: "Haydi Çocuklar Çizim Yapalım-4",
      description: 'Daire, dikdörtgenlerden ve üçgenden oluşan bir resim yapalım.<br><br>',
      shortlink: 'cizimyapalim',
	  username: 'Mehmet Akif Akkuş',
	  code:  "yana_çiz dikdörtgen 10 20\n"+
             "         üçgen 40\n"+
             "         daire 30\n",
	   date: '08.02.2020'
	},
    {
	  name: "Haydi Çocuklar Çizim Yapalım-3",
      description: 'Daire, dikdörtgenlerden ve üçgenden oluşan bir resim yapalım.<br><br>',
      shortlink: 'cizimyapalim',
	  username: 'Mehmet Akif Akkuş',
	  code:    " üste_çiz dikdörtgen 40 30\n"+
               "          üçgen 40\n",
	   date: '08.02.2020'
	},
	{
	  name: "Haydi Çocuklar Çizim Yapalım-2",
      description: 'Daire, dikdörtgenlerden ve üçgenden oluşan bir resim yapalım.<br><br>',
      shortlink: 'cizimyapalim',
	  username: 'Mehmet Akif Akkuş',
	  code:    "sd (siyah dikdörtgen 40 20) olsun\nkü (kırmızı üçgen 40) olsun\nçiz sd\nçiz kü",
	   date: '08.02.2020'
	},
    {
	  name: "Haydi Çocuklar Çizim Yapalım-2",
      description: 'Daire, dikdörtgenlerden ve üçgenden oluşan bir resim yapalım.<br><br>',
      shortlink: 'cizimyapalim',
	  username: 'Mehmet Akif Akkuş',
	  code:    "kd (kırmızı daire 20) olsun\nyd (yeşil daire 20) olsun\nçiz yd\nçiz kd",//'çiz kırmızı daire 20\nçiz daire 30\nçiz mavi daire 50\nçiz boşluk 10\nçiz turuncu dikdörtgen 70 30',
	   date: '08.02.2020'
	},
	{
	  name: "Haydi Çocuklar Çizim Yapalım-1",
      description: 'Daire, dikdörtgenlerden ve üçgenden oluşan bir resim yapalım.<br><br>',
      shortlink: 'cizimyapalim',
	  username: 'Mehmet Akif Akkuş',
	  code:    'çiz dikdörtgen 40 50\nçiz üçgen 20\nçiz daire 30\nçiz daire 50',
	   date: '08.02.2020'
	}
]

//ahmet (kırmızı daire 20) olsun
//çiz (kırmızı daire 20)
//
//yy 0 olsun
//
//(yy < 5) olduğu_sürece
//{
//  çiz ahmet
//  yy yy+1 olsun 
//}


//kd (kırmızı daire 20) olsun
//yd (yeşil daire 20) olsun

//çiz yd
//çiz kd
//çiz (mavi dikdörtgen 10 20)
//çiz kd

function getExample(str)
{
	for(var i=0; i<userSend.length; i++)
		if(userSend[i].shortlink == str)
			return userSend[i];
	return userSend[0];
}

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




/*  1. aşama
sd (siyah dikdörtgen 40 20) olsun
kü (kırmızı üçgen 40) olsun
yana_çiz ((kırmızı üçgen 40))
//yana_çiz (sd kü)
*/

/* 2. aşama tanımlar aynı
yana_çiz (sd (boşluk 100)(siyah dikdörtgen 40 20) kü) 
*/

/* 3. aşama tanımlar aynı
aaa ((boşluk 50) sd (boşluk 10) sd (boşluk 10) (siyah dikdörtgen 40 20) kü) olsun
yana_çiz (aaa kü aaa)
*/

/* 4. aşama tanımlar aynı
bb (boşluk 50) olsun
aaa (bb sd bb sd bb (siyah dikdörtgen 40 20) kü) olsun
yana_çiz (aaa kü aaa)
*/

/* 5. aşama 
bb (boşluk 50) olsun
aaa (bb sd bb yana_çiz(sd sd sd sd sd) (siyah dikdörtgen 40 20) kü) olsun

yana_çiz (aaa kü aaa)
*/

/* 5. aşama-2
sd (siyah dikdörtgen 40 20) olsun
kü (kırmızı üçgen 40) olsun

bb (boşluk 8) olsun
aaa (sd bb sd bb (siyah dikdörtgen 40 20) kü) olsun

yana_çiz(bb bb bb bb)
üste_çiz (aaa üste_çiz (kü (yeşil daire 30)) aaa)
*/

/*
sd (siyah dikdörtgen 40 40) olsun
sd (siyah dikdörtgen 40 20) olsun
kü (kırmızı üçgen 40) olsun
b1 (boşluk 8) olsun
b2 (boşluk 30) olsun
aaa (sd bb sd bb (siyah dikdörtgen 40 20) kü) olsun

yana_çiz(b2)
üste_çiz (aaa yana_çiz (kü (yeşil daire 30) kü))
yana_çiz(aaa aaa)
*/




/*

iç içe çizdirme yapabiliyor muyuz?

sd (siyah dikdörtgen 40 40) olsun
kü (kırmızı üçgen 40 40) olsun
md (mavi daire 20) olsun
aa (sd kü) olsun

yana_çiz ((boşluk 100) sd kü üste_çiz (aa aa) md md md md md)

*/