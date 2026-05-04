import { createPage } from "../page/utils.js"
import * as productsService from "../services/products.services.js"
import * as productsView from "../views/products.views.js"

export function getProductos(req, res) {
    // 1. Agregamos 'minimo' aquí para que el controlador lo vea
    const { seccion, maximo, minimo } = req.query; 

    // 2. Se lo pasamos al service (fijate que el orden coincida con tu service)
    productsService.getProductos(seccion, maximo, minimo)
        .then(productos => {
            res.send(productsView.createProductList(productos));
        }) 
        .catch(err => {
            console.error("Error en Controller:", err);
            res.status(500).send("Error al cargar la página de productos");
        });
}

//contacto
export function contactoPage(req, res) {
    const html = productsView.createContactoPage();
    res.send(html);
}
export function getProductosById(req, res){
    const id = req.params.id
    productsService.getProductosById(id)
         .then(producto => res.send(productsView.createProductPage(producto))) 
        .catch(err => res.send(productsView.create404Page())) 
}

export function productForm(req, res){
    res.send( productsView.createProductForm() ) 
}

export function productSave(req, res) {
    const producto = req.body
    productsService.productSave(producto)
        .then((productoGuardado) => res.send(productsView.createProductPage(productoGuardado)))
        .catch((err) => res.send("No se pudo guardar el archivo"))
}

export function editProductForm(req, res) {
    const id = req.params.id
    productsService.getProductosById(id)
        .then(producto => res.send(productsView.editProductForm(producto)))
        .catch((err) => res.send("No se pudo editar el archivo"))
}

export function productEdit(req, res) {
    const id = req.params.id
    const producto = req.body 
    
    productsService.editProductosById(id, producto)
        .then(idEditado => {
            return productsService.getProductosById(idEditado)
        })
        .then(productoCompleto => res.send(productsView.createProductPage(productoCompleto)))
        .catch(err => res.send("No se pudo editar"))
}

export function deleteProductform(req, res){
    const id = req.params.id
    productsService.getProductosById(id)
        .then(producto => {
            res.send(productsView.deleteProduct(producto)) 
        })
        .catch((err) => res.send("No se pudo cargar la pantalla de borrar"))
}

export function deleteProduct(req, res){
    const id = req.params.id
    productsService.deleteProduct( id )
        .then(producto => res.send(productsView.createProductPage(producto)))
        .catch( err => res.send("No se pudo borrar") )
}
