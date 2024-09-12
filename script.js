const sheetID = '1s4pEOts4GVmCVB-OpEKLxJoVXVKVmI1f4AH7ywqeQa4';
const apiKey = 'AIzaSyDeJhACy6IFmBDFmICTYu83h6Vk9MlqPHo';
const dropdown = document.getElementById('institutionDropdown');
const contactInfoDiv = document.getElementById('contactInfo');

// URL to fetch data from the Google Sheet
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/Sheet1?key=${apiKey}`;

let institutionData = {}; // Initialize an empty object to store institution and contact info

fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.values) {
            dropdown.innerHTML = '<option value="" disabled selected>Please select your institution</option>'; // Greyed-out default

            // Populate dropdown and institutionData with institutions and their contact info
            rows.forEach(row => {
                const institutionName = row[0];
                const contactInfo = row[1];
                institutionData[institutionName] = contactInfo;

                const option = document.createElement('option');
                option.value = institutionName;
                option.text = institutionName;
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

// Listen for changes in the dropdown and display contact information
dropdown.addEventListener('change', function() {
    const selectedInstitution = dropdown.value;
    const contactInfo = institutionData[selectedInstitution] || 'Contact info not available';

    // Display the contact info in the div
    contactInfoDiv.innerText = `Please Contact: ${contactInfo} with any questions.`;
});









