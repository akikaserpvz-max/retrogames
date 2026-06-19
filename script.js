const imagenes = {
    "Assassin's Creed Origins": "img/ac_origins.jpg",
    "Ryse: Son of Rome": "img/ryse.jpg",
    "Total War: Rome II": "img/rome2.jpg",
    "Kingdom Come Deliverance": "img/kingdom_come.jpg",
    "A Plague Tale Innocence": "img/plague_tale.jpg",
    "Crusader Kings III": "img/ck3.jpg",
    "Mafia Definitive Edition": "img/mafia.jpg",
    "L.A. Noire": "img/lanoire.jpg",
    "GTA V": "img/gtaV.jpg",
    "Cyberpunk 2077": "img/cyberpunk2077.jpg"
};

let carrito = [];
let total = 0;
let epocaSeleccionada = "antigua";
let mostrarTodos = false;

// ===================== CARGAR JUEGOS =====================
async function cargarJuegos(){

    try{

        const res = await fetch(epocaSeleccionada + ".txt");
        const data = await res.text();

        let html = "";

        const lineas = data.trim().split("\n");

        for(let i=0;i<lineas.length;i++){

            if(!mostrarTodos && i>=3) continue;

            const d = lineas[i].split(";");

            const nombre = d[0];
            const precio = parseFloat(d[3]);

            const img = imagenes[nombre] || "img/sin.jpg";

            html += `
            <div class="juego">

                <img src="${img}">

                <h3>${nombre}</h3>

                <p>USD ${precio}</p>

                <button onclick="agregar('${nombre}',${precio})">
                    Agregar
                </button>

            </div>
            `;
        }

        document.getElementById("catalogo").innerHTML = html;

    }catch(e){
        console.log(e);
    }
}

// ===================== ÉPOCAS =====================
function seleccionarEpoca(e){
    epocaSeleccionada = e;
    cargarJuegos();
}

// ===================== CARRITO =====================
function agregar(nombre,precio){

    carrito.push({nombre,precio});
    total += precio;

    actualizar();
}

function eliminar(i){

    total -= carrito[i].precio;
    carrito.splice(i,1);

    actualizar();
}

function actualizar(){

    document.getElementById("cantidadCarrito").innerText = carrito.length;

    let html = "";

    carrito.forEach((j,i)=>{

        html += `
        <div class="itemCarrito">

            ${j.nombre} - $${j.precio}

            <button onclick="eliminar(${i})">❌</button>

        </div>
        `;
    });

    document.getElementById("listaCarrito").innerHTML = html;

    document.getElementById("total").innerHTML =
        "<b>Total: USD " + total.toFixed(2) + "</b>";
}

// ===================== BUSCAR =====================
function buscarJuego(){

    const t = document.getElementById("buscar").value.toLowerCase();

    document.querySelectorAll(".juego").forEach(j=>{

        const name = j.querySelector("h3").innerText.toLowerCase();

        j.style.display = name.includes(t) ? "block" : "none";
    });
}

// ===================== MÁS JUEGOS =====================
function mostrarMas(){
    mostrarTodos = true;
    cargarJuegos();
}

// ===================== PAGAR =====================
function pagar(){

    if(carrito.length === 0){
        alert("Carrito vacío");
        return;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    window.location.href = "pago.html";
}

// ===================== INICIO =====================
window.onload = ()=>{
    cargarJuegos();
    actualizar();
};