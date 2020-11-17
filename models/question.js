const mongoose = require('mongoose');

const Test = mongoose.model('Test', {
    pregunta:{
        type: String,
        required: true
    },
    resp1:{
        type: String,
        required: true
    },
    resp2:{
        type: String,
        required: true
    },
    resp3:{
        type: String,
        required: true
    },
    resp4:{
        type: String,
        required: true
    },
    solucion:{
        type: Number,
        required: true
    }

})

module.exports = Test;