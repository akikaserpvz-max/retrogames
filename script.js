let carrito = [];
let total = 0;

let epocaSeleccionada = "todas";

// ================== JUEGOS ==================
const juegos = [
    {
        nombre: "Assassin's Creed Origins",
        epoca: "antigua",
        tam: "45 GB",
        precio: 29.99,
        anio: 2017,
        img: "img/ac_origins.jpg"
    },
    {
        nombre: "Ryse: Son of Rome",
        epoca: "antigua",
        tam: "25 GB",
        precio: 19.99,
        anio: 2014,
        img: "img/ryse.jpg"
    },
    {
        nombre: "Kingdom Come Deliverance",
        epoca: "medieval",
        tam: "60 GB",
        precio: 39.99,
        anio: 2018,
        img: "img/kingdom.jpg"
    },
    {
        nombre: "Cyberpunk 2077",
        epoca: "futurista",
        tam: "70 GB",
        precio: 59.99,
        anio: 2020,
        img: "img/cyberpunk.jpg"
    }
];

// ================== RENDER ==================
function cargarJuegos() {

    const contenedor = document.getElementById("catalogo");

    if (!contenedor) {
        console.error("No existe #catalogo en HTML");
        return;
    }

    let html = "";

    const filtrados = juegos.filter(j =>
        epocaSeleccionada === "todas" || j.epoca === epocaSeleccionada
    );

    filtrados.forEach(j => {

        html += `
        <div class="juego">

            <img src="${j.img}" alt="${j.nombre}" onerror="this.src='img/sin.jpg'">

            <div class="info">

                <h3>${j.nombre}</h3>
                <p>Época: ${j.epoca}</p>
                <p>Tamaño: ${j.tam}</p>
                <p>Año: ${j.anio}</p>
                <p>USD ${j.precio.toFixed(2)}</p>

                <button onclick='agregar("${j.nombre}", ${j.precio})'>
                    Agregar
                </button>

            </div>

        </div>
        `;
    });

    contenedor.innerHTML = html;
}

// ================== FILTRO ==================
function seleccionarEpoca(epoca) {
    epocaSeleccionada = epoca;
    cargarJuegos();
}

// ================== CARRITO ==================
function agregar(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizar();
}

function eliminar(i) {
    carrito.splice(i, 1);
    actualizar();
}

// ================== ACTUALIZAR ==================
function actualizar() {

    const cont = document.getElementById("cantidadCarrito");
    const lista = document.getElementById("listaCarrito");
    const totalHTML = document.getElementById("total");

    if (cont) cont.innerText = carrito.length;

    let html = "";
    total = 0;

    carrito.forEach((j, i) => {
        total += j.precio;

        html += `
        <div class="itemCarrito">
            ${j.nombre} - USD ${j.precio.toFixed(2)}
            <button onclick="eliminar(${i})">❌</button>
        </div>
        `;
    });

    if (lista) lista.innerHTML = html;
    if (totalHTML) totalHTML.innerHTML = `<b>Total: USD ${total.toFixed(2)}</b>`;
}

// ================== BUSCAR ==================
function buscarJuego() {

    const texto = document.getElementById("buscar").value.toLowerCase();

    document.querySelectorAll(".juego").forEach(j => {

        const nombre = j.querySelector("h3").innerText.toLowerCase();
        j.style.display = nombre.includes(texto) ? "block" : "none";
    });
}

// ================== PAGO ==================
function irAPago() {

    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    window.location.href = "pago.html";
}

// ================== INIT ==================
window.onload = function () {
    cargarJuegos();
    actualizar();
};
