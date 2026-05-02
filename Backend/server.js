const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
require("dotenv").config();

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//Conexión a MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Conectado a Mongo Atlas"))
    .catch((err) => console.log("Error de conexión con Mongo Atlas", err));

//Rutas
//Para herramientas
const herramientasRoutes = require("./routes/herramientas");
app.use("/api/herramientas", herramientasRoutes);

//Para Vecinos
const vecinosRoutes = require("./routes/vecinos");
app.use("/api/vecinos", vecinosRoutes);

//Para prestamos
const prestamosRoutes = require("./routes/prestamos");
app.use("/api/prestamos", prestamosRoutes);

//Servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en el puerto: ${PORT}`);
})