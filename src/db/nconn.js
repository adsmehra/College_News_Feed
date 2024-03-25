const mongoose= require("mongoose")
mongoose.connect("mongodb://localhost:27017/Login",{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log(`connection successful`);
}).catch((e) => {
    console.log(`no connection ${e}`);
})
const Schema =new mongoose.Schema ({ 
    SLNo: { 
        type: Number,
        required:true
    }, 
    Title: { 
        type: String, 
        required:true
    }, 
    Date: {
        type: String,
        required:true
    },
    Genre: { 
        type: String, 
        required:true
    }, 
    Campus: {
        type: String,
        required:true
    },
    Details: { 
        type: String, 
        required:true
    }, 
    Summary: {
        type: String,
        required:true
    },
    Datesort: {
        type: Date,
        required:true
    }
}) 
const collection=new mongoose.model("news",Schema)
module.exports=collection