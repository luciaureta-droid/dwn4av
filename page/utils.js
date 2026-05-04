export function createPage(content) {
    let html = "";
    html += `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Veterinaria Lu</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="/css/estilos.css">
    </head>
    <body class="bg-light">`;

    // Estructura con Navbar d
    html += `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div class="container">
            <a class="navbar-brand text-warning fw-bold" href="/">VETERINARIA LU</a>
            <div class="navbar-nav">
                <a class="nav-link" href="/productos">Productos</a>
                <a class="nav-link text-info fw-bold" href="/clientes">Clientes</a>
                
                <a class="nav-link" href="/productos?seccion=perros">Perros</a>
                <a class="nav-link" href="/productos?seccion=gatos">Gatos</a>
                <a class="nav-link" href="/productos?seccion=aves">Aves</a>
                <a class="nav-link" href="/productos?seccion=peces">Peces</a>
                <a class="nav-link" href="/contacto">Contacto</a>
            </div>
        </div>
    </nav>

    <div class="container bg-white p-4 shadow-sm rounded-3">
        ${content}
    </div>

    <footer class="text-center p-4 mt-4 text-muted">
        <hr>
        <p>Examen Parcial - Lucia - 2026</p>
    </footer>
    `;

    html += `</body></html>`;
    return html;
}

export default { createPage };