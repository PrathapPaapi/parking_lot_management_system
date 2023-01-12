//Entry Class: Represent each entry in the parking lot
class Entry{
    constructor(licensePlate, parkingSlot, arrivalTime){
        this.licensePlate = licensePlate;
        this.parkingSlot = parkingSlot;
        this.arrivalTime = arrivalTime;
    }
}

//defining the size of parking lot
const parkingLotSize = 10;

export {Entry};
export {parkingLotSize};