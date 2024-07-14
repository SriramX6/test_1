import mongoose from "mongoose"

const img =  mongoose.Schema({
    
    img : String
    
})

  

export  default  mongoose.model("img" , img ,"img"  )
