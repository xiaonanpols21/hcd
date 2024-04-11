const mainUlEl = document.querySelector("main ul");
const h1 = document.querySelector("h1");

function getChosenCategory() {
    const selectedCategory = localStorage.getItem('selectedCategory');
    console.log("Selected category", selectedCategory);

    if (selectedCategory === "shirts") {
        h1.textContent = "Kies een shirt";
    } else if (selectedCategory === "broeken") {
        h1.textContent = "Kies een broek";
    } else if (selectedCategory === "schoenen") {
        h1.textContent = "Kies schoenen";
    }
    
}
getChosenCategory();

async function getData() {
    const response = await fetch("public/data/data.json");
    const data = await response.json();
    console.log(data);
    return data;
}
const dataPromise = getData(); 

// Show data based on category
// Zie prompts: https://chemical-bunny-323.notion.site/HCD-Chat-gpt-Doc-76ba691317274604955fcc03b75bc8ea#dc07340e5f2f409d8a29c7f49b89e0a7
async function showData(data, selectedCategory) {
    // Choose the appropriate data array based on the selected category
    const categoryData = data[selectedCategory];

    if (!categoryData) {
        console.error(`Data for category '${selectedCategory}' not found.`);
        return;
    }

    categoryData.forEach(item => {
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

// Dynamic data
// Zie prompts: https://chemical-bunny-323.notion.site/HCD-Chat-gpt-Doc-76ba691317274604955fcc03b75bc8ea#9cd8889b11564e5a95e664133e8d35aa
async function chooseItem(currentItemId) {
    const selectedCategory = localStorage.getItem('selectedCategory');
    const data = await dataPromise;
    const categoryData = data[selectedCategory];

    if (!categoryData) {
        console.error(`Data for category '${selectedCategory}' not found.`);
        return;
    }

    const currentItem = categoryData.find(item => item.id === currentItemId);
    console.log(currentItem);
    localStorage.setItem('selectedItem1', JSON.stringify(currentItem));
}

dataPromise
    .then(data => {
        const selectedCategory = localStorage.getItem('selectedCategory');
        showData(data, selectedCategory);
    })
    .catch(error => console.error(error));
