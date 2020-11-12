const {response} = require('express');     // es para no perder la ayuda aqui esto no carga express otra vez y tambien añado res = response 
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {generateJwt} = require('../helpers/jwt');

// profe le llamo crearUsuario   lo de la res = response es para obtener la ayuda
const postRegister = async(req, res=response) => {
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email})      //esto es email:email
        if (user){
            return res.status(400).json({ ok: false, msg: 'Ya existe un usuario con este email'})
        }

        user = new User(req.body)       // que escoja del req.body lo que le especifique en el modelo
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();  // por defecto es 10
        user.password = bcrypt.hashSync(password, salt);  // cambiamos la contraseña por la encriptada

        await user.save()
        const token = await generateJwt(user.id, user.name)
        res.status(201).json({ ok: true, uid: user.id, name: user.name, token});

    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Por favor hable con el admin'})
    }
}  

 
// profe le llamo loginUsuario
const postLogin = async (req, res=response) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email})    
        if (!user){
            return res.status(400).json({ ok: false, msg: 'No existe usuario con este email'})
        }
        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, user.password)      // regrasa true si es valido o false sino lo es
        if(!validPassword){
            return res.status(400).json({ ok:false, msg: 'Password incorrecto' })
        }
        // Si llegamos aqui estamos listo para generar nuestro JWT
        const token = await generateJwt(user.id, user.name)
        res.json({ ok: true, uid: user.id, name: user.name, token})

    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Por favor hable con el admin'});
    }
}
 

// profe le llamo revalidarToken
const getRenewToken = async (req, res=response) => {
    const {uid, name} = req
    // Generar un nuevo JWT
    const token = await generateJwt(uid, name)
    res.json({ ok: true, token})
}


module.exports = {
    postRegister,
    postLogin,
    getRenewToken
}