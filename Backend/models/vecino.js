const mongoose = require("mongoose");

const VecinoSchema = new mongoose.Schema(
    {
        nombre:{
            type: String,
            required: true,
        },
        numeroID:{
            type: Number,
            required:true,
        },
        telefono:{
            type: Number,
            required: true,
        },
        direccion:{
            type: String,
            required: true,
        },
        edad:{
            type: Number,
            required: true,
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Vecino", VecinoSchema);