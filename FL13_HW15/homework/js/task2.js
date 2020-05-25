let tht = 30;
let otf = 1500;
let twt = 2000;


function Vehicle(color, engine) {
    this.engine = engine;
    this.color = color;
    this.maxSpeed = 70;
    this.model = 'unknown model';
    this.currentSpeed = 0;
    this.driveStatus = false;
    this.stopping = 0;
    this.stopMSG = ``;
    this.braking = false;
}

Vehicle.prototype.upgradeEngine = function(newEngine, maxSpeed) {
    if (this.stopping === 0 && !this.driveStatus) {
        this.engine = newEngine;
        this.maxSpeed = maxSpeed;
    }
}
Vehicle.prototype.getInfo = function() {
    console.log({engine: this.engine, color: this.color, maxSpeed: this.maxSpeed, model: this.model});
}

Vehicle.prototype.drive = function() {
    if(!this.driveStatus) {
        this.driveStatus = true;
        let msgc = 0;
        if (this.constructor.name === 'Motorcycle') {
            console.log(`Let's drive`);
        }
        let driveID = setInterval(() => {
            if(!this.driveStatus) {
                clearInterval(driveID);
                return;
            }
            if (this.constructor.name === 'Motorcycle' && this.currentSpeed - this.maxSpeed >= tht) {
                console.log('speed is too high, SLOW DOWN!');
                console.log('Engine overheating');
                this.braking = true;
                clearInterval(driveID);
                let stopID = setInterval(() => {
                    console.log(this.currentSpeed);
                    this.currentSpeed -= 20;
                    if (this.currentSpeed <= 0) {
                        clearInterval(stopID);
                        this.currentSpeed = 0;
                        this.driveStatus = false;
                        this.braking = false;
                        return;                 
                    }
                    if(!this.driveStatus) {
                        clearInterval(stopID);
                        return;
                    }
                }, twt);
            }
            if(this.driveStatus) {
                this.currentSpeed += 20;
                console.log(this.currentSpeed);
            }
            if (this.currentSpeed > this.maxSpeed && msgc === 0) {
                console.log('speed is too high, SLOW DOWN!');   
                msgc++;
            }
        }, twt);
    } else {
        console.log('Already driving')
    }
}

Vehicle.prototype.stop = function() {
    if (this.driveStatus) {
        this.mcSpeed = this.currentSpeed;
        switch (this.constructor.name) {
            case 'Vehicle':
                this.stopMSG = `Vehicle is stopped. Maximum speed during the drive was ${this.currentSpeed}`;
                break;          
            case 'Car':
                this.stopMSG = `Car ${this.model} is stopped. Maximum speed during the drive was ${this.currentSpeed}`;
                break;
            case 'Motorcycle':
                this.stopMSG = `Motorcycle ${this.model} is stopped. Good drive`;
                break;
            default:
                break;
        }
        this.driveStatus = false;
        this.stopping++;
        if (this.braking) {
            console.log('Already slows down');
        }
        if (this.stopping === 1) {
            let stopID = setInterval(() => {
                if (this.currentSpeed <= 0) {
                    this.currentSpeed = 0;
                    this.stopping = 0;
                    this.braking = false;
                    console.log(this.stopMSG);  
                    clearInterval(stopID);  
                } else if (!this.driveStatus) {
                    console.log(this.currentSpeed);
                    this.currentSpeed -= 20;
                }
            }, otf);
        }
    }
}

function Car(model, color, engine) {
    Vehicle.call(this, color, engine);
    this.maxSpeed = 80;
    this.model = model;
}
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.changeColor = function(newColor) {
    if (this.color.toLowerCase() === newColor.toLowerCase()) {
        console.log('The selected color is the same as the previous, please choose another one')
    } else {
        this.color = newColor;
    }
}

function Motorcycle(model, color, engine) {
    Vehicle.call(this, color, engine);
    this.maxSpeed = 90;
    this.model = model;
}
Motorcycle.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype.constructor = Motorcycle;