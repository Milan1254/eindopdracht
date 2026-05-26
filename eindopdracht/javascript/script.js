/* products */
const products = [
  { name: "Kobe 6 Total Orange", category: "Kobe", price: 180, image: "afbeeldingen/kobe-6-total-orange.avif" },
  { name: "Kobe 6 Reverse Grinch", category: "Kobe", price: 180, image: "afbeeldingen/Kobe-6-reverse-grinch.jpg" },
  { name: "Kobe 6 Grinch", category: "Kobe", price: 180, image: "afbeeldingen/kobe-6-grinch.webp" },
  { name: "Kobe 6 Dodgers", category: "Kobe", price: 180, image: "afbeeldingen/Kobe-6-Dodgers.jpg" },
  { name: "Kobe 4 Girldad", category: "Kobe", price: 180, image: "afbeeldingen/Kobe-4-Girldad.jpg" },
  { name: "Kobe 4 Gold Medal", category: "Kobe", price: 180, image: "afbeeldingen/Kobe-4-Gold-Medal.webp" },
  { name: "Kobe 4 Black Mamba", category: "Kobe", price: 180, image: "afbeeldingen/Kobe-4-Black-Mamba.jpg" },
  { name: "Kobe 4 Philly", category: "Kobe", price: 180, image: "afbeeldingen/Kobe-4-Philly.jpg" },

  { name: "Nike JA 3 Jelly Bean", category: "JA", price: 130, image: "afbeeldingen/Nike-Ja-3-Jelly-Bean.jpeg" },
  { name: "Nike JA 3 Max Volume", category: "JA", price: 130, image: "afbeeldingen/Nike-Ja-3-Max-Volume.webp" },
  { name: "Nike JA 3 Zombie", category: "JA", price: 130, image: "afbeeldingen/Nike-Ja-3-Zombie.jpg" },

  { name: "KD 18 Aunt Pearl", category: "KD", price: 160, image: "afbeeldingen/KD-18-Aunt-Pearl.webp" },
  { name: "KD 18 Slim Reaper", category: "KD", price: 160, image: "afbeeldingen/KD-18-Slim-Reaper.webp" },
  { name: "KD 18 Pink Photo Blue", category: "KD", price: 160, image: "afbeeldingen/KD-18-Pink-Photo-Blue.webp" },
  { name: "KD 18 Washed Purple", category: "KD", price: 160, image: "afbeeldingen/KD-18-Washed purple.webp" },

  { name: "Lebron XXII Limelight", category: "Lebron", price: 190, image: "afbeeldingen/Lebron-XXII-Limelight.webp" },
  { name: "Lebron XXII Grand Opening", category: "Lebron", price: 190, image: "afbeeldingen/Lebron-XXII-Grand-Opening.webp" },

  { name: "Sabrina 3 Crimson Tint", category: "Sabrina", price: 130, image: "afbeeldingen/Sabrina-3-Crimson-Tint.webp" },
  { name: "Sabrina 3 Gamer", category: "Sabrina", price: 130, image: "afbeeldingen/Sabrina-3-Gamer.webp" },
  { name: "Sabrina EP Blueprint", category: "Sabrina", price: 130, image: "afbeeldingen/Sabrina-3-EP-Blueprint.jpeg" },

  { name: "Rigorer BP1 Family Matters", category: "Rigorer", price: 140, image: "afbeeldingen/Rigorer-BP1-Family-Matters.webp" },
  { name: "Rigorer AR1 Juicy Peach", category: "Rigorer", price: 140, image: "afbeeldingen/Rigorer-AR1-Juicy-Peach.webp" },
  { name: "Rigorer AR2 15 Flavours", category: "Rigorer", price: 140, image: "afbeeldingen/Rigorer-AR2-15Flavours.webp" },
  { name: "Rigorer AR2 Snowman", category: "Rigorer", price: 140, image: "afbeeldingen/Rigorer-AR2-Snowman.webp" },

  { name: "Nike GT Cut 2 Hyper Pink", category: "GT-cut", price: 180, image: "afbeeldingen/Nike-GT-CUT2-Hyper-Pink.jpg" },
  { name: "Nike GT Cut 2 Arike Ogunbowale", category: "GT-cut", price: 180, image: "afbeeldingen/Nike-GT-CUT2-Arike-Ogunbowale.jpg" },
  { name: "Nike GT Cut 2 Black Phantom", category: "GT-cut", price: 180, image: "afbeeldingen/Nike-GT-CUT2-Black-Phantom.jpg" }
];

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
showProducts();

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

    /* + */
    card.querySelector(".increase").addEventListener("click", () => {
      shoe.quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });

    /* - */
    card.querySelector(".decrease").addEventListener("click", () => {
      if (shoe.quantity > 1) {
        shoe.quantity--;
      } else {
        cart.splice(index, 1);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });

    /* remove */
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