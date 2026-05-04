import { createPage } from "../page/utils.js"

export function createClienteList(clientes) {
    let html = ""
    html += "<h1>Nuestros Clientes</h1>"
    
    // Filtros rápidos (Como él hizo con Marvel/DC, nosotros podemos hacer por tipo de cliente)
    html += "<div class='mb-3'>"
    html += "<a href='/clientes?tipo=frecuente' class='btn btn-outline-primary btn-sm'>Frecuentes</a> | "
    html += "<a href='/clientes?tipo=nuevo' class='btn btn-outline-secondary btn-sm'>Nuevos</a>"
    html += "</div>"

    html += "<div class='row'>"

    clientes.forEach(cliente => {
        html += `
        <div class="col-md-4 mb-4">
            <div class="card shadow-sm h-100">
                <img src="${cliente.foto || 'https://picsum.photos/200'}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${cliente.nombre}</h5>
                    <p class="card-text">${cliente.descripcion}</p>
                    <hr>
                    <a href="/clientes/${cliente._id}/productos" class="btn btn-warning w-100">Ver sus Mascotas</a>
                </div>
            </div>
        </div>`
    })

    html += "</div>"
    html += "<br><a href='/productos'>Volver a Productos</a>"
    
    return createPage(html)
}
// Agregá esto al final de views/clientes.views.js
export function createProductList(productos) {
    let html = "<h1>Mascotas de este cliente</h1>"
    html += "<div class='row'>"
    productos.forEach(p => {
        html += `
        <div class="col-md-4 mb-3">
            <div class="card p-2">
                <img src="${p.img || 'https://picsum.photos/200'}" class="card-img-top">
                <h5>${p.nombre}</h5>
                <p>${p.descripcion || ''}</p>
            </div>
        </div>`
    })
    html += "</div><a href='/clientes' class='btn btn-secondary'>Volver a Clientes</a>"
    return createPage(html)
}