const moment = require('moment');

const isDate = (value) => {
    // las validaciones de fechas se hacen con moment
    if(!value){
        return false;      // si regresamos false en un custom validatios esto indica que no validamos el campo
    }
    const date = moment(value);  // llevamos a fecha de moment
    if(date.isValid()){
        return true
    }else{
        return false
    }

};

module.exports = { isDate };