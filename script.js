const container = document.querySelector('.container');
const decisionButtons = document.querySelectorAll('.decisions button');
const startNew = document.querySelector('.start-new');
let gameStatus = document.querySelector('.status');
let gameRoundCase = document.querySelector('.case');
let playerScore = document.querySelector('.player-score');
let computerScore = document.querySelector('.computer-score');
let playerSymbol = document.querySelector('.player-symbol');
let computerSymbol = document.querySelector('.computer-symbol');
let gameWinner = document.createElement('div');
gameWinner.style.cssText = "font-size: 40px; margin-top: -5%;";
let playerWins = 0;
let computerWins = 0;

function getPlayerChoice(playerChoice){
    let decision = playerChoice.target.className;
    return decision;
}

function getComputerChoice(){
    let randomNumber = Math.floor(Math.random() * 3) + 1;
    let choice;
    switch(randomNumber){
        case 1:
            choice = 'rock';
            break;
        case 2:
            choice = 'paper';
            break;
        case 3:
            choice = 'scissors';
            break;
    }
    return choice;
}

function getWinner(playerDecision, computerDecision){
    let winner;
    if((playerDecision == 'rock' && computerDecision == 'scissors') || (playerDecision == 'paper' && computerDecision == 'rock') || (playerDecision == 'scissors' && computerDecision == 'paper')){
        winner = 'You Won!';
        playerWins++;
    }else if((playerDecision == 'scissors' && computerDecision == 'rock') || (playerDecision == 'rock' && computerDecision == 'paper') || (playerDecision == 'paper' && computerDecision == 'scissors')){
        winner = 'You Lost!'
        computerWins++;
    }else if((playerDecision == 'rock' && computerDecision == 'rock') || (playerDecision == 'paper' && computerDecision == 'paper') || (playerDecision == 'scissors' && computerDecision == 'scissors')){
        winner = "It's a tie!";
    }
    return winner;
}

function getCase(playerDecision, computerDecision){
    let roundCase;
    if(playerDecision == 'rock' && computerDecision == 'scissors') roundCase = 'Rock beats Scissors';
    if(playerDecision == 'paper' && computerDecision == 'rock') roundCase = 'Paper beats Rock';
    if(playerDecision == 'scissors' && computerDecision == 'paper') roundCase = 'Scissors beats Paper';
    if(playerDecision == 'scissors' && computerDecision == 'rock') roundCase = 'Scissors is beaten by Rock';
    if(playerDecision == 'rock' && computerDecision == 'paper') roundCase = 'Rock is beaten by Paper';
    if(playerDecision == 'paper' && computerDecision == 'scissors') roundCase = 'Paper is beaten by Scissors';
    if(playerDecision == 'rock' && computerDecision == 'rock') roundCase = 'Rock ties with Rock';
    if(playerDecision == 'paper' && computerDecision == 'paper') roundCase = 'Paper ties with Paper';
    if(playerDecision == 'scissors' && computerDecision == 'scissors') roundCase = 'Scissors ties with Scissors';
    return roundCase;
}

function updateRoundStatus(winner){
    gameStatus.textContent = winner;
}

function updateCase(roundCase){
    gameRoundCase.textContent = roundCase;
}

function updateScore(){
    playerScore.textContent = `Player: ${playerWins}`;
    computerScore.textContent = `Computer: ${computerWins}`;
}

function announceWinner(){
    if(playerWins == 5){
        gameWinner.textContent = "You Won The Game!";
        container.insertBefore(gameWinner, gameStatus);
        container.removeChild(gameStatus);
    }
    if(computerWins == 5){
        gameWinner.textContent = "You Lost The Game!";
        container.insertBefore(gameWinner, gameStatus);
        container.removeChild(gameStatus);
    }
}

function resetGame(){
        if(playerWins == 5 || computerWins == 5){
            container.removeChild(gameWinner);
            container.insertBefore(gameStatus, gameRoundCase);
        }
        playerWins = 0;
        computerWins = 0;
        gameStatus.textContent = 'Choose your weapon';
        updateScore();
        gameRoundCase.textContent = 'First to score 5 wins the game';
        playerSymbol.textContent = '❔';
        computerSymbol.textContent = '❔';
}

function playRound(playerDecision, computerDecision){
        let winner = getWinner(playerDecision, computerDecision);
        let roundCase = getCase(playerDecision, computerDecision);
        updateScore();
        updateRoundStatus(winner);
        updateCase(roundCase);
        announceWinner();
}

function decisionMade(playerChoice){
    if(playerWins < 5 && computerWins < 5){
    let playerDecision = getPlayerChoice(playerChoice);
    let computerDecision = getComputerChoice();
    playRound(playerDecision, computerDecision);
    if(playerDecision == 'rock') playerSymbol.textContent = '✊🏻';
    if(playerDecision == 'paper') playerSymbol.textContent = '🖐🏻';
    if(playerDecision == 'scissors') playerSymbol.textContent = '✌🏻';
    if(computerDecision == 'rock') computerSymbol.textContent = '✊';
    if(computerDecision == 'paper') computerSymbol.textContent = '✋';
    if(computerDecision == 'scissors') computerSymbol.textContent = '✌️';
    }
}

decisionButtons.forEach(button => button.addEventListener('click', decisionMade));
startNew.addEventListener('click', resetGame);