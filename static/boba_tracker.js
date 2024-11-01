// boba_tracker.js
function addRow() {
    const tableBody = document.getElementById("tableBody");
    const newRow = document.createElement("tr");

    // Add a cell for each column
    for (let i = 0; i < 10; i++) {
        const cell = document.createElement("td");
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = i === 0 ? "MM/DD/YYYY" : "";
        cell.appendChild(input);
        newRow.appendChild(cell);
    }

    tableBody.appendChild(newRow);
}

function saveToExcel() {
    // Convert the table data to JSON
    const table = document.getElementById("bobaTable");
    const data = [];

    for (let i = 1, row; row = table.rows[i]; i++) {
        const rowData = [];
        for (let j = 0, col; col = row.cells[j]; j++) {
            rowData.push(col.firstChild.value || "");
        }
        data.push(rowData);
    }

    // Send the data to the Python script via an HTTP request (assumes a backend server setup)
    fetch("/save_to_excel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: data })
    }).then(response => {
        if (response.ok) alert("Data saved to Excel!");
        else alert("Failed to save data.");
    });
}