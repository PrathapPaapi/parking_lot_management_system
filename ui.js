import {Store} from './store.js';


//UI Class: Handle User Interface Tasks
class UI{
    static displayEntries(){
   
        const entries = Store.getEntries();
        entries.forEach((entry) => UI.addEntryToTable(entry));
    }

    static addEntryToTable(entry){
        const tableBody=document.querySelector('#tableBody');
        const row = document.createElement('tr');
        row.innerHTML = `
                            <td>${entry.licensePlate}</td>
                            <td>${entry.parkingSlot}</td>
                        `;
        tableBody.appendChild(row);
    }

    static addEntryToSearchTable(entry){
        const searchTableBody=document.querySelector('#searchTableBody');
        const row = document.createElement('tr');
        row.innerHTML = `
                            <td>${entry.licensePlate}</td>
                            <td>${entry.parkingSlot}</td>
                            <td><button class="btn btn-danger delete"> X </button></td>
                        `;
        searchTableBody.appendChild(row);
    }

    static addEntryToRecentTable(){
        const entries = Store.getEntries();
        entries.sort((a, b) => a.arrivalTime -b.arrivalTime);
        let count = 0;
        for(let i=entries.length-1; i>=0; i--){
            const recentTableBody=document.querySelector('#recentTableBody');
            const row = document.createElement('tr');
            row.innerHTML = `
                                <td>${entries[i].licensePlate}</td>
                                <td>${entries[i].parkingSlot}</td>
                            `;
            recentTableBody.appendChild(row);
            count++;
            if(count===3){
                break;
            }
        }
        
    }

    static clearInput(){
        //Selects all the inputs
        const inputs = document.querySelectorAll('.form-control');
        //Clear the content of each input
        inputs.forEach((input)=>input.value="");
    }

    static validateInputs(licensePlate){
        var licensePlateRegex = /^([A-Z]{2}\d{2}[A-Z]{2}\d{4})$/;
        if(licensePlate === ''){
            alert('Please enter a license number!');
            return false;
        }
        
        if(!licensePlateRegex.test(licensePlate)){
            alert('Enter a valid license number!');
            return false;
        }
        return true;
    }

    static checkDuplicates(licensePlate){
        const entries = Store.getEntries();
        let duplicates = entries.every(entry => {
            return entry.licensePlate != licensePlate;
        });

        return duplicates;
    }

    static searchEntry(licensePlate){
        const entries = Store.getEntries();
        for(let i=0; i<entries.length;i++){
            if(entries[i].licensePlate === licensePlate){
                return entries[i];
            }
        }
    }
}

export {UI}