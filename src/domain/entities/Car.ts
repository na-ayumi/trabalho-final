export class Car {
    constructor(
        public id: string,
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