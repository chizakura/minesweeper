let numberOfSquares = 81;
let numberOfBombs = 10;
let seconds = 0;

let bombsCounter = document.querySelector('.bombs-counter');
bombsCounter.innerHTML = `Bombs: ${numberOfBombs}`;

let timeCounter = document.querySelector('.time-counter');
timeCounter.innerHTML = `Time: ${seconds}`;

let allSquares = [];

function Square() {
	this.classType = "square";
	this.neighbor = 0;
}

function createBoard () {
	let board = document.querySelector('#board');
	for(let i = 0; i < numberOfSquares; i++) {
		let div = document.createElement('div');
		div.setAttribute("class", "square");
		board.appendChild(div);
		allSquares.push(new Square);
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

function updateNeighborsAll (n) {
	for(let i = n - 10; i < n - 7; i++) {
		if(i > 0 && i < numberOfSquares) {
			allSquares[i].neighbor++;
			allSquares[i+9].neighbor++;
			allSquares[i+18].neighbor++;
		}
	}
}

function updateNeighborsTop (n) {
	for(let i = n - 1; i < n + 2; i++) {
		if(i > 0 && i < numberOfSquares) {
			allSquares[i].neighbor++;
			allSquares[i+9].neighbor++;
		}
	}
}

function updateNeighborsBottom (n) {
	for(let i = n - 10; i < n - 7; i++) {
		if(i > 0 && i < numberOfSquares) {
			allSquares[i].neighbor++;
			allSquares[i+9].neighbor++;
		}
	}
}

function updateNeighborsLeft (n) {
	for(let i = n - 9; i < n - 7; i++) {
		if(i > 0 && i < numberOfSquares) {
			allSquares[i].neighbor++;
			allSquares[i+9].neighbor++;
			allSquares[i+18].neighbor++;
		}
	}
}

function updateNeighborsRight (n) {
	for(let i = n - 10; i < n - 8; i++) {
		if(i > 0 && i < numberOfSquares) {
			allSquares[i].neighbor++;
			allSquares[i+9].neighbor++;
			allSquares[i+18].neighbor++;
		}
	}
}

function updateNeighborsTopLeft (n) {
	for(let i = n; i < n + 2; i++) {
		allSquares[i].neighbor++;
		allSquares[i+9].neighbor++;
	}
}

function updateNeighborsTopRight (n) {
	for(let i = n - 1; i < n + 1; i++) {
		allSquares[i].neighbor++;
		allSquares[i+9].neighbor++;
	}
}

function updateNeighborsBottomLeft (n) {
	for(let i = n - 9; i < n - 7; i++) {
		allSquares[i].neighbor++;
		allSquares[i+9].neighbor++;
	}
}

function updateNeighborsBottomRight (n) {
	for(let i = n - 10; i < n - 8; i++) {
		allSquares[i].neighbor++;
		allSquares[i+9].neighbor++;
	}
}

function addBombsPostion () {
	let limit = numberOfBombs;
	for(let i = 0; i < limit; i++) {
		let randomPost = Math.floor(Math.random() * numberOfSquares);
		if(listOfBombs.includes(randomPost) !== true) {
			listOfBombs.push(randomPost);
			div[randomPost].setAttribute("class", "bomb");
			allSquares[randomPost].classType = "bomb";
		} else {
			limit++;
		}
	}
}

addBombsPostion();
console.log(listOfBombs);

function handleUpdateNeighbors () {
	for(let i = 0; i < listOfBombs.length; i++) {
		if(listOfBombs[i] > 0 && listOfBombs[i] < 8) {
			updateNeighborsTop(listOfBombs[i]);
		} else if(listOfBombs[i] > 72 && listOfBombs[i] < 80) {
			updateNeighborsBottom(listOfBombs[i]);
		} else if(listOfBombs[i] % 9 === 0 && listOfBombs[i] !== 0 && listOfBombs[i] !== 72) {
			updateNeighborsLeft(listOfBombs[i]);
		} else if((listOfBombs[i] - 8) % 9 === 0 && listOfBombs[i] !== 8 && listOfBombs[i] !== 80) {
			updateNeighborsRight(listOfBombs[i]);
		} else if(listOfBombs[i] === 0) {
			updateNeighborsTopLeft(listOfBombs[i]);
		} else if(listOfBombs[i] === 8) {
			updateNeighborsTopRight(listOfBombs[i]);
		} else if(listOfBombs[i] === 72) {
			updateNeighborsBottomLeft(listOfBombs[i]);
		} else if(listOfBombs[i] === 80) {
			updateNeighborsBottomRight(listOfBombs[i]);
		} else {
			updateNeighborsAll(listOfBombs[i]);
		}
	}
}

handleUpdateNeighbors();

let numberOfEmptySquares = document.querySelectorAll('.square').length;

let flagOn = false;
let listOfFlags = [];
let listOfFlaggedBombs = [];
let allEmptySquares = [];

function updateListOfFlags () {
	for(let i = 0; i < div.length; i++) {
		if(div[i].getAttribute("class") === "flag" && listOfFlags.includes(i) !== true) {
			listOfFlags.push(i);
			allSquares[i].classType = "flag";
		} else if(div[i].getAttribute("class") === "flagged-bomb" && listOfFlaggedBombs.includes(i) !== true) {
			listOfFlaggedBombs.push(i);
		} else if(div[i].getAttribute("class") === "empty" && allEmptySquares.includes(i) !== true) {
			allEmptySquares.push(i);
			allSquares[i].classType = "empty";
		}
	}
}

function removeFlagsFromList () {
	for(let i = 0; i < allSquares.length; i++) {
		if(allSquares[i].classType === "flag") {
			allSquares[i].classType = "square";
		}
	}
	listOfFlags = [];
	for(let i = 0; i < div.length; i++) {
		if(div[i].getAttribute("class") === "flag") {
			listOfFlags.push(i);
			allSquares[i].classType = "flag";
		}
	}
}

function removeFlagggedBombsFromList () {
	listOfFlaggedBombs = [];
	for(let i = 0; i < div.length; i++) {
		if(div[i].getAttribute("class") === "flag") {
			listOfFlaggedBombs.push(i);
		}
	}
}

let currentNumberOfBombs = 0;

function updateNumberOfBombs () {
	currentNumberOfBombs = document.querySelectorAll('.bomb').length;
	bombsCounter.innerHTML = `Bombs: ${currentNumberOfBombs}`;
}

updateNumberOfBombs();

function clearEmptySquares () {
	for(let i = 0; i < allEmptySquares.length; i++) {
		div[allEmptySquares[i]].textContent = "";
	}
}

function showBoard () {
	let square = document.querySelectorAll('.square');
	if(numberOfEmptySquares !== 0 && currentNumberOfBombs !== 0) {
		for(let i = 0; i < numberOfBombs; i++) {
			div[listOfBombs[i]].innerHTML = `<img src="images/bomb.png">`;
		}
		for(let i = 0; i < numberOfEmptySquares; i++) {
			square[i].setAttribute("class", "empty");
			square[i].textContent = "";
		}
	} else if(numberOfEmptySquares === 0 || currentNumberOfBombs === 0) {
		for(let i = 0; i < numberOfEmptySquares; i++) {
			square[i].setAttribute("class", "empty");
			square[i].textContent = "";
		}
	}
}

function showNeighbors (n) {
	if(n > 0 && n < 8) {
		div[n-1].textContent = allSquares[n-1].neighbor;
		div[n+1].textContent = allSquares[n+1].neighbor;
		div[n+8].textContent = allSquares[n+8].neighbor;
		div[n+9].textContent = allSquares[n+9].neighbor;
		div[n+10].textContent = allSquares[n+10].neighbor;
	}
	else if(n > 72 && n < 80) {
		div[n-10].textContent = allSquares[n-10].neighbor;
		div[n-9].textContent = allSquares[n-9].neighbor;
		div[n-8].textContent = allSquares[n-8].neighbor;
		div[n-1].textContent = allSquares[n-1].neighbor;
		div[n+1].textContent = allSquares[n+1].neighbor;
	} else if(n % 9 === 0 && n !== 0 && n !== 72) {
		div[n-9].textContent = allSquares[n-9].neighbor;
		div[n-8].textContent = allSquares[n-8].neighbor;
		div[n+1].textContent = allSquares[n+1].neighbor;
		div[n+9].textContent = allSquares[n+9].neighbor;
		div[n+10].textContent = allSquares[n+10].neighbor;
	} else if((n - 8) % 9 === 0 && n !== 8 && n !== 80) {
		div[n-10].textContent = allSquares[n-10].neighbor;
		div[n-9].textContent = allSquares[n-9].neighbor;
		div[n-1].textContent = allSquares[n-1].neighbor;
		div[n+8].textContent = allSquares[n+8].neighbor;
		div[n+9].textContent = allSquares[n+9].neighbor;
	} else if(n === 0) {
		div[n+1].textContent = allSquares[n+1].neighbor;
		div[n+9].textContent = allSquares[n+9].neighbor;
		div[n+10].textContent = allSquares[n+10].neighbor;
	} else if(n === 8) {
		div[n-1].textContent = allSquares[n-1].neighbor;
		div[n+8].textContent = allSquares[n+8].neighbor;
		div[n+9].textContent = allSquares[n+9].neighbor;
	} else if(n === 72) {
		div[n-9].textContent = allSquares[n-9].neighbor;
		div[n-8].textContent = allSquares[n-8].neighbor;
		div[n+1].textContent = allSquares[n+1].neighbor;
	} else if(n === 80) {
		div[n-10].textContent = allSquares[n-10].neighbor;
		div[n-9].textContent = allSquares[n-9].neighbor;
		div[n-1].textContent = allSquares[n-1].neighbor;
	} else {
		div[n-10].textContent = allSquares[n-10].neighbor;
		div[n-9].textContent = allSquares[n-9].neighbor;
		div[n-8].textContent = allSquares[n-8].neighbor;
		div[n-1].textContent = allSquares[n-1].neighbor;
		div[n+1].textContent = allSquares[n+1].neighbor;
		div[n+8].textContent = allSquares[n+8].neighbor;
		div[n+9].textContent = allSquares[n+9].neighbor;
		div[n+10].textContent = allSquares[n+10].neighbor;
	}
	clearEmptySquares();
}

let win = false;
let button = document.getElementById('flag');
let board = document.querySelector('#board');
board.style.cursor = "default";

if(win === false) {
	button.addEventListener('click', function () {
		if(board.style.cursor === "default") {
			board.style.cursor = "url(images/flag-cursor.cur), auto";
			flagOn = true;
		} else {
			board.style.cursor = "default";
			flagOn = false;
		}
	})
}

let reset = document.querySelector('.reset');
reset.addEventListener('click', function () {
	document.location.reload();
})

function displayWin () {
	if(numberOfEmptySquares === 0 || currentNumberOfBombs === 0) {
		clearInterval(timer);
		win = true;
		board.style.cursor = "default";
		flagOn = false;
		showBoard();
		setTimeout(function () {
			alert("You WON!");
		}, 500)
	}
}

document.body.addEventListener('click', function (event) {
	let classSquare = event.target.getAttribute("class") === "square";
	let classBomb = event.target.getAttribute("class") === "bomb";
	let classFlag = event.target.parentElement.getAttribute("class") === "flag";
	let classFlaggedBomb = event.target.parentElement.getAttribute("class") === "flagged-bomb";

	if(classSquare && flagOn === false) {
		event.target.setAttribute("class", "empty");
		numberOfEmptySquares--;
		updateListOfFlags();
		showNeighbors(allEmptySquares[allEmptySquares.length-1]);
		displayWin();
	} else if (classBomb && flagOn === true) {
		event.target.setAttribute("class", "flagged-bomb");
		event.target.innerHTML = `<img src="images/flag.png">`;
		updateNumberOfBombs();
		updateListOfFlags();
		displayWin();
	} else if(classSquare && flagOn === true) {
		event.target.setAttribute("class", "flag");
		event.target.innerHTML = `<img src="images/flag.png">`;
		updateListOfFlags();
		displayWin();
	} else if(classFlag && flagOn === true) {
		event.target.parentElement.setAttribute("class", "square");
		event.target.parentElement.innerHTML = "";
		removeFlagsFromList();
		displayWin();
	} else if(classFlaggedBomb && flagOn === true) {
		event.target.parentElement.setAttribute("class", "bomb");
		event.target.parentElement.innerHTML = "";
		removeFlagggedBombsFromList();
		updateNumberOfBombs();
		displayWin();
	} else if(classBomb && flagOn === false) {
		showBoard();
		clearInterval(timer);
	}
})

let title = document.getElementById('title');
title.addEventListener('click', function(event) {
	title.classList.toggle("slidein");
})