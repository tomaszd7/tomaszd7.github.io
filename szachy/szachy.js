'use strict';



// function runGame() {

//     function autoComplete(thisId) {
//         var items = thisId.split('-');
//         var x = parseInt(items[0]),
//             y = parseInt(items[1]);
        
//         console.log(x, y);
//         // if not hit add miss
// 	    for (var i = x - 1; i <= x + 1; i++) {
// 	        if (i >= 1 && i <= GRID) {
// 	            for (var j = y - 1; j <= y + 1; j++) {
// 	                if (j >= 1 && j <= GRID) {
// 	                	var idCheck = i + '-' + j;
// 	                	var thisCell = document.getElementById(idCheck);
// 	                	if (thisCell.classList.contains('whale')) {
// 							if (thisCell.children.length != 1) {
// 	                            thisCell.innerHTML = '<img src=\'whale2.png\'/>';
// 	                            checkWhales();
// 	                        }
// 	                	} else {
// 		                	thisCell.classList.add('miss')
// 	                	}
// 	                }
// 	            }
// 	    	}
// 	    }
//         document.getElementById(thisId).classList.remove('miss');
//     }
    

// 	function isGoodSpot(x, y) {
// 	    for (var i = x - 1; i <= x + 1; i++) {
// 	        if (i >= 1 && i <= GRID) {
// 	            for (var j = y - 1; j <= y + 1; j++) {
// 	                if (j >= 1 && j <= GRID) {
// 	                	var idCheck = i + '-' + j;
// 	                    if (document.getElementById(idCheck).classList.contains('black')) {
// 	                        return false;
// 	                    }
// 	                }
// 	            }
// 	        }
// 	    }   
// 	    return true;
// 	}

// 	function getRandomCell() {
// 		// losowanie randomowego elementu tablicy 
// 		var goodSpot = false;
// 		do {
// 			// check if good spot - so not already guessed! 
// 			var randomX = Math.floor((Math.random()* GRID) + 1);
// 			var randomY = Math.floor((Math.random()* GRID) + 1);
// 			var cellId = randomX + '-' + randomY;

// 			// adding isGoodSpot - nie moze byc wokolo!!!
// 			if (isGoodSpot(randomX, randomY)) {
// 				document.getElementById(cellId).classList.add('black');
// 				goodSpot = true;
// 			}

// 		} while (!goodSpot)

// 		// console.log(cellId);

// 		// zapalenie wylosowanego elementu tabeli
// 		document.getElementById(cellId).classList.add('black');
// 	}

// 	function removeAllClasses() { // nie sprawdza gridu 
// 		var itemsToRemove = document.getElementsByTagName("td"); // to zwraca po indeksach i po id!!
// 		// a ja musze iterowac tylko po indeksach !!  nieee - tylko tak wystwietla  ?? 

// 		for (var i = 0; i < itemsToRemove.length; i++) { // to pojdzie tezpo associated table a nietylko indeksach 
// 			// jak zwykly for !!! bo tu wzial pole .length !!! i polecial po ni m shit !!!!! 
// 			// wieczwyklyfor musi byc !! -czyli po indeksach 
// 			itemsToRemove[i].classList.remove('black', 'hit', 'miss', 'whale');
// 			itemsToRemove[i].onclick = null;
//             if (itemsToRemove[i].children.length == 1) {
//                itemsToRemove[i].innerHTML = ''; 
//             }

// 		}
//         document.getElementById("resShipButton").classList.remove('gold');

// 	}

// 	function updateResults() {
// 		document.getElementById("resShipsSunk").innerText = SHIPSSUNK;
// 		// document.getElementById("resShipsStill").innerText = ALLSHIPS - SHIPSSUNK;
// 		document.getElementById("resShots").innerText = SHOTS;

// 	}


// }

// function turnGameLogs() {
// 	var gameLogs = document.getElementById('logs');
// 	if (gameLogs.classList.contains('none')) {
// 		gameLogs.classList.remove('none');
// 	} else {
// 		gameLogs.classList.add('none');
// 	}
// }

// var gameStart = document.getElementById("button");
// gameStart.onclick = runGame;

// adding game logs 
// document.getElementById("logButton").onclick = turnGameLogs;

function figura() {
		// activate pion 
		if (this.classList.contains('pion')) {
			// activate or deactivate 
			var activate = true;
			if (this.classList.contains('active')) {
				activate = false;
			}
			this.classList.toggle('active');
			;

			// parse id
			var temp = this.id.split('-');
			var thisId = {
				'x' : temp[0],
				'y' : temp[1]
			}

			// pokaz mozliwe ruchy lub ukryj mozliwe ruchy 
			for (var i = 0; i < BIERKI.pion.possMoves.length; i++) {
				var xMov = BIERKI.pion.possMoves[i].x;
				var yMov = BIERKI.pion.possMoves[i].y;
				var cellId = (parseInt(thisId.x) + xMov) + '-' + (parseInt(thisId.y) + yMov);
				document.getElementById(cellId).classList.toggle('possMove');

				// jesli kliknieto w pole z mozliwym ruchem 
				// check activate 
				if (activate) {
					document.getElementById(cellId).onclick = function possMove() {
						// gdy przesuniety pion w nowe pole 
						// wylacz wszystkie possMove 
						var allPossMove = document.querySelectorAll('.possMove');
						for (var i = 0; i < allPossMove.length; i++) {
							allPossMove[i].classList.toggle('possMove');
							allPossMove[i].onclick = null;
						}
						// przesun piona ze starego w nowe 
						document.getElementsByClassName("active")[0].classList.toggle('pion');
						document.getElementsByClassName("active")[0].innerText = '';
						document.getElementsByClassName("active")[0].classList.toggle('active');
						// w nowe - bez active 
						this.classList.toggle('pion');
						this.innerText = BIERKI.pion.name;
						// dodaj funkcje piona 
						this.onclick = figura;

					}
				} else {
					document.getElementById(cellId).onclick = null;
				}	
			}
		}

	}

var BIERKI = {
	'pion' : {
			'name': 'P',
			'possMoves': [ 
					{'x': 0, 'y': 1},
					{'x': 1, 'y': 2},
					{'x': -1, 'y': -2},
						]
	},

}


// MUSZE USUWAC FUNKCJE !!

// place pion on board 

var pion = document.getElementById("4-4");
pion.classList.add('pion');
pion.innerText = BIERKI.pion.name;

// teraz zrobic funkcje na wszystkie komorki!!!!
var allCells = document.querySelectorAll('.white, .black');
// allCells += document.querySelectorAll('.black');
for (var i = 0; i < allCells.length; i++) {


	allCells[i].onclick = figura;

	
}