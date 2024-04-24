# HCD
## Inhoudsopgave
1. [ Versies ](#vers)
2. [ Testen ](#test)
3. [ Design principles ](#princ)

## Opdracht
Petra Huidink-de Jong is de doelgroep. Zij is blind en wilt graag kleding stukken met elkaar kunnen matchen. Maar dat gaat moeilijk als de doelgroep blind is. Daarvoor is er een oplossing voor bedacht.

## Concept
### Design
![Design 1](https://github.com/xiaonanpols21/hcd/blob/main/public/img/readme/design-1.png)
Het idee is dat Petra kan kiezen uit deze categorieën om mee te beginnen. Dan Gaat zij naar de single categorie page en kan zij een item kiezen. Vanuit daar gaat het verder om het volgende te kiezen. 

<a name="vers"></a>

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

### Versie 6
Na de feedback van testen voor de 2e keer, is er accesoired toegevoegd en wordt de tekst in 1 p getoond waardoor het in 1 x verteld wordt door de Voice over. 

![Versie 6](https://github.com/xiaonanpols21/hcd/blob/main/public/img/readme/v-6.png)

### Versie 7
In de app is er ook een aparte categorie toegevoegd. Jurken. Je gaat geen jurk matchen met een shirt. Nu heb ik gedaan: als je jurken kiest als eerste categorie en je gaat naar de volgende categorie bijvoorbeeld shirts, en daar is geen match ga dan naar de volgende categorie totdat je een match vindt. 

Dan heb ik ook gedaan met de shirts bijvoorbeeld, als de eerste keuze shirt is, sla dan jurken over en ga naar de volgende categorie. 

```js
const matches = nextCategoryItems.filter(item => {
    return item.combine.includes(selectedItem1.id) 
})

if (!matches.length) {
    nextIndex = (categories.indexOf(selectedCategory) + 2) % categories.length;
    nextCategory = categories[nextIndex];
    nextCategoryItems = data[nextCategory];
        
    const matches = nextCategoryItems.filter(item => {
        return item.combine.includes(selectedItem1.id) 
    })

    if (!matches.length) {
        console.log('gets here');
        nextIndex = (categories.indexOf(selectedCategory) + 3) % categories.length;
        nextCategory = categories[nextIndex];
        nextCategoryItems = data[nextCategory];
            
        const matches = nextCategoryItems.filter(item => {
            return item.combine.includes(selectedItem1.id) 
        })

        if (!matches.length) {
            console.log('gets here');
            nextIndex = (categories.indexOf(selectedCategory) + 4) % categories.length;
            nextCategory = categories[nextIndex];
            nextCategoryItems = data[nextCategory];
        }
        }
    }
```

<a name="test"></a>

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

### Prototype 3
Met het laatste keer testen, vertelde ik de feedback van vorige keer en dat ik het heb toegepast. Ik gaf Petra 2 opdrachten. 

- Kies een shirt en volg de stappen waar accesoires bij is toegevoegd.
- Kies een jurk en volg de stappen. 

Het testen ging goed. Het ging wel een beetje mis met de data op het laatste bij mijn resultaten. Mijn resultaten komt pas als er iets gemet. Dus hij moet wachten. Soms gaat het goed, soms niet. Dus als ik even refresh dan gaat het goed. 

De feedback van Petra is: bij Mijn resultaten, voeg niet nog een keer die uitgebreide beschrijving toe. Bij het kiezen van de artikelen wel maar daar hoeft het niet. Dat is iets wat ik zou gaan toevoegen als ik meer tijd had. 

Wat ik verder nog had ontdekt is wanneer Stephan ging testen, hoorde ik dat hij wanneer hij resultaten had bij shirts, dat er eerst wordt gezegd: Er zijn 3 items bijvoorbeeld. Dus Petra kan dan weten hoeveel artikelen er zijn. Dat is nog iets goeds om toe te voegen. Want Petra swipet gewoon door de artikelen heen totdat zij terug knop hoort van iPhone. Dus dat is nog een goede toevoeging voor in de toekomst.

<a name="princ"></a>

## Design principles
### Study situation
Om te begrijpen wat de situatie is van de gebruiker, hebben we bij de eerste meeting met Petra een uitgebreid interview gehouden over wat zij vindt, wat zij wil en meer. 

[Vragen lijst](https://docs.google.com/document/d/19J_38NkLhnx6Z5d7lens3TmKvPoLd499wUBorTF2mHA/edit?pli=1)

Het interview is met toestemming opgenomen. 

Tijdens het testen zag ik hoe zij door de app ging waardoor ik dat mee kon nemen voor verbeteringen.

### Ignore conventions
Petra is blind waardoor ik de volgende conventions kan negeren:
- Kleur contrast
- Grote text
- Afbeeldingen scherp

In eerste design heb ik de afbeelding een object-fit cover gegeven omdat het voor Petra toch niet uit maakt. Maar later dacht ik voor mezelf vind ik het wel handig dus ik had cover toch verandert naar contain. 

Als een normale user is het gebruikelijk om een design te hebben met titel, foto en dan een knop met dat je die wilt kiezen. Dat is wat ik in mijn eerste versie had. Ik dacht dit is goed voor een blind persoon. Tot dat ik het zelf ging testen. Toen merkte ik dat dit slecht is gemaakt en dat ik het anders moest doen.

Dus in mijn volgende versie had ik alleen de img in een button gestopt waardoor, als je op de knop komt, de alt tag van de img wordt voorgelezen en gelijk kan horen wat voor product het is en dan kan je gelijk dubbel tikken om hem te selecteren. Dat scheelt behoorlijk wat stappen in vergelijking met mijn eerste ontwerp. Daar moet je nog eens swipen om hem te selecteren. 

### Prioritise identitiy
Vanuit het interview heb ik nagedacht over: Wat wilt zij? Ze vertelde dat zij niet houdt van niet duidelijke categorieën. Zoals: casual, feestelijk etc. Want iets wat ik casual vind kan zij dan weer niet casual vinden. Met die gedachten heb ik de categorieën simpel gehouden met: Broeken, Shirts, Schoenen etc. Met de tweede test zei ze dat ze graag accesoires er bij zou willen hebben. Dus die had ik ook toegevoegd. 

### Nonsense
Ik dacht eerst dat vertellen hoeveel graden het was een nonsense was. Maar bij het laatste feedback gesprek kwam ik er achter dat dat toch niet zo is. Ik heb nagedacht over add nonsense. En dat is om geluid toe te voegen in de app. Als de voice over de alt text uitsptreekt dan zou er een geluidje kunnen komen. Ik zou dit graag willen toevoegen maar ik had daar niet genoeg tijd voor gehad. Ik wilde eerst dat alles werkte en dat nonsense toevoegen. 
