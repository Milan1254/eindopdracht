// app.js
// Hulpfuncties om met de API te praten.

// Het adres van onze PHP API.
// Pas dit aan als jouw map anders heet.
const API_URL = "api.php";

// Fallback data: wordt gebruikt als de database/API niet werkt,
// zodat de pagina toch iets toont.
const FALLBACK_PRODUCTEN = [
    { productid: 1, naam: "Cola",            prijs: 1.50, categorie_id: 1, afbeelding: "afbeeldingen/1.jpg" },
    { productid: 2, naam: "Water",           prijs: 0.80, categorie_id: 1, afbeelding: "afbeeldingen/2.jpg" },
    { productid: 3, naam: "Sinaasappelsap",  prijs: 2.20, categorie_id: 1, afbeelding: "afbeeldingen/3.jpg" },
    { productid: 4, naam: "Chips",           prijs: 1.95, categorie_id: 2, afbeelding: "afbeeldingen/4.jpg" },
    { productid: 5, naam: "Chocoladereep",   prijs: 1.10, categorie_id: 2, afbeelding: "afbeeldingen/5.jpg" },
    { productid: 6, naam: "Appel",           prijs: 0.45, categorie_id: 3, afbeelding: "afbeeldingen/6.jpg" },
    { productid: 7, naam: "Banaan",          prijs: 0.35, categorie_id: 3, afbeelding: "afbeeldingen/7.jpg" }
];

// runQuery: stuurt een SQL-string naar de API en geeft het resultaat terug.
// Gebruik:  const rijen = await runQuery("SELECT productid, naam, prijs, afbeelding FROM producten");
// waarom async/await? Omdat fetch asynchroon is: we moeten wachten op het antwoord van de server.
async function runQuery(sql) {
    try {
        // De SQL als parameter meesturen in de URL
        const response = await fetch(API_URL + "?sql=" + encodeURIComponent(sql));
        const result = await response.json();

        if (result.success) {
            return result.data;          // Array met rijen
        } else {
            console.error("SQL fout:", result.error);
            return FALLBACK_PRODUCTEN;   // Bij een fout: fallback data
        }
    } catch (fout) {
        // De API was niet bereikbaar (server uit, verkeerde URL, ...)
        console.error("API niet bereikbaar:", fout);
        return FALLBACK_PRODUCTEN;
    }
}


