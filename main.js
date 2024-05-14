document.addEventListener("DOMContentLoaded", () => {
    const dataContainer = document.getElementById('data-container');

    // Fetch data from SWAPI
    async function fetchData(endpoint) {
        try {
            const response = await fetch(`https://swapi.dev/api/${endpoint}/`);
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Display data in Bootstrap cards
    function displayData(data, type) {
        dataContainer.innerHTML = '';
        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('col-md-4');
            card.innerHTML = `
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${generateCardContent(item, type)}</p>
                    </div>
                </div>
            `;
            dataContainer.appendChild(card);
        });
    }

    // Generate content based on the type
    function generateCardContent(item, type) {
        switch(type) {
            case 'people':
                return `Height: ${item.height}<br>Mass: ${item.mass}<br>Gender: ${item.gender}`;
            case 'planets':
                return `Climate: ${item.climate}<br>Population: ${item.population}<br>Terrain: ${item.terrain}`;
            case 'species':
                return `Classification: ${item.classification}<br>Designation: ${item.designation}<br>Language: ${item.language}`;
            default:
                return '';
        }
    }

    // Event listeners for buttons
    document.getElementById('fetch-people').addEventListener('click', async () => {
        const data = await fetchData('people');
        displayData(data, 'people');
    });

    document.getElementById('fetch-planets').addEventListener('click', async () => {
        const data = await fetchData('planets');
        displayData(data, 'planets');
    });

    document.getElementById('fetch-species').addEventListener('click', async () => {
        const data = await fetchData('species');
        displayData(data, 'species');
    });
    document.getElementById('sort-options').addEventListener('change', (event) => {
        const criteria = event.target.value;
        const sortedData = [...data].sort((a, b) => (a[criteria] > b[criteria]) ? 1 : -1);
        displayData(sortedData, currentType);
    });
    
});
