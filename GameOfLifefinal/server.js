var express = require("express")
var app = express()

var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs")

app.use(express.static("."))

app.get('/', function(req, res){
    res.redirect('index.html')
});

server.listen(3000, () => {
    console.log('connected');
});

function matrixGenerator(matrixSize, grassCount, grasseaterCount, predatorCount, waterCount,monsterCount){
    let matrix = []

    //MatrixSize

    for (let i = 0; i < matrixSize; i++) {
        matrix.push([])
        for (let j = 0; j < matrixSize; j++) {
            matrix[i].push(0)
        }
    }

    //grassCount
    for (let i = 0; i < grassCount; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }

    //grassEaterCount
    for (let i = 0; i < grasseaterCount; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }
    // predatorCount
    for (let i = 0; i < predatorCount; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }
    //waterCount
    for (let i = 0; i < waterCount; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
    }
    //MonsterCount
    for (let i = 0; i < monsterCount; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
        }
    }
    return matrix
}

matrix = matrixGenerator(40, 35, 20, 15, 1, 4);

io.sockets.emit("send matrix", matrix)

////arrays

grassArr = []
grassEaterArr = []
predatorArr = []
waterArr = []
monsterArr = []

//// modules

let Grass = require("./grass")
let GrassEater = require("./grassEater")
let Monster = require("./monster")
let Predator = require("./predator")
let Water = require("./water")

////

function createObject(){
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let grass = new Grass(x, y)
                grassArr.push(grass)
            } else if (matrix[y][x] == 2) {
                let grEat = new GrassEater(x, y)
                grassEaterArr.push(grEat)
            } else if (matrix[y][x] == 3) {
                let pred = new Predator(x, y)
                predatorArr.push(pred)
            } else if (matrix[y][x] == 4) {
                let water = new Water(x, y)
                waterArr.push(water)
            }else if (matrix[y][x] == 5) {
                let monst = new Monster(x,y)
                monsterArr.push(monst)
            }
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function game(){
    for (let i in grassArr) {
        grassArr[i].mul()
    }

    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()
    }
    for (let i in predatorArr) {
        predatorArr[i].eat()
    }

    for (let i in waterArr) {
        waterArr[i].eat()

        if(grassArr.length == 0){
           waterArr[i].grassBreeder();
        }
    }
    
    for (let i in monsterArr){
        monsterArr[i].eat();

        if(waterArr.length == 0){
            monsterArr[i].waterBreeder();
        }
    }
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 500)

io.on("connection", function(socket){
    createObject()
})