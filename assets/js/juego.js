let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;

// REFERENCIAS HTML
const bntPedir = document.querySelector('#btnPedir');
const bntDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHTML = document.querySelectorAll('small');

const crearDeck = () => {

    for( let i = 2; i <=10; i++){
        for (let tipo of tipos){
            
            deck.push(i + tipo);

        }
    }
    for (let tipo of tipos){
        for (let esp of especiales){
            deck.push(esp + tipo);
        }
    }

    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

crearDeck();

// Función para tomar cartas
const pedirCarta = () => {
    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();

    return carta;
}

// pedirCarta();

const valorCarta = (carta) =>{

    const valor = carta.substring(0,carta.length - 1);
    
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        :valor * 1;
}

//TURNO DE LA COMPUTADORA

const turnoComputadora = (puntosMinimos) =>{
    do{
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;
        // <img class="carta" src="assets/cartas/9C.png">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);
        
        if(puntosMinimos>21){
            break;
        }
    } while((puntosComputadora < puntosMinimos) && (puntosMinimos<=21) );

    setTimeout(() => { 
            if( puntosComputadora === puntosMinimos){
            alert('Nadie gana :(');
        } else if ( puntosMinimos > 21){
            alert('La computadora gana')
        }else if (puntosComputadora  > 21){
            alert('Jugador gana');
        }else {
            alert('Computadora gana')
        }
    }, 30);
}

//EVENTOS

bntPedir.addEventListener('click', () =>{
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    // <img class="carta" src="assets/cartas/9C.png">
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');

    divCartasJugador.append(imgCarta);

    if(puntosJugador >21){
        console.warn('¡Lo siento mucho!, perdiste');
        bntPedir.disabled = true;
        bntDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }else if (puntosJugador === 21){
        console.warn('¡21, Genial!')
        bntPedir.disabled = true;
        bntDetener.disabled = true; 
        turnoComputadora(puntosJugador);
    }



});


bntDetener.addEventListener('click', () =>{
   bntPedir.disabled = true;
   bntDetener.disabled = true; 

   turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', ()=>{
    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText =0;
    puntosHTML[1].innerText =0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    bntPedir.disabled = false;
    bntDetener.disabled = false; 
});