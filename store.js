import {parkingLotSize} from './entryClass.js'

//Store Class: Handle Local Storage
class Store{
    static getEntries(){
        let entries;
        if(localStorage.getItem('entries') === null){
            entries = [];
        }
        else{
            entries = JSON.parse(localStorage.getItem('entries'));
        }
        return entries;
    }

    static addEntries(entry){
        const entries = Store.getEntries();
        entries.push(entry);
        localStorage.setItem('entries', JSON.stringify(entries));
    }

    static removeEntries(licensePlate){
        const entries = Store.getEntries();
        entries.forEach((entry,index) => {
            if(entry.licensePlate === licensePlate){
                entries.splice(index, 1);
            }
        });

        localStorage.setItem('entries', JSON.stringify(entries));
    }

    static getParkingSlot(){
        const entries = Store.getEntries();
        for(let slot = 1; slot<=parkingLotSize;slot++){
            let i=0;
            for(i=0; i<entries.length;i++){
                if(entries[i].parkingSlot === slot){
                    break;
                }
            }
            if(i === entries.length){
                return slot;
            }
        }
    }
    
}

export {Store}