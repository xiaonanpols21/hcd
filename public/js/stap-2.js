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

async function showData(data) {
    console.log(selectedShirtArray)
    
    data.broeken.forEach(item => {
        const img = item.img;
        const description = item.description;

        const html =
            `<li>
            <a href="stap-2.html" onclick="chooseItem(${item.id})">
                <img src="${img}" alt="${description}">
            </a>
        </li>`;

        mainUlEl.insertAdjacentHTML("beforeend", html);
    });
}
showData()








