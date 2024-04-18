# HCD
## Opdracht
Petra Huidink-de Jong is de doelgroep. Zij is blind en wilt graag kleding stukken met elkaar kunnen matchen. Maar dat gaat moeilijk als de doelgroep blind is. Daarvoor is er een oplossing voor bedacht.

## Concept
### Design
![Design 1](https://github.com/xiaonanpols21/hcd/blob/main/public/img/readme/design-1.png)
Het idee is dat Petra kan kiezen uit deze categorieën om mee te beginnen. Dan Gaat zij naar de single categorie page en kan zij een item kiezen. Vanuit daar gaat het verder om het volgende te kiezen. 

## Versies
### Versie 1
![Versie 1](https://github.com/xiaonanpols21/hcd/blob/main-2/public/img/readme/v-1.jpg)
Hier heb ik de applicatie soort van werkend. Als je klikt op een categorie, ga je naar die kleding en dan als je op een kleding item klikt, komen de gecombineerde broeken. Ook kun je terug naar vorige. Met het testen van de screen reader kwamen er dingen naar voren om te verbeteren:

- Als je hebt gekozen kom je op Webmateriaal. Is dat ook zo op mobiel? Moet ik dit veranderen?
- Er staan nog engelse worden in de alt van de img
- De gekozen item niet nog een keer laten zien
- Terug knop, is dat handig?

### Versie 2
![Versie 2](https://github.com/xiaonanpols21/hcd/blob/main/public/img/readme/v-2.png)

Hier heb ik dat als je een keuzen hebt gemaakt, dat de gekozen item weg gaat. 

![Versie 2 1](https://github.com/xiaonanpols21/hcd/blob/main/public/img/readme/v-2-1.png)

Ik heb dat de gekozen items als laatste worden gezien. De keuzes die eerder zijn gemaakt worden in de local storage opgeslagen en hier worden de keuzes getoond vanuit de local storage. 

### Versie 3
Ik ging testen op mobiel en merkte dat het best wel ruk is omdat je moet verder swipen om hem te kiezen. Dus nu heb ik er buttons van gemaakt en de img tag in de button en met meerdere pagina's toegevoegd. Per pagina een nieuw item. De data wordt opgeslagen in de local storage. En wordt uit de local storage gehaald bij de result pagina. 

![Versie 3](https://github.com/xiaonanpols21/hcd/blob/main/public/img/readme/v-3.png)

### Versie 4
Na de feedback van Petra bij prototype 1, ben ik de applicatie meer dynamic gaan maken wat nu werkt. Nu is het zo: kies category, laat die zien. Kies een item en dan, toon volgende category uit de lijst en laat dan die items zien die al gematcht zijn met elkaar.

Volgende stap zou zijn: uitgebreiderde data, meer categories toevoegen en dan kleding sorteren based on weather.

### Versie 5
Om kleding te sorteren based on weather, gebruik ik API: Open-Meteo. De data wordt gefetcht en dan wordt de temperatuur in de local storage gezet.

```js
async function getWeather() {
    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.374&longitude=4.8897&current=temperature_2m");
    const data = await response.json();
    console.log(data);
    displayWeather(data);
}
getWeather()

// Bron: https://www.w3schools.com/jsref/jsref_round.asp
async function displayWeather(data) {
    const temp = data.current.temperature_2m;
    const afronden = Math.round(temp);
    console.log(afronden)
    localStorage.setItem('currentTemp', afronden);

    h2.textContent = `Het is vandaag ${afronden} graden`;
}
```

![Versie 5](https://github.com/xiaonanpols21/hcd/blob/main-5/public/img/readme/v-5.png)

Dan wordt de data gesorteerd. Het nummer in item.summer, is dat dicht bij het nummer van het graden van nu, laat die dan zien. 

```js
// Sort data
function orderByClosest(arr, num) {
    // temporary array holds objects with position and sort-value
    const mapped = arr.map(function (el, i) {
        return { index: i, value: Math.abs(el.season - num) };
    });

    // sorting the mapped array containing the reduced values
    mapped.sort(function (a, b) {
        return a.value - b.value;
    });

    // return the resulting order
    return mapped.map(function (el) {
        return arr[el.index];
    });
}
```

## Testen
### Interview
Met een team van circa 10 personen is er een vragenlijst opgesteld om meer te weten te komen over Petra met wat haar voorkeuren zijn en wat zij handig vindt. 

[Vragen lijst](https://docs.google.com/document/d/19J_38NkLhnx6Z5d7lens3TmKvPoLd499wUBorTF2mHA/edit?pli=1)

Het interview is met toestemming opgenomen. 

### Prototype 1
Ik had getest. Ze kon makkelijk door de app. Ze had niet opmerkingen wat beter kon. Wat ik zelf zie is: ze vroeg: 'Moet ik zelf weten wat matcht? Ik zo nee dat doet hij automatisch. Dus ik moet met tekst beter vertellen dat de items automatisch wordt gematcht met elkaar. 

![Versie 3](https://github.com/xiaonanpols21/hcd/blob/main/public/img/readme/v-3.png)

### Prototype 2
Ik begon met het vertellen over vorige keer, wat ze had getest en welke feedback ik heb meegenomen voor deze test. Toen ging ik testen. Ze hoorde de verbeteringen en ging goed door de app heen. De feedback voor volgende keer is:

- Meer categories toevoegen: accessoires en panty's
- Resultaten in 1 x laten uit spreken.

![Prototype 2](https://github.com/xiaonanpols21/hcd/blob/main/public/img/readme/prototype-2.png)