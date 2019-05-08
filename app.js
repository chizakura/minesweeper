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

let numberOfEmptySquares = document.querySelectorAll('.square').length;
let flagOn = false;

function updateNumberOfBombs () {
	let currentNumberOfBombs = document.querySelectorAll('.bomb').length;
	bombsCounter.innerHTML = `Bombs: ${currentNumberOfBombs}`;
}

updateNumberOfBombs();

function showBoard () {
	for(let i = 0; i < numberOfBombs; i++) {
		div[listOfBombs[i]].innerHTML = `<img src="images/bomb.png">`;
	}
	let square = document.querySelectorAll('.square');
	for(let i = 0; i < numberOfEmptySquares; i++) {
		square[i].setAttribute("class", "empty");
	}
}

let button = document.getElementById('flag');
let board = document.querySelector('#board');
board.style.cursor = "default";
button.addEventListener('click', function () {
	if(board.style.cursor === "default") {
		board.style.cursor = "url(images/flag-cursor.cur), auto";
		flagOn = true;
	} else {
		board.style.cursor = "default";
		flagOn = false;
	}
})

let reset = document.querySelector('.reset');
console.log(reset);
reset.addEventListener('click', function () {
	document.location.reload();
})

document.body.addEventListener('click', function (event) {
	let classSquare = event.target.getAttribute("class") === "square";
	let classBomb = event.target.getAttribute("class") === "bomb";
	if(classSquare && flagOn === false) {
		event.target.setAttribute("class", "empty");
		numberOfEmptySquares--;
	} else if (classBomb && flagOn === true) {
		event.target.setAttribute("class", "flag");
		event.target.innerHTML = `<img src="images/flag.png">`;
		updateNumberOfBombs();
	} else if(classBomb && flagOn === false) {
		showBoard();
		clearInterval(timer);
	}
})