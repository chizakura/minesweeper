let numberOfSquares = 81;
let numberOfBombs = 10;
let seconds = 0;

let bombsCounter = document.querySelector('.bombs-counter');
bombsCounter.innerHTML = `Bombs: ${numberOfBombs}`;

let timeCounter = document.querySelector('.time-counter');
timeCounter.innerHTML = `Time: ${seconds}`;

function createBoard () {
	let board = document.querySelector('#board');
	for(let i = 0; i < numberOfSquares; i++) {
		let div = document.createElement('div');
		div.setAttribute("class", "square");
		board.appendChild(div);
	}
}

function millisecs () {
	seconds++;
	timeCounter.innerHTML = `Time: ${seconds}`;
}

createBoard();
let timer = setInterval(millisecs, 1000);

let listOfBombs = [];
let div = document.querySelectorAll('div');

function addBombsPostion () {
	let limit = numberOfBombs;
	for(let i = 0; i < limit; i++) {
		let randomPost = Math.floor(Math.random() * numberOfSquares);
		if(listOfBombs.includes(randomPost) !== true) {
			listOfBombs.push(randomPost);
			div[randomPost].setAttribute("class", "bomb");
		} else {
			limit++;
		}
	}
}

addBombsPostion();
console.log(listOfBombs);

let currentNumberOfBombs = document.querySelectorAll('.bomb').length;

function updateNumberOfBombs () {
	bombsCounter.innerHTML = `Bombs: ${currentNumberOfBombs}`;
}

updateNumberOfBombs();

function showAllBombs () {
	for(let i = 0; i < numberOfBombs; i++) {
		div[listOfBombs[i]].innerHTML = `<img src="images/bomb.png">`;
	}
}

document.body.addEventListener('click', function (event) {
	if(event.target.getAttribute("class") === "square") {
		event.target.setAttribute("class", "empty");
	} if(event.target.getAttribute("class") === "bomb") {
		showAllBombs();
		clearInterval(timer);
	}
})