
// DOM Nodes Sections...............................
let Btn = document.getElementById("submit");
let Table = document.getElementById("tbody");
let DaTe = document.getElementById("date");
let CssOrJs = document.getElementById("cssOrJs");
let Psolving = document.getElementById("pSolving");
let Project = document.getElementById("project");
let ClearAll = document.getElementById("clearbtn");
let DailyBar= document.getElementById("dailybar");
let OverallBar= document.getElementById("overallbar");

showItems();  // This will try to show datae from localstorage on load if it has some .
// showbar();  // This will try to show datae from localstorage on load if it has some .
// overallbar(); // This will try to show datae from localstorage on load if it has some .

// Event Listener Sections...........................
Btn.addEventListener("click", makeItems);
ClearAll.addEventListener("click", eraseAll);


function makeItems(){

    // These section is making data for Table.
    // initially this "userdata" may contain null values..if so they won't be pusede finally, there is  further checking  for this.
    let userData = `<tr><th>${DaTe.value}</th><td> ${CssOrJs.value} hr </td><td> ${Psolving.value} hr </td><td> ${Project.value} hr </td> </tr>`;
    let getLocalStorage = localStorage.getItem('Contents');           //Trying to get previous data from local storage.

    if (getLocalStorage==null){                                      // If there is nothing in "contents" then creating a new array.
        contentsArray = [];
    }else{                                                          // If there is something  in "contents" then creating a new array using it's value.
        contentsArray = JSON.parse(getLocalStorage);                // This will store all table data.
    };

    // Now we have either an Empty array or  an array with previous value, whatever, the array is "contentsArray", we will populate it now.

    // here is the checking whether "userdata" contains valid value or not.
    if(DaTe.value && CssOrJs.value && Psolving.value && Project.value ){       // checking input validation.
        contentsArray.push(userData);                                         // if everything is fine, pushing new data in "contentsArray"      
    }else{
        alert (" Please, Give value to all the input box.");
    };
    
    localStorage.setItem("Contents",JSON.stringify(contentsArray) ); // Updating "Contents" folder in local storage by seting "contentsArray" in "Contents."
 


    // These section is making data for Bar Chart.
     // initially this "barDataObject" may contain null values..if so they won't be pusede finally, there is  further checking  for this.
    let barDataObject = {"date":DaTe.value, "CSS":CssOrJs.value, "Psolving":Psolving.value,"Project":Project.value };
    let getLocalStorageForBar = localStorage.getItem('Bardata'); //Trying to get previous data from local storage.

    if (getLocalStorageForBar==null){                         // If there is nothing in "Bardata" then creating a new array.
        BarArray = [];    
    }else{
        BarArray = JSON.parse(getLocalStorageForBar);         // If there is something  in "Bardata" then creating a new array using it's value.
    };


    if(DaTe.value && CssOrJs.value && Psolving.value && Project.value ){            // checking input validation.
        BarArray.push(barDataObject);                                              // if everything is fine, pushing new data in "contentsArray"
    //  Removing previous inputed data from the input fields.
        DaTe.value= null;
        CssOrJs.value=null;
        Psolving.value=null;
        Project.value=null;    
    };
    
    localStorage.setItem("Bardata",JSON.stringify(BarArray) ); // Updating "Bardata" folder in local storage by seting "BarArray" in "Bardata."

    // These  three functions are here to update the table and two other bars after every Submit.
     showItems();   
     showbar();  
     overallbar(); 
}



        function showItems(){
        
            let getLocalStorage = localStorage.getItem('Contents');
            if (getLocalStorage==null){  // if there is no 'Contents' in localStorage, creating an empty array.
                contentsArray = [];  
            }else{
                contentsArray = JSON.parse(getLocalStorage);  // If there is something in 'Contents', parsing it and keeping it in an array.
                if (contentsArray.length>0){              // this array can be of length 0 and it may cause unexpected bugs, so we are checking the length here.
                    document.getElementById("table").style.visibility= "visible"; // Table is hidden by Css if there is no data. if data is added, this will make it visible.
                    ClearAll.style.visibility="visible";
                };
                
            };

            let finalContent = '';  // taking an empty string.
            if (contentsArray){
                contentsArray.forEach(element => {
                finalContent += element;  // adding all the userdata in the string as html tags
                });
            };
            
            Table.innerHTML = finalContent;  // pushing them together in the table.
        
        };


        function showbar(){
            let getLocalStorageForBar = localStorage.getItem('Bardata');// This will store Bar data.
            if (getLocalStorageForBar==null){  //  Checking whether there is any data in local storage for Bar chart.
                BarArray = [];   
            }else{
                BarArray = JSON.parse(getLocalStorageForBar);  // Creating array using  "getLocalStorageForBar" file.
            };

            let  n = BarArray.length; // geting  length so that we can have last element in the array.
            if (n>=1){ // This section is sending values to barchat1's date and it's bar heights.
                document.getElementById("bar1Text").innerText = BarArray[n-1].date;
                document.getElementById("bar1").style.height = `${((BarArray[n-1].CSS/10)*100)}%`;
                document.getElementById("bar2").style.height = `${((BarArray[n-1].Psolving/10)*100)}%`;
                document.getElementById("bar3").style.height = `${((BarArray[n-1].Project/10)*100)}%`;
            };
            
        };

        function overallbar(){
            let totalHour = 0;
            let jsHour = 0;
            let psolvineHour = 0;
            let projectHour = 0;
            let getLocalStorageForBar = localStorage.getItem('Bardata');// This will store Bar data.
            if (getLocalStorageForBar==null){  //  Checking whether there is any data in local storage for Bar chart.
                BarArray = [];   
            }else{
                BarArray = JSON.parse(getLocalStorageForBar);  // Creating array using  "getLocalStorageForBar" file.
            };

            BarArray.forEach(elem=>{ // This will store all the completed hours  in diffrent categories;
                totalHour += parseInt(elem.CSS)+parseInt(elem.Psolving)+parseInt(elem.Project);
                jsHour += parseInt(elem.CSS);
                psolvineHour += parseInt(elem.Psolving);
                projectHour += parseInt(elem.Project);
            });
            // Sending necessary values to Barchart 2.
            document.getElementById("obar1").style.height = `${(jsHour/totalHour)*100}%`;
            document.getElementById("obar1").setAttribute("data-percentage", `${parseInt((jsHour/totalHour)*100)}`);
            document.getElementById("obar2").style.height = `${(psolvineHour/totalHour)*100}%`;
            document.getElementById("obar2").setAttribute("data-percentage", `${parseInt((psolvineHour/totalHour)*100)}`);
            document.getElementById("obar3").style.height = `${(projectHour/totalHour)*100}%`;
            document.getElementById("obar3").setAttribute("data-percentage", `${parseInt((projectHour/totalHour)*100)}`);


            let n = BarArray.length;
            if (n>=2){   // For getting starting and End date, the array must be of length 2, otherwise we will get only the staring date.
                document.getElementById("startDate").innerText = BarArray[0].date;
                document.getElementById("endDate").innerText = BarArray[n-1].date;
            };
        };


DailyBar.addEventListener("click", ()=>{
    let getLocalStorageForBar = localStorage.getItem('Bardata');// This will store Bar data.
    if (getLocalStorageForBar==null){                           //  Checking whether there is any data in local storage for Bar chart.
        BarArray = [];  
        alert(" No data available!!!") ; 
    }else{
        BarArray = JSON.parse(getLocalStorageForBar);       // Creating array using  "getLocalStorageForBar" file.

        if (BarArray.length==0){                           // null has been handle, here handline the empty bar case.
            alert(" No data available!!")
        }else{
            showbar();                                    // calling this function if BarArray is not empty.

            DailyBar.style.background="red";
            OverallBar.style.background="rgb(154, 13, 209)";
            document.getElementById("bardiv1").style.display= "block";     // Showing barchart 1.
            document.getElementById("bardiv2").style.display= "none";      // we want to show a bar , so hiding the second one.
            document.getElementById("bar1Text").style.display = "block";   // showing bar1's text.
            document.getElementById("bar2Text").style.display = "none";    // as bar2 is hidden, so as it's text.
            window.scrollBy(0, 350);
        };
        
    };


    
});

OverallBar.addEventListener("click", ()=>{
    let getLocalStorageForBar = localStorage.getItem('Bardata');// This will store Bar data.
    if (getLocalStorageForBar==null){  //  Checking whether there is any data in local storage for Bar chart.
        BarArray = [];  
        alert(" No data available!!!") ;
    }else{
        BarArray = JSON.parse(getLocalStorageForBar);  // Creating array using  "getLocalStorageForBar" file.
        if(BarArray.length==0){
            alert("No data available!!!");
        }else{
            overallbar();  // calling this function if BarArray is not empty.
            OverallBar.style.background="red";
            DailyBar.style.background="rgb(154, 13, 209)";
            document.getElementById("bardiv2").style.display= "block";  // similar as previous one.
            document.getElementById("bardiv1").style.display= "none";
            document.getElementById("bar2Text").style.display = "block";
            document.getElementById("bar1Text").style.display = "none";
            window.scrollBy(0, 350);
        };
        
    };


   
});

function eraseAll(){
    let deletE = confirm("This will delete the full table, Are You sure?")
    if (deletE){
        localStorage.removeItem("Contents");
        localStorage.removeItem("Bardata");
        location.reload();
    };
}