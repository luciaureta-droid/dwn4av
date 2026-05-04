import * as service from "../../services/clientes.services.js"
// 1. Obtener todos los clientes
export function getClientes(req, res) {
    const filter = req.query
    return service.getClientes(filter)
        .then(clientes => res.status(200).json(clientes))
        .catch(err => res.status(500).json({ message: "No se pueden obtener los clientes" }))
}

// 2. Obtener un cliente por ID
export function getClienteById(req, res) {
    const id = req.params.id;
    return service.getClienteById(id)
        .then(cliente => {
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente no encontrado' });
            }
            res.status(200).json({ data: cliente });
        })
        .catch(err => res.status(500).json({ message: "Error interno del servidor" }))
}

// 3. Guardar Cliente (POST)
export function guardarCliente(req, res) {
    const cliente = {
        "nombre": req.body.nombre,
        "foto": req.body.foto,
        "descripcion": req.body.descripcion,
        "tipo": req.body.tipo || "nuevo"
    }
    service.saveCliente(cliente)
        .then(clienteGuardado => res.status(201).json(clienteGuardado))
        .catch(err => res.status(500).json({ message: "Error al intentar guardar el cliente" }))
}

// 4. Borrar Cliente (DELETE)
export function borrarCliente(req, res) {
    const id = req.params.id
    service.deleteCliente(id)
        .then((resultado) => {
            if (resultado) {
                res.status(202).json(resultado)
            } else {
                res.status(404).json({ message: "No se pudo encontrar el cliente" })
            }
        })
        .catch(err => res.status(500).json({ message: "No se pudo borrar el cliente" }))
}

// 5. Actualizar Cliente (PATCH/PUT)
export async function actualizarCliente(req, res) {
    const id = req.params.id
    const antiguo = await service.getClienteById(id)
    
    const nuevo = {
        "_id": id,
        "nombre": req.body?.nombre ? req.body.nombre : antiguo.nombre,
        "foto": req.body?.foto ? req.body.foto : antiguo.foto,
        "descripcion": req.body?.descripcion ? req.body.descripcion : antiguo.descripcion
    }

    service.editClienteById(nuevo)
        .then(editado => {
            res.status(202).json(editado)
        })
        .catch(err => res.status(500).json({ message: "Error al actualizar el cliente" }))
}