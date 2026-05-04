import * as service from "../services/clientes.services.js"
import * as view from "../views/clientes.views.js"

export function getClientes(req, res) {
    service.getClientes(req.query)
        .then(clientes => res.send(view.createClienteList(clientes)))
        .catch(err => res.status(500).send("Error al cargar clientes"))
}

export function getProductosByCliente(req, res) {
    const id = req.params.id
    service.getProductosByCliente(id)
        .then(productos => res.send(view.createProductList(productos)))
        .catch(err => res.status(500).send("Error al cargar mascotas"))
}