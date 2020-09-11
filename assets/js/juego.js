let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;

// REFERENCIAS HTML
const bntPedir = document.querySelector('#btnPedir');

const divCartasJugador = document.querySelector('#jugador-cartas');
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
    }else if (puntosJugador === 21){
        console.warn('¡21, Genial!')
        bntPedir.disabled = true;
    }

});