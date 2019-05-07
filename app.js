let numberOfSquares = 81;
let numberOfBombs = 10;
let seconds = 0;

function createBoard () {
	let board = document.querySelector('#board');
	for(let i = 0; i < numberOfSquares; i++) {
		let div = document.createElement('div');
		div.setAttribute("class", "square");
		board.appendChild(div);
	}
	let bombsCounter = document.querySelector('.bombs-counter');
	bombsCounter.innerHTML = `Bombs: ${numberOfBombs}`;
	let timeCounter = document.querySelector('.time-counter');
	timeCounter.innerHTML = `Time: ${seconds}`;
}

function millisecs () {
	seconds++;
	let timeCounter = document.querySelector('.time-counter');
	timeCounter.innerHTML = `Time: ${seconds}`;
}

createBoard();
setInterval(millisecs, 1000);

let listOfBombs = [];
let div = document.querySelectorAll('div');

function addBombsPostion () {
	for(let i = 0; i < numberOfBombs; i++) {
		let randomPost = Math.floor(Math.random() * numberOfSquares);
		listOfBombs.push(randomPost);
		div[randomPost].setAttribute("class", "bomb");
	}
}

addBombsPostion();
console.log(listOfBombs);

function showAllBombs () {
	for(let i = 0; i < numberOfBombs; i++) {
		div[listOfBombs[i]].innerHTML = `<img src="images/bomb.png">`;
	}
}

document.body.addEventListener('click', function (event) {
	if(event.target.getAttribute("class") === "square") {
		console.log(event.target);
		event.target.setAttribute("class", "empty");
	} if(event.target.getAttribute("class") === "bomb") {
		showAllBombs();
	}
})