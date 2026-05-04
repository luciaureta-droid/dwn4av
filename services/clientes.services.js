import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb+srv://admin:admin@veterinaria.rryx9ti.mongodb.net/");
const db = client.db("AH20232CP1");

// 1. Obtener todos los clientes (con filtro opcional)
export async function getClientes(filter = {}) {
    try {
        await client.connect()
        return await db.collection("Clientes").find(filter).toArray()
    } catch (error) { return [] }
}

// 2. Obtener un cliente por su ID
export async function getClienteById(id) {
    try {
        await client.connect()
        return await db.collection("Clientes").findOne({ _id: new ObjectId(id) })
    } catch (error) { return null }
}

// 3. Obtener productos vinculados a un cliente
export async function getProductosByCliente(clienteId) {
    try {
        await client.connect()
        // Buscamos en la colección 'veterinaria' los productos que tengan el cliente_id
        return await db.collection("veterinaria").find({ 
            cliente_id: new ObjectId(clienteId),
            borrado: { $ne: true } 
        }).toArray()
    } catch (error) { return [] }
}

// 4. Guardar (para la API)
export async function saveCliente(cliente) {
    await client.connect()
    return await db.collection("Clientes").insertOne(cliente)
}

// 5. Borrar (para la API)
export async function deleteCliente(id) {
    await client.connect()
    return await db.collection("Clientes").deleteOne({ _id: new ObjectId(id) })
}

// 6. Editar (para la API)
export async function editClienteById(cliente) {
    await client.connect()
    const { _id, ...data } = cliente
    return await db.collection("Clientes").updateOne(
        { _id: new ObjectId(_id) },
        { $set: data }
    )
}