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
   CART
========================= */

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
    const cart = getCart();

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    alert("Toegevoegd aan winkelmand!");
}

/* =========================
   PRODUCTEN LADEN (HOMEPAGE)
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
    } catch (err) {
        console.error("Fout bij laden producten:", err);
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
            <button class="btn">In winkelmand</button>
        </div>
    `;

    card.querySelector(".btn").addEventListener("click", () => {
        addToCart(product);
    });

    return card;
}

/* =========================
   TONEN + FILTERS
========================= */

function showProducts() {
    if (!productsContainer) return;

    let filtered = [...products];

    filtered = filtered.filter(p =>
        currentCategory === "all" || p.category === currentCategory
    );

    filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(currentSearch)
    );

    if (currentSort === "low-high") {
        filtered.sort((a, b) => a.price - b.price);
    }

    if (currentSort === "high-low") {
        filtered.sort((a, b) => b.price - a.price);
    }

    productsContainer.innerHTML = "";

    filtered.forEach(product => {
        productsContainer.appendChild(createProductCard(product));
    });
}

/* =========================
   FILTER EVENTS
========================= */

document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        currentCategory = btn.dataset.category;
        showProducts();
    });
});

if (searchInput) {
    searchInput.addEventListener("input", () => {
        currentSearch = searchInput.value.toLowerCase();
        showProducts();
    });
}

if (sortSelect) {
    sortSelect.addEventListener("change", () => {
        currentSort = sortSelect.value;
        showProducts();
    });
}

/* =========================
   WINKELMAND
========================= */

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
                <p>€${product.price} x ${product.quantity}</p>

                <button class="minus">-</button>
                <button class="plus">+</button>
                <button class="remove">Verwijder</button>
            </div>
        `;

        card.querySelector(".plus").addEventListener("click", () => {
            cart[index].quantity++;
            saveCart(cart);
            renderCart();
        });

        card.querySelector(".minus").addEventListener("click", () => {
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
        totalPrice.textContent = "Totaal: €" + total;
    }
}

/* =========================
   PRODUCT DETAIL PAGINA
========================= */

async function toonProductDetail() {
    const id = new URLSearchParams(window.location.search).get("id");

    if (!id) return;

    const data = await runQuery(`
        SELECT * FROM producten WHERE productid = ${id}
    `);

    const product = data[0];
    if (!product) return;

    const naam = document.getElementById("naam");
    const prijs = document.getElementById("prijs");
    const afbeelding = document.getElementById("afbeelding");
    const beschrijving = document.getElementById("beschrijving");

    if (naam) naam.textContent = product.naam;
    if (prijs) prijs.textContent = "€" + product.prijs;
    if (afbeelding) afbeelding.src = product.afbeelding;
    if (beschrijving) beschrijving.textContent = product.beschrijving;
}

/* =========================
   NIEUWE COLLECTIE
========================= */

const nieuweCollectie = [
    { id: 1001, name: "KD 18 International Blue", price: 160, image: "afbeeldingen/KD-18-International-Blue.webp" },
    { id: 1002, name: "Nike Book 2 Rising", price: 150, image: "afbeeldingen/BOOK-2-Rising.webp" },
    { id: 1003, name: "Nike Book 2 Sundial", price: 150, image: "afbeeldingen/Book-2-Sundial.webp" }
];

if (newCollectionContainer) {
    nieuweCollectie.forEach(p => {
        newCollectionContainer.appendChild(createProductCard(p));
    });
}

/* =========================
   INIT
========================= */

if (productsContainer) {
    loadProducts();
}

renderCart();

if (window.location.pathname.includes("product.html")) {
    toonProductDetail();
}

