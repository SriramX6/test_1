import tvs from "../model/tvs_model.js"

const query = { uid: { $type: 'string' } };
const tvsRoute = async (req , res ) =>{
    try{
        const getcar =await tvs.find(query);
        // console.log(getcar)
        res.status(200).json(getcar);
           }
           catch (err){
            res.status(500).json(err);
           }
}
export default tvsRoute