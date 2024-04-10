# HCD
## Opdracht
Petra Huidink-de Jong is de doelgroep. Zij is blind en wilt graag kleding stukken met elkaar kunnen matchen. Maar dat gaat moeilijk als de doelgroep blind is. Daarvoor is er een oplossing voor bedacht.

Met een team van circa 10 personen is er een vragenlijst opgesteld om meer te weten te komen over Petra met wat haar voorkeuren zijn en wat zij handig vindt. 

[Vragen lijst](https://docs.google.com/document/d/19J_38NkLhnx6Z5d7lens3TmKvPoLd499wUBorTF2mHA/edit?pli=1)

Het interview is met toestemming opgenomen. 

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