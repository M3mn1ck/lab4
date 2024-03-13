"use strict";

function gameboard() {
    let elem = document.getElementById('board');
    for (let step = 0; step < 9; step++) {
        let cell = document.createElement('div');
        cell.className = "cell";
        elem.append(cell); 
    }    
}

function notnull() {
    let cells = document.querySelectorAll('.cell');
    for (let i = 0; i < 9; i++) {
        if (cells[i].textContent === "")
            return false;
    }
    return true;
}

function isWinnerByLine() {
    let cells = document.querySelectorAll('.cell');
    for (let i = 0; i < 3; i++) {
        let first = cells[i * 3].textContent;
        if (first == "") 
            continue;

        let winner = first;
        for (let j = 1; j < 3; j++) {
            let element = cells[i * 3 + j].textContent;
            if (first != element) {
                winner = null;
                break;
            }
            
        }
        if (winner)
            return winner;
    }
}

function isWinnerByColumn() {
    let cells = document.querySelectorAll('.cell');
    for (let i = 0; i < 3; i++) {
        let first = cells[i].textContent;
        if (first == "") 
            continue;

        let winner = first;
        for (let j = 1; j < 3; j++) {
            let element = cells[j * 3 + i].textContent;
            if (first != element) {
                winner = null;
                break;
            }
            
        }
        if (winner)
            return winner;
    }
}

function isWinnerByMainDiagonal() {
    let cells = document.querySelectorAll('.cell');
    let first = cells[0].textContent;
    if (first == "") 
        return;
    for (let i = 0; i < 3; i++) {
        let element = cells[i * 3 + i].textContent;
        if (element != first)
            return;
    }
    return first;
}

// 1 + 2
// 1 5 * 3 * 2 +

// 0 1 2
// 3 4 5
// 6 7 8

function isWinnerBySideDiagonal() {
    let cells = document.querySelectorAll('.cell');
    let first = cells[2].textContent;
    if (first == "") 
        return;
    for (let i = 0; i < 3; i++) {
        let element = cells[i * 3 + 2 - i].textContent;
        if (element != first)
            return;
    }
    return first;
}

function resetGameboard () {
    let cells = document.querySelectorAll('.cell');
    for (let i = 0; i < 9; i++) {
        cells[i].textContent = "";
        
    };
    currentPlayer = "X";
    gameOver = false;
}    

gameboard();


let currentPlayer = "X";
let gameOver = false;

function cellClick(event) {

    const cell = event.target;
    if (gameOver) {
        alert('Игра завершена!');
        return;
    }
    if (cell.textContent === "") {
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "0" : "X";
    }
    let winner = isWinnerByLine() || isWinnerByColumn() 
        || isWinnerByMainDiagonal() || isWinnerBySideDiagonal();
    if (winner) {
        alert(winner);
        gameOver = true;
    } else if (notnull()) {
        alert("Draw");
        gameOver = true;
    }
}

let cells = document.querySelectorAll('.cell');
cells.forEach((cell) => {
    cell.addEventListener('click', cellClick);
});

document.getElementById('reset').addEventListener('click', resetGameboard);