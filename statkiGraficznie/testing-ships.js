'use strict';



function runGame() {
	// get all tds but not the first with names 
	// does NOT take GRID into account 

	function addEventToAllCells(activate = true) {
		var allCells = document.getElementsByTagName("td");
		for (var i = 0; i < allCells.length; i++) {
			// pomin pierwsza kolumne z cyframi !!
			// dodaj zmienny GRID!!!
			if( !(i == 0 || i % 11 == 0)) { // nie sprawdza gridu 

				// aktywowac czy deaktywowac 
				if (!activate) {
					// stop the game 
					allCells[i].onclick = null;
				} else {
					// start the game 
					// add Event handler to all table cells 
					allCells[i].onclick = function() {

						// tu funkcja o statkach .... 
						// jesli trafiono w statek 
						if (this.classList.contains('black')) {
							if (!this.classList.contains('hit')) {
								this.classList.add('hit');
                                this.innerHTML = '<img src=\'ship2.png\'/>';
								SHIPSSUNK++;
                                
                                // check if auto complete 
                                var checkOn = document.getElementById('checkbox').checked;
                                if (checkOn) {
                                    var thisId = this.id;
                                    // auto complete cells 
                                    autoComplete(thisId);
//                                    console.log('CHECCICKING IS ON ', thisId);
                                } else {
                                    console.log('OFF');
                                }
                                
                                // check if all sunk 
                                if (ALLSHIPS - SHIPSSUNK == 0) {
                                    // cancel events 
                                    addEventToAllCells(false);
                                    document.getElementById('won').classList.remove('none');
                                    
                                }
                                
						}

						// jesli pudlo 
						} else {
							this.classList.add('miss');
						}
						SHOTS++;
						updateResults();
					}
					// remove black classes  - add to run after first time !!
					// to clear the board!!
					// removeBlackClass();
				}
			}
		}
	}

    function autoComplete(thisId) {
        var items = thisId.split('-');
        var x = parseInt(items[0]),
            y = parseInt(items[1]);
        
        console.log(x, y);
        // if not hit add miss
	    for (var i = x - 1; i <= x + 1; i++) {
	        if (i >= 1 && i <= GRID) {
	            for (var j = y - 1; j <= y + 1; j++) {
	                if (j >= 1 && j <= GRID) {
	                	var idCheck = i + '-' + j;
	                    document.getElementById(idCheck).classList.add('miss')
	                    }
	                }
	            }
	        }
        document.getElementById(thisId).classList.remove('miss');
    }
    

	function isGoodSpot(x, y) {
	    for (var i = x - 1; i <= x + 1; i++) {
	        if (i >= 1 && i <= GRID) {
	            for (var j = y - 1; j <= y + 1; j++) {
	                if (j >= 1 && j <= GRID) {
	                	var idCheck = i + '-' + j;
	                    if (document.getElementById(idCheck).classList.contains('black')) {
	                        return false;
	                    }
	                }
	            }
	        }
	    }   
	    return true;
	}

	function getRandomCell() {
		// losowanie randomowego elementu tablicy 
		var goodSpot = false;
		do {
			// check if good spot - so not already guessed! 
			var randomX = Math.floor((Math.random()* GRID) + 1);
			var randomY = Math.floor((Math.random()* GRID) + 1);
			var cellId = randomX + '-' + randomY;

			// if (!document.getElementById(cellId).classList.contains('black')) {
			// 	goodSpot = true;
			// } else {
			// 	console.log('DUPLIKAT!!!' + cellId);
			// }

			// adding isGoodSpot - nie moze byc wokolo!!!
			if (isGoodSpot(randomX, randomY)) {
				document.getElementById(cellId).classList.add('black');
				goodSpot = true;
			}

		} while (!goodSpot)

		// console.log(cellId);

		// zapalenie wylosowanego elementu tabeli
		document.getElementById(cellId).classList.add('black');
	}

	function removeAllClasses() { // nie sprawdza gridu 
		var itemsToRemove = document.getElementsByTagName("td"); // to zwraca po indeksach i po id!!
		// a ja musze iterowac tylko po indeksach !!  nieee - tylko tak wystwietla  ?? 

		for (var i = 0; i < itemsToRemove.length; i++) { // to pojdzie tezpo associated table a nietylko indeksach 
			// jak zwykly for !!! bo tu wzial pole .length !!! i polecial po ni m shit !!!!! 
			// wieczwyklyfor musi byc !! -czyli po indeksach 
			itemsToRemove[i].classList.remove('black', 'hit', 'miss');
			itemsToRemove[i].onclick = null;
            if (itemsToRemove[i].children.length == 1) {
               itemsToRemove[i].innerHTML = ''; 
            }

		}
	}

	function unhideAllElements() {
        // czemu zle znajduje??? 
		// var toRemove = document.getElementsByClassName('none'); // tak znajmduje POLOWE!!
		var toRemove = document.querySelectorAll('.none'); // TAK DZIALA !!! - non-live nodelist!!??
		// list types 
		var temp = {
			'TH': 0,
			'TD': 0,
			'TR': 0,
			'DIV': 0
		}
		console.log('ilosc NONE elementow: ' + toRemove.length);
		for (var i = 0; i < toRemove.length; i++) {
			temp[toRemove[i].nodeName]++;
			console.log(toRemove[i].nodeName + ': ' + toRemove[i].id);
			toRemove[i].classList.remove('none');
		}
		console.log(temp);
            
        document.getElementById("won").classList.add('none');
	}


	function hideElements(GRID) {
		// get theader row
		// var thead = document.getElementsByTagName('thead');
		// var headRows = thead[0].getElementsByTagName('tr');
		var headCells = document.getElementsByTagName('th');

		// get rows 
		var tbody = document.getElementsByTagName('tbody');
		var bodyRows = tbody[0].getElementsByTagName('tr');

		for (var i = GRID ; i < bodyRows.length; i++) { // od 5 do 10 
			// hide rows 
			bodyRows[i].classList.add('none');
			//hide cells in thead 
			headCells[i + 1].classList.add('none');

			// hide cells in tbody
			for (var j = 0 ; j < GRID; j ++) {
				var bodyCells = bodyRows[j].getElementsByTagName('td');
				bodyCells[i + 1].classList.add('none');
			}
		}
	}


	function updateResults() {
		document.getElementById("resShipsSunk").innerText = SHIPSSUNK;
		document.getElementById("resShipsStill").innerText = ALLSHIPS - SHIPSSUNK;
		document.getElementById("resShots").innerText = SHOTS;

	}
	// czyli pyta sie type of !== undefined !!! a nie obiekt !! -czy pola istnieja 


	/*KOD GAME STARTS HERE*/
	console.log('NEW GAME STARTS HERE');


    
	// get gridsize from field button 
	var GRID;
	var sel = document.getElementsByTagName('select');
	var opts = sel[0].getElementsByTagName('option')
	for (var i = 0; i < opts.length; i++) {
		if (opts[i].selected) {
			GRID = parseInt(opts[i].value);
		}
	}

	// START - remove ALL classes 
	removeAllClasses();

	// unhide elements !!!
	unhideAllElements();

	// activate only some cells 
//	if (GRID !== 10) {
    hideElements(GRID);
//	}

	// add GRID to results window
	// document.getElementById("resGridSize").innerText = GRID;

	// start timer and random coloring 
	// var start = new Date();
	// start = start.getTime();
	// console.log(start);
	// var end;


	var ALLSHIPS = GRID;
	var SHIPSSUNK = 0;
	var SHOTS = 0;

	document.getElementById("resAllShips").innerText = ALLSHIPS;
	updateResults();

	for (var i = 0; i < ALLSHIPS; i++) {
		getRandomCell();
	}

	// end of game - TIMES OUT!
	console.log('finished');


	// add Event handler to td cells for adding black class 
	addEventToAllCells();


	// clearing variables 
	// clearInterval(intervalVar)
	// addEventToAllCells(false);
}



var gameStart = document.getElementById("button");
gameStart.onclick = runGame;


// create table cells with ids!!!

// function createTable() {
// 	var myData = '';
// 	for (var i = 1; i <= 10; i++) {
// 		myData+='<tr>\n';
// 		for (var j = 0; j <=10; j++) {
// 			if (j == 0) {
// 				myData+='<td>'+ i + '</td>\n';
// 			} else {
// 				myData+='<td id=\'' + j + '-' + i + '\'></td>\n';
// 			}
// 		}
// 		myData+='</tr>\n';
// 	}
// 	return myData;
// }

// document.getElementById("paragraph").innerText = createTable();