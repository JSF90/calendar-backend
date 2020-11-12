const {response} = require('express');
const { validationResult } = require('express-validator');

// Custom middleware: si hay error en los campos responder con error
// si no hay error llamar next() y que se ejecute el controler correspondiente
const fieldsValidator = (req, res=response, next) => {
    // Manejo de errores
    const errors = validationResult(req);  // erros es un objeto de express-validator
    if(!errors.isEmpty()){
        return res.status(400).json({ ok: false, errors: errors.mapped() })
    }
    next();  // se llama next si no hay errores 
}

module.exports = {
    fieldsValidator
}