const mongoose = require("mongoose");

const PrestamoSchema = new mongoose.Schema(
    {
        idHerramienta:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Herramienta',
            required: true,
        },
        idVecino:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vecino',
            required:true,
        },
        fechaSalida:{
            type: Date,
            required: true,
        },
        fechaDevolucion:{
            type: Date,
        },
        estadoPrestamo:{
            type: String,
            required: true, //Prestado, devuelto, atrasado.
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Prestamo", PrestamoSchema);