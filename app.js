
const express=require("express")
const app=express()
const port=process.env.PORT ||5000
const dbConection=require("./config/db")
const User=require("./models/User")



dbConection()
app.use(express.json())

//get all user
app.get("/user",async(req,res)=>{
try {
    const allUser=await User.find()
    res.status(200).json(allUser)
} catch (error) {
    console.log(error.message)
}
})
// add new user to db
app.post("/user",async(req,res)=>{
  
  try {
    const userData=req.body
    console.log(userData)
    const data = await User.create(userData)
     res.status(200).json({message:"user created",data:data})
  } catch (error) {
    console.log(error.message)
  }
})
//update user by id
app.put("/user/:id",async(req,res)=>{
  const userId=req.params.id
  try {
   const resl= await User.findOneAndUpdate({_id:userId},{name:"ahmed",email:"llll@llll"},{new:true})
   res.status(200).json({message:"user updated",data:resl})
  } catch (error) {
    res.status(400).send(error.message)
    
  }
})
//delete user by id 
app.delete("/user/:id",async(req,res)=>{
  const userId=req.params.id
try {
  const resl=await User.findByIdAndDelete(userId)
  res.status(200).json({message:"user deleted"})
} catch (error) {
  res.status(400).send(error.message)

}
})

app.post("/user/login",async(req,res)=> 
{
  try{
    const result=await User.find({email:req.body.email})
   const validation = User.comparePassword(req.body.password)
   console.log(validation)
  }catch(err){
    console.log(err)
  }
})

app.listen(port,()=>console.log(`server runing on port : ${port}`))

