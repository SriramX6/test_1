import mongoose from "mongoose"

// Define schema
const compare_slider = new mongoose.Schema({
    data  : [
        {
            id: Number,
            url1: String,
            brand1: String,
            model1: String,
            price1: String,
            url2: String,
            brand2: String,
            model2: String,
            price2: String
          }
    ]
});


export  default  mongoose.model("home_compare_slider" , compare_slider ,"home_compare_slider"  )