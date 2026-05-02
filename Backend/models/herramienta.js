const mongoose = require("mongoose");

const HerramientaSchema = new mongoose.Schema(
    {
        nombre:{
            type: String,
            required: true,
        },
        tipo:{
            type: String,
            required:true,
        },
        estado:{
            type: String,
            required: true,
        },
        disponible:{
            type: Boolean,
            required: true,
        },
        fotoURL:{
            type: String,
            required: true,
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Herramienta", HerramientaSchema);