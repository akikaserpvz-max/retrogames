async function cargarJuegos() {

    try {

        const archivo = epocaSeleccionada + ".txt";

        const res = await fetch(archivo);

        if (!res.ok) {
            throw new Error(
                "No se encontró el archivo: " + archivo
            );
        }

        const data = await res.text();

        const lineas = data
            .replace(/\r/g, "")
            .trim()
            .split("\n");

        let html = "";

        for (let i = 0; i < lineas.length; i++) {

            if (!mostrarTodos && i >= 3) continue;

            const d = lineas[i].split(";");

            if (d.length < 5) continue;

            const nombre = d[0].trim();
            const epoca = d[1].trim();
            const tam = d[2].trim();
            const precio = parseFloat(d[3]);
            const anio = d[4].trim();

            const img = imagenes[nombre] || "img/sin.jpg";

            html += `
                <div class="juego">

                    <img
                        src="${img}"
                        alt="${nombre}"
                        onerror="this.src='img/sin.jpg'">

                    <div class="info">

                        <h3>${nombre}</h3>

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
            <div style="padding:20px;color:red;">
                <h2>Error al cargar los juegos</h2>
                <p>${error.message}</p>
            </div>
        `;
    }
}
