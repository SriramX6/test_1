import mongoose from "mongoose"

const browseBy =  mongoose.Schema({
    
    browsrBy : String, 
    
    img : {
        type : [String] , 
        
    }
})


  

export  default  mongoose.model("browse_bike_by" , browseBy ,"browse_bike_by"  )
