console.log("hi");
//db is for storing patient details 
let db=[];

function addRecord(){
    const form=document.getElementById('patientForm');
    window.onload=displayRecords;

    if(form["patientName"].value==""||form["patientAge"].value==""||form["patientDescription"].value==""||form["patientUID"].value==""){
        alert("enter all details");
    }
    else{

        let temp={
            patientName:form["patientName"].value,
            patientAge:form["patientAge"].value,
            patientDescription:form["patientDescription"].value,
            patientUID:form["patientUID"].value,
        };
        db.push(temp);
        alert("form submitted");
        form.reset();
        console.log("Submitted");
        console.log(db);
    }

    form.addEventListener("submit",function(event){
        event.preventDefault();

        const record={
            patientName:form["patientName"].value,
            patientAge:form["patientAge"].value,
            patientDescription:form["patientDescription"].value,
            patientUID:form["patientUID"].value,
        };

        let records=JSON.parse(localStorage.getItem("patientRecord"))||[];
        records.push(record);
        localStorage.setItem("patientRecords",JSON.stringify(records));
    });

    function displayRecords(){
        let records=JSON.parse(localStorage.getItem("patientRecord"))||[];
        table.innerHTML="";
        records.foreach((records,index)=>{
        table.innerHTML +=
        `<tr>
            <td>${record.patientName}</td>
            <td>${record.patientAge}</td>
            <td>${record.patientDescription}</td>
            <td>${record.patientUID}</td>
        </tr>`;
        });

    }
}


function populateAllRecords(){
    let allRecords = document.getElementById("allRecordsTableBody");
    
    const data = [
        [1,"Yash",22,"Cold",123,1111],
        [2,"Yaswanth G",25,"Fever",789,1100],
        [3,"Yash gajula",20,"Legs pain",456,1200]
    ];

    for(let i=0;i<data.length;i++){
        const newRow = allRecords.insertRow();

        const sno = newRow.insertCell();
        const name = newRow.insertCell();
        const age = newRow.insertCell();
        const desc = newRow.insertCell();
        const uid = newRow.insertCell();
        const time = newRow.insertCell();

        sno.textContent = data[i][0];
        name.textContent = data[i][1];
        age.textContent = data[i][2];
        desc.textContent = data[i][3];
        uid.textContent = data[i][4];
        time.textContent = data[i][5];

    }
}

// function getAllRecords() {
//     alert("No Records");
// }
// const records = document.getElementById("patientRecords");
// records.addEventListener('submit',function(event){
    
//     if(records["patientUID"].value==""){
//         alert("enter patient UID");
//     }
//     else{
//         alert(`patient UID is ${records["patientUID"].value}`)
//     }  
// });

















