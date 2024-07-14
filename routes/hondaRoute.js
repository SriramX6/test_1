import honda from "../model/honda.js"

const query = { uid: { $type: 'string' } };
const hondaRoute = async (req , res ) =>{
    try{
        const getcar =await honda.find(query);
        // console.log(getcar)
        res.status(200).json(getcar);
           }
           catch (err){
            res.status(500).json(err);
           }
}
export default hondaRoute