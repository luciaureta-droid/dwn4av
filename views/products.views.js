import { createPage } from "../page/utils.js"

export function createProductList(productos) {
    let html = ""
    html += "<h1>Nuestros Productos</h1>"
    html += "<a href='/productos/agregar' class='btn'>+ Nuevo producto</a>"
    html += "<div style='display: flex; flex-wrap: wrap; gap: 20px;'>" // Un poquito de orden

    productos.forEach(producto => {
        html += `
        <div style="border: 1px solid #ccc; padding: 10px; width: 200px; border-radius: 8px;">
            <img src="${producto.img || 'https://picsum.photos/200'}" style="width: 100%; border-radius: 4px;">
            <h3>${producto.nombre}</h3>
            <p>Sección: ${producto.seccion}</p>
            <a href="/productos/${producto._id}">Ver Detalle</a> | 
            <a href="/productos/editar/${producto._id}">Editar</a>
        </div>`
    })
    
    html += "</div>"
    return createPage(html)
}

export function createProductPage(producto) {
    let html = ""
    html += "<h1>Detalle del Producto</h1>"
    // 1. Imagen
    html += `<img src="${producto.img || 'https://picsum.photos/400/225'}" style="max-width: 400px; display: block; margin-bottom: 20px;">`
    // 2. Nombre
    html += "<h2>" + producto.nombre + "</h2>"
    // 3. Descripción
    html += "<p><strong>Descripción:</strong> " + (producto.descripcion || "Sin descripción") + "</p>"
    // 4. Precio
    html += "<p><strong>Precio:</strong> $" + producto.precio + "</p>"
    // 5. Link (El link externo que pide la consigna)
    html += `<p><strong>Link Externo:</strong> <a href="${producto.link || '#'}" target="_blank">Visitar sitio del fabricante</a></p>`
    
    html += "<p><small>Categoría: " + producto.seccion + "</small></p>"
    html += "<br><a href='/productos'>Volver al listado</a>"
    
    return createPage(html)
}

export function create404Page() {
    let html = ""
    html += "<h1>404 page not found</h1>"
    html += "<a href='/productos' >Volver</a>"
    return createPage(html)
}

export function createProductForm() {
    let html = ""
    html += "<h2>Agregar nuevo producto</h2>"
    html += "<form action='/productos/agregar' method='post'>"
    html += "<div><label>Nombre</label><input type='text' name='nombre' required /></div>"
    html += "<div><label>Precio</label><input type='number' name='precio' required /></div>"
    html += "<div><label>Descripción</label><textarea name='descripcion'></textarea></div>"
    html += "<div><label>Imagen (URL)</label><input type='text' name='img' placeholder='https://picsum.photos/400/225' /></div>"
    html += "<div><label>Link Externo</label><input type='text' name='link' /></div>"
    html += "<div><label>Sección</label><input type='text' name='seccion' placeholder='perros, gatos, aves...' /></div>"
    html += "<input type='submit' value='Agregar Producto' />"
    html += "</form>"
    html += "<br><a href='/productos'>Volver</a>"
    return createPage(html)
}
export function editProductForm(producto) {
    let html = ""
    html += "<h2>Editar producto</h2>"
    // CAMBIO: usamos producto._id
    html += `<form action='/productos/editar/${producto._id}' method='post'>`
    html += "<div class='m-3' >"
    html += "<label class='form-label' >Nombre</label>"
    html += `<input class='form-control' type='text' name='nombre' value='${producto.nombre}'/>`
    html += "</div>"
    
    // Agreguemos los campos nuevos al editar también, así podés cambiar la foto
    html += "<div class='m-3'>"
    html += "<label class='form-label'>Imagen URL</label>"
    html += `<input class='form-control' type='text' name='img' value='${producto.img || ''}' />`
    html += "</div>"
    
    html += "<div class='m-3'>"
    html += "<label class='form-label'>Precio</label>"
    html += `<input class='form-control' type='text' name='precio' value='${producto.precio}' />`
    html += "</div>"
    
    html += "<button class='btn btn-primary' type='submit' >guardar</button>"
    html += "</form>"
    html += "<a href='/productos' >Volver</a>"
    return createPage(html)
}

export function deleteProduct(producto) {
    let html = ""
    html += "<h1>Borrar Producto</h1>"
    // CAMBIO: usamos producto._id
    html += `<form action='/productos/borrar/${producto._id}' method='post'>`
    html += "<p>ID: " + producto._id + "</p>"
    html += "<h2>" + producto.nombre + "</h2>"
    html += "<p>$" + producto.precio + "</p>"
    html += "<p>¿Estás seguro de que querés eliminar este producto?</p>"
    html += "<input type='submit' value='Sí, borrar'>"
    html += "</form>"
    html += "<a href='/productos' >Volver</a>"
    return createPage(html)
}
export function createContactoPage() {
    let html = `
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h2 class="text-primary mb-4 text-center border-bottom pb-2">Contactanos</h2>
            <form action="/comentario" method="post" class="p-4 border rounded bg-light shadow-sm">
                <div class="mb-3">
                    <label class="form-label fw-bold">Tu Email</label>
                    <input type="email" name="email" class="form-control" placeholder="nombre@ejemplo.com" required>
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold">Mensaje / Comentario</label>
                    <textarea name="comentario" class="form-control" rows="4" placeholder="Escribí aquí tu consulta..." required></textarea>
                </div>
                <button type="submit" class="btn btn-primary w-100 shadow-sm">Enviar Comentario</button>
            </form>
            <div class="mt-4 text-center text-muted">
                <small>📍 Estamos en Bella Vista, Buenos Aires</small>
            </div>
        </div>
    </div>
    `;
    
    // RETORNAMOS envolviendo con createPage para que herede el diseño de utils.js
    return createPage(html);
}