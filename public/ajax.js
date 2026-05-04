function cargarProductos() {
    const contenedor = document.getElementById('contenedor-productos');
    const titulo = document.getElementById('titulo-seccion');

    // 1. Detectar la sección desde la URL (ej: ?seccion=gatos)
    const params = new URLSearchParams(window.location.search);
    const seccion = params.get('seccion');

    // Actualizamos el título según la sección
    if (seccion) {
        titulo.innerText = "Sección: " + seccion.toUpperCase();
    } else {
        titulo.innerText = "Nuestros Productos";
    }

    // 2. Armar la URL de la API
    let url = 'http://localhost:3333/api/productos';
    if (seccion) {
        url += '?seccion=' + seccion;
    }

    // 3. Pedir los datos al servidor
    fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(res => {
        if (!res.ok) throw new Error("Error en el servidor");
        return res.json();
    })
    .then(productos => {
        contenedor.innerHTML = ""; // Limpiar el "Cargando..."

        // Si no hay productos
        if (!productos || productos.length === 0) {
            contenedor.innerHTML = "<h3>No hay productos en esta sección.</h3>";
            return;
        }

        // 4. Dibujar las tarjetas (Cards)
        productos.forEach(p => {
            contenedor.innerHTML += `
                <div class="card" style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin: 10px; width: 250px; display: inline-block; vertical-align: top; background: white; box-shadow: 0 2px 5px rgba(0,0,0,0.1); text-align: left;">
                    <h3 style="color: #333; margin-top: 0;">${p.nombre}</h3>
                    <p style="color: #27ae60; font-weight: bold; font-size: 1.2em;">$${p.precio}</p>
                    <p style="font-size: 0.9em; color: #666; min-height: 40px;">${p.descripcion || 'Sin descripción'}</p>
                    <hr style="border: 0; border-top: 1px solid #eee;">
                    <small style="color: #999; font-style: italic;">Categoría: ${p.seccion || 'General'}</small>
                </div>
            `;
        });
    })
    .catch(err => {
        console.error("Error en el AJAX:", err);
        contenedor.innerHTML = "<h3>Error al cargar los productos.</h3>";
    });
}

//  Llamamos a la función para que arranque sola
cargarProductos();