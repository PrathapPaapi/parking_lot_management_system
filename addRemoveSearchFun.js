import {Store} from './store.js';
import {UI} from './ui.js';
import {Entry} from './entryClass.js';
import {parkingLotSize} from './entryClass.js';

//all the functions related to add, remove and search

class ImpFunctions{
    static addFunction(licensePlate){
        //validating the license plate
        if(!UI.validateInputs(licensePlate)){
            UI.clearInput();
            return;
        }

        //check for duplicate license plate
        if(!UI.checkDuplicates(licensePlate)){
            alert('License plate already exists!!');
            UI.clearInput();
            return;
        }

        if(Store.getEntries().length >= parkingLotSize){
            alert('No parking spaces left');
            UI.clearInput();
            return;
        }

        const parkingSlot = Store.getParkingSlot();

        //Instatiate Entry
        const d = new Date();
        const entry = new Entry(licensePlate, parkingSlot, d.getTime());

        //Add the entry to the UI table
        UI.addEntryToTable(entry);

        //store entry to local storage
        Store.addEntries(entry);

        //Delete content of input's
        UI.clearInput();

        alert('Car successfully added to the parking lot and the parking slot is: ' + parkingSlot);
        
        location.reload();

        return entry;
    }

    static searchFunction(licensePlate){
        //check whether the car is in parking lot
        if(UI.checkDuplicates(licensePlate)){
            alert('License plate not found');
            UI.clearInput();
            if(document.getElementById("searchTableBody").rows.length > 0){
                document.getElementById("searchTableBody").deleteRow(0);
            }
            return;
        }

        if(document.getElementById("searchTableBody").rows.length > 0){
            document.getElementById("searchTableBody").deleteRow(0);
        }

        //Add the entry to the UI search table
        const entry = UI.searchEntry(licensePlate);

        UI.addEntryToSearchTable(entry);

        //Delete content of input's
        UI.clearInput();

        return entry;
    }

    static removeFunction(licensePlate){

        //removes entry from the search table
        document.getElementById("searchTableBody").deleteRow(0);

        //Call to Store function to remove entry from the local storage
        Store.removeEntries(licensePlate);

        //Show alert that entry was removed
        alert('Car successfully removed from the parking lot list');
        location.reload();
    }
}

export {ImpFunctions}