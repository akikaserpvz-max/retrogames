alert("SCRIPT FUNCIONA");

function cargarJuegos() {
    document.getElementById("catalogo").innerHTML =
        "<h2>Los juegos cargaron correctamente</h2>";
}

window.onload = cargarJuegos;                     alt="${nombre}"
                     onerror="this.src='img/sin.jpg'">

                <div class="info">

                    <h3>${nombre}</h3>

                    <p>${epoca}</p>
                    <p>${tam}</p>
                    <p>USD ${precio.toFixed(2)}</p>
                    <p>${anio}</p>

                    <button
                        type="button"
                        onclick='agregar(${JSON.stringify(nombre)}, ${precio})'>
                        Agregar al carrito
                    </button>

                </div>

            </div>
            `;
        }

        document.getElementById("catalogo").innerHTML = html;

    } catch (error) {

        console.error(error);

        document.getElementById("catalogo").innerHTML = `
            <h2>Error al cargar los juegos</h2>
            <p>${error.message}</p>
        `;
    }
}

function seleccionarEpoca(epoca) {
    epocaSeleccionada = epoca;
    mostrarTodos = false;
    cargarJuegos();
}

function agregar(nombre, precio) {

    carrito.push({
        nombre,
        precio: Number(precio)
    });

    guardarCarrito();
    actualizar();
}

function eliminar(i) {

    carrito.splice(i, 1);

    guardarCarrito();
    actualizar();
}

function actualizar() {

    document.getElementById("cantidadCarrito").innerText = carrito.length;

    let html = "";
    total = 0;

    carrito.forEach((j, i) => {

        total += Number(j.precio);

        html += `
        <div class="itemCarrito">

            ${j.nombre} - USD ${Number(j.precio).toFixed(2)}

            <button onclick="eliminar(${i})">
                ❌
            </button>

        </div>
        `;
    });

    document.getElementById("listaCarrito").innerHTML = html;

    document.getElementById("total").innerHTML =
        `<b>Total: USD ${total.toFixed(2)}</b>`;
}

function buscarJuego() {

    const texto = document
        .getElementById("buscar")
        .value
        .toLowerCase();

    document.querySelectorAll(".juego").forEach(juego => {

        const nombre = juego
            .querySelector("h3")
            .innerText
            .toLowerCase();

        juego.style.display =
            nombre.includes(texto) ? "block" : "none";
    });
}

function mostrarMas() {
    mostrarTodos = true;
    cargarJuegos();
}

function pagar() {

    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    window.location.href = "pago.html";
}

window.onload = function () {
    cargarJuegos();
    actualizar();
};                    <h3>${nombre}</h3>

                    <p>Época: ${epoca}</p>
                    <p>Tamaño: ${tam}</p>
                    <p>USD ${precio.toFixed(2)}</p>
                    <p>Año: ${anio}</p>

                    <button onclick='agregar(${JSON.stringify(nombre)}, ${precio})'>
                        Agregar al carrito
                    </button>

                </div>

            </div>
            `;
        }

        document.getElementById("catalogo").innerHTML = html;

    } catch (error) {

        console.error(error);

        document.getElementById("catalogo").innerHTML = `
            <h2>Error al cargar los juegos</h2>
        `;
    }
}

function seleccionarEpoca(epoca) {
    epocaSeleccionada = epoca;
    mostrarTodos = false;
    cargarJuegos();
}

function agregar(nombre, precio) {

    carrito.push({
        nombre: nombre,
        precio: Number(precio)
    });

    guardarCarrito();
    actualizar();

    alert(nombre + " agregado al carrito");
}

function eliminar(i) {

    carrito.splice(i, 1);

    guardarCarrito();
    actualizar();
}

function actualizar() {

    document.getElementById("cantidadCarrito").innerText = carrito.length;

    let html = "";
    total = 0;

    carrito.forEach((j, i) => {

        total += Number(j.precio);

        html += `
        <div class="itemCarrito">

            ${j.nombre} - USD ${Number(j.precio).toFixed(2)}

            <button onclick="eliminar(${i})">
                ❌
            </button>

        </div>
        `;
    });

    document.getElementById("listaCarrito").innerHTML = html;

    document.getElementById("total").innerHTML =
        `<b>Total: USD ${total.toFixed(2)}</b>`;
}

function buscarJuego() {

    const texto = document
        .getElementById("buscar")
        .value
        .toLowerCase();

    document.querySelectorAll(".juego").forEach(juego => {

        const nombre = juego
            .querySelector("h3")
            .innerText
            .toLowerCase();

        juego.style.display =
            nombre.includes(texto) ? "block" : "none";
    });
}

function mostrarMas() {
    mostrarTodos = true;
    cargarJuegos();
}

function irAPago() {

    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    window.location.href = "pago.html";
}

window.onload = () => {
    cargarJuegos();
    actualizar();
};                </div>
            `;
        }

        document.getElementById("catalogo").innerHTML = html;

    } catch (error) {

        console.error(error);

        document.getElementById("catalogo").innerHTML = `
            <div style="padding:20px;color:red;">
                <h2>Error al cargar los juegos</h2>
                <p>${error.message}</p>
            </div>
        `;
    }
}
