/* =========================
   ELEMENTEN
   Hier worden referenties opgeslagen naar HTML-elementen zodat je er later mee kunt werken.
========================= */

// Container voor productkaarten op de productenpagina
const productsContainer = document.getElementById("products");
// Zoekveld voor filteren op naam
const searchInput = document.getElementById("searchInput");
// Dropdown voor sorteren (bijv. laag-hoog of hoog-laag)
const sortSelect = document.getElementById("sortSelect");

// Container voor winkelwagenitems
const cartItems = document.getElementById("cartItems");
// Element voor tonen van totaalbedrag
const totalPrice = document.getElementById("totalPrice");

// Contactformulier element
const contactForm = document.getElementById("contactForm");
// Afrekenformulier element
const checkoutForm = document.getElementById("checkoutForm");

// Container voor nieuwe collectie producten
const newCollectionContainer = document.getElementById("newCollectionContainer");

/* =========================
   STATE
   Variabelen die de huidige status van de app bijhouden.
========================= */

// Array waarin alle geladen producten worden opgeslagen
let products = [];
// Huidige geselecteerde categorie voor filtering
let currentCategory = "all";
// Huidige zoekterm
let currentSearch = "";
// Huidige sorteervolgorde
let currentSort = "default";

/* =========================
   CATEGORIEËN
   Een object dat categorie-IDs koppelt aan namen.
========================= */

const CATEGORIES = {
    1: "Kobe",
    2: "JA",
    3: "KD",
    4: "Lebron",
    5: "Sabrina",
    6: "Rigorer",
    7: "GT-cut"
};

// Functie om de categorie-naam op te halen op basis van ID
function getCategory(id) {
    return CATEGORIES[id] || "all"; // Als ID niet gevonden, standaard "all"
}

/* =========================
   CART (WINKELMAND)
   Functies voor het opslaan, ophalen en bijwerken van de winkelwagen.
========================= */

// Haalt de winkelwagen op uit localStorage of geeft een lege array terug als die er niet is
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Slaat de winkelwagen op in localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Voegt een product toe aan de winkelwagen
function addToCart(product) {
    const cart = getCart(); // Huidige winkelwagen ophalen

    // Kijk of het product al in de winkelwagen zit
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        // Als het product al bestaat, verhoog de hoeveelheid
        existing.quantity++;
    } else {
        // Anders voeg het product toe met hoeveelheid 1
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart); // Bewaar de gewijzigde winkelwagen
    alert("Toegevoegd aan winkelmand!"); // Gebruiker informeren
    renderCart(); // Winkelwagen opnieuw tonen
}

/* =========================
   PRODUCTEN LADEN (HOMEPAGE)
   Laadt producten uit database en zet ze om naar interne structuur.
========================= */

async function loadProducts() {
    try {
        // Query om alle producten op te halen uit database
        const data = await runQuery("SELECT * FROM producten");

        // Data omzetten naar gewenste structuur en opslaan in 'products' array
        products = data.map(product => ({
            id: product.productid,
            name: product.naam,
            price: Number(product.prijs),
            image: product.afbeelding,
            category: getCategory(product.categorie_id)
        }));

        showProducts(); // Producten tonen op pagina
    } catch (err) {
        console.error("Fout bij laden producten:", err); // Foutafhandeling
    }
}

/* =========================
   PRODUCT CARD
   Maakt een HTML-element (kaart) voor een product.
========================= */

function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "card"; // CSS-klasse voor styling

    // HTML structuur van de productkaart
    card.innerHTML = `
        <a href="product.html?id=${product.id}">
            <img src="${product.image}" alt="${product.name}">
        </a>
        <div class="card-content">
            <h3>${product.name}</h3>
            <p class="price">
            €${berekenPrijsInclBTW(product.price)}
            </p>
            <button class="btn">In winkelmand</button>
        </div>
    ` ;

    // Event listener voor knop 'In winkelmand' toevoegen
    card.querySelector(".btn").addEventListener("click", () => {
        addToCart(product);
    });

    return card; // De gemaakte kaart teruggeven
}

/* =========================
   TONEN + FILTERS
   Laat producten zien op pagina, rekening houdend met filters en sortering.
========================= */

function showProducts() {
    if (!productsContainer) return; // Als container niet bestaat, stop

    let filtered = [...products]; // Kopie maken van alle producten

    // Filter op categorie
    filtered = filtered.filter(p =>
        currentCategory === "all" || p.category === currentCategory
    );

    // Filter op zoekterm
    filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(currentSearch)
    );

    // Sorteren op prijs laag naar hoog
    if (currentSort === "low-high") {
        filtered.sort((a, b) => a.price - b.price);
    }

    // Sorteren op prijs hoog naar laag
    if (currentSort === "high-low") {
        filtered.sort((a, b) => b.price - a.price);
    }

    // Leeg de container voordat nieuwe kaarten worden toegevoegd
    productsContainer.innerHTML = "";

    // Voor elk product een kaart maken en aan container toevoegen
    filtered.forEach(product => {
        productsContainer.appendChild(createProductCard(product));
    });
}

/* =========================
   FILTER EVENTS
   Event handlers voor filterknoppen, zoekveld en sorteerkeuzelijst.
========================= */

// Event listener voor categorie-knoppen
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        currentCategory = btn.dataset.category; // Update huidige categorie
        showProducts(); // Producten herladen met nieuwe filter
    });
});

// Event listener voor zoekveld
if (searchInput) {
    searchInput.addEventListener("input", () => {
        currentSearch = searchInput.value.toLowerCase(); // Zoekterm bijwerken
        showProducts(); // Producten filteren en tonen
    });
}

// Event listener voor sorteerkeuzelijst
if (sortSelect) {
    sortSelect.addEventListener("change", () => {
        currentSort = sortSelect.value; // Sorteervolgorde bijwerken
        showProducts(); // Herladen met nieuwe sortering
    });
}

/* =========================
   WINKELMAND
   Functie om winkelwagen weer te geven en bij te werken.
========================= */

// Bereken prijs inclusief 21% BTW
function berekenPrijsInclBTW(prijsExcl) {
    return Math.round(prijsExcl * 1.21 * 100) / 100;
}

// Render de winkelwagen in de pagina
function renderCart() {
    if (!cartItems) return; // Als winkelwagen element niet bestaat, stop

    const cart = getCart(); // Winkelwagen ophalen
    cartItems.innerHTML = ""; // Container leegmaken

    let total = 0; // Totaalbedrag initialiseren

    // Loop door alle items in de winkelwagen
    cart.forEach((product, index) => {
        const prijsIncl = berekenPrijsInclBTW(product.price);
        total += parseFloat(prijsIncl) * product.quantity; // Bedrag optellen

        const card = document.createElement("div");
        card.className = "card";

        // HTML voor winkelwagenitem
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="card-content">
                <h3>${product.name}</h3>
                <p>€${prijsIncl} x ${product.quantity}</p>
                <button class="minus">-</button>
                <button class="plus">+</button>
                <button class="remove">Verwijder</button>
            </div>
        `;

        // Event voor '+' knop
        card.querySelector(".plus").addEventListener("click", () => {
            cart[index].quantity++;
            saveCart(cart);
            renderCart(); // Winkelwagen opnieuw tonen
        });

        // Event voor '-' knop
        card.querySelector(".minus").addEventListener("click", () => {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1); // splice() verwijdert, voegt toe of vervangt elementen in een array.
            }                         // Haal het product uit de cart als aantal 0 wordt
            saveCart(cart);
            renderCart();
        });

        // Event voor 'Verwijder' knop
        card.querySelector(".remove").addEventListener("click", () => {
            cart.splice(index, 1); // Verwijder item uit array
            saveCart(cart);
            renderCart();
        });

        // Voeg de kaart toe aan de winkelwagencontainer
        cartItems.appendChild(card);
    });

    // Totaalbedrag updaten
    if (totalPrice) {
        totalPrice.textContent = "Totaal: €" + total.toFixed(2);
    }
}

/* =========================
   PRODUCT DETAIL PAGINA
   Laadt en toont details van een specifiek product.
========================= */

async function toonProductDetail() {
    // Haal product-ID uit URL
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) return; // Stop als geen ID

    // Functie om query uit te voeren (API call)
    async function runQuery(sql) {
        try {
            const response = await fetch("http://localhost/eindopdracht/eindopdracht/api.php?sql=" + encodeURIComponent(sql));
            const result = await response.json();
            if (result.success) {
                return result.data; // Retourneer data bij succes
            } else {
                console.error("SQL fout:", result.error);
                return [];
            }
        } catch (fout) {
            console.error("API niet bereikbaar:", fout);
            return [];
        }
    }

    // Haal productgegevens op uit database
    const data = await runQuery(`SELECT prijs, naam, afbeelding, beschrijving FROM producten WHERE productid = ${id}`);

    // Als geen data gevonden, melding tonen
    if (data.length === 0) {
        document.body.innerHTML = "<p>Product niet gevonden</p>";
        document.body.style.display = "block"; // Zorg dat body zichtbaar is
        return;
    }

    const product = data[0]; // Eerste resultaat gebruiken

    // Main zichtbaar maken
    const main = document.querySelector("main");
    if (main) {
        main.style.display = "block";
    }

    // Velden vullen met productgegevens
    const naam = document.getElementById("naam");
    const prijs = document.getElementById("prijs");
    const afbeelding = document.getElementById("afbeelding");
    const beschrijving = document.getElementById("beschrijving");

    if (naam) naam.textContent = product.naam;

    // Prijs inclusief BTW tonen
    if (prijs) {
        const prijsIncl = berekenPrijsInclBTW(parseFloat(product.prijs));
        prijs.textContent = "€" + prijsIncl;
    }

    if (afbeelding) afbeelding.src = product.afbeelding;
    if (beschrijving) beschrijving.textContent = product.beschrijving || "Geen beschrijving beschikbaar.";
}

/* =========================
   NIEUWE COLLECTIE
   Een array met nieuwe producten en deze zichtbaar maken.
========================= */

// Array met nieuwe collectie producten
const nieuweCollectie = [
    { id: 1001, name: "KD 18 International Blue", price: 132.23, image: "afbeeldingen/KD-18-International-Blue.webp" },
    { id: 1002, name: "Nike Book 2 Rising", price: 132.23, image: "afbeeldingen/BOOK-2-Rising.webp" },
    { id: 1003, name: "Nike Book 2 Sundial", price: 132.23, image: "afbeeldingen/Book-2-Sundial.webp" }
];

// Als container voor nieuwe collectie bestaat, voeg hier de producten aan toe
if (newCollectionContainer) {
    nieuweCollectie.forEach(p => {
        newCollectionContainer.appendChild(createProductCard(p));
    });
}

/* =========================
   INIT
   Startpunt van de script: laad producten en winkelwagen, en controleer op productdetail pagina.
========================= */

if (productsContainer) {
    loadProducts(); // Laad producten bij pagina laden
}

renderCart(); // Winkelwagen tonen

// Als je op product.html bent, laad dan de productdetails
if (window.location.pathname.includes("product.html")) {
    toonProductDetail();
}

// overige functies
// Functies die de gegevens ophalen en in de HTML zetten.
// Heeft app.js nodig (voor runQuery).

// toonProducten: vult de <ul> op index.html met alle producten.
async function toonProducten() {
    const producten = await runQuery("SELECT * FROM producten");

    const lijst = document.getElementById("productenLijst");
    lijst.innerHTML = "";   // Eerst leegmaken

    // Voor elk product een <li> met een link maken
    for (const product of producten) {
        const item = document.createElement("li");

        const link = document.createElement("a");
        link.href = "product.html?id=" + product.productid;
        link.textContent = product.naam + " - \u20ac" + product.prijs;
        const afbeelding = document.createElement("img");
        afbeelding.src = product.afbeelding;
        afbeelding.alt = product.naam;
        afbeelding.style.width = "50px"; // Kleine thumbnail
        link.prepend(afbeelding); // Afbeelding voor de tekst plaatsen
        item.appendChild(link);
        lijst.appendChild(item);
    }
}

// Herbereken prijs inclusief BTW
function berekenPrijsInclBTW(prijsExcl) {
    return (prijsExcl * 1.21).toFixed(2); // Afronden op 2 decimalen
}