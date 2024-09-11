<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Find My Library Contact</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Find My Library Contact</h1>
        <p class="small-text">Please Select Your Institution</p>
        <select id="institutionDropdown">
            <option value="">Institution List</option>
        </select>

        <!-- Section to display contact information -->
        <div id="contactInfo" style="margin-top: 20px; font-size: 16px; color: #333;">
            Select an institution to view contact information.
        </div>
    </div>

    <script>
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
                console.log(data); // Log the response for debugging
                if (data.values) {
                    const rows = data.values;
                    dropdown.innerHTML = '<option value="">Institution List</option>'; // Clear the loading text

                    // Populate dropdown and institutionData with institutions and their contact info
                    rows.forEach(row => {
                        const institutionName = row[0]; // Institution name
                        const contactInfo = row[1]; // Contact information
                        institutionData[institutionName] = contactInfo; // Store in object

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
            console.log(selectedInstitution); // Log the selected institution for debugging
            const contactInfo = institutionData[selectedInstitution] || 'Contact info not available';

            // Display the contact info in the div
            contactInfoDiv.innerText = contactInfo;
        });
    </script>
</body>
</html>





