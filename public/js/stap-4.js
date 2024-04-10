const mainUlEl = document.querySelector("main ul");

function getChosenItems() {
    const selectedItemsArray = [];

    // Iterate through local storage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        // Check if key starts with 'selected' prefix
        if (key.startsWith('selected')) {
            const selectedItem = localStorage.getItem(key);
            try {
                // Try to parse as JSON
                const parsedItem = JSON.parse(selectedItem);
                selectedItemsArray.push(parsedItem);
            } catch (error) {
                // If parsing fails, add as string
                selectedItemsArray.push(selectedItem);
            }
        }
    }

    console.log(selectedItemsArray);
    return selectedItemsArray;
}

async function showData(selectedItemsArray) {
    selectedItemsArray.slice(1).forEach(item => {
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
}

// Call getChosenItems to retrieve selected items
const selectedItemsArray = getChosenItems();

// Call showData with the retrieved selected items
showData(selectedItemsArray);
