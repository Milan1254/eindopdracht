/* =========================
   ELEMENTEN
========================= */

const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");

const contactForm = document.getElementById("contactForm");
const checkoutForm = document.getElementById("checkoutForm");

const newCollectionContainer = document.getElementById("newCollectionContainer");

/* =========================
   STATE
========================= */

let products = [];

let currentCategory = "all";
let currentSearch = "";
let currentSort = "default";

/* =========================
   CATEGORIEËN
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

function getCategory(id) {
    return CATEGORIES[id] || "all";
}

/* =========================
   CART HELPERS
========================= */

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* =========================
   PRODUCTEN LADEN
========================= */

async function loadProducts() {
    try {
        const data = await runQuery("SELECT * FROM producten");

        products = data.map(product => ({
            id: product.productid,
            name: product.naam,
            price: Number(product.prijs),
            image: product.afbeelding,
            category: getCategory(product.categorie_id)
        }));

        showProducts();
    } catch (error) {
        console.error("Fout bij laden producten:", error);
    }
}

/* =========================
   PRODUCT CARD
========================= */

function createProductCard(product) {
    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
        <a href="product.html?id=${product.id}">
            <img src="${product.image}" alt="${product.name}">
        </a>

        <div class="card-content">
            <h3>${product.name}</h3>
            <p class="price">€${product.price}</p>
            <button class="btn">Koop nu</button>
        </div>
    `;

    card.querySelector(".btn").addEventListener("click", () => {
        addToCart(product);
    });

    return card;
}

/* =========================
   PRODUCTEN TONEN
========================= */

function showProducts() {
    if (!productsContainer) return;

    let filtered = [...products];

    filtered = filtered.filter(product =>
        currentCategory === "all" ||
        product.category === currentCategory
    );

    filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(currentSearch)
    );

    switch (currentSort) {
        case "low-high":
            filtered.sort((a, b) => a.price - b.price);
            break;

        case "high-low":
            filtered.sort((a, b) => b.price - a.price);
            break;
    }

    productsContainer.innerHTML = "";

    filtered.forEach(product => {
        productsContainer.appendChild(createProductCard(product));
    });
}

/* =========================
   WINKELMAND
========================= */

function addToCart(product) {
    const cart = getCart();

    const existing = cart.find(item => item.name === product.name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart(cart);

    alert("Toegevoegd aan winkelmand!");
}

function renderCart() {
    if (!cartItems) return;

    const cart = getCart();

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((product, index) => {
        total += product.price * product.quantity;

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">

            <div class="card-content">
                <h3>${product.name}</h3>

                <p class="price">
                    €${product.price} x ${product.quantity}
                </p>

                <div>
                    <button class="decrease">-</button>
                    <button class="increase">+</button>
                    <button class="remove">Verwijder</button>
                </div>
            </div>
        `;

        card.querySelector(".increase").addEventListener("click", () => {
            cart[index].quantity++;
            saveCart(cart);
            renderCart();
        });

        card.querySelector(".decrease").addEventListener("click", () => {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }

            saveCart(cart);
            renderCart();
        });

        card.querySelector(".remove").addEventListener("click", () => {
            cart.splice(index, 1);

            saveCart(cart);
            renderCart();
        });

        cartItems.appendChild(card);
    });

    if (totalPrice) {
        totalPrice.textContent = `Totaal: €${total}`;
    }
}

/* =========================
   FILTERS
========================= */

document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        currentCategory = button.dataset.category;
        showProducts();
    });
});

/* =========================
   ZOEKEN
========================= */

if (searchInput) {
    searchInput.addEventListener("input", () => {
        currentSearch = searchInput.value.toLowerCase();
        showProducts();
    });
}

/* =========================
   SORTEREN
========================= */

if (sortSelect) {
    sortSelect.addEventListener("change", () => {
        currentSort = sortSelect.value;
        showProducts();
    });
}

/* =========================
   CONTACTFORMULIER
========================= */

if (contactForm) {
    contactForm.addEventListener("submit", event => {
        event.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const messageError = document.getElementById("messageError");
        const successMessage = document.getElementById("successMessage");

        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";
        successMessage.textContent = "";

        let valid = true;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name.value.trim()) {
            nameError.textContent = "Naam is verplicht";
            valid = false;
        }

        if (!emailRegex.test(email.value)) {
            emailError.textContent = "Geef een geldig e-mailadres";
            valid = false;
        }

        if (!message.value.trim()) {
            messageError.textContent = "Bericht is verplicht";
            valid = false;
        }

        if (valid) {
            successMessage.textContent =
                "Bericht succesvol verzonden!";

            contactForm.reset();
        }
    });
}

/* =========================
   CHECKOUT
========================= */

if (checkoutForm) {
    checkoutForm.addEventListener("submit", event => {
        event.preventDefault();

        const name = document.getElementById("checkoutName");
        const address = document.getElementById("checkoutAddress");
        const zip = document.getElementById("checkoutZip");

        const nameError =
            document.getElementById("checkoutNameError");

        const addressError =
            document.getElementById("checkoutAddressError");

        const zipError =
            document.getElementById("checkoutZipError");

        const success =
            document.getElementById("checkoutSuccess");

        nameError.textContent = "";
        addressError.textContent = "";
        zipError.textContent = "";
        success.textContent = "";

        let valid = true;

        if (!name.value.trim()) {
            nameError.textContent = "Naam verplicht";
            valid = false;
        }

        if (!address.value.trim()) {
            addressError.textContent = "Adres verplicht";
            valid = false;
        }

        if (!zip.value.trim()) {
            zipError.textContent = "Postcode verplicht";
            valid = false;
        }

        if (valid) {
            success.textContent =
                "Bestelling geplaatst!";

            localStorage.removeItem("cart");

            checkoutForm.reset();

            renderCart();
        }
    });
}

/* =========================
   NIEUWE COLLECTIE
========================= */

const nieuweCollectie = [
    {
        id: 1001,
        name: "KD 18 International Blue",
        price: 160,
        image: "afbeeldingen/KD-18-International-Blue.webp"
    },
    {
        id: 1002,
        name: "Nike Book 2 Rising",
        price: 150,
        image: "afbeeldingen/BOOK-2-Rising.webp"
    },
    {
        id: 1003,
        name: "Nike Book 2 Sundial",
        price: 150,
        image: "afbeeldingen/Book-2-Sundial.webp"
    }
];

if (newCollectionContainer) {
    nieuweCollectie.forEach(product => {
        newCollectionContainer.appendChild(
            createProductCard(product)
        );
    });
}

/* =========================
   PRODUCTEN PAGINA
========================= */

async function toonProducten() {
    const producten = await runQuery(
        "SELECT * FROM producten"
    );

    const lijst =
        document.getElementById("productenLijst");

    if (!lijst) return;

    lijst.innerHTML = "";

    producten.forEach(product => {
        const item = document.createElement("li");

        item.innerHTML = `
            <a href="product.html?id=${product.productid}">
                <img
                    src="${product.afbeelding}"
                    alt="${product.naam}"
                    width="50"
                >
                ${product.naam} - €${product.prijs}
            </a>
        `;

        lijst.appendChild(item);
    });
}

/* =========================
   PRODUCT DETAIL PAGINA
========================= */

async function toonProductDetail() {
    const params =
        new URLSearchParams(window.location.search);

    const productId =
        Number(params.get("id"));

    if (!productId) return;

    const producten = await runQuery(`
        SELECT *
        FROM producten
        WHERE productid = ${productId}
    `);

    const product = producten[0];

    if (!product) {
        const naam =
            document.getElementById("naam");

        if (naam) {
            naam.textContent =
                "Product niet gevonden";
        }

        return;
    }

    const naam =
        document.getElementById("naam");

    const prijs =
        document.getElementById("prijs");

    const afbeelding =
        document.getElementById("afbeelding");

    const categorie =
        document.getElementById("categorie");

    if (naam) naam.textContent = product.naam;
    if (prijs) prijs.textContent = `€${product.prijs}`;

    if (afbeelding) {
        afbeelding.src = product.afbeelding;
        afbeelding.alt = product.naam;
    }

    if (categorie) {
        const categorieen = await runQuery(`
            SELECT naam
            FROM categorie
            WHERE id = ${product.categorie_id}
        `);

        categorie.textContent =
            categorieen[0]?.naam || "Onbekend";
    }
}

/* =========================
   INIT
========================= */

if (productsContainer) {
    loadProducts();
}

renderCart();

