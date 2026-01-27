export class Rental {
    constructor(
        public id: string,
        public carId: string,
        public startDate: Date,
        public endDate: Date,
        public createAt: Date
    ){}
}