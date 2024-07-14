import mongoose from "mongoose"

const card_slider =  mongoose.Schema({
    
    id : String, 
    names  : {
        type : [String],
    },
    price : {
        type : [String],
    },
    img : {
        type : [String] , 
        
    }
})


  

export  default  mongoose.model("home_page_featured_bike" , card_slider ,"home_page_featured_bike"  )
