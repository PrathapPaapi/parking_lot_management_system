import {UI} from './ui.js';
import {ImpFunctions} from './addRemoveSearchFun.js';

//Event Display
    document.addEventListener('DOMContentLoaded',UI.displayEntries);


//Event Add
    document.querySelector('#entryForm').addEventListener('submit',(e)=>{
        e.preventDefault();
        
        //Declare Variables
        const licensePlate = document.querySelector('#licensePlate').value;
        console.log(ImpFunctions)
        ImpFunctions.addFunction(licensePlate);
    });


//Add the entry to the UI recent table
    UI.addEntryToRecentTable();


//search license plate
    document.querySelector('#exitForm').addEventListener('submit',(e)=>{
        e.preventDefault();
        
        //Declare Variables
        const licensePlate = document.querySelector('#searchInput').value;

        ImpFunctions.searchFunction(licensePlate);
    });


//Event Remove
    document.querySelector('#searchTableBody').addEventListener('click',(e)=>{

        //Get license plate to use as unique element of an entry
        const licensePlate = e.target.parentElement.previousElementSibling.previousElementSibling.textContent; 
        
        ImpFunctions.removeFunction(licensePlate);
    });

//clear storage
    document.getElementById("clearStorage").onclick = clearStorage;
    function clearStorage(){
        const answer = confirm("sure, you want to delete the stored data?")
        if(answer){
            localStorage.clear();
            location.reload();
        }
    }