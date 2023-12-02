class BMW extends Car{
    constructor(x,y){
        super(x,y)
    }
}

let car = new BMW (10,15)

car.move()

console.log(car);