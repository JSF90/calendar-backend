const {response, request} = require('express');
const Event = require('../models/Event');


const getEventsList = async (req, res=response) => {
    const events = await Event.find().populate('user', 'name');
    res.status(200).json({ ok: true, events});
}


const postCreateEvent = async (req, res=response) => {
    const event = new Event(req.body);
    event.user = req.uid;                           // agregamos el user porque es requerido
    try {
        const eventSaved =  await event.save();
        res.status(201).json({ ok: true, event: eventSaved })

    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Por favor hable con el admin'})
    }
}
 

const putUpdateEvent = async (req, res=response) => {
    const eventId = req.params.id;
    const uid = req.uid
    try {
        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404).json({ ok: false, msg: 'No existe evento con ese id' })
        }
        if(event.user.toString() !== uid){
            // los id que vengan de la base de datos son objetos asi que debo llevarlos a string para la comparacion
            return res.status(401).json({ ok: false, msg: 'No puede editar este evento' })
        }
        const eventToUpdate = {...req.body, user: uid}
        // findByIdAndUpdate devuelve el anterior antes de la actualizacion para retornar el actualizado hay que usar otro config en el 3er parametro
        const eventUpdated = await Event.findByIdAndUpdate(eventId, eventToUpdate, {new: true}) // con esta config retorno ya el objeto actualizado
        res.status(200).json({ ok: true, event: eventUpdated })

    } catch (error) {
        console.log(error)
        res.status(500).json({  ok: false, msg: 'Por favor hable con el admin' })
    }
}
 

const deleteEvent = async (req, res=response) => {
    const eventId = req.params.id;
    const {uid} = req
    try {
        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404).json({ ok: false, msg: 'No existe evento con ese id' })
        }
        if(event.user.toString() !== uid){
            return res.status(401).json({ ok: false, msg: 'No puede borrar este evento' })
        }
        await Event.findByIdAndDelete(eventId) // podemos regresar el evento borrado pero manejaremos asi de esta forma
        res.status(200).json({ ok: true })

    } catch (error) {
        console.log(error)
        res.status(500).json({  ok: false, msg: 'Por favor hable con el admin' })
    }
}
     

module.exports = {
    getEventsList,
    postCreateEvent,
    putUpdateEvent,
    deleteEvent
} 