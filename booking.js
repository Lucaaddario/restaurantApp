
//Creazione dell'oggetto Booking (La nostra sala ristorazione):
const Booking = {};
//L'oggetto Booking ha adesso la proprietà numeroPersoneW che contiene il 'div' della sezione numero-persone-w.
Booking.numeroPersoneW = document.querySelector('#numero-persone-w');
//L'oggetto Booking contiene anche la proprietà numero persone che contiene lo <span> del numero di persone.
Booking.numeroPersone = document.querySelector('#numero-persone');
//Lo stesso vale per le proprietà successive.
Booking.tavoliW = document.querySelector('#tavoli-w');
Booking.tavoloSelezionato = document.querySelector('#tavolo-selezionato');
Booking.messageStatus = document.querySelector('#message-status');
Booking.form = document.querySelector('#form');


//Con una funzione async già invocata "costruisciSala" andiamo ad inizializzare una proprietà sala dell'oggetto Booking con un fetch del nostro file json che ritornerà una promessa.
(async function costruisciSala() {
    Booking.sala = await fetch('./booking.json');
    //Dopo che la promessa viene risolta e ritorniamo il nostro file .json lo convertiamo in oggetto javascript con il metodo .json
    Booking.sala = await Booking.sala.json();
    //Inizializziamo la proprietà tavoli dell'oggetto Booking che conterrà tutti i tavoli della sala
    Booking.tables = Booking.sala.tavoli;
    //Invochiamo la funzione disponiTavoli che darà in input l'array tavoli dell'oggetto Booking
    disponiTavoli(Booking.tables)
})();


//La funzione disponiTavoli creerà dinamicamente i nostri tavoli per ogni tavolo nell'oggetto Booking.sala.tavoli
function disponiTavoli(tavoli) {
    tavoli.forEach((tavolo ,i ) => {
        //La variabile classiTavolo contiene una stringa con le classi CSS:
        let classiTavolo = 'tavolo';
        let tavoloDOM = document.createElement('div');
        //Al div creato "TavoloDOM" appendiamo la propria numerazione dei tavoli. Essendo 8 tavoli, i suoi indici vanno da 0 a 7, quindi creando un textNode con (i+1), partiamo numerando da indice 1 fino a indice 8.
        tavoloDOM.appendChild(document.createTextNode(i+1));

        //Se il tavolo ciclato ha come proprietà "occupato" il valore occupato true aggiungiamo alla variabile classiTavolo la classe 'occupato' altrimenti, se false, aggiungiamo la classe 'libero'
        classiTavolo += tavolo.occupato ? ' occupato' : ' libero';
        //Se il tavolo ciclato ha compe proprietà "posti" il valore 6 allora aggiungiamo alla variabile classiTavolo la classe 'x6' altrimenti se ha come valore 4 aggiungiamo la classe 'x4'
        classiTavolo += tavolo.posti == 6 ? ' x6' : ' x4';
        //Aggiungiamo le classi a ciascun tavolo
        tavoloDOM.setAttribute('class' , classiTavolo);
        //Appendiamo tutti i tavoli al suo wrapper
        Booking.tavoliW.appendChild(tavoloDOM);
    });
}

//Creiamo un eventlistener al click del wrapper 'numeroPersone' cioè il div che racchiude i pulsanti '-' e '+'
Booking.numeroPersoneW.addEventListener('click' , (e)=> {
    //Essendo quel '-' e '+' degli anchor andiamo a prevenire il loro comportamento di default
    e.preventDefault();
    //La variabile numeroPersone è = al contenuto testuale dello <span> numero persone che di default contiene due.
    let numeroPersone = +Booking.numeroPersone.textContent;

    //Abbiamo effettuato un controllo sull'evento 'click', indicando che se viene cliccato il pulsante nel div che ha una classe 'add' e il numeroPersone stampato è == a 6 l'evento si interromperà.
    if (e.target.id == 'add' && numeroPersone == 6) {
        return;
        //Se invece clicchiamo sul target 'add' prima del raggiungimento del numero 6, si incrementerà di 1.
    } else if (e.target.id == 'add'){
        Booking.numeroPersone.textContent = numeroPersone + 1;
        //Se invece clicchiamo sul target con classe 'sub' cioè il simbolo '-', decrementiamo il numero stampato finchè non raggiunge il numero 1.
    } else if (e.target.id == 'sub' && numeroPersone > 1 ) {
        Booking.numeroPersone.textContent = numeroPersone - 1;
    }
})

//Evento al click del wrapper 'div' che contiene tutti i tavoli:
Booking.tavoliW.addEventListener('click' , (e)=>{
    //selezionato contiene il contenuto (numero tavolo) del e.target cioè l'elemento che clicchiamo nel wrapper.
    let selezionato = +e.target.textContent;

    //Se viene scelto un tavolo occupato compare il messaggio 'tavolo occupat'
    if (Booking.tables[selezionato-1].occupato) {
        Booking.messageStatus.textContent = "Il tavolo scelto è occupato"
        // 'Altrimenti il - del tavolo selezionato cambia con il numero del tavolo selezionato'
    } else {
        Booking.tavoloSelezionato.textContent = selezionato;
    }
})

//Creo un evento al sumbit del form
Booking.form.addEventListener('submit' , (e)=>{
    //Prevengo il default del target, cioè evito il comportamente default del submit.
    e.preventDefault();
    //Se non seleziono un tavolo compare il messaggio è necessario selezionare un tavolo e termina l'evento
    if (Booking.tavoloSelezionato.textContent == '-') {
        Booking.messageStatus.textContent = 'È necessario selezionare un tavolo libero.';
        return;
        //Se il tavolo è stato selezionato avvio al funzione sendBooking().
    } else {

        // let bookingForm = new FormData();
        // bookingForm.append('numero-persone' , +Booking.numeroPersone.textContent);
        // bookingForm.append('tavolo' , +Booking.tavoloSelezionato.textContent);
        // bookingForm.append('nome' , Booking.form.nome.value);
        // bookingForm.append('email' , Booking.form.email.value);

        Booking.messageStatus.textContent = `Grazie ${Booking.form.nome.value} per aver prenotato il tavolo ${Booking.tavoloSelezionato.textContent} per ${Booking.numeroPersone.textContent} persone.`
        Booking.form.reset();
    }
})
