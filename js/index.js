//In this Index.js are all settings that have to be made before the game can start.

var maxPlayerNumber = 5;//not more than 5 players are allowed to attend the game. 
var inputField = document.getElementById("player-name");//players enter their names here
var getKeyLeft = document.getElementById("left-key");//player enters the left-key, for controlling the game
var getKeyRight = document.getElementById("right-key");//player enters the right-key, for controlling the game
inputField.addEventListener("keydown", checkInputField);//EventListener added, to know if the inputField is empty or has some value
getKeyLeft.addEventListener("keydown", checkKeyCode);//EventListener added, to check if the entered keycode is correct
getKeyRight.addEventListener("keydown", checkKeyCode);//EventListener added, to check if the entered keycode is correct
var color = ["Red", "YellowGreen", "Blue", "Green", "Pink", "Orange", "Cyan", "BlueViolet"];//predefined colors, for the players
var takenColor = [false, false, false, false, false, false, false, false];// when color is taken, value turns into true

//When there is no player, it hides the playertable
function hideTableIfEmpty() {
    if (players.length == 0) {
        var temp = document.getElementById("player-table");
        temp.hidden = true;
    }
}

//This function assignes the color to the players inorder
function getColor() {
    var i = 0;
    while (takenColor[i]) {
        i++;
    }
    takenColor[i] = true;
    return color[i];
}

//This function make sure that there are not more than the max amount of players addable to the playerlist
function checkInputField(event) {
    if (event.keyCode == 13 && players.length < maxPlayerNumber) {
        AddPlayer();
    }
}

//FUNCTION that checks the key-code, to make sure the entered key-code is ok for playing
function checkKeyCode(event){

}


//This function checks if there is already a player with the same name in the playerlist
function contains(playerName) {
    var contains = false;
    players.forEach(function (entry) {
        if (entry.name == playerName) {
            contains = true;
            return;
        }
    });
    return contains;
}

//This function adds a player to the playerlist, assignes a color to the player --> TO-DO: add the keys for left and right!!!
function AddPlayer() {
    if (inputField.value != "" && !contains(inputField.value)) {
        var player = { name: "", color: "", keyLeft: '', keyRight: '', finished: false };
        player.name = inputField.value;
        players.push(player);
        players[players.length - 1].color = getColor();
        inputField.value = "";
        if (players.length > maxPlayerNumber - 1) {
            document.getElementById("add-player").disabled = true;
        }
        displayData();
    } else {
        if (inputField.value == "")
            alert("Player-Name empty! Please put in at least one character.");
        else
            alert("Player already exists! Please choose another name.")
    }
    hideTableIfEmpty();
}

//This function displayes the current playerlist, also the color that has been assigned to the player and a delete-button
function displayData() {
    var temp = document.getElementById("player-table");
    temp.hidden = false;
    var table = document.getElementById("player-table");
    var i = 1;
    while (table.rows.length > 1) {
        table.deleteRow(i);
    }
    i = 1;
    players.forEach(function (entry) {
        var row = table.insertRow(i);
        row.style.backgroundColor = entry.color;
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        cell0.innerHTML = entry.name;
        cell1.innerHTML = '<button class="btn btn-default" onclick="deleteElem(' + i + ')">Delete</button>';
        i++;
    });
    hideTableIfEmpty();
}

//This function deletes the selected gamer out of the playerlist. --> through push on the "delete"-button
function deleteElem(index) {
    var playersNew = [];
    var i = 1;
    players.forEach(function (entry) {
        if (index != i)
            playersNew.push(entry);
        else {
            for (var j = 0; j < color.length; j++) {
                if (entry.color == color[j]) {
                    takenColor[j] = false;
                    break;
                }
            }
        }
        i++;
    });
    document.getElementById("add-player").disabled = false;
    players = playersNew;
    displayData();
}

//This function pushes Gamerentry to the right to make space for the canvas --> disable this function, if there is no gamer 
function changePage() {
    var startPage = document.getElementById("start-page");
    var gamePage = document.getElementById("game-page");
    if (startPage.style.display == "none") {
        startPage.style.display = "block";
        gamePage.style.display = "none";
    } else {
        startPage.style.display = "none";
        gamePage.style.display = "block";
    }
}