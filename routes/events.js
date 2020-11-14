const {Router} = require('express');
const {check} = require('express-validator');
const eventsController = require('../controllers/events');
const {fieldsValidator} = require('../middlewares/fields-validator')
const {isAuth} = require('../middlewares/is-auth');
const {isDate} = require('../helpers/isDate');

const router = Router();
router.use(isAuth);          // todas las peticiones a las rutas que estan abajo deben pasar isAuth

// get evenst list
router.get('/list', eventsController.getEventsList);

//create event
router.post(
    '/create',
    [ // middlewares
        check('title', 'El titulo es obligatorio').trim().not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de fin es obligatoria').custom(isDate),
        fieldsValidator
    ], 
    eventsController.postCreateEvent);

// update event
router.put(
    '/update/:id',
    [
        check('title', 'El titulo es obligatorio').trim().not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de fin es obligatoria').custom(isDate),
        fieldsValidator
    ], 
    eventsController.putUpdateEvent);

// delete event
router.delete('/delete/:id', eventsController.deleteEvent);

module.exports = router;
