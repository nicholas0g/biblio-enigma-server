# biblio-enigma-server
This repo contain the project for " Network comunications" - Sapienza Univ. of Rome ay2016/2017

Nella seguente repository e possibile trovare il progetto per Reti di Calcolatori. 
Il progetto svolge il seguente servizio: si occupa di gestire i posti disponibili nelle sale lettura delle biblioteche del nostro ateneo. 

#Quali servizi sono resi disponibili tramite rest?
* conoscere informazioni generiche sulle biblioteche gestite
* conoscere lo stato dei posti occupati nelle singole biblioteche
* catturare commenti degli utenti sui social relativi ad una delle biblioteche
* suggerire musica/libri/film relativamente ad un libro
* segnalare uno studente in entrata in una biblioteca (nuovo posto occupato)
* segnalare uno studente in uscita da una biblioteca (nuovo posto libero)

#Api esterne utilizate:
* Twitter (per lo status sui social)
* Tastekid (per i suggerimenti basati sul titolo di un libro)

#Come avviare il servizio:
Per avviare il servizio basta mandare in esecuzione app.js, realizzata con framework expressjs e in esecuzione sulla porta 3000.

Di seguito alcune screen del servizio in esecuzione completo:
(Per il framework grafico è stato utilizzato jade)

**Se si va su host:3000**
![home](/screenshot/home.png)
**Se si va su host:3000/api**
![api](screenshot/api.png)

	
