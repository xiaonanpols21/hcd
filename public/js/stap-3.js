

const mainUlEl = document.querySelector("main ul");

function getChosenPants() {
    const selectedPants = localStorage.getItem('selectedPants');
    if (selectedPants) {
        const selectedPantsArray = JSON.parse(selectedPants);
        console.log("Selected pants", selectedPantsArray);
        return selectedPantsArray;
    } else {
        console.log("No selected shirt found");
        return [];
    }
}
getChosenPants();

async function getData() {
    const response = await fetch("public/data/data.json");
    const data = await response.json();
    console.log(data);
    return data;
}
const dataPromise = getData(); 
