import express from 'express'
import * as controller from "../../api/controllers/clientes.controllers.js"

const router = express.Router()

router.get("/clientes", controller.getClientes)
router.get("/clientes/:id", controller.getClienteById)
router.post("/clientes", controller.guardarCliente)
router.delete("/clientes/:id", controller.borrarCliente)
router.patch("/clientes/:id", controller.actualizarCliente)

export default router