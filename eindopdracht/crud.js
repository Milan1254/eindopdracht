// crud.js
// De CRUD-operaties voor producten: Create, Read, Update, Delete.
// Heeft app.js nodig (voor runQuery).
//
// LET OP: we plakken hier waarden rechtstreeks in de SQL-string.
// Dat is simpel om te leren, maar onveilig (SQL injection).
// In de echte cursus gebruik je hiervoor prepared statements.

// --- READ: alle producten tonen in de lijst ---
async function toonBeheerLijst() {
    const producten = await runQuery(
        "SELECT productid, naam, prijs, categorie_id, afbeelding, beschrijving FROM producten"
    );

    const lijst = document.getElementById("productenLijst");
    lijst.innerHTML = "";

    for (const product of producten) {
        const item = document.createElement("li");

        item.innerHTML =
            `${product.naam} - €${product.prijs} `;

        const bewerkKnop = document.createElement("button");
        bewerkKnop.textContent = "Bewerken";
        bewerkKnop.onclick = () => formulierVullen(product);

        const verwijderKnop = document.createElement("button");
        verwijderKnop.textContent = "Verwijderen";
        verwijderKnop.onclick = () =>
            productVerwijderen(product.productid);

        item.appendChild(bewerkKnop);
        item.appendChild(verwijderKnop);

        lijst.appendChild(item);
    }
}

// --- Formulier vullen met een bestaand product (voor bewerken) ---
function formulierVullen(product) {
    document.getElementById("productid").value = product.productid;
    document.getElementById("naam").value = product.naam;
    document.getElementById("prijs").value = product.prijs;
    document.getElementById("categorie_id").value = product.categorie_id;
    document.getElementById("afbeelding").value = product.afbeelding;
    document.getElementById("beschrijving").value = product.beschrijving;
}

// --- Formulier leegmaken (na opslaan of bij annuleren) ---
function formulierLeegmaken() {
    document.getElementById("productid").value = "";
    document.getElementById("naam").value = "";
    document.getElementById("prijs").value = "";
    document.getElementById("categorie_id").value = "";
    document.getElementById("afbeelding").value = "";
    document.getElementById("beschrijving").value = ""; 
}

// --- CREATE of UPDATE: opslaan ---
// Is het verborgen id leeg -> nieuw product (INSERT).
// Staat er een id -> bestaand product (UPDATE).
async function productOpslaan() {
    const id = document.getElementById("productid").value;
    const naam = document.getElementById("naam").value;
    const prijs = document.getElementById("prijs").value;
    const categorieId = document.getElementById("categorie_id").value;
    const afbeelding = document.getElementById("afbeelding").value;
    const beschrijving = document.getElementById("beschrijving").value;
    let sql;

    if (id === "") {
        // CREATE: nieuw product toevoegen
        sql = "INSERT INTO producten (naam, prijs, categorie_id, afbeelding, beschrijving) " +
              "VALUES ('" + naam + "', " + prijs + ", " + categorieId + ", '" + afbeelding + "', '" + beschrijving + "')";
    } else {
        // UPDATE: bestaand product wijzigen
        sql = "UPDATE producten SET " +
              "naam = '" + naam + "', " +
              "prijs = " + prijs + ", " +
              "categorie_id = " + categorieId + ", " +
              "afbeelding = '" + afbeelding + "', " +
              "beschrijving = '" + beschrijving + "' " +
              "WHERE productid = " + id;
    }

    await runQuery(sql);

    // Formulier leegmaken en lijst opnieuw laden
    formulierLeegmaken();
    toonBeheerLijst();
}

// --- DELETE: verwijderen ---
async function productVerwijderen(id) {
    // Vraag eerst om bevestiging
    const zeker = confirm("Weet je zeker dat je dit product wilt verwijderen?");
    if (!zeker) {
        return;
    }

    await runQuery("DELETE FROM producten WHERE productid = " + id);

    // Lijst opnieuw laden
    toonBeheerLijst();
}
