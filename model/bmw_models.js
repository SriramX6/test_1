import mongoose from "mongoose"

const bmw =  mongoose.Schema({
    
    uid : String,
    model_name : String ,
    price : String , 
    bhp : String , 
    kmpl : String , 
    safety : String ,
    variants : {
        type : [String] , 
        required : true,
    },
    cities : {
        type : [String] , 
        required : true,
    }
})

  

export  default  mongoose.model("bmw" , bmw ,"bmw"  )
