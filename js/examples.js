exampleCodes  = [
	{
      "name": "3 sayının ortalamasını alan kod",
      "description": 'Öğretmeniz bize bir sınav yapsın. Sınavdan önce şöyle bir şey desin: "80 den fazla not alanları ödüllendireceğim ve 10 puan ekstra vereceğim, altında alan her kişiden ise ceza amaçlı 5 puan kıracağım." Kişinin son puan durumunu hesaplayan kodu yazalım.',
	  "code": "değişken puan = 75\n\neğer(puan > 80)\n	puan = puan + 10\ndeğilse\n	puan = puan - 5\n\nyaz puan\n"
    },	{
      "name": "Yurt dışından yapılan alışverişin tutarı",
      "description": 'Yurtdışından dolar para birimi üzerinden satılan bir kaç ürün almak isteyelim. Bunların TL karşılığında neye tekabül ettiğini bulalım. Tabiki doların TL karşılığını değişken değeri olarak vereceğiz. Almak istediğimiz ürünlerin de dolar cinsinden tutarına sahibiz.',
	  "code": "değişken dolarKuru = 3.45\ndeğişken saatFiyati = 60\ndeğişken telefonFiyati = 300\ndeğişken toplam = saatFiyati * dolarKuru + telefonFiyati * dolarKuru\n\nyaz toplam\n"
    },{
      "name": "L-monotone",
      "link": "/algorithms/L-monoton",
      "image": "images/lmonoton_tn.png",
      "description": "Polygon P in the plane is called monotone with respect to a straight line L. What is this L?"
    },{
      "name": "Dual Line",
      "link": "/algorithms/duality/dualLine",
      "image": "images/dualLine_tn.png",
      "description": "This application shows dual of a 2D point as a line in xy-coordinate system."
    },{
      "name": "Stabbery Checking",
      "link": "/algorithms/duality/checkStabber",
      "image": "images/stabber_tn.png",
      "description": "Checking line for stabbery? If intersection exists there must be a line intersects all line segments."
    }
];



template  = [
	{
      "name": "3 sayının ortalamasını alan kod",
      "link": "/algorithms/convexHull",
      "image": "images/convexHull_tn.png",
      "description": "Well know Convex Hull problem is coded here. It is very basic algorithm in Computational Geometry."
    },{
      "name": "Smallest Enclosing Disk",
      "link": "/algorithms/smallestEnclosingDisk",
      "image": "images/smallestDisk_tn.png",
      "description": "Problem of finding smallest circle that contains all of a given set of points in the Euclidean plane."
    },{
      "name": "L-monotone",
      "link": "/algorithms/L-monoton",
      "image": "images/lmonoton_tn.png",
      "description": "Polygon P in the plane is called monotone with respect to a straight line L. What is this L?"
    },{
      "name": "Dual Line",
      "link": "/algorithms/duality/dualLine",
      "image": "images/dualLine_tn.png",
      "description": "This application shows dual of a 2D point as a line in xy-coordinate system."
    },{
      "name": "Stabbery Checking",
      "link": "/algorithms/duality/checkStabber",
      "image": "images/stabber_tn.png",
      "description": "Checking line for stabbery? If intersection exists there must be a line intersects all line segments."
    }
];
