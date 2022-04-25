<?php

function pohyb2022() { //nova funkcia na zachytenie udalosti
//  14 APR 2022 

// autentifikacia:
 $ajax =false;
 $heslo  ='xxxx';
 $heslo1 = 'heslo';
 $pohyb1 = 0;
// kde sa budu ukladat udaje
 $subor ='pohyby.txt';


// vstupne data:
 $firma='abc';
 $identifikator='?';
 $pohyb='?';
 $udaje1='';
 $udaje2='';
 $udaje3='';
 
// doplnene data serverom 
 $ipadresa='1.2.3.4';
 $cas=0;
 $obsah='';
 
 $cas = round(microtime(true)*1000); // integer, milisekundy
 $ipadresa= getenv('REMOTE_ADDR'); 
 
 
// vstup a test parametrov 
 if (isset($_POST['ajax']))   $ajax  = $_POST['ajax'];
 if (! $ajax) exit("ERR=1, wrong 'AJAX'"); // nepritomna premenna [ajax]

 if (isset($_POST['kluc']))   $heslo   = $_POST['kluc'];
 if ($heslo != $heslo1) exit("ERR=2, wrong 'KLUC'"); // nezhoda hesla

 if (isset($_POST['firma'])) $firma = $_POST['firma'];
 if (isset($_POST['lokator'])) $identifikator = $_POST['lokator'];
 if (isset($_POST['pohyb'])) $pohyb = $_POST['pohyb'];
 if (isset($_POST['udaj1']))  $udaje1  = $_POST['udaj1'];
 if (isset($_POST['udaj2']))  $udaje2  = $_POST['udaj2'];
 if (isset($_POST['udaj2']))  $udaje3  = $_POST['udaj3'];

  if ($pohyb=='vstup') { $pohyb1=1; } // prihlasenie zakaznika
  if ($pohyb=='trasovanie') { $pohyb1=2; } // trasovanie zakaznika
  if ($pohyb=='nakup') { $pohyb1=3; } // realizacia nakupu zakaznikom
  if ($pohyb=='vystup') { $pohyb1=4; } // realizacia nakupu zakaznikom
// tu doplnim dalsie mozne pohyby...
  if ($pohyb1==0) exit("ERR=3, wrong 'POHYB'"); // realizacia nakupu zakaznikom

 $obsah = $firma . ',' . $ipadresa . ',' . $cas . ',' . $identifikator;
 $obsah = $obsah.','.$pohyb.','.$udaje1.','.$udaje2.','.$udaje3; 

  pohyb_write($subor,$obsah);
// exit('OK');
}

function write_hl($sub) { // zapis hlavicky
	$cr = chr(13).chr(10);
	$hlava='Trasovanie pohybov uzivatela na weboch: OVOCE a SUPERHRUSKA'.$cr.$cr;
	$myfile = @fopen($sub,"w") or exit("ERR=4, missing archive data");
	fwrite($myfile, $hlava);
	fclose($myfile);
	return true;
}

function pohyb_write($sub,$obs) { // zapis do suboru
 if (! file_exists($sub)) write_hl($sub);
 	$myfile = @fopen($sub,"a") or exit("ERR=4, missing archive data");
	$cr = chr(13).chr(10);

	fwrite($myfile, $obs.$cr);
	fclose($myfile);
	return true;
}

pohyb2022();
?>