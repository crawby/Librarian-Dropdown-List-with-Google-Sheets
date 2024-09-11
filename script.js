const sheetID = '1s4pEOts4GVmCVB-OpEKLxJoVXVKVmI1f4AH7ywqeQa4'; // your updated sheet ID
const apiKey = 'AIzaSyDeJhACy6IFmBDFmICTYu83h6Vk9MlqPHo'; // your API key
const dropdown = document.getElementById('institutionDropdown');

// URL to fetch data from the Google Sheet
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/Sheet1?key=${apiKey}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log the response for debugging

        if (data.values) {
            const rows = data.values;
            dropdown.innerHTML = ''; // Clear the loading text

            rows.forEach(row => {
                const option = document.createElement('option');
                option.value = row[0];
                option.text = row[0];
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
