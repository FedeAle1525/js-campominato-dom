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
  
  // 2. Invoco la Funzione "generaGriglia" passando la dimensione del lato [Gliglia Quadrata 10x10]  
  const latoGriglia = 10;
  generaGriglia(latoGriglia);
  
}

// *************************
// FUNZIONE "generaGriglia"
// *************************

function generaGriglia(lato){

  const numCelle = lato * lato;

  // 1. Creo Ciclo di 'numCelle' interazione ed a ogni interazione creo una Cella da inserire dentro 'GrigliaEl'
  for (let i=0; i < numCelle; i++){

    // 1.1 - Creo la Cella come Elemento del DOM
    const cellaEl = document.createElement('div');

    // 1.2 - Aggiungo Stile CSS in linea per dare dimensione alla Cella
    cellaEl.style.cssText += `width:calc(100% / ${lato})`;

    // 1.3 - Aggiungo contenuto (numero della cella) alla Cella
    cellaEl.innerHTML = i + 1;

    

    // 2. Aggancio evento "click" sulla cella e invoco Funzione "clickCella"
    cellaEl.addEventListener('click', clickCella);

    // 3. Inserisco la Cella creata dentro la Griglia nel DOM
    grigliaEl.append(cellaEl);
    
  }
}

// *************************
// FUNZIONE "clickCella"
// *************************

function clickCella(){

  const cella = this;
  console.log(cella.innerHTML);

  cella.classList.add('bg-vittoria');
  
  
}