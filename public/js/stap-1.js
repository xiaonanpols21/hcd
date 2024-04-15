const mainUlEl = document.querySelector("main ul");
const h1 = document.querySelector("h1");

function getChosenCategory() {
    const selectedCategory = localStorage.getItem('selectedCategory');

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
    return data;
}
const dataPromise = getData(); 

// Show data based on category
// Zie prompts: https://chemical-bunny-323.notion.site/HCD-Chat-gpt-Doc-76ba691317274604955fcc03b75bc8ea#dc07340e5f2f409d8a29c7f49b89e0a7
async function showData(data, selectedCategory) {
    const categoryData = data[selectedCategory];
    const currentTemp = localStorage.getItem('currentTemp');

    // Sort data
    // Zie prompts: https://chemical-bunny-323.notion.site/HCD-Chat-gpt-Doc-76ba691317274604955fcc03b75bc8ea#93c157f5a07b4fdcbd7058cba94dbfcd
    if (currentTemp <= 5) {
        console.log("Het is winter tijd");

        categoryData.sort((a, b) => {
            if (a.season === 5) return -1; // Place items with season 5 first
            if (b.season === 5) return 1; // Place items with season other than 5 later
            return 0; // Keep the order unchanged for other seasons
        });
    } else if (currentTemp <= 10) {
        console.log("Het is autumn tijd");
        categoryData.sort((a, b) => {
            if (a.season === 10) return -1; // Place items with season 10 first
            if (b.season === 10) return 1; // Place items with season other than 10 later
            return 0; // Keep the order unchanged for other seasons
        });
    } else if (currentTemp <= 15) {
        console.log("Het is spring tijd");
        categoryData.sort((a, b) => {
            if (a.season === 15) return -1; // Place items with season 15 first
            if (b.season === 15) return 1; // Place items with season other than 15 later
            return 0; // Keep the order unchanged for other seasons
        });
    } else {
        console.log("Het is summer tijd");
        categoryData.sort((a, b) => {
            if (a.season === 20) return -1; // Place items with season 20 first
            if (b.season === 20) return 1; // Place items with season other than 20 later
            return 0; // Keep the order unchanged for other seasons
        });
    }

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
    const currentItem = categoryData.find(item => item.id === currentItemId);

    localStorage.setItem('selectedItem1', JSON.stringify(currentItem));
}

dataPromise
    .then(data => {
        const selectedCategory = localStorage.getItem('selectedCategory');
        showData(data, selectedCategory);
    })
    .catch(error => console.error(error));
