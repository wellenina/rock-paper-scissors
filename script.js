function getComputerChoice() {
    const options = ["Rock", "Paper", "Scissors"];
    return options[Math.floor(Math.random()*3)];
}

let playerSelection = "";
let computerSelection = "";
let playerScore = 0;
let computerScore = 0;

function playRound(playerSelection, computerSelection) {

    const pairs = {
        "Rock": "Scissors",
        "Paper": "Rock",
        "Scissors": "Paper"
    }

    if (playerSelection === computerSelection) {
        return "It's a tie!";
    } else if (pairs[playerSelection] === computerSelection) {
        playerScore += 1;
        return `You win! ${playerSelection} beats ${computerSelection}!`;
    } else {
        computerScore += 1;
        return `You lose! ${computerSelection} beats ${playerSelection}!`;
    }

}

function game() {
    for (let i = 0; i < 5; i++) {
        playerSelection = prompt("Choose you weapon!");
        playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase();
        computerSelection = getComputerChoice();
        console.log(`The computer chose ${computerSelection}`)
        console.log(playRound(playerSelection, computerSelection));
        console.log(`Your score: ${playerScore} - Computer score: ${computerScore}`)
    }

    return playerScore === computerScore ? "It's a tie!" : playerScore > computerScore ? "You win the game!" : "You lose the game!";
}