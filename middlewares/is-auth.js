const {response} = require('express');
const jwt = require('jsonwebtoken');

// el profe lo llamo jwtValidator
const isAuth = (req, res=response, next) => {
    // x-token headers - enviare el token en una peticion get en los headers
    const token = req.header('x-token');
        if(!token){
            // status 401 es no esta authenticado
            return res.status(401).json({ok: false, msg:'token no existe'})
        }

        try {
            // el payload (esta desesturturado) es el token decodificado
            const {uid, name} = jwt.verify(token, process.env.SECRET_JWT_SEED)
            req.uid = uid;
            req.name = name;
        } catch (error) {
            return res.status(401).json({ok: false, msg: 'Token no valido'})
        }
    next()
}


module.exports = {
    isAuth
}