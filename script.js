let carrito = [];
let total = 0;

let epocaSeleccionada = "antigua";
let juegos = [];

let juegosMostrados = 6;
let incremento = 6;

// ================== CARGAR ==================
async function cargarJuegos() {

    const res = await fetch(`data/${epocaSeleccionada}.txt`);
    const data = await res.text();

    juegos = data
        .trim()
        .split("\n")
        .filter(l => l.trim() !== "")
        .map(l => {

            const [nombre, epoca, tam, precio, anio, img] =
                l.split(";").map(x => x.trim());

            return {
                nombre,
                epoca: epoca.toLowerCase(),
                tam,
                precio: Number(precio),
                anio: Number(anio),
                img
            };
        });

    render();
}

// ================== RENDER CON ANIMACIÓN ==================
function render() {

    const contenedor = document.getElementById("catalogo");

    const filtrados = juegos.filter(j =>
        epocaSeleccionada === "todas" || j.epoca === epocaSeleccionada
    );

    const visibles = filtrados.slice(0, juegosMostrados);

    let html = "";

    visibles.forEach((j, index) => {

        html += `
        <div class="juego" style="animation-delay:${index * 80}ms">

            <img src="${j.img}" onerror="this.src='img/sin.jpg'">

            <div class="info">

                <h3>${j.nombre}</h3>
                <p>Época: ${j.epoca}</p>
                <p>Tamaño: ${j.tam}</p>
                <p>Año: ${j.anio}</p>
                <p>USD ${j.precio.toFixed(2)}</p>

                <button onclick="agregar('${j.nombre}', ${j.precio})">
                    Agregar al carrito
                </button>

            </div>

        </div>
        `;
    });

    contenedor.innerHTML = html;

    // ocultar botón si no hay más
    const btn = document.getElementById("btnMas");

    if (btn) {
        btn.style.display =
            juegosMostrados >= filtrados.length ? "none" : "block";
    }
}

// ================== MÁS JUEGOS ==================
function cargarMas() {
    juegosMostrados += incremento;
    render();
}

// ================== FILTRO ==================
function seleccionarEpoca(epoca) {
    epocaSeleccionada = epoca;
    juegosMostrados = 6;
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
    if (totalHTML) totalHTML.innerHTML =
        `<b>Total: USD ${total.toFixed(2)}</b>`;
}

// ================== BUSCADOR ==================
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
        alert("Carrito vacío");
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
