let side = 25

function setup() {
    frameRate(10)
    createCanvas(matrix[0].length * side, matrix.length * side)
    
}

function draw() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green")
            } else if (matrix[y][x] == 2) {
                fill("yellow")
            } else if (matrix[y][x] == 3) {
                fill("red")
            } else if (matrix[y][x] == 4) {
                fill("blue")
            }else if (matrix[y][x] == 5){
                fill("black")
            }else{
                fill("gray")
            }
            rect(x * side, y * side, side, side)
        }
    }


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
}
