export class Rental {
    constructor(
        public id: string,
        public licensePlate: string,
        public startDate: Date,
        public endDate: Date | null,
        public createAt: Date
    ){}
}