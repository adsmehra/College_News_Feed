const express = require('express')
const path= require("path")
const app = express()
const OpenAI=require("openai")
const handlebars=require("express-handlebars")

const alert=require("alert")
const bodyParser=require('body-parser')

const User = require("./db/conn");
const News = require("./db/nconn")
const { constants } = require('fs/promises')


const port = process.env.PORT || 4000

const static_path=path.join(__dirname, "../public");

app.use(express.static(static_path));
app.set("view engine","html")
app.use(express.urlencoded({extended:false}))

app.get("/", (req, res) => {
  res.sendFile(static_path+'/login.html')
})

app.get("/", (req, res) => {
  res.sendFile(static_path+'/vellore.hbs')
})

app.set("view engine","hbs")
app.use(bodyParser.urlencoded({extended:false}))
app.post("/login",async (req,res)=>{
  
  const name=req.body.name;
  const pass=req.body.pass;
  const chk=req.body.check;
  const data={
    username:name,
    password:pass,
    check:chk
  };
  console.log(name);
  console.log(chk);
  const ch=await User.isthisemail(name);
  if (!ch) {
      const usr=await User.findOne({username:name});
      if (usr.password===pass){
        console.log("success")
        const news= await News.find().sort({Datesort:-1});
        
        if (chk=="on"){
          if (usr.admin=="yes"){
            res.render(static_path+'/adminpage',{news:news})
          }
          else{
            alert("you are not an admin")
            res.sendFile(static_path+'/login.html')
          }
        }
        else{
          res.render(static_path+'/main',{news:news})
        }
      }
      else{
        alert("Password didn't match")
        res.sendFile(static_path+'/login.html')
      }
  
  }  
  else{
    alert("user doesn't exist")
  }
  
})

app.post("/signup",async (req,res)=>{
  const name=req.body.name;
  const pass=req.body.pass;
  const dob=req.body.dob;
  const cpass=req.body.cpass;

  
  const data={
    username:name,
    password:pass,
    dob:dob,
    admin:"no"
};
  console.log(data);
  const ch=await User.isthisemail(name);
  if (!ch) {
    alert("user already exists")
    res.sendFile(static_path+'/signup.html')
    return
  }
  
  if (pass==cpass){ 
      await User.create(data)   
      alert("you are being redirected to login page")
      res.sendFile(static_path+'/login.html')
      
      return
  }
  else{
    alert("password didn't match")

  }
})

const openai=new OpenAI({
  apiKey:"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"
})


app.get('/summarize',async(req,res)=>{
  var userPrompt=req.query.newsArea;
  var userprompt=userPrompt+"\n"+"Summarize the above text in 70 words"

  const response=await openai.chat.completions.create({
    model:"gpt-3.5-turbo",
    messages:[{"role":"user","content":userprompt}]
  })
  const summary=response.choices[0].message.content
  res.render(static_path+'/adminpage',{message1:userPrompt,message2:summary})
})

app.get('/home',async(req,res)=>{
  console.log("Home")
  const news= await News.find().sort({Datesort:-1});
  res.render(static_path+'/main.hbs',{news:news})
})

app.get('/AP',async(req,res)=>{
  console.log("AP")
  const news= await News.find({Campus:"VIT AP"}).sort({Datesort:-1});
  res.render(static_path+'/Campus/AP.hbs',{news:news})
})

app.get('/Bhopal',async(req,res)=>{
  console.log("Bhopal")
  const news= await News.find({Campus:"Vit Bhopal"}).sort({Datesort:-1});
  res.render(static_path+'/Campus/Bhopal.hbs',{news:news})
})

app.get('/chennai',async(req,res)=>{
  console.log("Chennai")
  const news= await News.find({Campus:"VIT Chennai"}).sort({Datesort:-1});
  res.render(static_path+'/Campus/chennai.hbs',{news:news})
})

app.get('/vellore',async(req,res)=>{
  console.log("vellore")
  const news= await News.find({Campus:"VIT Vellore"}).sort({Datesort:-1});
  res.render(static_path+'/Campus/vellore.hbs',{news:news})
})

app.get('/Events',async(req,res)=>{
  console.log("events")
  const news= await News.find({Genre:"Event"}).sort({Datesort:-1});
  res.render(static_path+'/Genres/Events.hbs',{news:news})
})

app.get('/Academics',async(req,res)=>{
  console.log("Academics")
  const news= await News.find({Genre:"Academics"}).sort({Datesort:-1});
  res.render(static_path+'/Genres/Academics.hbs',{news:news})
})

app.get('/Placements',async(req,res)=>{
  console.log("placements")
  const news= await News.find({Genre:"Placement"}).sort({Datesort:-1});
  res.render(static_path+'/Genres/Placements.hbs',{news:news})
})

app.get('/Sports',async(req,res)=>{
  console.log("Sports")
  const news= await News.find({Genre:"Sports"}).sort({Datesort:-1});
  res.render(static_path+'/Genres/Sports.hbs',{news:news})
})


app.listen(port, () => {
  console.log(`the app listening on port ${port}`)
});

