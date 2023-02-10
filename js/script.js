// SOLUZIONE CON CREAZIONE DELLE CELLE TRAMITE STRINGA

// // 1. Recuperare elemento Pulsante Play da DOM
// const playBtnEl = document.querySelector('button');

// // 2. Recupero elemento Griglia da DOM in cui poi inserisco le celle create
// const grigliaEl = document.querySelector('.griglia');

// // 3. Aggancio evento "click" al Pulsante Play recuperato da DOM
// playBtnEl.addEventListener('click', function(){

//   // Svuoto contenuto della Griglia perche ad ogni "click" del pulsante si deve generare una nuova griglia e non appenderla alla precedente
//   grigliaEl.innerHTML = '';
  
//   // 4. Imposto Dimensione delle Celle e Numero complessivo di Celle [Gliglia Quadrata 10x10]  
//   latoGriglia = 10;
//   numCelle = latoGriglia * latoGriglia;

//   // 5. Creo Ciclo di 'numCelle' interazione ed a ogni interazione creo una Cella da inserire dentro 'GrigliaEl'
//   for (let i=0; i < numCelle; i++){

//     // 5.1 - Creo Stringa che rappresenta la Cella
//     const cellaStringa = `<div style="width:calc(100% / ${latoGriglia})">${i+1}</div>`;
    
//     // 5.2 - Inserisco la Cella creata dentro la Griglia nel DOM
//     grigliaEl.innerHTML += cellaStringa;

//   }

//   // 6 - Prendo dal DOM tutte le Celle della Griglia
//   const listaCelle = document.querySelectorAll('.griglia > div');
//   console.log(listaCelle);

//   // 6. Creo Ciclo per aggangiare a ogni cella evento "click"
//   for (let i=0; i < numCelle; i++){

//     // 6.1 - Al "click" sulla cella appare un messaggio nella console con il numero della cella
//     listaCelle[i].addEventListener('click', function(){
//       console.log(`Questa e' la cella numnero ${i+1}`);
//     });

//   }

// });

// **************************************************************************************************************

// SOLUZIONE CON CREAZIONE DELLE CELLE TRAMITE LA CREAZIONE DI UN ELEMENTO DEL DOM

// VARIABILI GLOBALI
let bombe = [];
let punteggio;
let punteggioMax;
let latoGriglia;


// 1. Recuperare elemento Pulsante Play da DOM
const playBtnEl = document.querySelector('button');

// 2. Recupero elemento Griglia da DOM in cui poi inserisco le celle create
const grigliaEl = document.querySelector('.griglia');

// 3. Aggancio evento "click" al Pulsante Play (recuperato da DOM) invocando la Funzione "starGame"
playBtnEl.addEventListener('click', starGame);

// **************************************************************************************************************

// **********************
// FUNZIONE "resetGame" - istruzioni di Reset per Fine Gioco  
// **********************

function resetGame(){

  // 1. Svuoto contenuto della Griglia perche ad ogni "click" del pulsante si deve generare una nuova griglia e non appenderla alla precedente
  grigliaEl.innerHTML = '';
}

// **********************
// FUNZIONE "starGame"
// **********************

function starGame(){

  // 1. Invoco la Funzione "resetGame" per iniziare ogni volta una nuova partita da capo.
  resetGame();

  // 2. Imposto valore lato della griglia
  latoGriglia = 10;
  
  // 4. Invoco la Funzione "generaGriglia" passando la dimensione del lato [Gliglia Quadrata]  
  generaGriglia(latoGriglia);
  
}

// *************************
// FUNZIONE "generaBombe"
// *************************

function generaBombe(posizioneMax){

  // 1. Creo Array in cui salvare la posizione delle Bombe;
  const posizioniBombe = [];

  // 2. Creo variabile per memorizzare Posizione Random
  let posizioneRandom;

  // 3. Creo variabile per contare quandi elemento ho inserito nell'Array
  let count = 0;

  // 4. Creo un ciclo che mi genera 16 posizione random tutte diverse
  while(count!==16){

    posizioneRandom = Math.floor(Math.random() * (posizioneMax) + 1);
    if (posizioniBombe.includes(posizioneRandom)=== false){
      posizioniBombe.push(posizioneRandom);
      count++;
    }

  }
  
  return posizioniBombe;

}

// ******************************
// FUNZIONE "generaNumeriCaselle"
// *****************************

function generaNumeriCelle(numMax){

  // 1. Creo Array in cui salvare la i numeri delle celle;
  let numeriCelle = [];

  // 2. Creo variabile per memorizzare Numero Random
  let numeroRandom;

  // 3. Creo variabile per contare quandi elemento ho inserito nell'Array
  let count = 0;

  // 4. Creo un ciclo che mi genera 100 numeri rando tutti diversi
  while(count!==numMax){

    numeroRandom = Math.floor(Math.random() * (numMax) + 1);
    if (numeriCelle.includes(numeroRandom)=== false){
      numeriCelle.push(numeroRandom);
      count++;
    }

  }
  
  return numeriCelle;
}

// *************************
// FUNZIONE "generaGriglia"
// *************************

function generaGriglia(lato){

  // 1. Calcolo numero celle con il parametro della funzione
  const numCelle = lato * lato;

  // 2. Invoco la Funzione "generaBombe", passando il "numero celle" come parametro, per avere le posizioni delle Bombe
  bombe = generaBombe(numCelle);
  console.log(bombe);

  // 3. Invoco la Funzione "generaNumeriCelle", passando il "numero celle" come parametro, per avere le posizioni delle Celle
  const posizioni = generaNumeriCelle(numCelle);
  console.log(posizioni);

  // 4. Inizializzo variabile che tiene conto del Punteggio e calcola il Punteggio Massimo
  punteggio = 0;
  punteggioMax = numCelle - bombe.length;


  // 3. Creo Ciclo di 'numCelle' interazione ed a ogni interazione creo una Cella da inserire dentro 'GrigliaEl'
  for (let i=0; i < numCelle; i++){

    // 3.1 - Creo la Cella come Elemento del DOM
    const cellaEl = document.createElement('div');

    // 3.2 - Aggiungo Stile CSS in linea per dare dimensione alla Cella
    cellaEl.style.cssText += `width:calc(100% / ${lato})`;

    // 3.3 - Aggiungo contenuto (numero della cella) alla Cella
    cellaEl.innerHTML = posizioni[i];

    // 4. Aggancio evento "click" sulla cella e gestisco il gioco
    cellaEl.addEventListener('click', clickCella);

    // 5. Inserisco la Cella creata dentro la Griglia nel DOM
    grigliaEl.append(cellaEl);
    
  }
}

// *************************
// FUNZIONE "clickCella"
// *************************

function clickCella(){

  // 1. Tramite 'this' recupero la cella a cui e' agganciato l'evento "click"
  const cella = this;

  // 2. Recupero elemento del DOM in cui inserire il punteggio
  const punteggioEl = document.querySelector('.punteggio');

  // 3. Controllo se il Numero della Cella corrisponde a una Bomba ---> Si = SCONFITTA , No = VITTORIA
   if (bombe.includes(parseInt(cella.innerHTML))){

    // Cambio colore di sfondo
    cella.classList.add('bg-sconfitta');
    
    // Inserisco icona "bomba"
    cella.innerHTML = `<i style="color:black" class="fa-solid fa-bomb"></i>`;

    // Richiamo funzione per determinale la Sconfitta
    endGameLose(punteggio);

  } else {

    cella.removeEventListener('click', clickCella);

    // Cambio colore di sfondo
    cella.classList.add('bg-vittoria');

    // Inserisco icona "ok"
    cella.innerHTML = `<i style="color:black" class="fa-solid fa-thumbs-up"></i>`;

    // Incremento punteggio
    punteggio++;
    punteggioEl.innerHTML = `<h5>Punteggio Attuale: <span style="color:blue">${punteggio}</span></h5>`;

    // Richiamo funzione per dichiare la Vittoria
    endGameVictory(punteggio,punteggioMax);
  }
  
}

// *************************
// FUNZIONE "endGame"
// *************************

function endGameLose(punti){

  // 1. Messaggio di Sconfitta con Punteggio
  alert ('Hai perso :( \n' + `Il tuo punteggio finale e' ${punti}`);

  // 2. Ricarico la Pagina per poter iniziare una Nuova Partita.
  window.location.reload();

}

// *************************
// FUNZIONE "endGameVictory"
// *************************

function endGameVictory(punti,puntiMax){

  // 1. Controlla per determinare la vittoria
  if (punti === puntiMax){
    alert ("Complimenti! \n Hai vinto!");

    window.location.reload();
  }
}

// *************************
// FUNZIONE "endGameError"
// *************************

function endGameError(){
  alert(`Seleziona una Difficolta' ;)`);

  window.location.reload();
}