import express from "express"
import * as productsController from "../controllers/products.controllers.js"

const route = express.Router()

route.get("/productos", productsController.getProductos)
route.get("/productos/agregar", productsController.productForm)
route.post("/productos/agregar", productsController.productSave)
route.get("/productos/editar/:id", productsController.editProductForm)
route.post("/productos/editar/:id", productsController.productEdit)
route.get("/productos/borrar/:id", productsController.deleteProductform)
route.post("/productos/borrar/:id", productsController.deleteProduct)

route.get("/productos/:id", productsController.getProductosById)
route.get("/contacto", productsController.contactoPage);

route.post("/comentario", (req, res) => {
    const { email, comentario } = req.body;

    console.log("--- NUEVO MENSAJE DE CONTACTO ---");
    console.log("Email:", email);
    console.log("Mensaje:", comentario);
    console.log("---------------------------------");

    res.send(`
        <div style="text-align:center; margin-top:50px; font-family:sans-serif;">
            <h1>¡Gracias!</h1>
            <p>Tu comentario fue recibido con éxito.</p>
            <a href="/productos">Volver al inicio</a>
        </div>
    `);
});

export default route