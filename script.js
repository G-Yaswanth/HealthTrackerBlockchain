


document.addEventListener("DOMContentLoaded", function () {
    const pageId = document.body.id;
    if (pageId === "allRecords") {
        populateAllRecords();
    }
    else if (pageId === "patientRecords") {
        const params = new URLSearchParams(window.location.search);
        const uid = params.get("uid");
        if (uid) {
            getPatientRecords(uid);
        } else {
        console.error("No UID found in URL");
        }
    }

    const addRecordBtn = document.getElementById("patientForm");
    if (addRecordBtn) {
        addRecordBtn.addEventListener("submit", function (e) {
            e.preventDefault();
            addRecord();
        });
    }

    //passing the uid to html2
    const goBtn = document.getElementById("patientRecords");
    if (goBtn) {
        goBtn.addEventListener("submit", function (e) {
            e.preventDefault();
            const input = document.getElementById("getUID");
            const uid = input.value;
            if (uid) {
                // Redirect with UID in URL
                window.location.href = `patientRecords.html?uid=${encodeURIComponent(uid)}`;
            } else {
                alert("Please enter UID: ",);
                return;
            }
        });
    }

});

function addRecord(){
    const form=document.getElementById('patientForm');
    if(form["patientName"].value==""||form["patientAge"].value==""||form["patientDescription"].value==""||form["patientUID"].value==""){
        alert("Enter all details");
    }
    else{
        const now = new Date();
        const ts = now.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
        })
        .replace(',', '')
        .replace(/\s+/g, ' ')
        .trim();

        let temp={
            patientName:form["patientName"].value,
            patientAge:form["patientAge"].value,
            patientDescription:form["patientDescription"].value,
            patientUID:form["patientUID"].value,
            timeStamp:ts,
            hash:"hash",
            previousHash:"previousHash"
        };

        // api to add data into DB
        fetch(`${BASE_URL}/addRecord`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(temp)
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            alert("form submitted");
        })
        .catch(error => {
            console.error('Fetch error:', error.message);
        });
        // form.reset();
    }
}


async function getPatientRecords(uid){
    const gridDiv = document.querySelector('#myGrid');
    const columnDefs = [
        { headerName: "S.No", valueGetter: "node.rowIndex + 1", width: 70 },
        { headerName: "UID", field: "patientUID", width: 90 },
        { headerName: "Name", field: "patientName", width: 130 },
        { headerName: "Age", field: "patientAge", width: 80 },
        { headerName: "Timestamp", field: "timeStamp", width: 140 },
        { headerName: "Description", field: "patientDescription", flex: 2 },
    ];
    const gridOptions = {
        columnDefs: columnDefs,
        defaultColDef: {
            resizable: true
        },
        pagination: true,
        paginationPageSize: 10,
        animateRows: true,
        getRowStyle: params => {
            if (params.node.rowIndex % 2 === 0) {
                return { background: "#f8fafc" };
            }
            return { background: "#ffffff" };
        }
    };
    const gridApi = agGrid.createGrid(gridDiv, gridOptions);
    let data = await fetch(`${BASE_URL}/getRecords?searchUID=` + uid)
        .then(res => res.json())
        .catch(err => console.error(err));
   
    gridApi.setGridOption('rowData', data);
}

async function populateAllRecords() {
    const gridDiv = document.querySelector('#myGrid');
    const columnDefs = [
        { headerName: "S.No", valueGetter: "node.rowIndex + 1", width: 70 },
        { headerName: "UID", field: "patientUID", width: 90 },
        { headerName: "Name", field: "patientName", width: 130 },
        { headerName: "Age", field: "patientAge", width: 80 },
        { headerName: "Timestamp", field: "timeStamp", width: 140 },
        { headerName: "Description", field: "patientDescription", flex: 2 },
        {
            headerName: "Hash",
            field: "hash",
            flex: 2,
            wrapText: true,
            autoHeight: true
        },
        {
            headerName: "Prev Hash",
            field: "previousHash",
            flex: 2,
            wrapText: true,
            autoHeight: true
        }
    ];
     
    const gridOptions = {
        columnDefs: columnDefs,
        defaultColDef: {
            resizable: true
        },
        pagination: true,
        paginationPageSize: 10,
        animateRows: true,
        getRowStyle: params => {
            if (params.node.rowIndex % 2 === 0) {
                return { background: "#f8fafc" };
            }
            return { background: "#ffffff" };
        }
    };

    const gridApi = agGrid.createGrid(gridDiv, gridOptions);
    let data = await fetch(`${BASE_URL}/getRecords`)
        .then(res => res.json())
        .catch(err => console.error(err));
   
    gridApi.setGridOption('rowData', data);

}