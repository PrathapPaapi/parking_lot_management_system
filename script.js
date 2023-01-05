//Entry Class: Represent each entry in the parking lot
class Entry{
    constructor(licensePlate, parkingSlot){
        this.licensePlate = licensePlate;
        this.parkingSlot = parkingSlot;
    }
}

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
        for(let slot = 1; slot<=10;slot++){
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


//Event Display
    document.addEventListener('DOMContentLoaded',UI.displayEntries);


//Event Add
    document.querySelector('#entryForm').addEventListener('submit',(e)=>{
        e.preventDefault();
        
        //Declare Variables
        const licensePlate = document.querySelector('#licensePlate').value;

        addFunction(licensePlate);
    });


//Add the entry to the UI recent table
    UI.addEntryToRecentTable();


//search license plate
    document.querySelector('#exitForm').addEventListener('submit',(e)=>{
        e.preventDefault();
        
        //Declare Variables
        const licensePlate = document.querySelector('#searchInput').value;

        searchFunction(licensePlate);
    });


//Event Remove
    document.querySelector('#searchTableBody').addEventListener('click',(e)=>{

        //Get license plate to use as unique element of an entry
        const licensePlate = e.target.parentElement.previousElementSibling.previousElementSibling.textContent; 
        
        removeFunction(licensePlate);
    });
    

    function addFunction(licensePlate){
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

        if(Store.getEntries().length >= 10){
            alert('No parking spaces left');
            UI.clearInput();
            return;
        }

        const parkingSlot = Store.getParkingSlot();

        //Instatiate Entry
        const entry = new Entry(licensePlate, parkingSlot);

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

    function searchFunction(licensePlate){
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

    function removeFunction(licensePlate){

        //removes entry from the search table
        document.getElementById("searchTableBody").deleteRow(0);

        //Call to Store function to remove entry from the local storage
        Store.removeEntries(licensePlate);

        //Show alert that entry was removed
        alert('Car successfully removed from the parking lot list');
        location.reload();
    }



//clear storage
    document.getElementById("clearStorage").onclick = clearStorage;
    function clearStorage(){
        const answer = confirm("sure, you want to delete the stored data?")
        if(answer){
            localStorage.clear();
            location.reload();
        }
    }
