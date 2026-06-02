// producten.js
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

// toonProductDetail: vult de velden op product.html met EEN product.
async function toonProductDetail() {
    // Het id uit de URL halen, bijvoorbeeld product.html?id=3
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    // Een product ophalen op basis van het id
    const producten = await runQuery("SELECT * FROM producten WHERE productid = " + id);
    const product = producten[0];   // runQuery geeft een array terug

    if (!product) {
        document.getElementById("naam").textContent = "Product niet gevonden";
        return;
    }

    document.getElementById("naam").textContent = product.naam;
    document.getElementById("prijs").textContent = product.prijs;

    // De naam van de categorie apart ophalen
    const categorieen = await runQuery(
        "SELECT * FROM categorie WHERE id = " + product.categorie_id
    );
    if (categorieen[0]) {
        document.getElementById("categorie").textContent = categorieen[0].naam;
    }
}
