# Project Overview

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

|  Day | Deliverable | Status
|---|---| ---|
|5/6| Project Description | Complete
|5/6| Wireframes / Priority Matrix / Functional Components | Complete
|5/7| Core Application Structure (HTML, CSS, etc.) | Complete
|5/7| Pseudocode / actual code | Complete
|5/8| Initial Clickable Model  | Complete
|5/9| MVP | Complete
|5/10| Present | Complete

## Project Description

**Minesweeper** is a stategy game where the player has to click all the empty squares while avoiding hidden bombs. If a square is clicked, a number can be revealed to show if there are any bombs on the neighboring squares. A square is automatically cleared if there are no bombs.

- [Instructions to Minesweeper](http://www.freeminesweeper.org/help/minehelpinstructions.html)

## Wireframes

Upload images of wireframe to cloudinary and add the link here with a description of the specific wireframe.

- [Minesweeper Wireframe Layout](https://res.cloudinary.com/chizakura/image/upload/v1557168781/Minesweeper_Wireframe_Layout_dxiegd.png)

## Priority Matrix

Include a full list of features that have been prioritized based on the `Time and Importance` Matix.

- [Minesweeper Priority Matrix](https://res.cloudinary.com/chizakura/image/upload/v1557171474/Priority_Matrix_kje59v.jpg)

### MVP/PostMVP - 5min

The functionality will then be divided into two separate lists: MPV and PostMVP.  Carefully decide what is placed into your MVP as the client will expect this functionality to be implemented upon project completion.

#### MVP 

- Title and board
- Click a square that is empty
- Show all bombs when a bomb is clicked
- Add counters to board
- Add flags to board
- Remove flags from board
- Click all empty squares to win or flag all bombs

#### PostMVP

- Number hints that show if a bomb is hidden nearby

Time frames are also key in the development cycle. You have limited time to code all phases of the game. Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. It's always best to pad the time by a few hours so that you account for the unknown so add and additional hour or two to each component to play it safe.

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Add Board | H | 2hrs| 2.5hrs | 2hrs |
| Hover and Click Squares | H | 3hrs| 3.5hrs | 2hrs |
| Square Shows Empty Space | H | 3hrs| 3.5hrs | 2hrs |
| Add Bombs | H | 4hrs| 4.5hrs | 3hrs |
| Show Counters | M | 4hrs| 4.5hrs | 2hrs |
| Add Flag Button | M | 2hrs| 2.5hrs | 1hr |
| Adding Flags on Clicked Square | M | 2hrs| 2.5hrs | 2hrs |
| Removing Flags on Flagged Squares | M | 2hrs| 2.5hrs | 3.5hrs |
| Display Win Message | L | 1hr | 1.5hrs | 1hr |
| Make Title and Board Move | L | 2hrs | 2.5hrs | 1hr |
| Adding Number Hints | L | 4hrs| 4.5hrs | 6.5hrs |
| Refining Code | L | 1hr | 1.5hrs | 1.5hrs |
| Total |  | 29hrs|  | 27.5hrs |


## Additional Libraries
 Use this section to list all supporting libraries and their role in the project.

 | Library | Description |
 | --- | :---: |
 | Google Fonts | Used to set font for game and match theme. |

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of and a brief description.

**Flag Cursor**: After researching about how to add custom cursors, I implemented this functionality. When the user clicks the flag button, the cursor changes to a flag when hovering over the board. This shows that the user can add flags to any square and un-flag them when clicked again.

```
button.addEventListener('click', function () {
	if(board.style.cursor === "default") {
		board.style.cursor = "url(images/flag-cursor.cur), auto";
		flagOn = true;
	} else {
		board.style.cursor = "default";
		flagOn = false;
	}
})
```

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.

## Issues and Resolutions
 Use this section to list of all major issues encountered and their resolution.

### #1
**ISSUE**: The position of some bombs were not unique and reduced the total number of bombs.
```
function addBombsPostion () {
	for(let i = 0; i < numberOfBombs; i++) {
		let randomPost = Math.floor(Math.random() * numberOfSquares);
		listOfBombs.push(randomPost);
		div[randomPost].setAttribute("class", "bomb");
	}
}
```
**RESOLUTION**: A check was needed to make sure the generated random number did not already exist in the array.
```
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
```

### #2
**ISSUE**: The flags were not being removed when clicked again.
```
event.target.setAttribute("class", "square");
```
**RESOLUTION**: When getting the class of event.target, it lead to the child element. So the parent element needed to be retrieved to get the class attribute.
```
event.target.parentElement.setAttribute("class", "square");
```