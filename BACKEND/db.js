const mongoose=require('mongoose');
const mongoURL='mongodb://127.0.0.1:27017/inotebook';
const connectToMongo=()=>{
   /* mongoose.connect(mongoURL,()=>{
        console.log('Connected to mongo successfully');
    });*/
    mongoose.connect(mongoURL).then(()=>console.log("Connected")).catch((e)=>console.log(e.message))
}
module.exports=connectToMongo;