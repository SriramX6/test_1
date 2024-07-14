import mongoose from "mongoose"

const cities =  mongoose.Schema({
    
    cid : Number,
    RTO : mongoose.Types.Decimal128 ,
    state : String , 
    city : String 
})

  

export  default  mongoose.model("cities" , cities ,"cities"  )
