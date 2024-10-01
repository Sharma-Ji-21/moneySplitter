let arr = [];  // Array to store items and their split data
let namesList = [];  // Array to store the names of people
let individualTotals = {};  // Object to track how much each person owes

// Function to submit names and create checkboxes
function submitNames() {
    const namesInput = document.getElementById('names').value;
    namesList = namesInput.split(',').map(name => name.trim());

    const checkboxContainer = document.getElementById('checkboxContainer');
    checkboxContainer.innerHTML = '';  // Clear previous checkboxes

    namesList.forEach(name => {
        const label = document.createElement('label');
        label.classList.add('checkbox-label');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = name;

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(name));
        checkboxContainer.appendChild(label);
    });
}

// Function to add an item to the table
function addItem() {
    const item = document.getElementById('item').value;
    const cost = Number(document.getElementById('cost').value);
    const selectedNames = Array.from(document.querySelectorAll('#checkboxContainer input:checked')).map(input => input.value);

    if (item && cost > 0 && selectedNames.length > 0) {
        const personCount = selectedNames.length;
        const splitAmount = (cost / personCount).toFixed(2);

        arr.push({ item, cost, personCount, splitAmount, selectedNames });

        // Add to the main item table
        const tableBody = document.getElementById('itemTable').querySelector('tbody');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item}</td>
            <td>₹${cost.toFixed(2)}</td>
            <td>${personCount}</td>
            <td>₹${splitAmount}</td>
            <td>${selectedNames.join(', ')}</td>
        `;
        tableBody.appendChild(row);

        // Clear input fields
        document.getElementById('item').value = '';
        document.getElementById('cost').value = '';
        document.getElementById('checkboxContainer').innerHTML = '';
    } else {
        alert('Please enter valid details!');
    }
}

// Function to calculate how much each person owes
function calculateTotals() {
    individualTotals = {};  // Reset totals

    // Calculate totals based on each item
    arr.forEach(item => {
        item.selectedNames.forEach(name => {
            if (!individualTotals[name]) {
                individualTotals[name] = 0;
            }
            individualTotals[name] += Number(item.splitAmount);
        });
    });

    // Add to the final table
    const finalTableBody = document.getElementById('finalTable').querySelector('tbody');
    finalTableBody.innerHTML = '';  // Clear previous table data

    for (const [name, total] of Object.entries(individualTotals)) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td>₹${total.toFixed(2)}</td>
        `;
        finalTableBody.appendChild(row);
    }
}
