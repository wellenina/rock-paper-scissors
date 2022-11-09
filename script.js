let computerChoice = "";
let playerChoice = "";

const optionsSection = document.querySelector('.choose');
const options = document.querySelectorAll('.options li');
options.forEach(option => option.addEventListener('click', playRound));

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
    const options = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    return options[Math.floor(Math.random()*5)];
}

const fistIcons = document.querySelectorAll('.fist-icon');
const computerChoiceIcon = document.querySelector('.computer-choice-icon');
const playerChoiceIcon = document.querySelector('.player-choice-icon');

function assignChoiceIcons() {
    const icons = {
        rock: '&#x270A;',
        paper: '&#x270B;',
        scissors: '&#x270C;',
        lizard: '&#x1F90F;',
        spock: '&#x1F596;'
        };
    
    computerChoiceIcon.innerHTML = icons[computerChoice];
    playerChoiceIcon.innerHTML = icons[playerChoice];
}

function revealChoices() {
    fistIcons.forEach(icon => icon.classList.toggle("transparent"));
}

const resultOverlay = document.getElementById('result-overlay');
resultOverlay.addEventListener('click', function() {
    resultOverlay.style.display = "none";
    options.forEach(option => option.firstElementChild.classList.remove('chosen'));
    options.forEach(option => option.addEventListener('click', playRound));
    optionsSection.classList.toggle('disabled');
    revealChoices();
});

const resultContentDisplay = document.getElementById('result-content');
let resultContent = '';

function finishGame(playerChoice, computerChoice) {

    if (playerChoice === computerChoice) {
        resultContent = "Wow! It's a tie!";
        return;
    }

    const whatBeatsWhat = [
        ['scissors', 'paper', 'Scissors cuts Paper'],
        ['paper', 'rock', 'Paper covers Rock'],
        ['rock', 'lizard', 'Rock crushes Lizard'],
        ['lizard', 'spock', 'Lizard poisons Spock'],
        ['spock', 'scissors', 'Spock smashes Scissors'],
        ['scissors', 'lizard', 'Scissors decapitates Lizard'],
        ['lizard', 'paper', 'Lizard eats Paper'],
        ['paper', 'spock', 'Paper disproves Spock'],
        ['spock', 'rock', 'Spock vaporizes Rock'],
        ['rock', 'scissors', 'Rock crushes Scissors (as it always has)']
    ]

    for (let i = 0; i < whatBeatsWhat.length; i++) {
        if (playerChoice === whatBeatsWhat[i][0] && computerChoice === whatBeatsWhat[i][1]) {
            playerScoreDisplay.textContent = ++playerScore;
            resultContent = `${whatBeatsWhat[i][2]}! You win!`;
            return;
        } else if (computerChoice === whatBeatsWhat[i][0] && playerChoice === whatBeatsWhat[i][1]) {
            computerScoreDisplay.textContent = ++computerScore;
            resultContent = `${whatBeatsWhat[i][2]}! You lose!`;
            return;
        }
    }
}

function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function playRound() {

    playerChoice = this.getAttribute('id');
    this.firstElementChild.classList.toggle('chosen');
    options.forEach(option => option.removeEventListener('click', playRound));
    optionsSection.classList.toggle('disabled');

    setTimeout(startCountdown(), 1000);

    await pause(4000);
    computerChoice = getComputerChoice();
    assignChoiceIcons();
    revealChoices();

    await pause(2000);
    finishGame(playerChoice, computerChoice);

    resultContentDisplay.textContent = resultContent;
    resultOverlay.style.display = 'block';
}