const mongoose = require("mongoose")



const PostmodelSchema = mongoose.Schema({
    author : {
        type : String,
        required : true
    },
    topic : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    photo : {
        type : String,
        required : false
    }
} , {timestamps : true})


const Postschema  = mongoose.model("Postschema" , PostmodelSchema)

module.exports = Postschema