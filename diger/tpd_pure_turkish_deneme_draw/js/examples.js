userSend = [ 
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
