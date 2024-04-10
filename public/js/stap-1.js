const mainUlEl = document.querySelector("main ul");

function getChosenCategory() {
    const selectedCategory = localStorage.getItem('selectedCategory');
    console.log("Selected category", selectedCategory);
}
getChosenCategory();

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
            <a href="stap-2.html" onclick="chooseItem(${item.id})">
                <img src="${img}" alt="${description}">
            </a>
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
