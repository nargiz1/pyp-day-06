let gameHeading = document.querySelector("#game-heading");
let gameSquares = document.querySelectorAll(".game-square");
let restartBtn = document.querySelector("#restart-button");


let gameOver = false;

const player1 = {
    name: "Player 1",
    sign: "X"
};

const player2 = {
    name: "Player 2",
    sign: 0
};

let currentPlayer = player1;
let roundWon = false;
let tie = false;
const winningComb = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];
console.log(gameSquares);

gameSquares.forEach(element => {
    element.addEventListener("click", function(e) {
        e.preventDefault();
        this.innerText = currentPlayer.sign;
        this.setAttribute("disabled", "true");
        handleResultValidation();
        if(handleTie() === true){
            console.log("here")
            gameHeading.innerText = `Tie Game!`;
            gameOver = true;
            restartBtn.style.display = "block";
            return;
        }
        if(roundWon === false){
            if(currentPlayer == player1){
                currentPlayer = player2
            }else if(currentPlayer == player2){
                currentPlayer = player1
            }
            gameHeading.innerText = `${currentPlayer.name}'s Turn`;
        }else{
            gameHeading.innerText = `${currentPlayer.name} won!`;
            gameSquares.forEach(elem => elem.setAttribute("disabled", "true"));
            gameOver = true;
            restartBtn.style.display = "block";
        }
    })
});

restartBtn.addEventListener("click", function(){
    restartBtn.style.display = "none";
    gameOver = false;
    roundWon = false;
    gameSquares.forEach(elem => {
        elem.innerText = '';
        elem.removeAttribute("disabled")
    });
    currentPlayer = player1;
    gameHeading.innerText = `${currentPlayer.name}'s Turn`;
})

function handleResultValidation() {
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningComb[i];
        let a = gameSquares[winCondition[0]].innerText;
        let b = gameSquares[winCondition[1]].innerText;
        let c = gameSquares[winCondition[2]].innerText;
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
}

function handleTie(){
    let result = true;
    gameSquares.forEach(elem => {
        if(elem.innerText == ''){
            result = false
        }
    })
    return result
}
