export class Car {
    constructor(
        public licensePlate: string,
        public available: boolean
    ){}

    isAvailable(){
        this.available = true;
    }

    isNotAvailable(){
        this.available = false;
    }
}