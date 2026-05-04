import express from "express"
import cors from "cors"

// RUTAS DE VISTAS (FRONT)
import ProductRoutes from "./routes/products.routes.js" 
import ClienteRoutes from "./routes/clientes.routes.js" 

// RUTAS DE API (BACK)
import ProductRoutesApi from "./api/routes/products.routes.js" 
import ClienteRoutesApi from "./api/routes/clientes.routes.js" 

const app = express()

app.use(cors()) 
app.use("/", express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// ENLACE DE RUTAS
app.use(ProductRoutes)
app.use(ClienteRoutes) //

app.use("/api", ProductRoutesApi)
app.use("/api", ClienteRoutesApi) //
//Puerto corriendo en 3333
app.listen(3333, () => console.log("Servidor Ureta- Lucia funcionando en http://localhost:3333"))