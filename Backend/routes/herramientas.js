const express = require("express");
const router = express.Router();
const Herramienta = require("../models/herramienta");

//Método Get - Obntener las herramientas

router.get("/", async (req, res) => {
    try{
        const respuesta = await Herramienta.find();
        res.json(respuesta);
    }
    catch (error) {
        res.status(500).json({error: "Error obteniendo las herramientas"});
    }
});

//Método Post - Crear una herramienta

router.post("/", async (req,res) =>{
    try{
        console.log("Datos recibidos: ", req.body)
        const Nuevo = new Herramienta(req.body);
        await Nuevo.save();

        console.log("Guardado Exitoso")
        res.status(201).json(Nuevo);
    }
    catch (error){
        res.status(400).json({error: "Error creando la herramienta"});
    }
});

//método Put - Actualizar herramienta

router.put("/:id", async (req, res) =>{
    try{
        const actualizado = await Herramienta.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new:true }  //Retorna el documento ya actualizado
        );

        if (!actualizado) {
            return res.status(404).json({error: "Herramienta no encontrada"})
        }

        res.json(actualizado);
    }
    catch(error){
        res.status(400).josn({error: "Error actualizando la herramienta"})
    }
});

//Método Delete

router.delete("/:id", async (req, res) => {
    try{
        const eliminado = await Herramienta.findByIdAndDelete(req.params.id);

        if (!eliminado){
            return res.status(404).json({error: "Herramienta no encontrada"});
        }

        res.json({mensaje: "Herramienta eliminada correctamente"})
    }
    catch (error){
        res.status(404).json({error: "Error eliminando la herramienta"})
    }
});

module.exports = router;