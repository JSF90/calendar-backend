const {Schema, model} = require('mongoose');

const EventSchema = Schema({
    title: {type: String, required: true},
    notes: {type: String},
    start: {type: Date, required: true},
    end:   {type: Date, required: true},
    user:  {type: Schema.Types.ObjectId, ref:'User', required: true}
});

// modificacion a la hora de que mongoose llame el metodo toJSON hacer unos cambios de como se vera el objeto que se retorna
EventSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object
})
 
module.exports = model('Event', EventSchema);