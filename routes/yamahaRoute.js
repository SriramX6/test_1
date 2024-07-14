import yamaha from "../model/yamaha.js"

const query = { uid: { $type: 'string' } };
const yamahaRoute = async (req , res ) =>{
    try{
        const getcar =await yamaha.find(query);
        // console.log(getcar)
        res.status(200).json(getcar);
           }
           catch (err){
            res.status(500).json(err);
           }
}
export default yamahaRoute