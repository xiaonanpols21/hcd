const mainUlEl = document.querySelector("main ul");

function getChosenPants() {
    const selectedPants = localStorage.getItem('selectedBroek');
    if (selectedPants) {
        const selectedPantsArray = JSON.parse(selectedPants);
        console.log("Selected pants", selectedPantsArray);
        return selectedPantsArray;
    } else {
        console.log("No selected shirt found");
        return [];
    }
}

async function getData() {
    const response = await fetch("public/data/data.json");
    const data = await response.json();
    return data;
}
const dataPromise = getData(); 

async function showData(data, selectedPantsArray) {
    const combineData = [];

     data.schoenen.forEach(item => {
        if (item.combine.includes(selectedPantsArray.id)) {
            combineData.push(item);
        }
    });
    console.log(combineData);
    localStorage.setItem('CombineSchoos', JSON.stringify(combineData));
    
    combineData.forEach(item => {
        const img = item.img;
        const description = item.description;

        const html =
            `<li>
            <a href="stap-4.html" onclick="chooseItem(${item.id})">
                <img src="${img}" alt="${description}">
            </a>
        </li>`;

        mainUlEl.insertAdjacentHTML("beforeend", html);
    });
};

async function initialize() {
    const selectedPantsArray = getChosenPants(); // Retrieve selected shirts array
    const data = await dataPromise; // Fetch data
    showData(data, selectedPantsArray); // Pass selectedShirtArray to showData
}
initialize();

async function chooseItem(currentItemId) {
    const data = await dataPromise;
    const currentItem = data.schoenen.find(item => item.id === currentItemId);
    console.log(currentItem);
    localStorage.setItem('selectedSchoenen', JSON.stringify(currentItem));
}