import mongoose from "mongoose"

const model_feature =  mongoose.Schema({
    
    mid : String, 
    engine_transmission : {
        type : [String] , 
        
    }
})

  

export  default  mongoose.model("model_features_bigOne" , model_feature ,"model_features_bigOne"  )
