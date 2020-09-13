const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;

const PLAYER_WIN = 3;
const PLAYER_LOSE = 4;
const PLAYER_DRAW = 5;

const CLASS_ROCK = ".sel__rock";
const CLASS_PAPER = ".sel__pap";
const CLASS_SCISSORS = ".sel__scis";

const PLAYER = 0;
const COMPUTER = 1;

const CLASS_PLAYERSCORE = ".info__score__pscore";
const CLASS_COMPUTERSCORE = ".info__score__cpscore";
const CLASS_WINNER = ".info__score__winner";
const CLASS_CPMOVE = ".info__cpMove__move";

const RESET = 10;


function updateScore(winner) {
    let score = getScoreboard();
    let pScore = score[PLAYER];
    let cScore = score[COMPUTER];
    switch(winner) {
        case PLAYER_WIN:
            increment(pScore);
            if (isOver2(pScore)) {
                endGame(PLAYER);
            }
            break;
        case PLAYER_LOSE:
            increment(cScore);
            if (isOver2(cScore)) {
                endGame(COMPUTER);
            }
            break;
        case PLAYER_DRAW:
            break;
    }
}
function getScoreboard() {
    let player = document.querySelector(CLASS_PLAYERSCORE);
    let computer = document.querySelector(CLASS_COMPUTERSCORE);

    return [player, computer];
}
function increment(scoreNode) {
    let score = extractScore(scoreNode);
    scoreNode.textContent = ++score;
}
function isOver2(scoreNode) {
    let score = extractScore(scoreNode);
    return score > 2;
}
function extractScore(scoreNode) {
    return +scoreNode.textContent;
}

function computerPlay() {
    let num = Math.floor(Math.random() * 3);
    switch(num) {
        case 0: return ROCK; 
        case 1: return PAPER; 
        case 2: return SCISSORS; 
    }
}

function resetScore() {
    let board = getScoreboard();
    board[PLAYER].textContent = "0";
    board[COMPUTER].textContent = "0";
}


function endGame(winner) {
    updateWinner(winner);
}
function updateWinner(winner) {
    let winnerNode = document.querySelector(CLASS_WINNER);
    switch(winner) {
        case RESET: 
            resetScore();
            winnerNode.textContent = "";
            break;
        case PLAYER:
            winnerNode.textContent = "You won!";
            break;
        case COMPUTER:
            winnerNode.textContent = "You lost :(";
            break;
    }
}


function addListeners() {
    let selectors = getSelectors();

    for (let i = 0; i < selectors.length; i++) {
        let select = selectors[i];
        select.addEventListener('click', selectorListener);
    }
}
function getSelectors() {
    let rock = document.querySelector(CLASS_ROCK);
    let paper = document.querySelector(CLASS_PAPER);
    let scissors = document.querySelector(CLASS_SCISSORS);

    return [rock, paper, scissors];
}
function selectorListener(event) {
    if (!winnerNodeIsEmpty()) {
        updateWinner(RESET);
    }
    let playerMove = whatMove(event);
    let computerMove = computerPlay();
    let winner = computeResult(playerMove, computerMove);
    updateComputerMove(computerMove);
    updateScore(winner);
}
function winnerNodeIsEmpty() {
    let winnerNode = document.querySelector(CLASS_WINNER);
    return winnerNode.textContent == "";
}
function whatMove(event) {
    let classes = event.currentTarget.classList;
    switch(true) {
        //Substring is to remove the period at the start of the constants
        case classes.contains(CLASS_ROCK.substring(1)): 
            return ROCK;
        case classes.contains(CLASS_PAPER.substring(1)):
            return PAPER;
        case classes.contains(CLASS_SCISSORS.substring(1)):
            return SCISSORS;
    }
}
function updateComputerMove(move) {
    let cpMoveNode = document.querySelector(CLASS_CPMOVE);
    if (move == ROCK) cpMoveNode.textContent = "Rock";
    else if (move == PAPER) cpMoveNode.textContent = "Paper";
    else if (move == SCISSORS) cpMoveNode.textContent = "Scissors";
}
function computeResult(playerMove, compMove) {
    switch(playerMove) {
        case ROCK:
            if (compMove == ROCK) {return PLAYER_DRAW;}
            else if (compMove == PAPER) {return PLAYER_LOSE;}
            else if (compMove == SCISSORS) {return PLAYER_WIN;}
            break;
        case PAPER:
            if (compMove == ROCK) {return PLAYER_WIN;}
            else if (compMove == PAPER) {return PLAYER_DRAW;}
            else if (compMove == SCISSORS) {return PLAYER_LOSE;}
        case SCISSORS:
            if (compMove == ROCK) {return PLAYER_LOSE;}
            else if (compMove == PAPER) {return PLAYER_WIN;}
            else if (compMove == SCISSORS) {return PLAYER_DRAW;}
    }
}


function play() {
    addListeners();
}

play();