const mongoose=require("mongoose")
const bcrypt=require("bcrypt")

const userSchema =mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,   
    },
    password:{
        type:String,
        required:true,   
    }
})
userSchema.pre("save",async function(next){
let user=this
const salt =await bcrypt.genSalt(10)
    const hash=await bcrypt.hash("1234",salt)
    user.password=hash 
    next()
})
userSchema.methods.comparePassword=function(userPassword,cb){
    bcrypt.compare(userPassword,this.password, function(err, result) {
if(err)return cb (err)
cb(null,result)    });  
}





const User=mongoose.model("User",userSchema)
module.exports=User