const {Router} = require('express');
const {check} = require('express-validator');
const authController = require('../controllers/auth'); // puedo desestructurar pero me gusta crear un nombre mas visual
const {fieldsValidator} = require('../middlewares/fields-validator');
const {isAuth} = require('../middlewares/is-auth');

const router = Router();

router.post(
    '/register',
    [ // midlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Email invalido').isEmail(),
        check('password', 'EL password debe de ser de 6 caracteres').isLength({min: 6}),
        fieldsValidator
    ], 
    authController.postRegister);

router.post(
    '/login', 
    [ // midlewares
        check('email', 'Email invalido').isEmail(),
        check('password', 'EL password debe de ser de 6 caracteres').isLength({min: 6}),
        fieldsValidator
    ], 
    authController.postLogin);

router.get('/renew', isAuth, authController.getRenewToken);

module.exports =  router;


// user: calendar_user
//pass: hgqKqZgQ3YG0Q5wA