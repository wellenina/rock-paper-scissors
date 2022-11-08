let playerChoice = "";
let computerChoice = "";

const options = document.querySelectorAll('.options li');
options.forEach(option => option.addEventListener('click', playRound)); // la funzione che fa partire il gioco

const computerScoreDisplay = document.getElementById('computer-score');
let computerScore = 0;
const playerScoreDisplay = document.getElementById('player-score');
let playerScore = 0;

function startCountdown() {
    const countdownOverlay = document.getElementById("countdown-overlay");
    countdownOverlay.style.display = "block";
    const countdownNum = document.getElementById("countdown-num");
    let counter = 3;
  
    const interval = setInterval(() => {
      countdownNum.textContent = counter;
      counter--;
      
      if (counter < 0 ) {
        clearInterval(interval);
        countdownOverlay.style.display = "none";
        countdownNum.textContent = "";
      }
    }, 1000);
}

function getComputerChoice() {
    return whatBeatsWhat[Math.floor(Math.random()*10)][0]; // al momento non funziona perché l'array non è in scope
}

const fistIcons = document.querySelectorAll('.fist-icon'); // closed fist icons
const computerChoiceIcon = document.querySelector('.computer-choice-icon');
const playerChoiceIcon = document.querySelector('.player-choice-icon');

function assignChoiceIcons() {
  computerChoiceIcon.innerHTML = '&#x1F596;'; // EXAMPLE: lizard
  // = computerChoice; // DA CORREGGERE! deve essere il codice dell'icona, non il 'nome' della scelta
  playerChoiceIcon.innerHTML = '&#x1F90F;'; // EXAMPLE: spock
  // = playerChoice; // DA CORREGGERE! deve essere il codice dell'icona, non il 'nome' della scelta
}

function revealChoices() {
  fistIcons.forEach(icon => icon.classList.toggle("transparent"));
}



const resultOverlay = document.getElementById('result-overlay'); // da mettere in display block
resultOverlay.addEventListener('click', function() {
    // funzione per spegnere l'overlay
    // & resetta la situazione: (controllare che si riferiscano agli elemetni giusti)
    options.forEach(option => option.classList.remove('chosen'); // il tasto illuminato torna normale (come selezionare il singolo tasto?)
    options.forEach(option => option.addEventListener('click', playRound)); // i tasti tornano cliccabili
    options.forEach(option => option.classList.toggle('disabled')); // i tasti riprendono effetto di hover
    revealHands(); // le mani si rigirano verso il pugno chiuso (aggiungere un parametro alla funzione?)
});
const resultContent = document.getElementById('result-content');





// DA SISTEMARE //
function finishGame(playerChoice, computerChoice) { // gli argomenti devono essere stringe con il nome della scelta!

    /* 
    compare messaggio in overlay tipo: 'Spock vaporizes Rock! You win!' e si incrementano i punteggi
    dunque:
    stabilisce chi ha vinto, incrementa il punteggio e sceglie il messaggio (tipo 'Spock vaporizes Rock! You win!')
    aggiorna a schermo il punteggio: computerScore / playerScore .textContent = ...
    assegna il messaggio al div per l'overlay: resultContent.textContent = ''
    cambia il display del messaggio in overlay tipo = 'block'
    */

    if (playerChoice === computerChoice) {
        return "Wow! It's a tie!"; // se è PAREGGIO, esce subito dalla funzione
    }

    const whatBeatsWhat = [
        ['Scissors', 'Paper', 'Scissors cuts Paper'],
        ['Paper', 'Rock', 'Paper covers Rock'],
        ['Rock', 'Lizard', 'Rock crushes Lizard'],
        ['Lizard', 'Spock', 'Lizard poisons Spock'],
        ['Spock', 'Scissors', 'Spock smashes Scissors'],
        ['Scissors', 'Lizard', 'Scissors decapitates Lizard'],
        ['Lizard', 'Paper', 'Lizard eats Paper'],
        ['Paper', 'Spock', 'Paper disproves Spock'],
        ['Spock', 'Rock', 'Spock vaporizes Rock'],
        ['Rock', 'Scissors', 'Rock crushes Scissors (as it always has)']
    ]

    for (let i = 0; i < whatBeatsWhat.length; i++) {
        if (playerChoice === whatBeatsWhat[i][0] && computerChoice === whatBeatsWhat[i][1]) {
            playerScore += 1;
            return `${whatBeatsWhat[i][2]}! You win!`; // se il player ha vinto, qua esce dalla funzione
        } else if (computerChoice === whatBeatsWhat[i][0] && playerChoice === whatBeatsWhat[i][1]) {
            computerScore += 1;
            return `${whatBeatsWhat[i][2]}! You lose!`; // se ha perso, esce qua
        }
    }
}



function playRound() { // funzione chiamata dal click del giocatore

    playerChoice = this.getAttribute('id'); // stringa con il nome dell'opzione scelta (?) DOVE MI SERVE QUESTO DATO??
    this.classList.toggle('chosen'); // il tasto scelto si illumina - siamo sicuri che illumini l'elemento giusto?
    options.forEach(option => option.removeEventListener('click', playRound)); // i tasti non sono più cliccabili
    options.forEach(option => option.classList.toggle('disabled')); // i tasti non hanno effetto di hover - controllare che sia el. giusto

    startCountdown(); // parte COUNTDOWN in OVERLAY

    computerChoice = getComputerChoice(); // genera scelta del computer

    assignChoiceIcons() // assegno le "mani" al computer e al giocatore

    revealChoices() // parte animazione che rivela le mani

    // aspetta circa 2 secondi poi chiama
    finishGame();
} 