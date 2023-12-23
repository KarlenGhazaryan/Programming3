var socket = io();
let side = 25

function setup() {
    createCanvas(40 * side, 40 * side)
}

socket.on("Winter", function(weath){
    weather = weath;
})

socket.on("Summer", function(weath){
    weather = weath;
})

socket.on("Spring", function(weath){
    weather = weath;
})

socket.on("Autumn", function(weath){
    weather = weath;
})


var weather = "Spring";

function drawGame(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if (weather == "Spring"){
                    fill("darkgreen")
                }
                else if (weather == "Summer") {
                    fill("green")
                }
                else if (weather == "Autumn") {
                 fill("#BAFB00")
                }
                else if (weather == "Winter") {
                    fill("#ffffff")
                }
            } 
            else if (matrix[y][x] == 2) {
                fill("yellow")
            } 
            else if (matrix[y][x] == 3) {
                fill("red")
            } 
            else if (matrix[y][x] == 4) {
                fill("blue")
            }
            else if (matrix[y][x] == 5){
                fill("black")
            }
            else{
                fill("gray")
            }
            rect(x * side, y * side, side, side)
        }
    }
}

    socket.on("send matrix", drawGame)


//buttons

function Winter(){
    socket.emit("Winter")
}

function Summer(){
    socket.emit("Summer")
}

function Spring(){
    socket.emit("Spring")
}

function Autumn(){
    socket.emit("Autumn")
    console.log("dfsghfhsgfhsxghgshgds");

}

function AddGrass(){
    socket.emit("AddGrass")
}

function AddWater(){
    socket.emit("AddWater")
}


function AddMonster(){
    socket.emit("AddMonster")
}


function AddPredator(){
    socket.emit("AddPredator")
}

function AddGrassEater(){
    socket.emit("AddGrassEater")
}