var TYPES = {
    pawn : {
            name: 'P',
            possibleMoves: [[-2, 1], [0, 2], [2, 1]]
    }
}

function Figure(x, y, type) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.id = x + '-' + y;
    this.name = TYPES[type].name;
    this.possibleMoves = [];
    
    this.updateMe = function (newId) {
        this.id = newId;
        var temp = newId.split('-');
        this.x = temp[0];
        this.y = temp[1];
    };
    
    this.createNewMoves = function (newId) {
        var moves = TYPES[this.type].possibleMoves;
        for (var i = 0; i < moves.length; i++) {
            var possId = (parseInt(this.x) + moves[i][0]) + '-' + (parseInt(this.y) + moves[i][1]);
            this.possibleMoves.push(possId);
        }
    }

    // execute once
    this.createNewMoves(this.id);
}


function ChessBoard() {
    this.figures = [];
    this.possibleMoves = [];
    
    this.addFigure = function (figure) {
        this.figures[figure.id] = figure;
        // display it 
        document.getElementById(figure.id).classList.toggle(figure.type);
        document.getElementById(figure.id).innerText = figure.name;
        document.getElementById(figure.id).onclick = activateCell;
    }
    
    function activateCell() {
        var thisFigure = chessboard.figures[this.id];
        // wyswietl poss moves 
        if (this.classList.contains('active')) {
            for (var i = 0; i < thisFigure.possibleMoves.length; i++) {
                document.getElementById(thisFigure.possibleMoves[i]).classList.toggle('possMove');
                document.getElementById(thisFigure.possibleMoves[i]).onclick = null;
                delete chessboard.possibleMoves[thisFigure.possibleMoves[i]];
                // CHECK IF INSIDE BOARD 
                // check collision with others - function erases - add atributes to Figure
            }
        } else {
            for (var i = 0; i < thisFigure.possibleMoves.length; i++) {
                document.getElementById(thisFigure.possibleMoves[i]).classList.toggle('possMove');
                document.getElementById(thisFigure.possibleMoves[i]).onclick = moveFigure;
                chessboard.possibleMoves[thisFigure.possibleMoves[i]] = thisFigure.id;
            }
        }
        this.classList.toggle('active');
    }
    
    
    function moveFigure() {
        // remove moveFigure functions
        
        // wipe the old figure
        
        // put the new figure
        
    }
}



// create board 
var chessboard = new ChessBoard();

var BIERKI = [[4, 1, 'pawn'], [5, 1, 'pawn'], [6, 3, 'pawn']]
// create bierki
for (var i = 0; i < BIERKI.length; i++) {
    var fig = new Figure(BIERKI[i][0], BIERKI[i][1], BIERKI[i][2]);
    chessboard.addFigure(fig);
}
