import express from 'express'
import * as controllers from "../controllers/products.controllers.js"

const router = express.Router()

router.get("/productos", controllers.getProductos)
router.get("/productos/:id", controllers.getProductoById)
router.post("/productos", controllers.guardarProducto)
router.delete("/productos/:id", controllers.borrarProducto)
router.patch("/productos/:id", controllers.actualizarProducto)
router.put("/productos/:id", controllers.reemplazarProducto)

export default router