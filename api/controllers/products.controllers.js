import * as service from "../../services/products.services.js"

// 1. Obtener todos los productos (con filtros de sección, precio mínimo y máximo)
export async function getProductos(req, res) {
    // Sacamos seccion, minimo y maximo
    const { seccion, minimo, maximo } = req.query;

    try {
        // Le pasamos todo al service
        const productos = await service.getProductos(seccion, minimo, maximo);
        res.status(200).json(productos);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
}

// 2. Obtener un producto por ID
export function getProductoById(req, res) {
    const id = req.params.id
    service.getProductosById(id)
        .then(function(producto) {
            if (producto) {
                res.status(200).json(producto)
            } else {
                res.status(404).json({ error: "Producto no encontrado" })
            }
        })
        .catch(function(err) {
            res.status(500).json({ error: "Error en el servidor" })
        })
}

// 3. Guardar un nuevo producto (POST)
export function guardarProducto(req, res) {
    service.productSave(req.body)
        .then(function(resultado) {
            res.status(201).json(resultado)
        })
        .catch(function(err) {
            res.status(400).json({ error: "No se pudo guardar el producto" })
        })
}

// 4. Borrar un producto (DELETE)
export function borrarProducto(req, res) {
    const id = req.params.id
    service.deleteProduct(id)
        .then(function(idResult) {
            res.status(200).json({ id: idResult, message: "Producto eliminado correctamente" })
        })
        .catch(function(err) {
            res.status(400).json({ error: "No se pudo eliminar el producto" })
        })
}

// 5. Actualizar parcialmente (PATCH)
export function actualizarProducto(req, res) {
    const id = req.params.id
    service.editProductosById(id, req.body)
        .then(function(idResult) {
            res.status(200).json({ id: idResult, message: "Producto actualizado" })
        })
        .catch(function(err) {
            res.status(400).json({ error: "No se pudo actualizar" })
        })
}

// 6. Reemplazar producto completo (PUT)
export function reemplazarProducto(req, res) {
    const id = req.params.id
    service.editProductosById(id, req.body)
        .then(function(idResult) {
            res.status(200).json({ id: idResult, message: "Producto reemplazado" })
        })
        .catch(function(err) {
            res.status(400).json({ error: "No se pudo reemplazar" })
        })
}