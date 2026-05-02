const express = require("express");
const router = express.Router();
const Prestamo = require("../models/prestamo");

//Método Get - Obntener los préstamos

router.get("/", async (req, res) => {
    try{
        const respuesta = await Prestamo.find();
        res.json(respuesta);
    }
    catch (error) {
        res.status(500).json({error: "Error obteniendo los Prestamos"});
    }
});

//Método Post - Crear un Prestamo

router.post("/", async (req,res) =>{
    try{
        const Nuevo = new Prestamo(req.body);
        await Nuevo.save();
        res.status(201).json(Nuevo);
    }
    catch (error){
        res.status(400).json({error: "Error creando el Prestamo"});
    }
});

//método Put - Actualizar Prestamo

router.put("/:id", async (req, res) =>{
    try{
        const actualizado = await Prestamo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new:true }  //Retorna el documento ya actualizado
        );

        if (!actualizado) {
            return res.status(404).json({error: "Prestamo no encontrado"})
        }

        res.json(actualizado);
    }
    catch(error){
        res.status(400).josn({error: "Error actualizando el Prestamo"})
    }
});

//Método Delete

router.delete("/:id", async (req, res) => {
    try{
        const eliminado = await Prestamo.findByIdAndDelete(req.params.id);

        if (!eliminado){
            return res.status(404).json({error: "Prestamo no encontrado"});
        }

        res.json({mensaje: "Prestamo eliminado correctamente"})
    }
    catch (error){
        res.status(404).json({error: "Error eliminando el Prestamo"})
    }
});

module.exports = router;