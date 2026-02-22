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

















