const mongoose= require("mongoose")
mongoose.connect("mongodb://localhost:27017/Login").then(() => {
    console.log(`connection successful`);
}).catch((e) => {
    console.log(`no connection ${e}`);
})
const Schema =new mongoose.Schema ({ 
    username: { 
        type: String,
        required:true
    }, 
    password: { 
        type: String, 
        required:true
    }, 
    dob: {
        type: String,
        required:true
    },
    admin:{
        type: String,
        required:true
    }
}) 


Schema.statics.isthisemail=async function(email){
    if (!email) throw new Error("Invalid Email");
    try{
        const user = await this.findOne({username:email})
        if (user) return false
        return true;
    }
    catch(error){
        console.log(error.message)
        return false
    }
    
}
const collection=new mongoose.model("logins",Schema)
module.exports=collection

