class Monster extends LivingCreature{
    constructor(x, y) {
        super(x,y);
        this.energy = 85;
        this.direction = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char1, char2, char3) {
        this.getNewCoordinates()
        return  super.chooseCell(char1,char2,char3)
    }
    mul() {
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)

        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 5

            let monst = new Monster(newX, newY)
            monsterArr.push(monst)
        }
    }

    eat() {
        let foods = this.chooseCell(1,2,3)
        let food = random(foods)
        if (food) {
            this.energy += 5

            let newX = food[0]
            let newY = food[1]

            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0

            for (let i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break;
                }
            }


            for (let i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break;
                }
            }

            for (let i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1)
                    break;
                }
            }

            for (let i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break;
                }
            }



            this.x = newX
            this.y = newY

            if (this.energy > 135) {
                this.mul()
            }
        } else {
            this.move()
        }
    }

    move() {
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)

        if (newCell) {
            this.energy--

            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY

            if (this.energy <= 0) {
                this.die()
            }
        }
    }

    waterBreeder() {
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)

        if(newCell){
            let newX = newCell[0]
            let newY = newCell[1]
    
            matrix[newY][newX] = 4
    
            let water = new Water(newX, newY)
            waterArr.push(water) 
        }
    }
    
    die() {
        matrix[this.y][this.x] = 0
        for (let i in monsterArr) {
            if (this.x == monsterArr[i].x && this.y == monsterArr[i].y) {
                monsterArr.splice(i, 1)
                break;
            }
        }
    }
}