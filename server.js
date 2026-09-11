require("dotenv").config();
const express=require("express"),mongoose=require("mongoose"),path=require("path");
const app=express(),PORT=process.env.PORT||5000;
app.use(express.json());app.use(express.static(path.join(__dirname,"public")));
const Project=mongoose.model("Project",new mongoose.Schema({
 title:String,description:String,tech:[String],github:String,demo:String
},{timestamps:true}));
const Message=mongoose.model("Message",new mongoose.Schema({
 name:String,email:String,message:String
},{timestamps:true}));
app.get("/api/projects",async(req,res)=>{try{res.json(await Project.find().sort({createdAt:-1}))}catch(e){res.status(500).json({message:"Unable to load projects"})}});
app.post("/api/messages",async(req,res)=>{try{const{name,email,message}=req.body;if(!name||!email||!message)return res.status(400).json({message:"Fill all fields"});await Message.create({name,email,message});res.json({message:"Thanks! Your message has been sent."})}catch(e){res.status(500).json({message:"Something went wrong"})}});
app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"public","index.html")));
(async()=>{try{if(process.env.MONGODB_URI)await mongoose.connect(process.env.MONGODB_URI);app.listen(PORT,()=>console.log(`http://localhost:${PORT}`))}catch(e){console.error(e)}})();