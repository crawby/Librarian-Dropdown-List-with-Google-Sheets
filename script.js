const sheetID = '1s4pEOts4GVmCVB-OpEKLxJoVXVKVmI1f4AH7ywqeQa4';
const apiKey = 'AIzaSyDeJhACy6IFmBDFmICTYu83h6Vk9MlqPHo';
const dropdown = document.getElementById('institutionDropdown');
const contactInfoDiv = document.getElementById('contactInfo');

// URL to fetch data from the Google Sheet
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/Sheet1?key=${apiKey}`;

// Fetch data and populate the dropdown
fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log the response for debugging
        if (data.values) {
            const rows = data.values;
            dropdown.innerHTML = '<option value="">Institution List</option>'; // Clear the loading text

            rows.forEach(row => {
                const option = document.createElement('option');
                option.value = row[0]; // Set the institution name as the value
                option.text = row[0];  // Display the institution name
                dropdown.appendChild(option);
            });
        } else {
            dropdown.innerHTML = '<option>No data found</option>';
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        dropdown.innerHTML = '<option>Error loading data</option>';
    });

// Example of institution data with contact information
const institutionData = {
    'Institution 1': 'Contact: librarian1@institution1.edu',
    'Institution 2': 'Contact: librarian2@institution2.edu',
    // Add more institutions and their contact info here
};

// Listen for changes in the dropdown and display contact information
dropdown.addEventListener('change', function() {
    const selectedInstitution = dropdown.value;
    console.log(selectedInstitution); // Log the selected institution for debugging
    const contactInfo = institutionData[selectedInstitution] || 'Contact info not available';

    // Display the contact info in the div
    contactInfoDiv.innerText = contactInfo;
});


