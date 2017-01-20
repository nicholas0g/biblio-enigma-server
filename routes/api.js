/////CONFIGURARE QUI DI SEGUITO LE CHIAVI PRIVATE PER LE API!
var twitter_app='Smg2ZXRtUUFBQUFZOW5BVW0wd2g4SzlUTjpQREpESm1WUHhwcncxc2Q0cHFkSjMxZ2tsWkxuWmh1alNMVzRydUp0N0tQTTNaVk41Uw==';
var onesignalapp="0a8fd04f-002e-46d4-9b00-1f207ec65e78";
var onesinal_secret='YjliODM1NWYtZWVjMi00MWM4LTliZTgtYWM4NGQzODQ0NDdj';
////queste api di test saranno valide fino a quanto il prof non vedrà il progetto. Saranno poi rese inutilizzabili!

var express = require('express');
var fs = require("fs");
var request=require('request');
var router = express.Router();

//durante l'inizializzazione del servizio tutti i posti sono liberi
var posti={1:0,2:0,3:0,4:0,5:0};
var ok={"result":"ok"};
var fail={"result":"fail"};

//utilizzato per risolvere problematiche CORS
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* GET api page. */
router.get('/', function(req, res, next) {
  res.render('api');
});

//endpoint pubblico che restituisce i posti occupati nelle 5 biblioteche
router.get('/postiOccupati',function(req,res){
    res.end( JSON.stringify(posti));
});

//endpoint pubblico che restituisce la lista totale delle biblioteche
router.get('/listaBiblioteche', function (req, res,next) {
   fs.readFile( __dirname + "/" + "biblioteche.json", 'utf8', function (err, data) {
       res.end( data );
   });
})

//endpoint pubblico che restituisce i dettagli di una singola biblioteca
router.get('/:id', function (req, res,next) {
   fs.readFile( __dirname + "/" + "biblioteche.json", 'utf8', function (err, data) {
       biblioteche = JSON.parse( data );
       var biblioteca = biblioteche["biblioteca" + req.params.id] ;
       res.end( JSON.stringify(biblioteca));
   });
})

//endpoint privato che permette di segnalare studente in ingresso
router.put('/studente/:id',function(req,res){
    fs.readFile( __dirname + "/" + "biblioteche.json", 'utf8', function (err, data) {
       biblioteche = JSON.parse( data );
       var residui = biblioteche["biblioteca" + req.params.id]['postazioni'];
        if(posti[req.params.id]<residui){
            posti[req.params.id]=posti[req.params.id]+1;
            inviaNotifica("Studente in ingresso sulla biblioteca " + req.params.id);
            res.end(JSON.stringify(ok));
        }
        else res.end(JSON.stringify(fail));
   });
});

//endpoint privato che permette di segnalare studente in uscita
router.delete('/studente/:id',function(req,res){
    fs.readFile( __dirname + "/" + "biblioteche.json", 'utf8', function (err, data) {
       biblioteche = JSON.parse( data );
       var residui = biblioteche["biblioteca" + req.params.id]['postazioni'];
        if(posti[req.params.id]>0){
            posti[req.params.id]=posti[req.params.id]-1;
            inviaNotifica("Studente in uscita sulla biblioteca " + req.params.id);
            res.end(JSON.stringify(ok));
        }
        else res.end(JSON.stringify(fail));
   });
});

router.get('/book/:text',function(req,res,next){
	request('https://www.tastekid.com/api/similar?k=256568-webtest-ZH9IQKM7&type=book&q='+req.params.text, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        res.end(body);
    }
	});
});
//endpoint pubblico per vedere cosa si dice sui social (twitter) della biblioteca selezionata
router.get('/socialStatus/:id', function (req, res,next) {
	var tag="";
	fs.readFile( __dirname + "/" + "biblioteche.json", 'utf8', function (err, data) {
       biblioteche = JSON.parse( data );
       tag= biblioteche["biblioteca" + req.params.id]["twittertag"] ;
       var options_api = {
		url: 'https://api.twitter.com/1.1/search/tweets.json?q=%23sapienza+%23'+tag+'&result_type=recent',
        headers: {
            'Authorization': 'Bearer '+token
		}
	  }
    request(options_api, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        res.end(body);
    }
    else{
        console.log(body)
    }
	})
	});
})
//--inizia qui il segmento di codice necessario per utilizzare le api REST di twitter

// imposto l'header compatibile con la richiesta di token alle api di twitter'
var token="";//questa variabile conterrà il token una volta catturato

// configurazione per la richiesta del token alle api di twitter
var options_token = {
    url: 'https://api.twitter.com/oauth2/token',
    method: 'POST',
    headers: {
        'Authorization':'Basic '+twitter_app,
        'Content-Type':'application/x-www-form-urlencoded'
    },
    body:'grant_type=client_credentials'
}

//invio la richiesta per l'ottenimento del token e lo memorizzo in una variabile token che userò per ogni richiesta futura'
request(options_token, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var Jresponse=JSON.parse(body);
        console.log("Token twitter api ottenuto correttamente");
        token=Jresponse['access_token'];
    }
    else{
        console.log("Errore ottenimento token twitter, parti dell'applicazione potrebbero non funzionare");
    }
})
//--finisce qui il codice per utilizzare le api rest di twitter

//--qui viene definita la funzione per l'invio delle notifiche asincrone tamite onesignal'
var inviaNotifica=function(testo_notifica){
    var sendNotification = function(data) {
    var headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic " + onesinal_secret
    };
  
    var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
    };
  
    var https = require('https');
    var req = https.request(options, function(res) {  
    res.on('data', function(data) {
      console.log("Response:");
      console.log(JSON.parse(data));
    });
    });
  
    req.on('error', function(e) {
    console.log("ERROR:");
    console.log(e);
    });
  
    req.write(JSON.stringify(data));
    req.end();
    };

    var message = { 
    app_id: onesignalapp,
    contents: {"en": testo_notifica},
    included_segments: ["All"]
    };

sendNotification(message);
}
//--terminata funzione di invio notifiche
module.exports = router;