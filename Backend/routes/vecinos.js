const express = require("express");
const router = express.Router();
const Vecino = require("../models/vecino");

//Método Get - Obntener los vecinos

router.get("/", async (req, res) => {
    try{
        const respuesta = await Vecino.find();
        res.json(respuesta);
    }
    catch (error) {
        res.status(500).json({error: "Error obteniendo los Vecinos"});
    }
});

//Método Post - Crear un Vecino

router.post("/", async (req,res) =>{
    try{
        const Nuevo = new Vecino(req.body);
        await Nuevo.save();
        res.status(201).json(Nuevo);
    }
    catch (error){
        res.status(400).json({error: "Error creando el Vecino"});
    }
});

//método Put - Actualizar Vecino

router.put("/:id", async (req, res) =>{
    try{
        const actualizado = await Vecino.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new:true }  //Retorna el documento ya actualizado
        );

        if (!actualizado) {
            return res.status(404).json({error: "Vecino no encontrado"})
        }

        res.json(actualizado);
    }
    catch(error){
        res.status(400).josn({error: "Error actualizando el Vecino"})
    }
});

//Método Delete

router.delete("/:id", async (req, res) => {
    try{
        const eliminado = await Vecino.findByIdAndDelete(req.params.id);

        if (!eliminado){
            return res.status(404).json({error: "Vecino no encontrado"});
        }

        res.json({mensaje: "Vecino eliminado correctamente"})
    }
    catch (error){
        res.status(404).json({error: "Error eliminando el Vecino"})
    }
});

module.exports = router;