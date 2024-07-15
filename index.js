import express from "express"
import cors from "cors"
import mongoose, { get } from "mongoose"
import yamahaRoute from "./routes/yamahaRoute.js"
// import bmw from "./model/bmw_models.js"
// import img from "./model/img.js"
import bodyParser from "body-parser"
import multer from "multer"
import yamaha from "./model/yamaha.js"
import hondaRoute from "./routes/hondaRoute.js"
// import cities from "./model/City.js"
import model_img from "./model/model_img.js"
import cardSlider from "./model/cardSlider_model.js"
import browseBy_model from "./model/browseBy_model.js"
import model_specification_model from "./model/model_specification_model.js"
import compare_slider_model from "./model/compare_slider_model.js"
import tvsRoute from "./routes/tvsRoutes.js"
import model_features_big from "./model/model_features_big.js"
import popup_compare_slider from "./model/popup_compare_slider.js"
import popup_compare_brand_list_model from "./model/popup_compare_brand_list_model.js"

import modelMap from "./map/map.js"
import suzukiRoute from "./routes/suzukiRoute.js"
import {MongoClient} from 'mongodb'

const app  = express()
app.use(bodyParser.json());

// const upload = multer({dest :"uploads/"})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null, uniqueSuffix + file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })
// var bodyParser = require('body-parser');
// app.use(bodyParser.json({limit: '500mb'}));
// app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));

// app.use(express.json())
// app.use(express.json({limit: '50mb'}));
app.use(cors())




// app.use(express.json({limit: '25mb'}));
// app.use(express.urlencoded({limit: '25mb'}));

// "mongodb://the-database:27017/bike"
const dbName = 'bike_production';
const uri = 'mongodb+srv://host:strongpassword@bharatbike.yb9eewp.mongodb.net/bike_production?retryWrites=true&w=majority&appName=bharatbike'
const ac = () => { 
    try{mongoose.connect(uri)
    console.log("connected to mongodb")        
}
    catch(error){
        throw error;
    }
}



app.post("/card-slider" , async (req , res)=>{
    const {val} = req.body;
    // //.log(val)
    try {
    // Find document by ID
    const data = await cardSlider.findOne({id : val });
    // //.log(data.names)
    if (data) {
      // If document is found, send it back to the client
      res.json(data);
    //   //.log(data)
    } else {
      // If document is not found, send appropriate response
      res.status(404).json({ message: 'Document not found' });
    //   //.log(first)
    }
  } catch (error) {
    // Handle errors
    //.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} )


app.post("/browse-by" , async (req , res)=>{
  const {browseby} = req.body
// console.log(browseby)
  try{
const data = await browseBy_model.findOne({browseBy : browseby})

if (data) {
  // If document is found, send it back to the client
  res.json(data);
  // //.log(data)  
} else {
  // If document is not found, send appropriate response
  res.status(404).json({ message: 'Document not found' });
//   //.log(first)
}
  }

 catch (error) {
  // Handle errors
  //.error('Error:', error);
  res.status(500).json({ message: 'Internal server error' });
}
})


app.get("/compare-slider" , async (req , res )=>{
  const a = 1
  try{
    const getData = await  compare_slider_model.find();
    // //.log(getData)
    res.json(getData)
  }
  catch(err){
    res.status(500).json({message : 'internal server error'})
  }
})
app.get("/yamaha" , yamahaRoute);
app.get("/honda" , hondaRoute);
app.get("/tvs" , tvsRoute);
app.get("/suzuki" , suzukiRoute);


app.get("/model_img/:id" , async  (req, res)=>{
    const q ={ "mid" : req.params.id} ;
    try{
        const getImg = await  model_img.find(q)
        res.status(200).json(getImg)
    }
    catch(err){
        res.status(500).json(err);
    }
} )


app.get("/model_feature_bigOne" , async  (req, res)=>{
  const {q} ={ "mid" : req.body} ;
  // console.log(q)
  try{
      const getImg = await  model_features_big.find(q)
      // console.log(getImg)
      res.status(200).json(getImg)
  }
  catch(err){
      res.status(500).json(err);
  }
} )


app.get("/model-specification/:id"  , async(req,res)=>{
  const q ={ "mid" : req.params.id} ; 
  // //.log(q) 
      try{
          const getspec = await  model_specification_model.find(q)
          // //.log(getspec)
          res.status(200).json(getspec)
          
      }
      catch(err){
          res.status(500).json(err);
      }
})

app.get("/api/popup_comparison_slider" , async (req , res)=>{
  const {q} ={ "mid" : req.body} ; 
  try{
    const getspec = await  popup_compare_slider.find(q)
    console.log(getspec)
    res.status(200).json(getspec)
    
}
catch(err){
    res.status(500).json(err);
}
})

app.get("/api/popup_compare_brand_list" , async (req , res)=>{
  // const {q} ={ "mid" : req.body} ; 
  try{
    const getspec = await  popup_compare_brand_list_model.find()
    console.log(getspec)
    res.status(200).json(getspec)
    
}
catch(err){
    res.status(500).json(err);
}
})

app.use(express.json());
// /budgetModel
// app.post


//  //
app.post('/budgetModel' , async (req, res)=>{
  const { budgetModels } = req.body;
  const client = new MongoClient(url);
  // console.log(budgetModels)

  // if (!Array.isArray(models)) {
  //   return res.status(400).send('Models should be an array');
  // }

  try {
    // Connect to the MongoDB server
    await client.connect();
    // console.log('Connected to database');

    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();

    let results = [];

    for (const collectionInfo of collections) {
      const collection = db.collection(collectionInfo.name);
      const queryResult = await collection.find({ uid: { $in: budgetModels } }).toArray();
      results = results.concat(queryResult);
    }

    res.json(results);
    await client.close();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching documents from database');
  } finally {
    await client.close();
  }
})

app.post('/search', async (req, res) => {
  const { key } = req.body;
  console.log(key)
  const client = new MongoClient(url);

  // if (!searchWord || typeof searchWord !== 'string') {
  //   return res.status(400).send('Please provide a valid search word');
  // }

  try {
    // Connect to the MongoDB server
    await client.connect();

    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();

    let results = [];

    const regex = new RegExp(key, 'i'); // Case-insensitive search

    for (const collectionInfo of collections) {
      const collection = db.collection(collectionInfo.name);
      const queryResult = await collection.find({
        $or: [
          { uid: regex }, // Replace 'field1', 'field2', etc. with your actual field names
          { model_name: regex },
         
          // Add more fields as necessary
        ]
      }).toArray();
      results = results.concat(queryResult);
    }

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching documents from database');
  } finally {
    await client.close();
  }
});


app.post('/prices', async (req, res) => {
  const client = new MongoClient(url);

  const { value}  = req.body 
  try {
    const Price = parseInt(value)
    // console.log("-------------------------",Price)
    // const conv = Int16Array
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to database');

    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    
    let results = [];
    
    for (const collectionInfo of collections) {
        const collection = db.collection(collectionInfo.name);
        const queryResult = await collection.find({ price: { $lt: Price } }).toArray();
        results = results.concat(queryResult);
    }

    res.json(results);
} catch (err) {
      console.error(err);
      res.status(500).send('Error fetching prices from database');
  } finally {
      await client.close();
  }
});



app.post('/the_comparisonpage', async (req, res) => {
  const client = new MongoClient(url);

  const { id}  = req.body 
  try {
    const val =  String(id).trim()
    console.log("-------------------------",val , typeof val)
    // const conv = Int16Array
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to database');

    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    
    let results = [];
    
    for (const collectionInfo of collections) {
      const collection = db.collection(collectionInfo.name);
      // console.log(`Querying collection: ${collectionInfo.name} with uid: ${val}`);
      const queryResult = await collection.find({ uid: { $in: id } }).toArray();
      // console.log(`Query result from collection ${collectionInfo.name}:`, queryResult);
      results = results.concat(queryResult);
    }

    res.json(results);
} catch (err) {
      console.error(err);
      res.status(500).send('Error fetching prices from database');
  } finally {
      await client.close();
  }
});



app.get("/search" , async (req , res)=>{

})
// app.get("/modelSpecPic/:id" , async  (req, res)=>{
//     const q ={ "mid" : req.params.id} ;  
//     try{
//         const getImg = await  model_img.find(q)
//         res.status(200).json(getImg)
//     }
//     catch(err){
//         res.status(500).json(err);
//     }
   

// } )
// app.get("/A4 " , async (req , res ) =>{
//     const query = { uid: req.params.id };
//     //.log(req.params.id)
//     try{
//         const getcar =await audi.find(query);
//         // //.log(getcar)
//         res.status(200).json(getcar);
//            }
//            catch (err){
//             res.status(500).json(err);
//            }
// });

// app.get("//bmw" , async (req , res ) => { 
//     try{
//  const getcar =await bmw.find();
// //  //.log(getcar)
//  res.status(200).json(getcar);
//     }
//     catch (err){
//      res.status(500).json(err);
//     }
 
//  });

//  app.get("/city"  , async (req ,res) =>{
//     try{
//         const Getcity = await cities.find();
//         res.status(200).json(Getcity);
//     }
//     catch(err){
//         res.status(500).json(err);
//     }
//  } )

//  app.get("/cities"  , async (req ,res) =>{
//     try{
//         const  q=  { cid: { $type: 'string' } }; 
//         const Getcities = await cities.find(q);
//         res.status(200).json(Getcities);
//     }
//     catch(err){
//         res.status(500).json(err);
//     }
//  } )

app.post('/vdetail', async (req, res) => {
  const {  selectedBrand , index } = req.body;
  // const {index} = req.body
  // console.log(selectedBrand)

  const Model = modelMap[selectedBrand];

  if (!Model) {
    return res.status(400).json({ error: 'Invalid model name' });
  }

  try {
    const query = {vid :  parseInt(index) } ;
    const data = await Model.find(query); // Adjust query as needed
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: 'No data found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});
// app.post('/vdetail' , async (req , res)=>{
//   const {brand} = req.body
// // console.log(browseby)
//   try{
// const data = await brand.findOne({browseBy : browseby})

// if (data) {
//   // If document is found, send it back to the client
//   res.json(data);
//   // //.log(data)  
// } else {
//   // If document is not found, send appropriate response
//   res.status(404).json({ message: 'Document not found' });
// //   //.log(first)
// }
//   }

//  catch (error) {
//   // Handle errors
//   //.error('Error:', error);
//   res.status(500).json({ message: 'Internal server error' });
// }
// })


//  app.get('/v-detail' , async (req , res ) => { 
//    const {  brand } = req.body;
//    try{
//     // const {browseby} = req.body
//       console.log( brand)
//         // console.log(req.params.id)
//         const query = {vid :  parseInt(vid) } ;
//         //.log(query)
//  const variant =await brand.find(query);
//  //.log(variant)
//  res.status(200).json(variant);
//     }
//     catch (err){
//      res.status(500).json(err);
//     }
 
//  });

 






const port = 8000;
app.listen( port ,  ()=> {
ac()
//.log("server is listening to port  " , port)
})
