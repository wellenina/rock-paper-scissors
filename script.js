function getComputerChoice() {
    const options = ["Rock", "Paper", "Scissors"];
    return options[Math.floor(Math.random()*3)];
}

const playerSelection = "rock";
const computerSelection = getComputerChoice();


function playRound(playerSelection, computerSelection) {

    playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1);

    const pairs = {
        "Rock": "Scissors",
        "Paper": "Rock",
        "Scissors": "Paper"
    }

    if (playerSelection === computerSelection) {
        return "It's a tie!";
    } else if (pairs[playerSelection] === computerSelection) {
        return `You win! ${playerSelection} beats ${computerSelection}!`;
    } else {
        return `You lose! ${computerSelection} beats ${playerSelection}!`;
    }

}