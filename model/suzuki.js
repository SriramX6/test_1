import mongoose from "mongoose"

const suzuki =  mongoose.Schema({
    
    uid : String,
    model_name : String ,
    price : String , 
    bhp : String , 
    kmpl : String , 
    cc : String ,
    weight : String,
    variants : {
        type : [String] , 
        required : true,
    }
})

  

export  default  mongoose.model("suzuki" , suzuki ,"suzuki"  )
