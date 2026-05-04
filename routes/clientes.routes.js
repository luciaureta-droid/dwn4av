import express from "express"
import * as controller from "../controllers/clientes.controllers.js"

const route = express.Router()

route.get("/clientes", controller.getClientes)
route.get("/clientes/:id/productos", controller.getProductosByCliente)

export default route
