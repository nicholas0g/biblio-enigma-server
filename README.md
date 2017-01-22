# biblio-enigma-server
This repo contain the project for " Network comunications" - Sapienza Univ. of Rome ay2016/2017

:boom: tutti i token di prova inclusi saranno invalidati nel momento in cui il progetto sarà approvato :boom:

E' possible provare e testare il progetto in tutte le sue funzionalità all'indirizzo http://demo.nicholasgiordano.it:3000

Nella seguente repository e possibile trovare il progetto per Reti di Calcolatori. 
Il progetto svolge il seguente servizio: si occupa di gestire i posti disponibili nelle sale lettura delle biblioteche del nostro ateneo. 
Ongi volta che viene registrato uno studente in entrata o in uscita da una biblioteca viene inviata una notifica push tramite web. 
+ E' possibile iscriversi a queste notifiche visitando la pagina di. test http://demo.nicholasgiordano.it/biblionotifiche
+ E' possibile iscriversi anche alle notifiche utilizzando un ipotetico client di test che utilizza le api offerte da questo servizio all'indirizzo http://demo.nicholasgiordano.it/biblio-enigma-client
+ E' possibile consultare il codice del client di test all'indirizzo https://github.com/nicholas0/biblio-enigma-client

#Quali servizi sono resi disponibili tramite rest?
* conoscere informazioni generiche sulle biblioteche gestite
* conoscere lo stato dei posti occupati nelle singole biblioteche
* catturare commenti degli utenti sui social relativi ad una delle biblioteche
* suggerire musica/libri/film relativamente ad un libro
* segnalare uno studente in entrata in una biblioteca (nuovo posto occupato)
* segnalare uno studente in uscita da una biblioteca (nuovo posto libero)
* inviare un messaggio di testo come notifica ai sottoscrittori

#Api esterne utilizate:
* Twitter (per lo status sui social)
* Tastekid (per i suggerimenti basati sul titolo di un libro)
* Onesignal (per l'invio delle notifiche)

#Come avviare il servizio:
Per avviare il servizio basta mandare in esecuzione app.js, realizzata con framework expressjs e in esecuzione sulla porta 3000.

#Utilizzo delle API:
##Per visionare la lista delle biblioteche con i dettagli
```
GET /api/listaBiblioteche
```
che restituisce la lista di tutte le biblioteche con i dettagli

##Per avere informazioni su una singola biblioteca
```
GET /api/{id}
```
dove id è l'id della biblioteca per la quale si desiderano le inforamzioni producendo la seguente risposta
```
{"nome":"biblioteca di fisica","id":4,"edificio":"Fisica piano terreno","wifi":"NO","pc":1,"postazioni":200,"noleggio":"SI","h24":"NO","twittertag":"fisica"}
```
##Per vedere il numero dei posti occupati nelle singole biblioteche
```
GET /api/postiOccupati
```
che produce la seguente risposta (si noti che la biblioteca 5 ancora non è implementata e darà sempre zero)
```
{"1":11,"2":2,"3":1,"4":9,"5":0}
```
##Per ottenere suggerimenti sul titolo di un libro:
```
GET api/book/{title}
```
che produce la seguente risposta immaginando che il titolo del libro sia "the bible"
```
{"Similar": {"Info": [{"Name": "The Bible", "Type": "book"}], "Results": [{"Name": "Mere Christianity", "Type": "book"}, {"Name": "Jeremy Camp", "Type": "music"}, {"Name": "Third Day", "Type": "music"}, {"Name": "Chris Tomlin", "Type": "music"}, {"Name": "The Passion Of The Christ", "Type": "movie"}, {"Name": "Casting Crowns", "Type": "music"}, {"Name": "Steven Curtis Chapman", "Type": "music"}, {"Name": "Son Of God", "Type": "movie"}, {"Name": "Jesus Culture", "Type": "music"}, {"Name": "The Screwtape Letters", "Type": "book"}, {"Name": "Crazy Love", "Type": "book"}, {"Name": "Tobymac", "Type": "music"}, {"Name": "God's Not Dead", "Type": "movie"}, {"Name": "Lecrae", "Type": "music"}, {"Name": "Hillsong United", "Type": "music"}, {"Name": "Michael W. Smith", "Type": "music"}, {"Name": "Jars Of Clay", "Type": "music"}, {"Name": "Matthew West", "Type": "music"}, {"Name": "Kim Walker", "Type": "music"}, {"Name": "Kutless", "Type": "music"}]}}
```
##Per conoscere le opinioni social relativamente ad una biblioteca
```
GET /socialStatus/{id}
```
che riceve la seguente risposta
```
{"statuses":[],"search_metadata":{"completed_in":0.046,"max_id":823173922271039493,"max_id_str":"823173922271039493","query":"%23sapienza+%23geologia","refresh_url":"?since_id=823173922271039493&q=%23sapienza%20%23geologia&result_type=recent&include_entities=1","count":15,"since_id":0,"since_id_str":"0"}}
```
###Per quanto riguarda le api private
* Aggiungere uno studente in ingresso in una biblioteca con id {id}
```
PUT /studente/{id}
headers{token: <a valid token>}
```
* Aggiungere uno studente in uscita in una biblioteca con id {id}
```
DELETE /studente/{id}
headers{token: <a valid token>}
```
* Inviare una notifica a tutti i sottoscrittori
```
POST /message/{text}
headers{token: <a valid token>}
```
##I risultati delle chiamate private possono essere:
Se non viene accettata l'autenticazione
```
{"result":"Authorization failure"}
```
Se si riesce ad aggiungere uno studente in entrata o in uscita (e quindi i posti nella biblioteca sono compresi tra 0 e la massima capienza)
```
{"result":"ok"}
```
altrimenti
```
{"result":"fail"}
```

##Di seguito alcune screen del servizio in esecuzione:
(Per il framework grafico è stato utilizzato jade)

**Se si va su host:3000**
![home](/screenshot/home.png)
**Se si va su host:3000/api**
![api](screenshot/api.png)

	
