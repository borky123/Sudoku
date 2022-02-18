var savedValue = null;
var mistakes = 0;
var board = [];
function generateBoard() {
    for (var i = 0; i < 9; ++i) {
        board[i] = [];
        for (var j = 0; j < 9; ++j) {
            board[i][j] = "-";
        }
    }
    for(var generatedPos = 0; generatedPos < 30;) {
        var i = Math.floor(Math.random() * 9);
        var j = Math.floor(Math.random() * 9);
        if (board[i][j] == "-") {
            var choosedValue = Math.floor(Math.random() * 9);
            var checked = true;
            //Check if the choosed value is allready existing on row
            for (var y = 0; y < 9 && checked == true; ++y) {
                if (board[i][y] == choosedValue) {
                    checked = false;
                }
            }
            //Check if the choosed value is allready existing on column
            for (var x = 0; x < 9 && checked == true; ++x) {
                if (board[x][j] == choosedValue) {
                    checked = false;
                }
            }
            //Create the start and stop row coordonates for submatrix;
            var start_i = i;
            while (start_i % 3 != 0) {
                --start_i;
            }
            var stop_i = start_i + 2;
            //Create the start and stop column coordonates for submatrix;
            var start_j = j;
            while (start_j % 3 != 0) {
                --start_j;
            }
            var stop_j = start_j + 2;
            //Check if the choosed value is allready existing in submatrix
            for(var x = start_i; x <= stop_i; ++x) {
                for (var y = start_j; y <= stop_j; ++y) {
                    if (board[x][y] == choosedValue) {
                        checked = false;
                    }
                }
            }
            if (checked == true) {
                board[i][j] = choosedValue;
                ++generatedPos;
            }
        }
    }
    console.log(board);
}

window.onload = function() {
    createNumbers();
    generateBoard();
    createBoard();
}

function createNumbers() {
    for (let i = 1; i <= 9; ++i) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.classList.add("numbersCell");
        number.addEventListener("click", saveNumber)
        document.getElementById("numbers").appendChild(number);
    }
}

function createBoard() {
    for (i = 0; i < 9; ++i) {
        for (j = 0; j < 9; ++j) {
            let cell = document.createElement("div");
            cell.id = i.toString() + "-" + j.toString();
            cell.classList.add("cell");
            if (board[i][j] != "-"){
                cell.innerText = board[i][j];
                cell.classList.add("cell-start");
            } else {
                cell.addEventListener("click", saveCell);
            }
            if (i == 2 || i == 5) {
                cell.classList.add("horisontal");
            } 
            if (j == 2 || j == 5) {
                cell.classList.add("vertical");
            }
            document.getElementById("board").appendChild(cell);
        }
        
    }
}

function saveNumber() {
    if (savedValue != null) {
        savedValue.classList.remove("selected-numbersCell");
    }
    savedValue = this;
    savedValue.classList.add("selected-numbersCell");
}

function saveCell() {
    if (savedValue) {
        let position = this.id.split("-");
        let i = parseInt(position[0]);
        let j = parseInt(position[1]);
        //Deleting method
        if (savedValue.id == board[i][j]) {
            this.innerText = "";
            board[i][j] = "-";
            return;
        }
        checked = true;
        //Check the submatrix
        var start_i = i;
        var start_j = j;
        while (start_i % 3 != 0) {
            --start_i;
        }
        while (start_j % 3 != 0) {
            --start_j;
        }
        var stop_i = start_i + 2;        
        var stop_j = start_j + 2;
        for (var x = start_i; x <= stop_i; ++x) {
            for (var y = start_j; y <= stop_j; ++y) {
                if (board[x][y] == savedValue.id) {
                    checked = false;
                }
            }
        }
        //Check the row
        for (var y = 0; y < 9; ++y) {
            if (board[i][y] == savedValue.id) {
                checked = false;
            }
        }
        //Check the column
        for (var x = 0; x < 9; ++x) {
            if (board[x][j] == savedValue.id) {
                checked = false;
            }
        }
        if (checked == true) {
            this.innerText = savedValue.id;
            board[i][j] = savedValue.id;
        } else {
            mistakes++;
            document.getElementById("mistakes").innerText = mistakes;
        }
    }
}