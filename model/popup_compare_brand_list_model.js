import mongoose from "mongoose"

const det =  mongoose.Schema({
    
   
    models : {
        type : {String} , 
        
    } ,
    brands : {
        type : [String] , 
        
    }

})

  

export  default  mongoose.model("popup_compare_brand_list" , det ,"popup_compare_brand_list"  )
