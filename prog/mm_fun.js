// main 27 april 2018
// 7 aug 2020.. dopracovane prava
window.am={};
window.svg_obrazok="";
window.pict={"list":[]}; // pre zoznam suborov z kniznice [pict]
am.intranet_h="heslo"; // heslo na pripojenie k [calmanach.php] 
am.intranet_p="index.php";
am.intranet_err=0;
am.error=""; // treti riadok chybova sprava   
/* zoznam aktualnosti poloziek: "am_a101.s100":[G,L]
kde G..cas aktualizacii, L..uzivatelov kod lokovania 
*/ 

// popisky
am.full=false; // full screen
am.test= false; // tu sa ukladaju spravy
am.user= [0,"",""];
am.zmena=0;	// pri inom cisle startuje tuto funkciu pri ukonceni programu a zapise na disk
am.typ = ["","undefined","object,","function","symbol","boolean,","number","string"];
// farby POZADIE/PISMO: 0-menu pozadie,text,1-tlacitka/vyber ANO,3- text/tlacitka/vyber nie, 4-text ano
am.f =[["darkseagreen","white"],["black","white"],["blue","yellow"],["lightgrey","black"]]; // 0-3
am.f.push(["yellow","black"],["blue","white"],["grey","yellow"],["lightblue","black"]); // 4,5,6,7
am.f.push(["#033B16","white"],["#F2F2F2","black"]); // 8,9
//jazyk
am.jazyky = ["SK_SLOVENSKO","CA_C A N A D A"];
am.jazyk ="SK";
am.ano_nie=0; // 0-okno otazky neaktivne, 1-aktivovane, 2-vypne sa po ukonceni posledneho prikazu
am.rw_err=[0,0,0,0]; //0-ok,1-chybne data pri nacitani,2-chyba pri citani,3-chyba pri zapise
am.supr = false; // true..supervisor, moze vsetko
am.backup = false; // nema kniznicu pre backup, este na tom pracujem
am.odkaz = ["?","ziadny odkaz"]; // ?..ziadny odkaz- uklada odkaz na Uxxx, Annn, Annn.Snnn, pre moznost kopirovat
am.buffer={}; // uklada data na kopirovanie
am.na="na"; // not applicable

am.tab2_next="tab2_next";
// object of the element to be moved
_item = null;
_item_zaklad = "okno";
_item_ele=1; // spolu "okno1"
_item_end= [410];
      //stores x & y co-ordinates of the mouse pointer
mouse_x = 0;
mouse_y = 0;
      // stores top,left values (edge) of the element
ele_x = 0;
ele_y = 0;

am.CR = String.fromCharCode(13); // navrat voziku
am.CRLF = am.CR+String.fromCharCode(10); // navrat voziku
am.printformat="A4";
am.printformat="Letter"; // pre FPDF
 

function start_1() { // only intranet testujem len tento
	am.intranet_status=true;
	am.storage_status=false;
	am.fun([[99,1]]); 
}

function test000(x) { // nepouzivam
return;
	var CR=String.fromCharCode(13);
	am.test1= x +CR + am.test1;
}	

function move_init(x,y)       {
		_item_zaklad=x; //"okno"
		_item_end=y; // [410]
        document.onmousemove = _move;
        document.onmouseup = _stop;
}
 
      //destroy the object when we are done
function _stop() {
//	alert("stop");
	var m1 = _item_end;
    if(_item != null) {
		m1.push(_item_zaklad,_item_ele,mouse_x,mouse_y,ele_x,ele_y);
		_item = null; 
		return am.fun([m1]);
	}
}	

      //main functions which is responsible for moving the element (div in our example)
function _move(e) {
        mouse_x = document.all ? window.event.clientX : e.pageX;
        mouse_y = document.all ? window.event.clientY : e.pageY;
        if(_item != null)
        { 
          _item.style.left = (mouse_x - ele_x) + "px";
          _item.style.top = (mouse_y - ele_y) + "px";
        }
}
 
      //will be called when use starts dragging an element
function _move_item(ele) {
        //store the object of the element which needs to be moved
 //     alert(ele);
	var t= _item_zaklad+ele;
	_item_ele=ele;
//	for (var j=1; j<am.w.length; j++) {	$("#"+item_zaklad+j ).css({"z-index":(j==ele ? 4:3)}); }
	_item= document.getElementById(t);
	ele_x = mouse_x - _item.offsetLeft;
       ele_y = mouse_y - _item.offsetTop;
}


am.lock = function(xy) { // napr. xy="am.a100",vrati 0-premenna neexistuje,1-RO, 2-RW(iny uzivatel),3-RW,4-zmena
	var f2 = am.fun11(xy,1);
	if (typeof am.list.dir0[f2] == "undefined") am.list.dir0[f2] =[0,0,""];
	if (typeof am.list[am.list.adr][f2] == "undefined") { am.list[am.list.adr][f2]=[0,0,""]; return 0; }
		if (am.list[am.list.adr][f2][1]==0) return 1;
	if (am.list[am.list.adr][f2][1] != am.user[0]) return 2;
	if (am.list.dir0[f2][0] > am.list[am.list.adr][f2][0]) return 4;
	return 3;
}

am.fun=function() {
//alert("fun");
	// test na prvy argument - musi to byt pole
	var p=[],p1=0,p2=0,fx;
	while (true){
	if (arguments.length == 0) break;
	p=arguments[0];
am.fun9("FUN: "+JSON.stringify(p));	
	p2=1; // parameter nie je pole
	if (typeof p !='object') break;
	if (typeof p.length !='number') break;
	p2=3;
	if (p.length == 0) break; // uz ziadny CALL
	p1 = p[p.length-1];
//am.fun9(p1);
	p2=4; // posledny clen pola nie je pole
	if (typeof p1 !='object' ) break;
	if (typeof p1.length !='number') break;
	p2=5; // posledny clen pola je prazdne pole
	if (p1.length ==0) break;
	p2=6; //prvy parameter posledneho vnoreneho pola nie je cislo 
	if (typeof p1[0] !='number') break;
	p2=7; // funkcia nie je definovana
	fx='fun'+p1[0];
	if (typeof am[fx] == 'function') {
//alert("volam funkciu "+fx+"("+JSON.stringify(p)+")"); 
	return am[fx](p); 
	}
	p2="function(p){var p1=p.pop(),t='nova funkcia "+fx+", ('+JSON.stringify(p1)+')'; p.push([13,1,t]);return am.fun(p);}";
	p.push([21,0,"R","am."+fx,p2]); p.push([10,1,"hladam Funkciu "+fx]);
	return am.fun(p);
	}
	if (p2==3) { // bez volani, ziadny prikaz v poli
	 if (am.ano_nie==2) { // vypnem okno otazky
	  am.ano_nie=0;
	  $("#ano_nie").hide();
	  $("#info_ok").hide();
	 } 
	 if (am.ano_nie==1) { // bolo zapnute
	  am.ano_nie=2; // aktivujem vypnutie otazky
	 }
	 return false; 
	}
	return alert("chyba parametra "+p2+"..."+p);
}

am.fun1 = function(p) { // eval druheho parametra pola(text),pokracuje so skratenym [p]
 var p1=p.pop();
 eval(p1[1]);
 am.fun9("1: "+p1[1]);
 return am.fun(p);
}

am.fun2 = function(t,n) { //skrati text [t] na [n] znakov
 var t1=t;
 if(t1.length<=n) return t1;
 t1=t1.substr(0,n-2)+"..";
 return t1;
}

am.fun8 = function(p) { // oznam
 var p1=p.pop(),an1,an2,an3=0; // p1[0]=8, p1[1]=sprava, ak OK, spracuje p1[2]...pole prikazov. 
	an1 = $("#info_ok");
	an2 = p1[1]; // zobrazeny text
    an1.find(".message").html(an2);
    an1.find("#info_ok1").unbind().click(function(){ an1.hide(); });
// pri ANO hodnota premennej sa prida ako parameter do posledneho pola
    an1.find("#info_ok1").click(function(){ var px; if(p1.length>2) return am.fun(p1[2]);});
    an1.show();
//	alert("OK");
	am.ano_nie=1;
	return am.fun(p);// po ukonceni p-prikazu sa prestavi na 2
}

am.fun9 = function() { // prida parameter na zaciatok #test
	var t='chyba',t1,t2,t3,a2=0;
	if (arguments.length==0) return false;
	t1 = arguments[0];
	if(	arguments.length==2){ // 
	am.test=t1; // true alebo false
		if(!t1) { // vypne sledovanie TEST
		  $("#tab1_6").html(""); return false;
		}
		if(t1) { // zapne sledovanie TEST
		// testovaci riadok:
 t=  "<button id='test1' class='bm'>CLEAR TEST</button>";
 t+= "<button id='test2' class='bm'>RUN</button>";
 t+= "<input type='text' id='test3' class='test'  size='100' />";
 t+= "<BR><div id='test'/>";
 $("#tab1_6").html(t);
 $("#test1").click(function() { $("#test").html("test vymazany");});
 $("#test2").click(function() { 
  var j,j2 = document.getElementById("test3").value;
  if (j2.substr(0,1)=="?") {
	j=j2.substr(1); // odtrhnem otaznik
	j2 = JSON.stringify(eval(j))
  }
  return am.fun9(j2);
 });
 return false;
		}
	}
	if ( !am.test) return false;
		

//	t3= (typeof $("#test"));
//	if (t3 != 'object') return false;
	t2=(typeof t1);
	t =t1;
	if (t2=='object') t="object= "+JSON.stringify(t1);
	t += "<p>"+$("#test").html();
	$("#test").html(t);
	return false;
}

am.fun7 = function(a1,a2,a3) {
	if (typeof a1 =="undefined") a1=a3;
	return false;
}

am.fun10 = function(p) { // nepouzivam, prida parameter na zaciatok #test
	var p1= p.pop();
	am.fun9(p1[2]);
	return am.fun(p);
}

am.fun11 = function(t1,k){ 
 // k==1.. meni bodky na podtrzniky
 // k==2.. meni podtrzniky na bodky
 // k==3.. meni [.] na [/]
	var t2=t1,n2=0;
	while (k==1) { t2=t2.replace(".","_"); if (t2.indexOf(".")<0) return (t2);}
	while (k==2) { t2=t2.replace("_","."); if (t2.indexOf("_")<0) return (t2);}
	n2=t2.indexOf(".txt"); if (n2>0) t2=t2.substr(0,n2); // odreze rozsirenie [.txt]
	while (k==3) { t2=t2.replace(".","/"); if (t2.indexOf(".")<0) break; }
	return t2;
}

am.fun12= function(p){ // ano / nie otazka
//alert(12); 
 var p1=p.pop(),an1,an2,an3=0; // p1[0]=12, p1[1]=sprava, ak ANO, spracuje p1[2]...pole prikazov.
// ak p1[1] obsahuje "[]", v p1[3] ocakava vstupnu hodnotu, ktoru je potrebne zmenit/potvrdit 
//napr [12,"Potvrdte [] ..ulozenie G-filtra a L-filtra",[[300,100,"tab2_xcopy_gl"]],"GL"]

	an1 = $("#ano_nie");
	an2 = p1[1]; // zobrazeny text
	if(p1.length==4) { 
	 an3= an2.indexOf("[]");
	 an4= '<input type="text" id="ano_nie_text" value="'+p1[3]+'" >';
	 if (an3>0) an2= an2.substr(0,an3)+an4+an2.substr(an3+2);
	}
    an1.find(".message").html(an2);
    an1.find("#ano_nie_a,#ano_nie_n").unbind().click(function(){ an1.hide(); });
// pri ANO hodnota premennej sa prida ako parameter do posledneho pola
    an1.find("#ano_nie_a").click(function(){ var px=p1[2],i=px.length-1,j=px[i].length;if(an3>0)px[i][j]=$("#ano_nie_text").val();return am.fun(px); });
   // an1.find(".no").click(noFn);
    an1.show();
	am.ano_nie=1;
	return am.fun(p);// po ukonceni p-prikazu sa prestavi na 2
}

am.fun13= function(p){ // zapise text do ERROR riadku [13,"text chyby"]
//alert(13); 
 var p1=p.pop(); 
 am.hl.chyba= p1[2]; // ERROR
 p.push([91,3]); // aktualizuje obrazovku
 return am.fun(p);
}
 
am.fun14=function(time1,t1,id1,zn1,poc1,interval1) { //am.fun14(am.hl.chyba,"#tab1_3",100,1);
 var t2=t1,poc2=poc1+1,l1=t1.length;
 if (poc2>zn1) poc2=0;
t3="";for (var i=1; i< poc1; i++) { t3 +="&nbsp;"; }
l2=l1+poc1-zn1;
t4=t2+t3;
if (l2>0) t4=t2.substr(l2)+t3+t2.substr(0,l2);
$(id1).html(t4);
am[time1] =setTimeout(function(){ am.fun14(time1,t1,id1,zn1,poc2,interval1); }, interval1);
}

am.fun15 = function(text1) { // upravi text1 na male pismena,a cislice
 var t1= text1.toLowerCase(),t2="",t3,p1,c1;
 for (var i=0; i< t1.length; i++) { 
 t3=t1.substr(i,1); 
 p1=(t3>='a' && t3<='z');
 c1=(t3>='0' && t3<='9');
 t2+=(p1 ||(c1 && i>0)) ? t3 : "";
 }
 return t2;
}

am.fun16 = function(co,par2) { // PRAVA generuje a vracia odpoved na prava
 var p1=".",a1,co2="xxxx";
 if (arguments.length==2) co2=par2;

// co="A+".. ci mozem pridat novy almanach
// Ar.. ci mozem vstupit do almanachu
// "h..." ci mam spravne heslo
//am.fun9("fun16.."+co);
if(co.substr(0,1)==="H"){ // heslo
  if(co.substr(1)===am.a100.u_list[am.u2].heslo) return true;
  return false;
 }

 if(co=="A+" || co=="Su" || co=="T+"){
  if(typeof am.a100.u_list[am.u1].prava["u100"] =='string') p1 += am.a100.u_list[am.u1].prava["u100"];
  if(typeof am.a100.u_list[am.u1].prava[am.u1 ] =='string') p1 += am.a100.u_list[am.u1].prava[am.u1];
  if(p1.indexOf(co)>0) return true;
  return false;
 }

if (am.supr) { return true;}

 if(co=="U+" || co=="Ur" || co=="Uw" || co=="Ud"){
  if (co2.substr(0,1) !="u") return false;
  if (typeof am.a100.u_list[co2] =='object') {
   if (typeof am.a100.u_list[co2].prava["u100"] =='string') p1 +=am.a100.u_list[co2].prava["u100"];
   if (typeof am.a100.u_list[co2].prava[am.u1 ] =='string') p1 +=am.a100.u_list[co2].prava[am.u1];
  }
 }

 if(co=="Ad" || co=="Aw" || co=="Ar" || co=="S+"){
  if (co2.substr(0,1) !="a") return false;
  if(typeof am.a100.a_list[co2] =='object') {
   if (typeof am.a100.a_list[co2].prava["u100"] =='string') p1 +=am.a100.a_list[co2].prava["u100"];
   if (typeof am.a100.a_list[co2].prava[am.u1 ] =='string') p1 +=am.a100.a_list[co2].prava[am.u1];
//   if(co=="Ar") alert(co2+', p1='+p1);
  if(p1.indexOf(co)>0) return true;
  return false;
 
 }
 }
  
 if(co=="Sd" || co=="Sw" || co=="Sr"){
  if (co2.substr(0,1) !="s") return false;
  if(typeof am[am.a1].s100.s_list[co2] =='object') {
   if (typeof am[am.a1].s100.s_list[co2].prava["u100"] =='string') p1 +=am[am.a1].s100.s_list[co2].prava["u100"];
   if (typeof am[am.a1].s100.s_list[co2].prava[am.u1 ] =='string') p1 +=am[am.a1].s100.s_list[co2].prava[am.u1];
  }
am.fun9("fun16.."+co+"   "+p1);
 if(p1.indexOf(co)>0) return true;
  return false;
 }
 
 if(co=="Sd" || co=="Sw" || co=="Sr"){
  if(typeof am[am.a1].s100.s_list[co2] =='object') {
   if (typeof am[am.a1].s100.s_list[co2].prava["u100"] =='string') p1 +=am[am.a1].s100.s_list[co2].prava["u100"];
   if (typeof am[am.a1].s100.s_list[co2].prava[am.u1] =='string') p1 +=am[am.a1].s100.s_list[co2].prava[am.u1];
  }
  if(p1.indexOf(co)>0) return true;
  return false;
 }
// vsetky ostatne moznosti
 return true;
}

am.fun17 = function(u1){ // vyhlada meno uzivatela
 if(u1=="u100") return am.t0[19][2]; // "GUEST"
//alert("fun17");
//alert(u1);
 var meno=am.a100.u_list[u1].name;
 if( typeof meno =='string') return meno;
 return am.t0[19][3]; // "UNKNOWN"
}

am.fun18 = function() { // generuje html pre "popis" a "ikony"  pre am.r1=2,12,22
 var p1,t1,name1,info1,c1,c2,id1,n1,n2,t2,t3,j1,j2,j3,n9;

 c1=(am.r1==2 ? am.a100.u_list[am.u2] :(am.r1==12 ? am.a100.a_list[am.a1] : am[am.a1].s100.s_list[am.s1]));
 c2=(am.r1==2 ? am.u2 :(am.r1==12 ? am.a1 : am.s1));
 name1=c1.name;
 info1=c1.info;
 n1=(am.r1==2 ? 4 :(am.r1==12 ? 2 : 3));
 n2=(am.r1==2 ? 1 :(am.r1==12 ? 2 : 3)); // ktore prava ma selektovat
 
 p1= '<table><tr><td>'+am.t0[14][2]+am.t0[14][0]+am.t0[n1]+'</td><td><table class="tab1_2_b" >'; // servis uzivatela
 t1='<input type="text" id="tab2_t4" value="'+c1.name+'" />';
 p1 += '<tr><td>'+am.t0[7][3]+' :</td><td>'+t1+'</td></tr>'; // riadok-meno
 t1='<input type="text" id="tab2_t41" value="'+c1.info+'" />';
 p1 += '<tr><td>'+am.t0[7][5]+' :</td><td>'+t1+'</td></tr>'; // riadok-info
 if (am.r1==2){ // iba pre users - heslo,jazyk
  if (am.u1==am.u2) {
   p1 += '<tr><td>'+am.t0[7][1]+'</td><td><input type="text" id="tab2_t42" value="" /></td></tr>'; // nove heslo
 }else{
   p1 += '<tr><td>'+am.t0[7][2]+'</td><td><input type="checkbox" id="tab2_c4" /></td></tr>'; // reset heslo
 }
  p1 += '<tr><td>'+am.t0[5]+'</td><td><select id="tab2_t43" >';
//alert(am.t0[12]);
 for (var i=0; i< am.t0[13].length; i++) { 
  j1=am.t0[13][i]; j2=j1.substr(0,2); j3=(j2==c1.jazyk ? "SELECTED": "");
  p1 += '<option value="' +j2+ '" '+j3+' >' +j1 +'</option>';
 }
 p1 +='</select></td></tr>';
 }
 p1 +='</table></td>';
 t='';
 
// tu dam prava ako dalsi stlpcek
 if(am.fun16("Pr",c2) || am.fun16("Pw",c2)) {
  p1 += '<td>'+am.t0[19][0]+'</td><td><table class="tab1_2_b">';
  for (var subor in c1.prava) {
   p1 += '<tr><td>['+subor+']..<h9>'+am.fun17(subor)+'</h9></td><td>';
   p1 += c1.prava[subor]+'</td></tr>';
  }
  p1 +='</table></td>';
 }

 if(am.fun16("Pw",c2)) { // modifikacia prav.. tlacitko 'uzivatel' a 'pravo'
  p1 +='<td><table class="tab1_2_b" >';
  p1 +='<tr><td><select id="tab2_pravo1" onchange="am.fun([[93,this.id]]);">';
  p1 += '<option value="u000" SELECTED >'+am.t0[19][1]+'</option>'; // volba uzivatela
  p1 += '<option value="u100" >[u100]..'+am.fun17("u100")+'</option>';
  for (var subor in am.a100.u_list) {
   p1 += '<option value="'+subor+'" >['+subor+']..'+am.fun17(subor)+'</option>';
  }
  p1 +='</select></td></tr>';
  p1 +='<tr><td><select id="tab2_pravo2" onchange="am.fun([[93,this.id]]);" >';
  p1 += '<option value=".." SELECTED >'+am.t0[19][4]+'</option>'; // Volba prava
  for (var i=0; i< am.t0[17].length; i++) { 
   if (am.t0[17][i][0]==n2 || (am.t0[17][i][0]==0 && am.supr)) { 
   p1 += '<option value="'+am.t0[17][i][1]+'" >'+am.t0[17][i][1]+'..'+am.t0[17][i][2]+'</option>';
  }}
  p1 +='</select></td></tr></table></td>';
 }
 am.hl.popis = p1 +'</tr></table><br><div id="prog_modif"/>';

// obrazky:
 am.hl.ikony=[];
 t1 = (am.r1==2 ? 'user_' :(am.r1==12 ? 'libr_' : 'prog_'));
 if (am.r1==22)  t1 += c1.prog/100+"_s1";
 n9=t1.length;
// alert(t1)
 for (var i=2; i<pict.list.length; i++) {
  t=pict.list[i]; id1="p"+(100+i); p1="pict/"+t;
  n1= t.indexOf("."); n2=t.substr(0,n1);	
  if (t.substr(0,n9)==t1) {
   am.hl.ikony.push([id1,p1,t,id1]);
   if (am.r1==2  && (am.u3.length==0) && (c1.pict==("pict/"+t)) ) am.u3=id1;
   if (am.r1==12 && (am.a3.length==0) && (c1.pict==("pict/"+t)) ) am.a3=id1;
   if (am.r1==22 && (am.s3.length==0) && (c1.pict==("pict/"+t)) ) am.s3=id1;
  } 
 }
  am.hl.ikony1 = (am.r1==2 ? am.u3 :(am.r1==12 ? am.a3 : am.s3));
}

am.fun19 = function(mil) { //Convert miliseconds(number) to text(Date, TIME)
	var d = new Date(mil);
	var ds = d.toLocaleString();
	return ds;
}

am.fun20 = function(p) { // CHYBY databaza systemu
	var p1,p2,p3,t;
	p3 = p.pop(); 
	p1 = p.pop();
	p2=0+p3[1];
	t="chyba c."+p2+", kod:"+p1[2]+", krok:"+p1[1]+"..."+JSON.stringify(eval(p1));
	alert(t);
//am.fun10([[10,1,t ]]);
// tu vysvetlim vsetky chyby
if (p2==20) { p.push(p1);alert("prebieha cudzia transakcia"); }
if (p2==21) alert("nezhoda hesla"); 
if (p2==22) alert("nezhoda kluca"); 
if (p2==23) alert("chyba pri nacitani z intranetu - false");
if (p2==24) alert("chyba intranetu, xhr="+p1[2]+", ajax="+p1[3]+", error="+p1[4]); // xhr, ajaxOptions, thrownError
if (p2==25) alert("chyba pri nacitani z intranetu - R-false");
if (p2==26) alert("chyba pri zapise do intranetu - W-false");
if (p2==30) alert("chyba - intranet"); 
return ;
//am.fun(p);
}

am.fun21= function(p) { // databaza systemu
/*
parameters p0,p1,p2,p3,p4,   p0=21, p1=0...500 cislo prikazu, sluzi na rozpoznanie prikazu pri rieseni chyby, napr. pri LOCK sa nepodari zamknut zaznam.
p2- kod prikazu:
-------------------
"R"..nacita subor z [p3], ak neexistuje, ulozi do neho obsah z [p4]..text
"W"..zapise do suboru [p3]
"F"..nacitanie zoznamu suborov z intranetu
"Z"..nacitanie zoznamu suborov z intranetu(bez modifikacii parametra a ulozenie do [am.fz]
"D0"..vymaze z pamati

tieto prikazy nepouzivam:
-------------------------
"A1"..prepne na demo verziu
"A2"..prepne na STORAGE databazu
"A3"..prepne na PHP-intranet suborovu databazu
"T8"..start transakcii, nacita subor am.list[am.list.adr]
"T9"..ukoncenie transakcii, ulozi subor am.list[am.list.adr]
"L8"..rlock() suboru [p3]...nepouzivam
"L9"..unlock suboru [p3]...nepouzivam
"F8"..lock celej databazy- vidiet v subore am.list[am.list.adr]
"F9"..unlock celej databazy - "" -
*/
//alert(p);
 var p1,p2,a1,t,t1,s1,y1,m3,f2,n1,n2,n3,z,e1,z2;
 am.fun9("21: "+JSON.stringify(p));
 p1 = p.pop(); 
 p2=""+p1[2];

 if (p2=="Pdf") { // EVAL..vykona PHP prikazy - tlac zostavy cez FPDF
		f2 = am.fun11(p1[3],1); // meni [.] na [_]
		t1 = JSON.stringify(p1[4]); //pole poli prikazov
		$.ajax({ 
		method: "post", url: am.intranet_p, 
		data: { 'prikaz': "Pdf",'kluc': am.intranet_h,'subor': f2, 'obsah':t1,'ajax': true },
        success: function(data) {
	if(data.length>0)	alert(data);
am.fun9(data);
		t= "report/"+ f2+".pdf";	
	am.zostava = window.open(t, "MsgWindow", "width=900,height=900");

		return am.fun(p);
	  },
	  error: function () { alert("F-chyba");}
		});
		return;
	}
 if (p2=="F") { // nacitanie zoznamu suborov z intranetu
		f2 = am.fun11(p1[3],3);
		$.ajax({ 
		method: "post", url: am.intranet_p, 
		data: { 'prikaz': "F",'kluc': am.intranet_h,'subor': f2, 'obsah':'...','ajax': true },
        success: function(data) {
	//		alert(data);
		eval(p1[3]+'.list = '+data); //ulozi obsah do premennej 
		return am.fun(p);
	  },
	  error: function () { alert("F-chyba");}
		});
		return;
	}

 if (p2=="Z") { // nacitanie zoznamu suborov z intranetu
		f2 = p1[3];
		$.ajax({ 
		method: "post", url: am.intranet_p, 
		data: { 'prikaz': "F",'kluc': am.intranet_h,'subor': f2, 'obsah':'...','ajax': true },
        success: function(data) {
	//		alert(data);
	//	eval(p1[4]+'.list = '+data); //ulozi obsah do premennej 
	z= JSON.parse(data);
	z2=[];
	for (var i=2; i<z.length; i++) {
		if(typeof z[i] != am.typ[7]) continue; // ignoruje nie text
		t= z[i].toLowerCase();
		n1=t.indexOf(".");if(n1<1) continue;
		t1=t.substr(0,n1);
		e1=t.substr(n1+1);
		//if(e1.length !=3) continue;
		z2.push([t1,e1]);
	}
	t= p1[4]+' = am.fun35(z2)';
	eval(t); //ulozi obsah do premennej 
	return am.fun(p);
	  },
	  error: function () { alert("F-chyba");}
		});
		return;
	}

 if (p2=="R") { // nacitanie suboru z intranetu
  f2 = am.fun11(p1[3],3);
//alert("nacitanie z intranetu "+f2);
  $.ajax({ 
   method: "post", url: am.intranet_p, 
   data: { 'prikaz': "R",'kluc': am.intranet_h, 'subor': f2, 'obsah':p1[4],'ajax': true },
   success: function(data) {
//am.fun9("R.."+f2);
//					alert(data);
//am.fun9(p1[3]+' = '+data);
//		if (data=="false") { p.push(p1);p.push([20,25]); return am.fun(p);}
		if (data=="false") { p.push([20,25]); return am.fun(p);}
//		am.fun9(p1[3]+' = '+data);
am.fun9("21R: "+p1[3]+" ... "+data.substr(0,30));
//alert("21R: "+p1[3]+" ... "+data.substr(0,30));
		n1= p1[3].length;
		n2= p1[3].indexOf("am.fun");
	//	alert(n2);
//alert("toto su data.."+data);
		if (n2==0){ 
//		a1=p1[3].substr(3); am[a1]=JSON.parse(data);return am.fun(p);} 
	     eval(p1[3]+' = '+data);return am.fun(p);}
		if (n1==7) { 
		am.a100=JSON.parse(data);return am.fun(p);}
		a1=p1[3].substr(3,4);
		if (n1==12) {am[a1].s100=JSON.parse(data);return am.fun(p);}
		s1=p1[3].substr(8,4);
		y1=p1[3].substr(13);
		am[a1][s1][y1]=JSON.parse(data);

// am.a100
// am.a101.s100
// am.a101.s102.y1000
// am.a102.s103.ys
//		eval(p1[3]+' = '+data+';'); //ulozi obsah do premennej
		return am.fun(p);
	  },
		error: function (xhr, ajaxOptions, thrownError) { p.push(p1);p.push([20,24,xhr, ajaxOptions, thrownError]); return am.fun(p); }
		});
		return;
	}

	if (p2=="W" || p2=="S") { // zapis suboru do intranetu
			k1="txt"; if(p2=="S") k1=p1[4];
			f2 = am.fun11(p1[3],3);
			t1 = JSON.stringify(eval(p1[3]))
//am.fun9("W..Zapisujem "+f2+"="+t1);
		$.ajax({ 
		method: "post", url: am.intranet_p, 
		data: { 'prikaz': "W",'kluc': am.intranet_h,'subor': f2, 'obsah':t1, 'pripona':k1, 'ajax': true },
        success: function(data) {
		if (data=="false") { p.push(p1);p.push([20,26]); return am.fun(p); }
		//am.list[am.list.adr][f2] = am.list.dir0[f2]; 
		return am.fun(p);
	  },
		error: function (xhr, ajaxOptions, thrownError) { p.push(p1);p.push([20,24,xhr, ajaxOptions, thrownError]); return am.fun(p); }
		});
		return;
	}

	if (p2=="Svg") { // zapis suboru do intranetu
		f2 = am.fun11(p1[3],3);
		t1=eval(p1[3]);
		$.ajax({ 
		method: "post", url: am.intranet_p, 
		data: { 'prikaz': "W",'kluc': am.intranet_h,'subor': f2, 'obsah':t1, 'pripona':'svg', 'ajax': true },
        success: function(data) {
		if (data=="false") { p.push(p1);p.push([20,26]); return am.fun(p); }
		//am.list[am.list.adr][f2] = am.list.dir0[f2]; 
		return am.fun(p);
	  },
		error: function (xhr, ajaxOptions, thrownError) { p.push(p1);p.push([20,24,xhr, ajaxOptions, thrownError]); return am.fun(p); }
		});
		return;
	}

	
	return;
}

am.fun22= function(nazov1,nazov2,nazov3,ikona1,funk1) { // modifikuje FPDF triedu na PDF triedu
// vrati textovy retazec
var t1,p1,n1="REPORT",n2="",n3="";
p1=arguments.length;
if(p1 !=5) {alert("fun22-parametre");return;}
t1 ="require('fpdf16/fpdf.php'); ";
t1+="class PDF extends FPDF{ ";

// o fontoch a farbach

t1+="public $farby = array([0,0,0],[0,0,50],[0,50,0],[50,50,50],";
t1+="[223,239,255],[50,0,0],[255,255,0],[165,42,42]);";
t1+="public $fonty = array(['Arial','',12],['Times','',12],['Arial','BU',22],";
t1+="['Arial','B',18],['Arial','I',8],['Arial','I',14],['Arial','',14]);";

t1+="function Farba1($n1){ $p1=min(count($this->farby)-1,$n1);$p2=$this->farby[$p1];";
t1+="$this->SetTextColor($p2[0],$p2[1],$p2[2]);}";

t1+="function Pozadie1($n1){ $p1=min(count($this->farby)-1,$n1);$p2=$this->farby[$p1];";
t1+="$this->SetFillColor($p2[0],$p2[1],$p2[2]);}";

t1+="function Font1($n1){ $p1=min(count($this->fonty)-1,$n1);$p2=$this->fonty[$p1];";
t1+="$this->SetFont($p2[0],$p2[1],$p2[2]);}";

t1+="function SetFC($nastav){ $k0=$nastav; $k1='C';$k2=0;";
t1+=" while(strlen($k0)>2){$k1=substr($k0,0,1);$k2=intval(substr($k0,1,2));$k0=substr($k0,3);";
t1+=" if($k1=='F') $this->Font1($k2); if($k1=='C') $this->Farba1($k2); if($k1=='B') $this->Pozadie1($k2);} }";


// page head
t1+="function Header(){";
if(ikona1.length>0) t1+="$this->Image('"+ikona1+"',10,8,15);";
//t1+="$this->SetFont('Arial','BU',22);$this->SetTextColor(0,0,220);";
t1+="$this->SetFC('F02C01');";
//t1+="SetFC('F01C01);";
//SetFC(
//t2=am.f0.y_list[am.y1].name+" ("+am.y1+")";
// t1+="$this->Cell(20); $this->Cell(60,5,'"+t2+"',0,0,'C');$this->Ln(8);";
t1+="$this->Cell(30); $this->Cell(60,5,'"+nazov1+"',0,0,'C');$this->Ln(8);";
//t1+="$this->SetFont('Arial','B',18);$this->SetTextColor(50,50,50);";
t1+="$this->SetFC('F03C03');";
//t1+="$this->Cell(20); $this->Cell(80,5,'Zoznam filtrov a specifikacii',0,0,'C'); $this->Ln(20);} ";
t1+="$this->Cell(50); $this->Cell(100,5,'"+nazov2+"',0,0,'R'); $this->Ln(10);} ";

//Page footer,Position at 1.5 cm from bottom,Arial italic 8, Page number
t1+="function Footer(){ $this->SetY(-15); $this->SetFC('F04C00');";
t1+="$this->Cell(0,10,'"+nazov3+"   Page '.$this->PageNo().'/'.'{nb}',0,0,'C');} ";

//Table ImprovedTable
t1+="function ImprovedTable($header,$data){ $this->SetFC('F06C00B04');";
    //Header
t1+="$w=0;for($i=0;$i < count($header); $i++) {$w1=$header[$i][0];$w+=$w1;";
t1+="$this->Cell($w1,7,$header[$i][1],1,0,'C'); } $this->Ln();";
    //Data, nulty stlpec je riadiaci..1.. spec farba
t1+="foreach($data as $row){";
t1+="$this->SetFC('F00C00');";
t1+="if($row[0]==1) {$this->SetFC('F05C02');} ";
t1+="for($i=0;$i < count($header); $i++) $this->Cell($header[$i][0],6,$row[$i+1],'LR',0,'R');";
//t1+="$this->Cell($w[1],6,$row[1],'LR');";
t1+="$this->Ln();}";
//Closure line
t1+="$this->Cell($w,0,'','T'); $this->Ln(10); } ";



// Table Table_Ff1 .. opakuje hlavicku na novej strane
// -----------------------------------------------------
t1+="function Table_Ff1($header,$data){ $this->SetFC('F06C00B04');"; // pozadie pre hlavicku
t1+="$h_magic=30; $h_head=7; $h_row=6; $h_test=$h_head+$h_row;$h=0;$s1=6;";
t1+="$w=0;"; // celkova sirka tabulky-vypocita sa pri tlaci hlavicky, potrebujeme ju pri tlaci paty.
t1+="foreach($data as $row){";

t1+="if($this->h - $this->GetY() - $h_magic - $h_test <0){"; // nezostalo miesto na riadok (aj hlavicku)
t1 +="if($h_test==$h_row)$this->Cell($w,0,'','T');"; // tlaci Closure line
t1 +="$this->AddPage();$h_test=$h_row+1;}";

t1+="if($h_test>$h_row){";    //tlaci hlavicku
t1+="$w=0;for($i=0;$i < count($header); $i++) {$w1=$header[$i][0];$w+=$w1;";
t1+="$this->SetFC('F06C00B04');"
t1+="$this->Cell($w1,$h_head,$header[$i][1],1,0,'C',true); } $this->Ln();}";

    // tlacim riadok, nulty stlpec je riadiaci: 0-cierna,1-zelena,2-modra,3-cervena, 4-hneda farba
	// pozadie zakazane
t1+="$this->SetFC('F00C00');";
t1+="if($row[0]==1) {$this->SetFC('F05C02');} "; // zelena A-12
t1+="if($row[0]==2) {$this->SetFC('F05C01');} "; // modra  A-12
t1+="if($row[0]==3) {$this->SetFC('F05C05');} "; // cervena A-12
t1+="if($row[0]==4) {$this->SetFC('F04C07');} "; // hneda - AI-08

t1+="for($i=0;$i < count($header); $i++) $this->Cell($header[$i][0],$h_row,$row[$i+1],'LR',0,'R');";
//t1+="$this->Cell($w[1],6,$row[1],'LR');";
t1+="$this->Ln();$h_test=$h_row;}";
//Closure line
t1+="$this->Cell($w,0,'','T'); $this->Ln(10); } ";
// ------------------------------------------------------------


t1+="function Odstavec($nazov,$udaje){";   //bezny odstavec
t1+="$this->SetFC('F00B04');";
t1+="$this->Cell(0,6,$nazov,0,1,'L',true); $this->Ln(4);";
t1+="$this->SetFC('F01B03'); $this->MultiCell(0,5,$udaje); $this->Ln();}";


t1+= funk1;
t1+="} "; // end of class

t1+="$pdf=new PDF('P','mm','"+am.printformat+"');";
t1+="$pdf->AliasNbPages(); "; // dodatocne doplni pocet stran {nb}
return t1;
}

 
am.fun31 = function() { // v storage a na intranete prepise stare data novsimi z pamati, pri p2>0 
	return;

	am.fun9("(F31) : zapis do STORAGE a na INTRANET");
	var p=[],p1=[31,1],f1,p2=0;

	if (arguments.length>0) { p=arguments[0];p1=p.pop(); }
	if (p1.length>1) p2=p1[1];
	p.push([21,30,"T9"]);
	for (var subor in am.list.dir0) {
		if (subor.substr(0,7)=="am_list") continue; // ignorujem polozky am_list
		p1=am.list.dir0[subor]; // pole napr [1,1,1,1]
		p3=am.list[am.list.adr][subor];
		f1=am.fun11(subor,2); // napr "am.am102.s100"
// v am.list1 (demo) sa polozky neaktualizuju
		if (p3[1]==am.user[0] ) { 
			if (p2>0) p.push([21,31,"L9",f1]);
			if (p1[0]>p3[0]) p.push([21,31,"W",f1]); 
		}
	}
	p.push([21,31,"T8"]);
//	am.fun9(p);
	return am.fun(p);
}


am.fun32=function(p){ // maze vlajocky Storage a Intranet
	var p1=p.pop();
	if (am.menu.M_1S.s==2) am.menu.M_1S.s=1;
	if (am.menu.M_1I.s==4) am.menu.M_1I.s=3;
	am.zmena=0;
	p.push([51,1]); // zobrazi menu
//	alert("DATA boli ulozene na DISK");
	return am.fun(p);
}


am.fun33 = function() { // aktivuje ukladanie na disk a do Storage
	var p=[[33]],p1;
am.fun9("FUN 33");	
	if (arguments.length>0)  { p=arguments[0];p1=p.pop(); }
	// storage, pridal som am.list0 na test
	if (am.zmena>0) p.push([am.zmena]);
	return am.fun(p); 
}

am.fun35=function(x){ // oddeli objekty..JSON stringify/parse
		var t=JSON.stringify(x);
		return JSON.parse(t); 	
}

am.fun36=function(x1,x2) {//konvert x2 podla x1=1.. N to "rrrr-mm-dd", x1=2..."rrrr-mm-dd" to N(rrrrmmdd) 
	var r1,m1,d1,n1,t1;
if (x1==1) {
	n1=(x2<10000101 ? 19000101: x2);
	t1="D"+n1;
	r1=t1.substr(1,4);
	m1=t1.substr(5,2);
	d1=t1.substr(7,2);
	if( m1=="00" || m1>"12") m1="01";
	if( d1=="00" || d1>"31") d1="01";
		return (r1+"-"+m1+"-"+d1);
}
if (x1==2) {
	t1=(x2.length ==10 ? x2 : "1900-01-01");
//	alert(t1);
	r1=Number(t1.substr(0,4));
	m1=Number(t1.substr(5,2));
	d1=Number(t1.substr(8,2));
//	alert(r1);
//	alert(m1);
//	alert(d1);
	n1= (r1*100+m1)*100+d1;
	return n1;
}
return 0;
}

am.fun37=function(ako,kluc,popis,urob) { // generuje ANO/NIE okienko: 1-checkbox,2-button,3-select
var t='',i;

if(ako==1){
t+='<input type="checkbox" class="fun37c" ';
t+= ' onclick="var kluc='+(kluc==1 ? 0:1)+';'+urob+'" '+(kluc==1 ? 'CHECKED':'')+'>'+popis+'</input>';	
}
if(ako==2){
t+= popis+'<input type="button" class="fun37b" ';
t+= ' onclick="'+urob+'" '+(kluc==1 ? 'CHECKED':'')+'>';
t+= am.t0[(kluc==1 ? 10:11)]+'</input>';	
}
if(ako==3){
t+=popis+'<select class="fun37s" ';
if(urob.length>0)t+='onchange="'+urob+'" ';
t+='>';
t+='<option value=0 '+(kluc==0 ? "SELECTED":"")+'>'+am.t0[11]+'</option>';
t+='<option value=1 '+(kluc==1 ? "SELECTED":"")+'>'+am.t0[10]+'</option>';
t+='</select>';
}
return t;
}









		
am.fun90 = function() { // vstupna obrazovka .. nacita zoznam am.a100
// meno uzivatela,login,password,almanach,segment,block
	var i = '{"stamp":{"prog":0,"type":"data"},';
	i += '"u_list":{"u101":{"name":"user_1","info":"","pict":"pict/user_u101.jpg",';
	i += '"prava":{"u100":"_A+_U+_Ur_Uw_Ud"},"jazyk":"EN","heslo":"" } },';
	i += '"rezim":0,' ;
	i += '"a_list":{"a101":{"name":"demo","info":"","pict":"pict/lib_a101.jpg","prava":{"u100":"_Ar_Aw_Ad_S+"}}}}';
 am.a100_demo=i;

 i  = '{"stamp":{"prog":0,"type":"data"},'; 
 i += '"s_list":{"s101":{"name":"Financie","info":"Rodinne financie",';
 i += '"pict":"pict/prog_s101.jpg","prog":200,"prava":{"u100":"_Sr_Sw_Sd"}}}}';
 am.s100_demo=i;
 

	am.logtext=96;
	am.login = ""; // am_almanach.txt sa nachadza v [data] podkniznici
	am.u1 = "u102";
	am.u2 = "u102";
	am.r1 = 0; // rezim: 0-vyber uzivatela,1-vyber/servis ineho uzivatela,2-servis uzivatela
// 10-vyber almanachu, 11-servis almanachu, 20- vyber programu	21-servis programu
// 30-program
	am.r2 = [91,2];
	var p= [[91,1],[21,91,"F","pict",""],[21,22,"R","am.a100",am.a100_demo]];
	return am.fun(p);
 } 

 
am.fun91 = function(p) { // vstupna obrazovka .. nacita zoznam 
 var p1=p.pop(),co=1,r=0,t; if (p1.length>1) co=p1[1];
 $( window ).resize(function(){ return am.fun([[92,0]]);});
 am.t0=["EN","Configuration","ALMANACH","SEGMENT","USER","Language","Login",[],"ENTER","Incorrect","YES","NO",0,0];
 am.t0[7]=["Pasword","New Pasword","Reset Password","Name","Picture","Info"];
 am.t0[12]=["Software","Garden","Finance","Cataloge","Geneaology","Songs"];
 am.t0[13]=["EN-English","SK-Slovencina","RU-Russian"];
 am.t0[14]=[" >> ","SELECT","SERVICE"];
 am.t0[15]=["ADD","New User","New almanach","New segment","Skutocne pridat uzivatela","Skutocne pridat kniznicu","Skutocne pridat aplikaciu"];
 am.t0[16]=["DELETE","Delete USER","Delete Almanach","Delete segment","Skutocne vymazat uzivatela","Skutocne vymazat uzivatela","Skutocne vymazat uzivatela"];
// prava
 am.t0[17]=[[1,"Su","SUPERVISOR"],[1,"A+","ADD Almanach"]];
 am.t0[17].push([1,"U+","ADD USER"],[1,"Ud","User delete"],[1,"Ur","Almanach delete"]);
 am.t0[17].push([2,"Ar","Open Almanach"],[2,"Aw","Modify Almanach"],[2,"Ad","Delete Almanach"],[2,"S+","Add SEGMENT"]);
 am.t0[17].push([3,"Sr","Read SEGMENT"],[3,"Sw","Modify SEGMENT"],[3,"Sd","Delete SEGMENT"]);
 am.t0[17].push([0,"Pr","to see RIGHTs"],[0,"Pw","to modify RIGHTs"],[1,"T+","to TEST Software"]);
 am.t0[18]=["MODIFY","USER Name,Password,Language, Access","ALMANACH Name, access,picture","SEGMENT Name, picture, access"];
 am.t0[19]=["Access","Select user","GUEST","UNKNOWN","Select access"];
 am.t0[20]=["Vytvorene","Zmenene","Archiv",["?","Ziadny odkaz"]];
 am.t0[21]=["REMEMBER","Zapamataj Uzivatela","Zapamataj Kniznicu","Zapamataj Aplikaciu"];
 am.t0[22]=["COPY","Zkopiruj Uzivatela","Zkopiruj Kniznicu","Zkopiruj Aplikaciu","Skutocne okopirovat uzivatela","Skutocne okopirovat kniznicu","Skutocne okopirovat aplikaciu"]; 
 am.t0[23]=["pict/nav_print.jpg","PRINT","List of Reports"];
 am.t0[24]="alert(am.tab2_next);am.fun([[93,am.tab2_next]]);";
 
if (am.jazyk=="SK") {
 am.t0[0]=["SK"];
 am.t0[1]="Konfiguracia";
 am.t0[2]="Kniznica";
 am.t0[3]="Aplikacia";
 am.t0[4]="Uzivatel";
 am.t0[5]="Jazyk"
 am.t0[6]="Prihlasenie";
 am.t0[7]=["Heslo","Nove Heslo","Vymaz Heslo","Meno","Obrazok","Popis"];
 am.t0[8]="VSTUP";
 am.t0[9]="NESPRAVNE";
 am.t0[10]="ANO";
 am.t0[11]="NIE";
 am.t0[12]=["Program","Zahradka","Ekonomika","Zoznamy","Rodokmen","Pesnicky"];
 am.t0[14]=[" >> ","VYBER","UDRZBA"];
 am.t0[15]=["Pridaj","Novy Uzivatel","Nova Kniznica","Nova Aplikacia","Skutocne pridat uzivatela","Skutocne pridat kniznicu","Skutocne pridat aplokaciu"];
 am.t0[16]=["Vymaz","Zrus Uzivatela","Zrus Kniznicu","Zrus Aplikaciu","Skutocne vymazat uzivatela","Skutocne vymazat kniznicu","Skutocne vymazat aplikaciu"];
 am.t0[17]=[[1,"Su","SUPERVISOR"],[1,"A+","Pridat Kniznicu"]];
 am.t0[17].push([1,"U+","Pridat USER"],[1,"Ud","Vymaz Uzivatela"],[1,"Ur","Zrus Almanach"]);
 am.t0[17].push([2,"Ar","Otvor Kniznicu"],[2,"Aw","Uprav Kniznicu"],[2,"Ad","Vymaz Kniznicu"],[2,"S+","Pridaj program"]);
 am.t0[17].push([3,"Sr","Otvorit Almanach"],[3,"Sw","Uprav Program"],[3,"Sd","Zrus Program"]);
 am.t0[17].push([0,"Pr","Prava vidiet"],[0,"Pw","Prava menit"],[1,"T+","TESTOVAT Software"]);
 am.t0[18]=["UPRAVA","Uzivatel meno,heslo,jazyk, pristup","ALMANACH Name, access,picture","SEGMENT Name, picture, access"];
 am.t0[19]=["Prava","Vyber uzivatela","Host","Neznamy","Volba prava"];
 am.t0[20]=["Vytvorene","Zmenene","Archiv"];
 am.t0[21]=["Pamataj","Zapamataj Uzivatela","Zapamataj Kniznicu","Zapamataj Aplikaciu"];
 am.t0[22]=["Kopiruj","Zkopiruj Uzivatela","Zkopiruj Kniznicu","Zkopiruj Aplikaciu","Skutocne okopirovat uzivatela","Skutocne okopirovat kniznicu","Skutocne okopirovat aplikaciu"]; 
 am.t0[23]=["pict/nav_print.jpg","TLACIT","Zoznam tlacovych zostav"];
}

am.fun9("fun91: rezim am.r1="+am.r1);

if (co==1) { // zakladna mriezka
 t ='<table id="tab1" class="tab1">';
 t +='<TR><TD id="tab1_1"></TD></TR>'; // hlavicka s tab2
 t +='<TR><TD id="tab1_2"></TD></TR>'; // popis
 t +='<TR><TD id="tab1_3"></TD></TR>'; // error
 t +='<TR><TD id="tab1_4"></TD></TR>'; // pre zoznam ikon
 t +='<TR><TD id="prog"></TD></TR>'; // velke ikony class="tab1_p", "tab1_ozn"..pre ozn ikonu, "tab1_t"..tabulka-ramcek
 t +='<TR><TD id="tab1_6"></TD></TR>'; // test
 t +='</TABLE>';
// ano_nie 
 t +='<table id="ano_nie"><tr><td colspan="2" class="message"></td></tr>';
 t +='<tr><td><input type="button" id="ano_nie_a" class="ano_nie" value="'+am.t0[10]+'" ></td>'; // ano
 t +='<td><input type="button" id="ano_nie_n" class="ano_nie" value="'+am.t0[11]+'" ></td></tr></table>'; // nie
// info_ok
 t +='<table id="info_ok"><tr><td class="message"></td></tr>';
 t +='<tr><td><input type="button" id="info_ok1" class="ano_nie" value="'+'OK'+'" ></td></tr></table>'; // ok
 $("body").html(t);
 
 
 $("#ano_nie").hide();
 $("#info_ok").hide();
 
 
 t ='<table id="tab2" class="tab2"><TR>'; // male ikonky class="tab2_p"
// t +='<TD id="tab2_1">Canadian<br>Almanach</TD>';
 t +='<TD id="tab2_1"><img class="tab2_p" src="pict/nav_almanach.jpg" onclick="am.fun96()" /></TD>';
 t +='<TD id="tab2_2">bbbb</TD>'; // exit alebo navrat
 t +='<TD id="tab2_3">cccc</TD>'; // uzivatel, almanach, program
 t +='<TD id="tab2_4">dddd</TD>'; // aktualne prikazy
 t +='<TD id="tab2_5">dddd</TD>'; // dalej
 t +='</TR></TABLE>';
 $("#tab1_1").html(t);
 am.hl={};
 am.hl.strom=[]; // tab2_3
 am.hl.prikazy=[]; //tab2_4
 am.hl.popis=""; //tab1_2
 // $("#tab1_3").html(am.hl.chyba); // ERROR
//am.fun12(12,"Skutocne chcete vymazat ikonu xxxxxxxxxxx ?", [[13,"ccc"]]);

 co=2;
 }
 if (co==2 && am.r1>29) co=3;
 
 if (co==2) { // zaplni prvy riadok
 am.hl.chyba=""; //toto je nulta chyba"; tab1_3
  onc=' onclick="am.fun([[93,this.id]]);" />';
 //	am.fun94([],"");
//$("#tab1_4").html(" ");
//alert("REZIM="+am.r1);
   am.hl.strom=[];
   am.hl.strom1="";
   am.hl.prikazy=[];   
   am.hl.prikazy1="";   
   am.hl.ikony=[];
   am.hl.ikony1="";
   $("#prog").html(""); // okno program prazdne

   t = 'back.jpg';if (am.r1==0) t = 'exit.jpg';
   t = '<img id="tab2_exit" class="tab2_p" src="pict/nav_'+t+'"'+onc;
   $("#tab2_2").html(t); // obrazok krok spat/koniec programu

  if (am.r1>0) {	// prida uzivatela	
  am.hl.strom.push(["user",am.a100.u_list[am.u1].pict,am.a100.u_list[am.u1].name,""]);
  }
   if (am.r1==2) {	// prida upravovaneho uzivatela	
  am.hl.strom.push(["xuser",am.a100.u_list[am.u2].pict,am.a100.u_list[am.u2].name,""]);
   am.hl.strom1="xuser";
 }	
  
  if (am.r1>10 && am.a1.length>0) { // prida almanach ak uz bol vybrany
   am.hl.strom.push(["alm",am.a100.a_list[am.a1].pict,am.a100.a_list[am.a1].name,""]);
  } 
    if (am.r1==12) am.hl.strom1="alm";
 
 if (am.r1>21 && am.s1.length>0) { // prida program 
   c1=am[am.a1].s100.s_list[am.s1];
   am.hl.strom.push(["prog",c1.pict,c1.name,c1.info]);
   am.hl.popis= am[am.a1].s100.s_list[am.s1].name; // popis
 }
 if (am.r1==29) { // prida program
   am.r1=30;
   am.hl.ikony=[];
  // 	if(am.prog>0) 
	  p.push([am.s2,am.prog]);
//  alert(p);

  }

  t = '<img id="tab2_next" class="tab2_p" src="pict/'+'nav_next.jpg'+'"'+ onc;
  $("#tab2_5").html(t); // obrazok dopredu

  if (am.r1==0 || am.r1==1 ) { // rezim vyberu uzivatela
//  	am.hl.popis= "Vyber uzivatela: "+'Heslo: <input type="text" id="tab2_t4" />';
   if (am.r1==1) 	{ // prida ikonku udrzby
   if(am.fun16("U+",am.u2)) am.hl.prikazy.push(["plus","pict/nav_plus.jpg",am.t0[15][0],am.t0[15][1]]);
   if(am.fun16("Uw",am.u2)) am.hl.prikazy.push(["service","pict/nav_service.jpg",am.t0[18][0],am.t0[18][1]]);
   if((am.u1 !=am.u2) && am.fun16("Ud",am.u2)) am.hl.prikazy.push(["delete","pict/nav_delete.jpg",am.t0[16][0],am.t0[16][1]]);
   if(true) am.hl.prikazy.push(["copy","pict/nav_copy.jpg",am.t0[21][0],am.t0[21][1]+' '+am.u2]);
   if(am.odkaz[0].substr(0,1)=="u") am.hl.prikazy.push(["past","pict/nav_past.jpg",am.t0[22][0],am.t0[22][1]+' '+am.odkaz[1]]);
  }
   for (var subor in am.a100.u_list) {
    if (am.u2.length==0) am.u2=subor;
    t1=am.a100.u_list[subor];
    am.hl.ikony.push([subor,t1.pict,t1.name,t1.name]);
   }
   am.hl.ikony1=am.u2;
   am.resize=[];	
   t= am.t0[14][1]+am.t0[14][0]+am.t0[4]+' : ';
   t +='<a class="tab1_2_oznac">['+am.u2+"].."+am.a100.u_list[am.u2].name+'</a>, ';
   am.hl.popis= t+am.t0[7][0]+' : <input type="text" id="tab2_t4" />'; //Vyber uzivatela: 
   
  }
if (am.r1==2) am.fun18();
 
  if (am.r1==10 || am.r1==11) { // rezim vyberu kniznice

 	for (var subor in am.a100.a_list) {
    if(am.fun16("Ar",subor)){  am.fun9(subor); 
	 t1=am.a100.a_list[subor];
	 if (am.a1.length==0) am.a1=subor;
	 am.hl.ikony.push([subor,t1.pict,t1.name,t1.name]);
	}
	}
	am.hl.ikony1=am.a1;
	am.hl.popis = am.t0[14][1]+am.t0[14][0]+am.t0[2]; // Vyber >> Kniznica
	a1= (am.a1.length>0);
  if(!a1) {am.r1=11; } else {
   t1=am.a100.a_list[am.a1];
   am.hl.popis +=" <h8>[am/"+am.a1+"]</h8>"+" .. "+t1.name+" - "+t1.info;
  }
  if(am.r1==11){
   if(am.fun16("A+",am.u1)) am.hl.prikazy.push(["plus","pict/nav_plus.jpg",am.t0[15][0],am.t0[15][2]]);
   if(a1 && am.fun16("Aw",am.a1)) am.hl.prikazy.push(["service","pict/nav_service.jpg",am.t0[18][0],am.t0[18][2]]);
   if(a1 && am.fun16("Ad",am.a1)) am.hl.prikazy.push(["delete","pict/nav_delete.jpg",am.t0[16][0],am.t0[16][2]]);

  }
 }

  if (am.r1==12) am.fun18();
  
  if (am.r1==20 || am.r1==21) { // rezim vyberu programu


   am.hl.ikony=[];
	   am.fun9("testujem vypis programov");
   for (var subor in am[am.a1].s100.s_list) {
    if(am.fun16("Sr",subor)){  am.fun9(subor); 
     t1=am[am.a1].s100.s_list[subor];
     if (am.s1.length==0) am.s1=subor;
	 am.hl.ikony.push([subor,t1.pict,t1.name,t1.info]);
    }
   }
	am.hl.ikony1 = am.s1;
	am.hl.popis = am.t0[14][1]+am.t0[14][0]+am.t0[3]; // Vyber >> Program
	s1= (am.s1.length>0);
  if(!s1) {am.r1=21; } else {
   t1=am[am.a1].s100.s_list[am.s1];
   am.s2=t1.prog;
   am.hl.popis +=" <h8>[am/"+am.a1+"/"+am.s1+"]</h8><h9>( "+am.t0[12][t1.prog/100]+" )</h9> .. "+t1.name+" - "+t1.info;
  }
  am.hl.prikazy=[];
  if(am.r1==21) {
   if(am.fun16("S+",am.a1)) am.hl.prikazy.push(["plus","pict/nav_plus.jpg",am.t0[15][0],am.t0[15][3]]);
   if(a1 && am.fun16("Sw",am.s1)) am.hl.prikazy.push(["service","pict/nav_service.jpg",am.t0[18][0],am.t0[18][3]]);
   if(a1 && am.fun16("Sd",am.s1)) am.hl.prikazy.push(["delete","pict/nav_delete.jpg",am.t0[16][0],am.t0[16][3]]);
   if(a1 && am.backup) am.hl.prikazy.push(["backup","pict/nav_backup.jpg",am.t0[16][0],am.t0[16][3]]);
  }	
	
  } // 20-21

  if (am.r1==22) am.fun18();

	  if (am.r1==122) { // service programov v kniznici
	am.hl.popis = "Udrzba programu: ["+am.a1+"]";
	am.hl.prikazy.push(["plus","pict/nav_plus.jpg","pridaj","Pridaj novy program"]);
	am.hl.ikony=[];
	if (am.s1.length > 0) {
		t="["+am.s2+"]"+'<input type="text" id="tab2_t4" value="'+am[am.a1].s100.s_list[am.s1].name+'" />';
		am.hl.popis +=t;
		am.hl.prikazy.push(["delete","pict/nav_delete.jpg","vymaz","Vymaz program"]);
		n3="prog_"+(am.s2/100)+"_";
	for (var i=2; i<pict.list.length; i++) {
		t=pict.list[i]; id1="p"+(100+i); p1="pict/"+t;
		n1= t.indexOf("."); n2=t.substr(0,n1);	
		if (t.substr(0,n3.length)==n3) {
		 am.hl.ikony.push([id1,p1,t,id1]);
		 if ( (am.s3.length==0) && (am[am.a1].s100.s_list[am.s1].pict==("pict/"+t)) ) am.s3=id1;
		} 
	} 
	}
	am.hl.ikony1=am.s3;
 } // 22

  if (am.r1==23) { // vyber druhu programu
	am.hl.popis="Pridaj program:";
	am.hl.ikony=[];
	for (var i=1; i< am.t0[12].length; i++) { 
	 am.hl.ikony.push(["prog_"+i,"pict/prog_"+i+"_s101.jpg",am.t0[12][i],"Pridaj program "+am.t0[12][i]]);
     if(am.s3.length==0) am.s3="prok_"+i;   
   } 
	am.hl.ikony1=am.s3;
   }


 co=3;
 }
 
 if (co==3){ // generuje obraz
// alert("generuje obraz");
   x=am.fun94(am.hl.strom,am.hl.strom1,2,10);
  $("#tab2_3").html(x); // obrazok uzivatela,almanach,prog
   x=am.fun94(am.hl.prikazy,am.hl.prikazy1,2,10);
  $("#tab2_4").html(x); // ADD,DEL,SERVICE,SAVE
  $("#tab1_2").html(am.hl.popis); // popis
   x=am.fun94(am.hl.ikony,am.hl.ikony1,1,4);
   am.hl.ikony2=am.fun95(am.hl.ikony,0,am.hl.ikony1);
  $("#tab1_4").html(x); // zoznam ikon
  
  if (am.r1==22) p.push([am.s2,100,"prog_modif"]); // generuje okno pre modif programu
  co=4;
 }

 if (co==4) {
// alert("udrzba riadka CHYBA");
 $("#tab1_3").html(am.hl.chyba); // ERROR
  clearTimeout(am.time1);
  if(am.hl.chyba.length>0) am.fun14("time1",am.hl.chyba,"#tab1_3",100,0,500);
 // prida spustenie spracovania udrzby programu	 
  p.push([92,0]);
//alert(JSON.stringify(p));
  return am.fun(p);
 }
}
 
am.fun92 = function(p) { // vstupna obrazovka .. resize
// aktualizuje vsetky rozmery,farby
 var p1=p.pop();
// var w1=[1200,17,5,30,15,5,10],x1,x11,x2,x3,x4,x41,x42;
 var w1=[1200,20,5,50,25,5,8],x1,x11,x2,x3,x4,x41,x42; // zmena 30 na 50 a 15 na 25
// w1[0]...pocet bodov sirky obrazovky .. $("#tab1").width();
// w1[1]...zlomok maleho obrazku
// w1[2]...zlomok velkeho obrazku
// w1[3]...margin tabulky velkeho obrazku
 w1[0]=Number(w1[0]);
 x1= Number(w1[0]/w1[1]); // maly obrazok
 x11=Number(x1/w1[3]); //maly obrazok margin
 x12 = x1/w1[4]; // tabulka margin /15
 x13 = x1/w1[5]; // tabulka/picture radius /5
 x14 = Number(x1/w1[6]); // font size /10
//alert("X11="+x11);

	x2=Number(x1/4); // font 2 riadku
	x3=x2; // font 3 riadku

	x4= Number(w1[0]/w1[2]); // velky obrazok
//	x4=50;

	x41 = Number(x4/w1[3]); // picture margin /30
	x42 = x4/w1[4]; // tabulka margin /15
	x43 = x4/w1[5]; // tabulka/picture radius /5
	x44 = Number(x4/w1[6]); // font size /10

//$("#tab1").css({ "background-color" :"lightgreen","color":"red","width": "100%","height": "100%"});
$("#tab1").css({ "background-color" :"lightgreen","color":"red","width": "100%"});
$("#tab1_1").css({ "background-color" :"green","color":"red"});
$("#tab1_2").css({ "font-size": x2,"background-color" :"green","color":"white","text-align":"top"});
$(".tab1_2_b").css({ "background-color" :"black"});
$(".tab1_2_oznac").css({ "font-size": x2,"background-color" :"green","color":"yellow"});
$("h8").css({"color":"yellow"});
$("h9").css({"background-color" :"blue"});

$("#tab1_3").css({ "font-size": x3,"background-color" :"white","color":"red","text-align":"right"});
//"overflow": "hidden","max-width":"500px","margin-left":"400px"});
$("#tab1_3s").css({ "animation": "2s slide-right"}); //rightThenLeft 4s linear"  animation: 2s slide-right;
 // animation-delay: 2s});

$("#prog").css({ "background-color" :"white","color":"red"});

// $(".tab1_t").css({ "background-color" :"yellow","color":"black","float":"left"});
 $(".tab1_t").css({ "display":"box","background-color" :"yellow","color":"black","border-radius": x43,"font-size": x44, "text-align":"center","margin":x42 });

 $(".tab1_p").css({ "height": x4,"width":x4,"display":"box","border-radius": x43,"margin":x41 });
 t="solid "+ x41+"px green";
 $(".tab1_ozn").css({"border": t});  

 //$("#tab1_3").html(am.error);


// $(".tab1_t").css({ "position":"relative","left":1,"top":1,"text-align":"center","margin":x41,"display":"box","border-radius": x43,"font-size": x44 });


// velke obrazky:
$("#tab2").css({ "background-color" :"black","color":"white","width": "100%"});
$("#tab2_1").css({"width": "10%"});
$("#tab2_2").css({"width": "10%"});
//$("#tab2_3").css({"width": "30%","background-color" :"yellow"});
$("#tab2_3").css({"width": "30%"});
//$("#tab2_5").css({"width": "10%","background-color" :"yellow"});
$("#tab2_5").css({"text-align":"right"});

// male obrazky:
 $(".tab2_p").css({ "height": x1,"width":x1,"display":"box","border-radius": x13,"margin":x11 });
 $(".tab2_t").css({ "display":"box","background-color" :"black","color":"white","border-radius": x13,"font-size": x14, "text-align":"center","margin":x12 });
 t="solid "+ x11+"px yellow";
 $(".tab2_ozn").css({"border": t});  


//$(".grid-container").css({ "display":"grid","grid-template-columns":"1fr 1fr","grid-gap":"20px"});
   
//  ano nie okno	
 $("#ano_nie").css({ "position":"absolute","width":"40%","display":"box","border-radius": 10,"margin":10,"font-size": 20,
 "top":90,"left":300,"text-align":"center","background-color" :"lightgrey","color":"black","border":"solid 5px blue"});
 
 $(".ano_nie").css({ "display":"box","color":"white","border-radius": 5,"font-size": 20, "text-align":"center","padding":5,"margin":5,"height":40,"width":80, "border":"solid 5px yellow"});
$("#ano_nie_a").css({"background-color" :"blue"});
$("#ano_nie_n").css({"background-color" :"red"});
 $("#info_ok").css({ "position":"absolute","width":"40%","display":"box","border-radius": 10,"margin":10,"font-size": 20,
 "top":90,"left":300,"text-align":"center","background-color" :"lightgrey","color":"black","border":"solid 5px blue"});
$("#info_ok1").css({"background-color" :"blue"});
 

$("#tab2_pravo2").hide();
// "position":"relative",
// alert("Navrat z 92: "+JSON.stringify(p));

 $(".menu_img").css({ "background-color" : "white", "display": "inline-block","border":"1px solid gold","height":"22px", "border-radius":"4px","box-sizing": "border-box"}); // moznosti

 $(".fun37c").css({"border":"1px solid blue", "border-radius":"4px","text-align":"right"});
 return am.fun(p);
}  

am.fun93 = function(p) { // spracuva kliknutie tlacitok 
 var p1=p.pop(),p2=p1[1],c1,u2,u3;
 //alert(p2);
 if (p2=="tab2_exit" && am.r1==30) {am.r1=20;return am.fun([[91,2]]);}
 if (p2=="tab2_user") {am.r1=1;return am.fun([[91,2]]);}
 if (p2=="tab2_alm")  {am.r1=11;return am.fun([[91,2]]);}
 if (p2=="tab2_prog") {am.r1=21; return am.fun([[91,2]]);}
 
  if (am.r1>29) {
//	  alert("volam funkciu am.fun([["+am.s2+',100,"'+p2+'"]])');
	  return am.fun([[am.s2,100,p2]]);
 } // klik sa spracuje v inom programe
 
 if (p2=="tab2_pravo1") { // spracuje prava
   u2= $("#tab2_pravo1").val(); // uzivatel
   if(u2=='u000') {$("#tab2_pravo2").hide(); }else {$("#tab2_pravo2").show();}
   return;
 }


 if (p2=="tab2_pravo2") { // spracuje prava
  c1=(am.r1==2 ? am.a100.u_list[am.u2] :(am.r1==12 ? am.a100.a_list[am.a1] : am[am.a1].s100.s_list[am.s1]));
 // am.fun9("c1");
 // am.fun9(c1);
   u2= $("#tab2_pravo1").val(); // uzivatel
   u3='_'+$("#tab2_pravo2").val();
   if(u2=='u000' || u3=="_..") { // neotvoreny vyber
   return;
   }
//   alert(u2);
//   alert(u3);
   u4 = c1.prava[u2];
 //  x=(typeof u4);
 //  alert(x+" "+u4);
   if(typeof u4 != "string") {alert(x); u4="";} // doposial ziadne prava
 //  u5='.'+u4;
   n1= u4.indexOf(u3);
//   alert(n1);
   if (n1<0) { //  pridam prava
	   u5= u4+u3;
   } else { // odstranim prava
    u5 = u4.substr(0,n1)+u4.substr(n1+3);
   }
//   alert("stare prava: ["+u4+"] ,nove prava: ["+u5+"]");
  
   if (u5.length==0) { delete c1.prava[u2]; } else { c1.prava[u2]=u5; }
   
//   alert (u4);
   return am.fun([[91,2]]);
  }
 
 if (am.r1==0 || am.r1==1) { // rezim 0..vyber uzivatela
 
  if (p2.substr(0,6)=="tab1_u") { // odkliknuty uzivatel zo zoznamu
   am.u2=p2.substr(5);
   return am.fun([[91,2]]);
  }

  if (p2=="tab2_copy") { // next 
	am.odkaz=[am.u2,am.a100.u_list[am.u2].name];
//alert("U COPY "+JSON.stringify(am.odkaz));  
   return am.fun([[91,2]]);
  }
  
  if (p2=="tab2_past") { // prida noveho uzivatela
	t= JSON.stringify(am.a100); 
    p3=[[93,"xtab2_past"],[21,92,"R","am.a100",t]];
    return am.fun([[12,am.t0[22][4]+" "+am.odkaz[1]+" ?",p3]]); // pri ANO pokracuje s "p3"
  }
   if (p2=="xtab2_past") {  
	var i=100,u1,u4;
	while(true) {i=i+1; u4='u'+i;if(typeof am.a100.u_list[u4] !='object')break;}
	am.a100.u_list[u4]=am.fun35(am.a100.u_list[am.u2]);
	u1=am.a100.u_list[u4].prava;
	if(typeof u1[am.u2] =='string'){u1[u4]=u1[am.u2]; delete u1[am.u2]; } // prida prava noveho uzivatela a vymaze stareho
	am.u2=u4;
	u1=am.a100.u_list[am.u2]; // nove
	u1.name=u1.name+" copy";
	u1.heslo="";
	am.r1=1;
	am.odkaz=am.t0[20][3]; // ziadny odkaz
    return am.fun([[91,2],[21,92,"W","am.a100"]]);
  } 
  
  
  
  
  
  
  if (p2=="tab2_next") { // next  
   if (am.fun16("H"+$("#tab2_t4").val())) {  // kontrola hesla
	am.r1 += 10;
    am.u1 = am.u2;
    am.jazyk = am.a100.u_list[am.u1].jazyk;
	am.c1={"a1":""}; // cesta, a1,s1,z1,...
	if (typeof am.a100.u_list[am.u1].cesta == "object") am.c1=am.fun35(am.a100.u_list[am.u1].cesta);
	am.supr = am.fun16("Su",am.u1); // si supervisor ?
	am.test = am.fun16("T+",am.u1); // zobrazit testovaci riadok 
am.fun9(am.test,"TEST"); // zapne/vypne testovanie
    am.a1="";if (typeof am.c1.a1 != "undefined")am.a1=am.c1.a1;
//alert(am.a1); 
 return am.fun([[91,2]]);
   }
	am.hl.chyba="Nespravne heslo";
   return am.fun([[91,4]]);
	
  }

  if (p2=="tab2_exit") { // exit 
   if(am.r1==0)	window.close();
   am.r1=0;
   return am.fun([[91,2]]);
  }
 
 if (p2=="tab2_service") { // servis 
   am.r1=2; am.u3="";
   return am.fun([[91,2],[21,92,"F","pict"]]);
  }
  if (p2=="tab2_plus") { // prida noveho uzivatela
	t= JSON.stringify(am.a100); 
    p3=[[93,"xtab2_plus"],[21,92,"R","am.a100",t]];
    return am.fun([[12,am.t0[15][4]+" ?",p3]]); // pri ANO pokracuje s "p3"
  }
  if (p2=="xtab2_plus") {  
	var i=100,u1,u4;
	while(true) {i=i+1;u4='u'+i;if(typeof am.a100.u_list[u4] !='object') break;	}
	am.a100.u_list[u4]= {'name':am.t0[15][1],'info':'',
	'heslo':'','pict':'pict/user_u101.jpg','jazyk':am.jazyk,'prava':{}};
	am.u2=u4;
    return am.fun([[91,2],[21,92,"W","am.a100"]]);
  }

  if (p2=="tab2_delete") { // vymaze uzivatela u2
	t= JSON.stringify(am.a100); 
    p3=[[93,"xtab2_delete"],[21,92,"R","am.a100",t]];
	t1 =am.t0[16][4]+' ['+am.u2+'..'+am.a100.u_list[am.u2].name+'] ?';
    return am.fun([[12,t1,p3]]); // pri ANO pokracuje s "p3"
  }
  if (p2=="xtab2_delete") { // prida noveho uzivatela
   delete am.a100.u_list[am.u2];
   am.u2=am.u1;
   return am.fun([[91,2],[21,92,"W","am.a100"]]);
  }


 }
 
 if(am.r1==2) { // udrzba uzivatela U2
 // alert(p2);
  if (p2=="tab2_next") { // potvrdit zmenu 
   am.prava=JSON.stringify(am.a100.u_list[am.u2].prava);	
   t1='am.r1=1;u1=am.a100.u_list[am.u2];u1.name=$("#tab2_t4").val();u1.info=$("#tab2_t41").val();';
   t1+='u1.jazyk=$("#tab2_t43").val();n1=Number(am.u3.substr(1))-100;u1.pict="pict/"+pict.list[n1];';
   t1+='u1.prava=JSON.parse(am.prava);';
   t1+='if(am.u1==am.u2){u1.heslo=$("#tab2_t42").val();}else{if($("#tab2_c4").val()==1)u1.heslo="";}';
   t= JSON.stringify(am.a100); 
   return am.fun([[91,2],[21,92,"W","am.a100"],[1,t1],[21,92,"R","am.a100",t]]);
  }
 
 if (p2=="xtab2_next") {  // ulozi zmeny, nepouzivam
   am.r1=1;
   u1=am.a100.u_list[am.u2];
   u1.name= $("#tab2_t4").val();
   u1.info = $("#tab2_t41").val();
   u1.jazyk=$("#tab2_t43").val();
  n1=Number(am.u3.substr(1))-100;
   u1.pict="pict/"+pict.list[n1];
//t=JSON.stringify(u1.prava)+"......";
   u1.prava= JSON.parse(am.prava); 
//t +=JSON.stringify(u1.prava);
//alert(t);
    if (am.u1==am.u2) { u1.heslo= $("#tab2_t42").val(); }else {
    if($("#tab2_c4").val()==1) u1.heslo=""; 
   }
 //  alert("n1="+n1+"..."+u1.pict);
   return am.fun([[91,2],[21,92,"W","am.a100"]]);
  }
 
   
  if (p2.substr(0,6)=="tab1_p") { // obrazok
	  am.u3=p2.substr(5);
	//  alert("am.u3="+am.u3);
   return am.fun([[91,2]]);
  }

  if (p2=="tab2_exit") { 
   am.r1=1; 
   return am.fun([[91,2]]); 
  }


 } 
 
 
 if (am.r1==10 || am.r1==11) { // rezim 10..vyber kniznice
  if (p2=="tab2_exit") { // exit 
    am.u2="u102"; am.r1 -= 10;
	t='am.a100.u_list[am.u1].cesta=am.fun35(am.c1);';
   return am.fun([[91,2],[21,92,"W","am.a100"],[1,t],[21,92,"R","am.a100"]]);
  }

  if (p2.substr(0,6)=="tab1_a") { // odkliknuta kniznica zo zoznamu
   am.a1=p2.substr(5);
   return am.fun([[91,2]]);
  }
  
  if (p2=="tab2_service") { // prechod na udrzbu  
   am.r1=12; am.a3="";
   return am.fun([[91,2],[21,92,"F","pict"]]);
  }

   if(am.a1.length==0) return;

   if (p2=="tab2_plus") { // prida novu kniznicu
	t= JSON.stringify(am.a100); 
    p3=[[93,"xtab2_plus"],[21,92,"R","am.a100",t]];
    return am.fun([[12,am.t0[15][5]+" ?",p3]]); // pri ANO pokracuje s "p3"
  }
  if (p2=="xtab2_plus") {  
	var i=100,a1,a4;
	while(true) {
	 i =i+1; a4='a'+i;
	 if (typeof am.a100.a_list[a4] !='object') break;
	}
	t= {"name":"demo","pict":"pict/lib_a101.jpg"};
	if (am.a1.length>0) {
		t=am.fun35(am.a100.a_list[am.a1]);
		t.name= $("#tab2_t4").val()+" nova";
	   n1=Number(am.a3.substr(1))-100;
      t.pict="pict/"+pict.list[n1];
	}
 	am.a100.a_list[a4]= t;
	am.a1=a4;
	am.r1=11;
    return am.fun([[91,2],[21,92,"W","am.a100"]]);
  }
 
  
  if (p2=="tab2_next") { // next  
   am.r1 +=10;
   am[am.a1]={};
   am.c1.a1=am.a1;
	if (typeof am.c1[am.a1] != "object")am.c1[am.a1]={};
   am.s1="";if (typeof am.c1[am.a1].s1 != "undefined")am.s1=am.c1[am.a1].s1;
   return am.fun([[91,2],[21,22,"R","am."+am.a1+".s100",am.s100_demo]]);
  }
   
 } 
 
  if (am.r1==12) { // servis kniznici

   if (p2=="tab2_exit") { 
    am.r1=10; 
    return am.fun([[91,2]]); 
   }

  if (p2.substr(0,6)=="tab1_p") { // obrazok
	  am.a3= p2.substr(5);
	//  alert("am.u3="+am.u3);
   return am.fun([[91,2]]);
  }
   
   
//   	am.hl.prikazy.push(["tab2_plus","pict/nav_plus.jpg","pridaj","Pridaj novu kniznicu"]);
 
 if(am.a1.length==0) return;
 
 if (p2=="tab2_next") { // potvrdi zmeny
	t= JSON.stringify(am.a100);
    am.prava = JSON.stringify(am.a100.a_list[am.a1].prava);	
 //   if (am.fun16("Aw",am.a1)) return am.fun([[93,"xtab2_next"],[21,92,"R","am.a100",t]]);
 //   am.hl.chyba="Chybaju prava na zmenu kniznice "+am.a1;
 //   return am.fun([[91,3]]); 
 return am.fun([[93,"xtab2_next"],[21,92,"R","am.a100",t]]);
   }

   if (p2=="xtab2_next") { // potvrdi zmeny
    am.r1=11;
    x1=am.a100.a_list[am.a1];
    x1.name = $("#tab2_t4").val();
    x1.info = $("#tab2_t41").val();

    n1=Number(am.a3.substr(1))-100;
    x1.pict="pict/"+pict.list[n1];
	x1.prava= JSON.parse(am.prava);
 //  alert("n1="+n1+"..."+u1.pict);
    return am.fun([[91,2],[21,92,"W","am.a100"]]);
   }
  
//    am.hl.prikazy.push(["tab2_delete","pict/nav_delete.jpg","vymaz","Vymaz kniznicu"]);
  if (p2=="tab2_delete") { // vymaze kniznicu am.a2
	t= JSON.stringify(am.a100); 
    p3=[[93,"xtab2_delete"],[21,92,"R","am.a100",t]];
	t1 =am.t0[15][5]+' ['+am.a100.a_list[am.a2].name+'] ?';
    return am.fun([[12,t1,p3]]); // pri ANO pokracuje s "p3"
  }
  if (p2=="xtab2_delete") { // vymaze kniznicu
   delete am.a100.a_list[am.a2];
   am.a2=am.a1;
   am.r1=10;	
   return am.fun([[91,2],[21,92,"W","am.a100"]]);
  }

  }
 
 if (am.r1==20 || am.r1==21) { // rezim 20..vyber programu
  if (p2=="tab2_exit") { // exit 
   am.r1 -=10;
   am.s1="";
  return am.fun([[91,2]]);
  }
  if (p2=="tab2_next") { // next  
   am.r1=29;
   am[am.a1][am.s1]={};
   am.c1[am.a1].s1 = am.s1;
	if (typeof am.c1[am.a1][am.s1] != "object")am.c1[am.a1][am.s1]={};
//	alert(am.c1[am.a1].s1);
 //  am.s1="";if (typeof am.c1[a1].s1 == "text")am.s1=am.c1[a1].s1;
    am.f0t = "am."+am.a1+"."+am.s1+".y1000";
   am.prog=1;
//alert("rezim 29"); 
 return am.fun([[91,2]]);
  }
  if (p2.substr(0,6)=="tab1_s") { // odkliknuty program zo zoznamu
   am.s1=p2.substr(5);
   return am.fun([[91,2]]);
  }
  
  if (p2=="tab2_service") { // servis 
   am.r1=22; am.s3="";
   return am.fun([[91,2],[21,92,"F","pict"]]);
  }

   if (p2=="tab2_plus") { // do rezimu pridavania programu
   am.r1=23;
   am.s3=""; // druh programu 
   return am.fun([[91,2]]);
  }

  if (p2=="tab2_delete") { // vymaze program am.s1
	t= JSON.stringify(am.a100); 
    p3=[[93,"xtab2_delete"],[21,92,"R","am.a100",t]];
	t1 = am.t0[16][6]+' ['+am[am.a1].s100.s_list[am.s1].name+'] ?';
    return am.fun([[12,t1,p3]]); // pri ANO pokracuje s "p3"
  }
  if (p2=="xtab2_delete") { // vymaze uzivatela
   delete am[am.a1].s100.s_list[am.s1];
   am.s1 = "";
   am.r1=21;	
   return am.fun([[91,2],[21,92,"W","am."+am.a1+".s100"]]);
  }

 } 
 
 if (am.r1==22) { // rezim 22..service programov v kniznici

  if (p2=="tab2_exit") {  // exit 
   am.r1=21;
   return am.fun([[91,2]]);
  }
   
  if (p2.substr(0,6)=="tab1_p") { // obrazok
   am.s3= p2.substr(5);
   return am.fun([[91,2]]);
  }
   
  if (p2=="tab2_next") { // next
   t= JSON.stringify(am[am.a1].s100); 
   am.prava= JSON.stringify(am[am.a1].s100.s_list[am.s1].prava);
   return am.fun([[93,"xtab2_next"],[21,92,"R","am."+am.a1+".s100",t]]);
  }
  
  if (p2=="xtab2_next") {  
   n1=Number(am.s3.substr(1))-100;
   x1=am[am.a1].s100.s_list[am.s1];
   x1.name= $("#tab2_t4").val();
   x1.info = $("#tab2_t41").val();
   x1.pict="pict/"+pict.list[n1];
   x1.prava= JSON.parse(am.prava);
   am.r1=21;
   return am.fun([[91,2],[21,92,"W","am."+am.a1+".s100"]]);
  }
  
  
 } // koniec rezimu 22
 
 if (am.r1==23) { // rezim 23..pridaj druh programu do kniznice
  if (p2=="tab2_exit") { am.r1=22; return am.fun([[91,2]]);}
  if (p2=="tab2_next") { // next
	  t= JSON.stringify(am[am.a1].s100); 
      p3=[[93,"xtab2_next"],[21,92,"R","am."+am.a1+".s100",t]];
    i=am.s3.substr(5);
	t1=am.t0[15][6]+" ["+am.t0[12][i]+"] ?";
	return am.fun([[12,t1,p3]]); // pri ANO pokracuje s "p3"
  }
  if (p2=="xtab2_next") {  
	var i=100,s1,s4;
	while(true) {
	 i =i+1; s4='s'+i;
	 if (typeof am[am.a1].s100.s_list[s4] !='object') break;
	}
	i=am.s3.substr(5);
	am.s2=i*100;
	am[am.a1].s100.s_list[s4] = {"name":am.t0[12][i],"pict":"pict/prog_"+i+"_s101.jpg","prog":am.s2,"info":"","prava":{}};
	am[am.a1].s100.s_list[s4].prava[am.u1]="SdSrSwPrPw";
	am.s1=s4;
	am.r1=22;
    return am.fun([[91,2],[21,92,"W","am."+am.a1+".s100"]]);
  }
  if (p2.substr(0,10)=="tab1_prog_") { // odkliknuty druh programu zo zoznamu
   am.s3=p2.substr(5);
am.fun9(am.s3); 
 return am.fun([[91,2]]);
  }
 } // 23
 return;
 
}

am.fun95 = function(pole,stlpec,kluc){ // vyhlada poradie kluca v poli na stlpci 'stlpec'
	var x=-1;
	for (var i=0; i<pole.length; i++) { if(pole[i][stlpec]==kluc) x=i;}
	return x;
}

 
am.fun94 = function(tx1,ix1,ve1,st1) { // vygeneruje zoznam obrazkovz pola tx1, kde ix1 je klucove slovo)

// tx1=[[kluc1,pict1,name1,popis1],[kluc2,pict2,name2,popis2]]; ix1=kluc1;
var onc,onc2;
//if(ve1==1) onc +=' ondblclick="am.fun([[93,am.tab2_next]]);"';

var t4="<table>", i1=0,v1="tab"+ve1+"_", i2, t5,t6;
// t = '<img id="r1_p1"  class="r1_p" src="pict/menu.jpg" />';
for (var i=0; i<tx1.length; i++) {
	onc=' onclick="am.fun([[93,this.id]]);"'
	if (i1==0) { t4 +="<tr>"; i1 = 1; }
	t4 +='<td>';
	t1=v1+'p'; 
	onc2="";
//	if (tx1[i][0]==ix1){ t1 +=' '+v1+'ozn';if(ve1==1) onc2 =' onclick="am.fun([[93,am.tab2_next]]);" ';}
	if (tx1[i][0]==ix1){ t1 +=' '+v1+'ozn';if(ve1==1) onc =' onclick="am.fun([[93,am.tab2_next]]);" ';}
	i2=tx1[i][1];
	 
/*
 t4 +='<table class="'+v1+'_t"><tr><td><img id="'+v1+tx1[i][0]+'" class="'+t1+'"';
 t4 +=' src="'+tx1[i][1]+'" title="'+tx1[i][3]+'"' +onc;
 t4 +='<br>'+tx1[i][2]+'</td></tr></table>';
*/
 t4 +='<div class="'+v1+'t">';
 
 t5=' id="'+v1+tx1[i][0]+'" class="'+t1+'" title="'+tx1[i][3]+'"' +onc;
 t6 ='<img  src="'+tx1[i][1]+'"'+t5+' />'; // obrazok
if(i2.substr(1,3)=="svg") {t6='<div '+t5+' >'+i2+'</div>'; // <svg...>
//alert(t6);
} 
 t4 += t6+'<br><a '+onc2+' >'+tx1[i][2]+'</a></div>';


//	t4 +='<table class="r4_t"><tr><td><img id="r4_p'+i+'" class="r4_p" src="pict/'+tx4[i][2]+'" title="'+tx4[i][3]+'" /></td></tr><tr><td align="center" class="r4_t2" >'+tx4[i][3]+'</td></tr></table>';

	t4 +='</td>';
	i1 =i1+1;
	if (i1>st1) { t4 +="</tr>"; i1 = 0; }
}

if (i1>0){ 
	 for (var i=i1; i<=st1; i++) { t4 +='<td></td>';}
	 t4 +='</tr>';
}
	
t4 +='</table>';
//alert(t4);
return t4;
}

am.fun96 = function() {
//	alert("full screen");
	am.full= ! am.full;
	var el1=document.documentElement;
	if (am.full) { openFullscreen(el1);return;}
	closeFullscreen();
	return;
}

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}


am.fun99 = function() { // start programu
//	var p=arguments[0];
//	var p1=p.pop();
	window.addEventListener("beforeunload", am.fun31() );	
//	alert("99-ver9");
	for (var i=100; i<1001; i++) {
		if (typeof window["am_fun"+i] === "function" ) {
	//		alert("Window "+i);
			am["fun"+i] = window["am_fun"+i];
		}
	}
	p=[[90]];
		if (am.storage_status) p.push([21,1,"A2"]);
		if (am.intranet_status) p.push([21,2,"A3"]);
/* zoznam programov a dat
poradie: 0-pamati,1-demo,2-Storage,3-Intranet
hodnota: 0-nema byt, 1..nieje, 2-nenaslo 3-neznamy datum ,rrrrmmddhhmmss - aktualny datum  
*/
//alert("99-1");
		return am.fun(p);
}

am.fun200 = function(){ // testovacia funkcia na spolupracu SVG a popis okna
	t='<div id="hlavny" ><div id="plan" /><div id="popis"/></div>';
	$("body").html(t);


//t1='<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 -30 200 200">';
w=200;h=200;
t = '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'">';
t+= ' <rect  x="0" y="0" width="50" height="50" fill="green" />';
t+= '</svg>';
$("#plan").html(t);

t="xxx<table>";
t+='<tr><td id="p_0">00000000000000000</td></tr>';
t+='<tr><td id="p_6">00000000000000000</td></tr>';
t+='<tr><td id="p_5">00000000000000000</td></tr>';
t+='<tr><td id="p_4">00000000000000000</td></tr>';
t+='<tr><td id="p_3">00000000000000000</td></tr>';
t+='<tr><td id="p_2">00000000000000000</td></tr>';
t+='<tr><td id="p_1">00000000000000000</td></tr>';
t+='</table>';
//t="xxxxxxxxxxxxxxxxx";
$("#popis").html(t);
 $("#hlavny").css({ "position": "absolute","display":"box","width":"100%"});
 $("#plan").css({ "position": "relative","display":"box","float":"left","color":"white","font-size": 10, "text-align":"center","width":"60%", "border":"solid 1px yellow"});
 
 $("#popis").css({ "position": "relative","display":"box","color":"black","background-color":"white","font-size": 10, "text-align":"center","margin-left": "60%", "margin-right": "1%","border":"solid 1px blue"});
	
	
}
	

//am.fun([[200]]);
am.fun([[1000,1]]);

