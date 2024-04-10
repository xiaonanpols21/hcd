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
    showData(data)
}
getData()

function showData(data) {
    data.shirts.forEach( item => {
        const img = item.img;
        const description = item.description;

        const html = 
        `<li>
            <button>
                <img src="${img}" alt="${description}">
            </button>
        </li>`;

        mainUlEl.insertAdjacentHTML("beforeend", html);
    });
}