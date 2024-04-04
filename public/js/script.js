const categoryShirts = document.querySelector("#category-shirts");

// Fetch data
async function getData() {
    const response = await fetch("../public/data/data.json"); 
    const data = await response.json();

    showData(data);

}
getData();

function showData(data) {
    data.shirts.forEach(item => {
        const img = item.img;
        const description = item.description;

        const html = 
        `<article>
            <img src="${img}" alt="${description}">
            <button onclick="addCombine()">Ik wil dit aan</button>
        </article>`;

        categoryShirts.insertAdjacentHTML("beforeend", html);
    });
}

function addCombine() {
    const combineSection = `
    <section class="combine">
        <h4>Bijhorende broeken</h4>
        <article>
            <img src="public/img/shirt.jpg" alt="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea">
            <button>Ik wil dit aan</button>
        </article>
    </section>`;

    categoryShirts.insertAdjacentHTML("beforeend", combineSection);
}