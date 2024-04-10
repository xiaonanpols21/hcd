const mainUlEl = document.querySelector("main ul");

function getChosenShirt() {
    const selectedShirt = localStorage.getItem('selectedShirt');
    if (selectedShirt) {
        const selectedShirtArray = JSON.parse(selectedShirt);
        console.log("Selected shirts", selectedShirtArray);
        return selectedShirtArray;
    } else {
        console.log("No selected shirt found");
        return [];
    }
}
getChosenShirt();

async function getData() {
    const response = await fetch("public/data/data.json");
    const data = await response.json();
    console.log(data);
    return data;
}
const dataPromise = getData(); 

async function showData(data, selectedShirtArray) {
    console.log(selectedShirtArray)

    const combineData = [];
     data.broeken.forEach(item => {
        if (item.combine.includes(selectedShirtArray.id)) {
            combineData.push(item);
        }
    });
    console.log(combineData);
    localStorage.setItem('selectedPants', JSON.stringify(combineData));
    
    combineData.forEach(item => {
        const img = item.img;
        const description = item.description;

        const html =
            `<li>
            <a href="stap-3.html" onclick="chooseItem(${item.id})">
                <img src="${img}" alt="${description}">
            </a>
        </li>`;

        mainUlEl.insertAdjacentHTML("beforeend", html);
    });
};

async function initialize() {
    const selectedShirtArray = getChosenShirt(); // Retrieve selected shirts array
    const data = await dataPromise; // Fetch data
    showData(data, selectedShirtArray); // Pass selectedShirtArray to showData
}

initialize();







