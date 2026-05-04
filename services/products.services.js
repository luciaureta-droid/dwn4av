import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb+srv://admin:admin@veterinaria.rryx9ti.mongodb.net/");
const db = client.db("AH20232CP1");
// Agregamos 'precioMin' y 'precioMax' como parámetros
export async function getProductos(seccion, precioMax, precioMin) { 
    try {
        await client.connect()
        
        const filtro = { borrado: { $ne: true } }

        if (seccion) {
            filtro.seccion = seccion
        }

        // Lógica para rangos de precio
        if (precioMax || precioMin) {
            filtro.precio = {}
            if (precioMax) filtro.precio.$lte = parseInt(precioMax) // Menor o igual
            if (precioMin) filtro.precio.$gte = parseInt(precioMin) // Mayor o igual
        }

        return await db.collection("veterinaria").find(filtro).toArray()
        
    } catch (error) {
        console.error("Error en DB:", error)
        return []
    }
}
export async function getProductosById(id) {
    try {
        await client.connect()
        return await db.collection("veterinaria").findOne({ _id: new ObjectId(id) })
    } catch (error) { return {} }
}

export async function productSave(producto) {
    try {
        await client.connect()
        // IMPORTANTE: Convertimos el precio a número antes de guardar
        // para que el filtro $lte funcione después
        if (producto.precio) {
            producto.precio = parseInt(producto.precio)
        }
        return await db.collection("veterinaria").insertOne(producto)
    } catch (error) { throw new Error(error) }
}

export async function editProductosById(id, producto) {
    try {
        await client.connect()
        // También convertimos a número al editar
        if (producto.precio) {
            producto.precio = parseInt(producto.precio)
        }
        await db.collection("veterinaria").updateOne(
            { _id: new ObjectId(id) }, 
            { $set: producto }
        )
        return id
    } catch (error) { throw new Error(error) }
}

export async function deleteProduct(id) {
    try {
        await client.connect()
        await db.collection("veterinaria").updateOne(
            { _id: new ObjectId(id) }, 
            { $set: { borrado: true } }
        )
        return id
    } catch (error) { throw new Error(error) }
}