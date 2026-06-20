let carrito = [];
let total = 0;

let epocaSeleccionada = "todas";

// ================== JUEGOS ==================
const juegos = [
    { nombre:"Assassin's Creed Origins", epoca:"antigua", tam:"42 GB", precio:39.99, anio:2017, img:"img/ac_origins.jpg" },
    { nombre:"Ryse: Son of Rome", epoca:"antigua", tam:"26 GB", precio:29.99, anio:2013, img:"img/ryse.jpg" },
    { nombre:"Total War: Rome II", epoca:"antigua", tam:"35 GB", precio:44.99, anio:2013, img:"img/rome2.jpg" },

    { nombre:"Cyberpunk 2077", epoca:"futurista", tam:"70 GB", precio:59.99, anio:2020, img:"img/cyberpunk.jpg" },
    { nombre:"Deus Ex Human Revolution", epoca:"futurista", tam:"17 GB", precio:19.99, anio:2011, img:"img/deus.jpg" },
    { nombre:"Detroit Become Human", epoca:"futurista", tam:"55 GB", precio:39.99, anio:2018, img:"img/detroit.jpg" },

    { nombre:"Kingdom Come Deliverance", epoca:"medieval", tam:"70 GB", precio:39.99, anio:2018, img:"img/kingdom.jpg" },
    { nombre:"A Plague Tale Innocence", epoca:"medieval", tam:"50 GB", precio:34.99, anio:2019, img:"img/plague.jpg" },
    { nombre:"Crusader Kings III", epoca:"medieval", tam:"8 GB", precio:49.99, anio:2020, img:"img/ck3.jpg" },

    { nombre:"Mafia Definitive Edition", epoca:"moderna", tam:"50 GB", precio:39.99, anio:2020, img:"img/mafia.jpg" },
    { nombre:"L.A. Noire", epoca:"moderna", tam:"29 GB", precio:29.99, anio:2011, img:"img/la_noire.jpg" },
    { nombre:"Grand Theft Auto V", epoca:"moderna", tam:"110 GB", precio:29.99, anio:2013, img:"img/gta5.jpg" }
];

// ================== CARGAR JUEGOS ==================
function cargarJuegos() {

    const contenedor = document.getElementById("catalogo");

    if (!contenedor) {
        console.error("No existe #catalogo en HTML");
        return;
    }

    const filtrados = juegos.filter(j =>
        epocaSeleccionada === "todas" ||
        j.epoca.toLowerCase() === epocaSeleccionada.toLowerCase()
    );

    let html = "";

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
                    Agregar al carrito
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
    carrito.push({ nombre, precio: Number(precio) });
    actualizar();
}

function eliminar(i) {
    carrito.splice(i, 1);
    actualizar();
}

// ================== ACTUALIZAR ==================
function actualizar() {

    const contador = document.getElementById("cantidadCarrito");
    const lista = document.getElementById("listaCarrito");
    const totalHTML = document.getElementById("total");

    if (contador) contador.innerText = carrito.length;

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

// ================== MOSTRAR TODOS ==================
function mostrarMas() {
    epocaSeleccionada = "todas";
    cargarJuegos();
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

// ================== INICIO ==================
window.onload = function () {
    cargarJuegos();
    actualizar();
};
