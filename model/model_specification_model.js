import mongoose from "mongoose"

const spec =  mongoose.Schema({
    
    uid : String,
    model_name : String 
})

  

export  default  mongoose.model("mode_specifications" , spec ,"mode_specifications"  )
