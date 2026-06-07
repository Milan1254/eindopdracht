/* =========================
   ELEMENTEN
   Hier worden referenties opgeslagen naar HTML-elementen zodat je er later mee kunt werken.
========================= */

const productsContainer = document.getElementById("products"); // Container voor productkaarten op de homepage
const searchInput = document.getElementById("searchInput"); // Zoekveld voor filteren op naam
const sortSelect = document.getElementById("sortSelect"); // Dropdown voor sorteren (bijv. laag-hoog of hoog-laag)

const cartItems = document.getElementById("cartItems"); // Container voor winkelwagen items
const totalPrice = document.getElementById("totalPrice"); // Element voor tonen van totaalbedrag

const contactForm = document.getElementById("contactForm"); // Contactformulier (niet verder gebruikt in deze code)
const checkoutForm = document.getElementById("checkoutForm"); // Afrekenformulier (ook niet verder gebruikt in deze code)

const newCollectionContainer = document.getElementById("newCollectionContainer"); // Container voor nieuwe collectie producten

/* =========================
   STATE
   Variabelen die de huidige status van de app bijhouden.
========================= */

let products = []; // Array waarin alle geladen producten worden opgeslagen
let currentCategory = "all"; // Huidige geselecteerde categorie voor filtering
let currentSearch = ""; // Huidige zoekterm
let currentSort = "default"; // Huidige sorteervolgorde

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

// Haalt de winkelwagen op uit localStorage of geeft lege array terug als die er niet is
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Slaat de winkelwagen op in localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Voegt een product toe aan de winkelwagen
function addToCart(product) {
    const cart = getCart(); // Haal huidige winkelwagen op

    // Kijk of product al in de winkelwagen zit
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        // Als het product al bestaat, verhoog de hoeveelheid
        existing.quantity++;
    } else {
        // Anders voeg nieuw product toe met hoeveelheid 1
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart); // Sla de gewijzigde winkelwagen op
    alert("Toegevoegd aan winkelmand!"); // Laat gebruiker weten dat het product is toegevoegd
}

/* =========================
   PRODUCTEN LADEN (HOMEPAGE)
   Laadt producten uit database en zet ze om naar interne structuur.
========================= */

async function loadProducts() {
    try {
        // Voer een query uit om alle producten op te halen
        const data = await runQuery("SELECT * FROM producten");

        // Zet de data om naar interne array met juiste structuur
        products = data.map(product => ({
            id: product.productid,
            name: product.naam,
            price: Number(product.prijs),
            image: product.afbeelding,
            category: getCategory(product.categorie_id)
        }));

        showProducts(); // Laat de producten zien
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
    card.className = "card"; // Geef de kaart een CSS-klasse voor styling

    // HTML structuur van de productkaart
    card.innerHTML = `
        <a href="product.html?id=${product.id}">
            <img src="${product.image}" alt="${product.name}">
        </a>

        <div class="card-content">
            <h3>${product.name}</h3>
            <p class="price">€${product.price}</p>
            <button class="btn">In winkelmand</button>
        </div>
    `;

    // Voeg event listener toe aan knop om product toe te voegen aan winkelwagen
    card.querySelector(".btn").addEventListener("click", () => {
        addToCart(product);
    });

    return card; // Geef de gemaakte kaart terug
}

/* =========================
   TONEN + FILTERS
   Laat producten zien op pagina, rekening houdend met filters en sortering.
========================= */

function showProducts() {
    if (!productsContainer) return; // Als container niet bestaat, stop

    let filtered = [...products]; // Maak kopie van alle producten

    // Filter op categorie
    filtered = filtered.filter(p =>
        currentCategory === "all" || p.category === currentCategory
    );

    // Filter op zoekterm
    filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(currentSearch)
    );

    // Sorteer op prijs, laag naar hoog
    if (currentSort === "low-high") {
        filtered.sort((a, b) => a.price - b.price);
    }

    // Sorteer op prijs, hoog naar laag
    if (currentSort === "high-low") {
        filtered.sort((a, b) => b.price - a.price);
    }

    // Leeg de container voordat we nieuwe kaarten toevoegen
    productsContainer.innerHTML = "";

    // Maak voor elk product een kaart en voeg toe aan container
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
        showProducts(); // Herlaad producten met nieuwe filter
    });
});

// Event listener voor zoekveld
if (searchInput) {
    searchInput.addEventListener("input", () => {
        currentSearch = searchInput.value.toLowerCase(); // Update zoekterm
        showProducts(); // Filter en toon producten
    });
}

// Event listener voor sorteerkeuzelijst
if (sortSelect) {
    sortSelect.addEventListener("change", () => {
        currentSort = sortSelect.value; // Update sorteervolgorde
        showProducts(); // Herladen met nieuwe sortering
    });
}

/* =========================
   WINKELMAND
   Functie om winkelwagen weer te geven en bij te werken.
========================= */

function renderCart() {
    if (!cartItems) return; // Als winkelwagen element niet bestaat, stop

    const cart = getCart(); // Haal winkelwagen op
    cartItems.innerHTML = ""; // Leeg de container

    let total = 0; // Variabele voor totaalbedrag

    // Loop door alle items in de winkelwagen
    cart.forEach((product, index) => {
        total += product.price * product.quantity; // Voeg prijs * hoeveelheid toe aan totaal

        // Maak een kaart voor het item
        const card = document.createElement("div");
        card.className = "card";

        // HTML structuur voor item in winkelwagen
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="card-content">
                <h3>${product.name}</h3>
                <p>€${product.price} x ${product.quantity}</p>

                <button class="minus">-</button>
                <button class="plus">+</button>
                <button class="remove">Verwijder</button>
            </div>
        `;

        // Event handler voor '+' knop
        card.querySelector(".plus").addEventListener("click", () => {
            cart[index].quantity++;
            saveCart(cart);
            renderCart(); // Herlaad winkelwagen
        });

        // Event handler voor '-' knop
        card.querySelector(".minus").addEventListener("click", () => {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1); // Verwijder item als hoeveelheid 0 wordt
            }
            saveCart(cart);
            renderCart(); // Herlaad winkelwagen
        });

        // Event handler voor 'verwijder' knop
        card.querySelector(".remove").addEventListener("click", () => {
            cart.splice(index, 1); // Verwijder item uit array
            saveCart(cart);
            renderCart(); // Herlaad winkelwagen
        });

        // Voeg de kaart toe aan de winkelwagen container
        cartItems.appendChild(card);
    });

    // Update het totaalbedrag
    if (totalPrice) {
        totalPrice.textContent = "Totaal: €" + total;
    }
}

/* =========================
   PRODUCT DETAIL PAGINA
   Laadt en toont details van een specifiek product.
========================= */

async function toonProductDetail() {
    // Haal het product ID uit de URL
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) return; // Stop als geen ID

    // Functie om query uit te voeren (gebruikt API)
    async function runQuery(sql) {
        try {
            const response = await fetch("http://localhost/eindopdracht/eindopdracht/api.php?sql=" + encodeURIComponent(sql));
            const result = await response.json();
            if (result.success) {
                return result.data; // Return de data als query succesvol was
            } else {
                console.error("SQL fout:", result.error);
                return [];
            }
        } catch (fout) {
            console.error("API niet bereikbaar:", fout);
            return [];
        }
    }

    // Voer query uit om productgegevens op te halen
    const data = await runQuery(`SELECT prijs, naam, afbeelding, beschrijving FROM producten WHERE productid = ${id}`);

    // Als geen product gevonden, toon een melding
    if (data.length === 0) {
        document.body.innerHTML = "<p>Product niet gevonden</p>";
        document.body.style.display = "block"; // Zorg dat body zichtbaar is
        return;
    }

    const product = data[0]; // Neem het eerste (en enige) resultaat

    // Maak main zichtbaar nadat gegevens geladen zijn
    const main = document.querySelector("main");
    if (main) {
        main.style.display = "block";
    }

    // Vul de velden in met productgegevens
    const naam = document.getElementById("naam");
    const prijs = document.getElementById("prijs");
    const afbeelding = document.getElementById("afbeelding");
    const beschrijving = document.getElementById("beschrijving");

    if (naam) naam.textContent = product.naam;
    if (prijs) prijs.textContent = "€" + product.prijs;
    if (afbeelding) afbeelding.src = product.afbeelding;
    if (beschrijving) beschrijving.textContent = product.beschrijving || "Geen beschrijving beschikbaar.";
}

/* =========================
   NIEUWE COLLECTIE
   Een array met nieuwe producten en deze worden zichtbaar gemaakt.
========================= */

// Array met nieuwe collectie producten
const nieuweCollectie = [
    { id: 1001, name: "KD 18 International Blue", price: 160, image: "afbeeldingen/KD-18-International-Blue.webp" },
    { id: 1002, name: "Nike Book 2 Rising", price: 150, image: "afbeeldingen/BOOK-2-Rising.webp" },
    { id: 1003, name: "Nike Book 2 Sundial", price: 150, image: "afbeeldingen/Book-2-Sundial.webp" }
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

renderCart(); // weergeven van de winkelwagen

// Als je op product.html bent, laad dan de productdetails
if (window.location.pathname.includes("product.html")) {
    toonProductDetail();
}