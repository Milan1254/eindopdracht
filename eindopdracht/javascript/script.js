/* ELEMENTEN */
const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");

/* STATE */
let currentCategory = "all";
let currentSearch = "";
let currentSort = "default";

/* PRODUCTEN UIT DATABASE */
let products = [];

async function loadProducts() {
  const data = await runQuery("SELECT * FROM producten");

  products = data.map(producten => ({
    id: producten.id,
    name: producten.naam,
    price: Number(producten.prijs),
    image: producten.afbeelding,
    category: getCategory(producten.categorie_id)
  }));

  showProducts(); // BELANGRIJK
}

function getCategory(id) {
  switch (Number(id)) {
    case 1: return "Kobe";
    case 2: return "JA";
    case 3: return "KD";
    case 4: return "Lebron";
    case 5: return "Sabrina";
    case 6: return "Rigorer";
    case 7: return "GT-cut";
    default: return "all";
  }
}

/* PRODUCTEN TONEN */
function showProducts() {
  if (!productsContainer) return;

  let filtered = [...products];

  /* FILTER */
  if (currentCategory !== "all") {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  /* SEARCH */
  if (currentSearch !== "") {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(currentSearch)
    );
  }

  /* SORT */
  if (currentSort === "low-high") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (currentSort === "high-low") {
    filtered.sort((a, b) => b.price - a.price);
  }

  productsContainer.innerHTML = "";

  filtered.forEach(shoe => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${shoe.image}" alt="${shoe.name}">
      <div class="card-content">
        <h3>${shoe.name}</h3>
        <p class="price">€${shoe.price}</p>
        <button class="btn">Koop nu</button>
      </div>
    `;

    card.querySelector("button").addEventListener("click", () => addToCart(shoe));

    productsContainer.appendChild(card);
  });
}

/* CART */
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.name === product.name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Toegevoegd aan mandje!");
}

/* FILTERS */
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentCategory = btn.dataset.category;
    showProducts();
  });
});

/* ZOEKEN */
if (searchInput) {
  searchInput.addEventListener("input", () => {
    currentSearch = searchInput.value.toLowerCase();
    showProducts();
  });
}

/* SORTEREN */
if (sortSelect) {
  sortSelect.addEventListener("change", () => {
    currentSort = sortSelect.value;
    showProducts();
  });
}

/* INIT */
loadProducts();

/* WINKELMANDJE */
function renderCart() {
  if (!cartItems) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((shoe, index) => {
    total += shoe.price * shoe.quantity;

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${shoe.image}">
      <div class="card-content">
        <h3>${shoe.name}</h3>
        <p class="price">€${shoe.price} x ${shoe.quantity}</p>
        <div>
          <button class="decrease">-</button>
          <button class="increase">+</button>
          <button class="remove">Verwijder</button>
        </div>
      </div>
    `;

    card.querySelector(".increase").addEventListener("click", () => {
      shoe.quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });

    card.querySelector(".decrease").addEventListener("click", () => {
      if (shoe.quantity > 1) {
        shoe.quantity--;
      } else {
        cart.splice(index, 1);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });

    card.querySelector(".remove").addEventListener("click", () => {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });

    cartItems.appendChild(card);
  });

  if (totalPrice) {
    totalPrice.textContent = "Totaal: €" + total;
  }
}

renderCart();

/* CONTACTFORMULIER */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;

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

    if (name.value.trim() === "") {
      nameError.textContent = "Naam is verplicht";
      valid = false;
    }

    if (!email.value.includes("@")) {
      emailError.textContent = "Geef een geldig e-mailadres";
      valid = false;
    }

    if (message.value.trim() === "") {
      messageError.textContent = "Bericht is verplicht";
      valid = false;
    }

    if (valid) {
      successMessage.textContent = "Bericht succesvol verzonden!";
      contactForm.reset();
    }
  });
}

/* CHECKOUT FORM */
const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;

    const name = document.getElementById("checkoutName");
    const address = document.getElementById("checkoutAddress");
    const zip = document.getElementById("checkoutZip");

    document.getElementById("checkoutNameError").textContent = "";
    document.getElementById("checkoutAddressError").textContent = "";
    document.getElementById("checkoutZipError").textContent = "";

    if (name.value.trim() === "") {
      document.getElementById("checkoutNameError").textContent = "Naam verplicht";
      valid = false;
    }

    if (address.value.trim() === "") {
      document.getElementById("checkoutAddressError").textContent = "Adres verplicht";
      valid = false;
    }

    if (zip.value.trim() === "") {
      document.getElementById("checkoutZipError").textContent = "Postcode verplicht";
      valid = false;
    }

    if (valid) {
      document.getElementById("checkoutSuccess").textContent = "Bestelling geplaatst!";
      localStorage.removeItem("cart");
      checkoutForm.reset();
    }
  });
}

/* NIEUWE COLLECTIE */
const nieuweCollectie = [
  {
    name: "KD 18 International Blue",
    price: 160,
    image: "afbeeldingen/KD-18-International-Blue.webp"
  },
  {
    name: "Nike Book 2 Rising",
    price: 150,
    image: "afbeeldingen/BOOK-2-Rising.webp"
  },
  {
    name: "Nike Book 2 Sundial",
    price: 150,
    image: "afbeeldingen/Book-2-Sundial.webp"
  }
];

const newCollectionContainer = document.getElementById("newCollectionContainer");

if (newCollectionContainer) {
  nieuweCollectie.forEach(shoe => {
    const card = document.createElement("div");

    card.classList.add("card");

    card.innerHTML = `
      <img src="${shoe.image}" alt="${shoe.name}">
      <div class="card-content">
        <h3>${shoe.name}</h3>
        <p class="price">€${shoe.price}</p>
        <button class="btn">Koop nu</button>
      </div>
    `;

    card.querySelector(".btn").addEventListener("click", () => {
      addToCart(shoe);
    });

    newCollectionContainer.appendChild(card);
  });
}