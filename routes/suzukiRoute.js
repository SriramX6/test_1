import suzuki from "../model/suzuki.js"

const query = { uid: { $type: 'string' } };
const suzukiRoute = async (req , res ) =>{
    try{
        const getcar =await suzuki.find(query);
        // console.log(getcar)
        res.status(200).json(getcar);
           }
           catch (err){
            res.status(500).json(err);
           }
}
export default suzukiRoute