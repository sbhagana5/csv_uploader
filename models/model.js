
const mongoose = require("../config/config")

const dataSchema = new mongoose.Schema({
    name:{
        type:String
    },
    data:{
        type:String
    }
})

const data = mongoose.model("DataModel",dataSchema)


module.exports = {data};
