// app.js
// Hulpfuncties om met de API te praten.

// Het adres van onze PHP API.
// Pas dit aan als jouw map anders heet.
const API_URL = "http://localhost/eindopdracht/eindopdracht/api.php";

// Fallback data: wordt gebruikt als de database/API niet werkt,
// zodat de pagina toch iets toont.
const FALLBACK_PRODUCTEN = [
    { id: 1, naam: "Kobe 6 Total Orange", categorie_id: 1, prijs: 180 },
    { id: 2, naam: "Kobe 6 Reverse Grinch", categorie_id: 1, prijs: 180 },
    { id: 3, naam: "Kobe 6 Grinch", categorie_id: 1, prijs: 180 },
    { id: 4, naam: "Kobe 6 Dodgers", categorie_id: 1, prijs: 180 },
    { id: 5, naam: "Kobe 4 Girldad", categorie_id: 1, prijs: 180 },
    { id: 6, naam: "Kobe 4 Gold Medal", categorie_id: 1, prijs: 180 },
    { id: 7, naam: "Kobe 4 Black Mamba", categorie_id: 1, prijs: 180 },
    { id: 8, naam: "Kobe 4 Philly", categorie_id: 1, prijs: 180 },

    { id: 9, naam: "Nike JA 3 Jelly Bean", categorie_id: 2, prijs: 130 },
    { id: 10, naam: "Nike JA 3 Max Volume", categorie_id: 2, prijs: 130 },
    { id: 11, naam: "Nike JA 3 Zombie", categorie_id: 2, prijs: 130 },

    { id: 12, naam: "KD 18 Aunt Pearl", categorie_id: 3, prijs: 160 },
    { id: 13, naam: "KD 18 Slim Reaper", categorie_id: 3, prijs: 160 },
    { id: 14, naam: "KD 18 Pink Photo Blue", categorie_id: 3, prijs: 160 },
    { id: 15, naam: "KD 18 Washed Purple", categorie_id: 3, prijs: 160 },

    { id: 16, naam: "Lebron XXII Limelight", categorie_id: 4, prijs: 190 },
    { id: 17, naam: "Lebron XXII Grand Opening", categorie_id: 4, prijs: 190 },

    { id: 18, naam: "Sabrina 3 Crimson Tint", categorie_id: 5, prijs: 130 },
    { id: 19, naam: "Sabrina 3 Gamer", categorie_id: 5, prijs: 130 },
    { id: 20, naam: "Sabrina EP Blueprint", categorie_id: 5, prijs: 130 },

    { id: 21, naam: "Rigorer BP1 Family Matters", categorie_id: 6, prijs: 140 },
    { id: 22, naam: "Rigorer AR1 Juicy Peach", categorie_id: 6, prijs: 140 },
    { id: 23, naam: "Rigorer AR2 15 Flavours", categorie_id: 6, prijs: 140 },
    { id: 24, naam: "Rigorer AR2 Snowman", categorie_id: 6, prijs: 140 },

    { id: 25, naam: "Nike GT Cut 2 Hyper Pink", categorie_id: 7, prijs: 180 },
    { id: 26, naam: "Nike GT Cut 2 Arike Ogunbowale", categorie_id: 7, prijs: 180 },
    { id: 27, naam: "Nike GT Cut 2 Black Phantom", categorie_id: 7, prijs: 180 }
];

// runQuery: stuurt een SQL-string naar de API en geeft het resultaat terug.
// Gebruik:  const rijen = await runQuery("SELECT * FROM product");
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
