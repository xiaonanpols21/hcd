const mainUlEl = document.querySelector("main ul");

function getLocalStorage() {
    const selectedCategory = localStorage.getItem('selectedCategory');
    console.log("Selected category", selectedCategory);
}
getLocalStorage();

async function getData() {
    const response = await fetch("public/data/data.json");
    const data = await response.json();
    console.log(data);
    return data;
}
const dataPromise = getData(); 

async function showData(data) {
    data.shirts.forEach(item => {
        const img = item.img;
        const description = item.description;

        const html =
            `<li>
            <button onclick="chooseItem(${item.id})">
                <img src="${img}" alt="${description}">
            </button>
        </li>`;

        mainUlEl.insertAdjacentHTML("beforeend", html);
    });
}

async function chooseItem(currentItemId) {
    const data = await dataPromise;
    const currentItem = data.shirts.find(item => item.id === currentItemId);
    console.log(currentItem);
    localStorage.setItem('selectedShirt', JSON.stringify(currentItem));
}

// Call showData after data is fetched
dataPromise.then(showData).catch(error => console.error(error));
