// zoznam funkcii na aktivaciu identifikatorov stranok OVOCE, SUPERHRUSKA
// last modif. 13 APR 2022

function ukonci(){ // ukonci beh stranky
//na_server(4);
window.close();
}

function zobraz(){ // zobrazi testovacie data na <body>
	ulozCookie('stranka',my_Id);
	let t='';

	t +='<button onclick="ukonci();">Log Out</button><br>';
	t +='<h1>'+document.title+'</h1><br>';
	t +='<button onclick="na_server(3);daj_sumu();">KUPIT</button> <input id="suma" type="text" />';
	t+='<br><br><div>Testovanie prenosu identifikatorov medzi domenami';
	t+='<br><br>(c)fajner family, 13 apr 2022</div>';
	t +='<h2>MEMORY :</h2>';
	t +='<div><br>pages = '+JSON.stringify(pages);
	t +='<br>my_Id = "'+my_Id+'"</div>';
	t +='<h2>COOKIES :</h2>';
	t +='<div><h3>'+document.cookie+'</h3></div>';
	document.body.innerHTML =t;
	daj_sumu();
	my_css("div",{"height":80,"border":"5px outset blue","background-color":"#BFFCF9","text-align":"center","border-radius":40});
	
	my_css("h1",{"color":"red"});
	na_server(1);
	na_server(2);
}

function daj_sumu() { // generuje sumu medzi 100 a 200
	let suma= (Date.now() % 99)+100; // cas v milisekundach
	document.getElementById('suma').value = suma;
	return;
}

function na_server(n1) { // odosle EVENT na server
	let url1='pohyb.php';
	let a1=true;
	let h1='heslo';
	let f1=	document.title;
	let i1= pages[my_Id][1];
	let p1='vstup'; // for (n1==1)
	let u1='';
	let u2='';
	let u3='';
	if (n1==2){
		p1='trasovanie';
		u1=pages['page1'][1];
		u2=pages['page2'][1];
	}
	if (n1==3){
		p1='nakup';
		u1=document.getElementById('suma').value;
	}
	if (n1==4){
		p1='vystup';
	}
	 

//alert(n1);
	$.ajax({ 
		method: "post", url: url1, 
		data: {'ajax': a1,'kluc': h1,'firma':f1,'lokator':i1,'pohyb':p1,'udaj1':u1,'udaj2':u2,'udaj3':u3},
       success: function(data) {
//		alert(data);
			if(data.substr(0,3)=='ERR') alert(data);
			return;
	  },
	  error: function () { 
	//	alert("ERR...communication with server");
	  }
		});
	return;
}

function my_css(p1,p2) { // hromadna zmena css v triede aj dome
	var p4;
	const p0 = document.querySelectorAll(p1);
	p0.forEach(box => {
	for (p3 in p2) {
	  	p4=p2[p3]+"px";
		if(p3=="width") box.style.width=p4;
		if(p3=="height") box.style.height=p4;
		if(p3=="left") box.style.left=p4;
		if(p3=="top") box.style.top=p4;
		if(p3=="background-color") box.style.backgroundColor=p2[p3];
		if(p3=="color") box.style.color=p2[p3];
		if(p3=="font-size") box.style.fontSize=p4;
		if(p3=="border") box.style.border=p2[p3];
		if(p3=="border-radius") box.style.borderRadius = p4;
		if(p3=="text-align") box.style.textAlign = p2[p3];
	}
	});	
}

function getCookie(cname) {
	// prevzate https://www.w3schools.com/js/js_cookies.asp
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
//alert("kuki: "+decodedCookie); 
 let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return undefined;
}

function getCookies() { 
	let n1=undefined;
	for (page in pages) {
		n1=getCookie(page);
		if(n1==undefined) n1=0;
		pages[page][1]=n1;
		pages[page][2]=(n1>0);
	}
	zobraz(); // zobrazi testovacie data v <body>
}


function setCookie(name, value, options = {}) { 
// prevzate z https://www.w3docs.com/learn-javascript/cookies-document-cookie.html
  options = {
    path: '/', 
	max_age: 3600*24*100 
    // add other default values if necessary
    //...options
  };
  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }
  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  for (let optKey in options) {
    updatedCookie += "; " + optKey;
    let optValue = options[optKey];
    if (optValue !== true) {
      updatedCookie += "=" + optValue;
    }
  }
  document.cookie = updatedCookie;
}

function ulozCookie(name, value) { 
  let noveCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
//  noveCookie += ";max_age=30000000"; 
  noveCookie += "; expires=Thu, 15 Dec 2022 12:00:00 UTC";
  document.cookie = noveCookie;
}

function openWindow(name1,name2,pages1) { // otvori okno(name1) s dvomi parametrami v URL
//	const path1="http://192.168.2.18:8080/_radixal/test1/";
	const path1='';
//alert(JSON.stringify(pages1)+name1);
	let page1 = pages1[name1][0];
	let parameter1 = '?'+encodeURIComponent(name1)+'='+encodeURIComponent(pages1[name1][1]);
		parameter1 +='&'+encodeURIComponent(name2)+'='+encodeURIComponent(pages1[name2][1]);
	window.open(path1+page1+parameter1);
}

function readUrlParam(name) { // skontroluje URL na parameter 'name'
	const name1 = encodeURIComponent(name);
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	return (urlParams.has(name1) ? urlParams.get(name1) : undefined);
}

function get_Id() {
	return Date.now(); // cas v milisekundach
}

function proces_id(my_Id,pages) {
// 1. zaplnim 'pages' z cookies
	let n1=undefined,n2=undefined;
	getCookies();
	
// 2.
if(! pages[my_Id][2]) { // vyziadam novy identifikator
// 3.
		n1= get_Id(); 
		pages[my_Id][1]=n1; pages[my_Id][2]=(n1>0);
		ulozCookie(my_Id,n1);
	}
	
// 4.	
	let Nas_Id= readUrlParam(my_Id);

	if(Nas_Id != undefined) {
// 5.
		for (page in pages) {
			if (page==my_Id) continue;
			n1= readUrlParam(page);
			if(n1 !=undefined) {n2=page; pages[n2][1]=n1;pages[n2][2]=(n1>0);ulozCookie(n2,n1);}
		}
// 7.
		if(Nas_Id==0) openWindow(n2,my_Id,pages);
// 8.	
		window.close();
	}

// 9.
	n2=undefined;
	for (page in pages) {
		if (page==my_Id) continue;
		n1=pages[page][1];
// 10.
		if (n1==0){ n2=page; openWindow(n2,my_Id,pages);} 
	}
	if (n2 !=undefined) {
		const myTimeout = setTimeout(getCookies, 5000);
	}
//	window.addEventListener("beforeunload", na_server(4) );	// posle event na server
//window.addEventListener('unload', na_server(4));
}
