const jwt = require('jsonwebtoken');

// esta libreria trabaja con callbacks usaremo una promesa para hacer la funcion
// asi podremos usar async-await  o then-catch 
const generateJwt = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = {uid, name}                   // uid:uid, name:name
        const expTime = {expiresIn: '2h'}
        jwt.sign(payload, process.env.SECRET_JWT_SEED, expTime, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }
            resolve(token)
        })
    })
};


module.exports = {
    generateJwt
}