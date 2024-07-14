import mongoose from "mongoose"

const model_img =  mongoose.Schema({
    
    mid : String, 
    default : {
        type : [String] , 
        
    }
})

  

export  default  mongoose.model("model_img" , model_img ,"model_img"  )
