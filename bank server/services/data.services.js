const jwt=require('jsonwebtoken')
const db=require('./db')
database={
    1000:{acno:1000,uname:"akshay",password:"1000",balance:5000,transaction:[]},
    1001:{acno:1001,uname:"akash",password:"1001",balance:5000,transaction:[]},
    1002:{acno:1002,uname:"ashwin",password:"1002",balance:5000,transaction:[]}
  
  }
   const register=(acno,uname,password)=>{

     return db.User.findOne({acno})
    .then(user =>{
      if(user){
        return{
          status: false,
          statuscode:401,
          message:"account already exist"
    }
   
      }
      else{
      const newUser=new db.User({
        acno,
        uname,
        password,
        balance:0,
        transaction:[]
      })
      newUser.save()
      return{
        status:  true,
        statuscode:200,
        message:"account successfully created"
    }
      }
    })
  }
const login=(acno,password)=>{
  return db.User.findOne({
    acno,
    password
  }).then (user=>{
    if(user){
      currentUsername= user.uname
      //  req.session.currentacno=acno
    
      //  console.log(req.session)
      //  this.saveDetails()
      const token=jwt.sign({
        currentacno:acno
      },'superkey123456')
    
      
      return{
        status:  true,
        statuscode:200,
        message:"login successfully",
        currentUsername:currentUsername,
        currentacno:acno,
        token
    }
    }
    else{
      return  {
        status: false,
        statuscode:401,
        message:"invalid username or password!!!"
    }
   
    }
  })
 

}
const deposit=(acno,password,amnt)=>{

  var amount=parseInt(amnt)

  return db.User.findOne({
    acno,
    password
  }).then(user=>{
    if(!user){
      return  {
        status: false,
        statuscode:401,
        message:"invalid username or password!!!"
    }

    }
    user.balance +=amount
    user.transaction.push({
      type:"credit",
      amount:amount
    })
    user.save()
    return {
      status:  true,
      statuscode:200,
      message:amount+"is debited and your balance is:"+user.balance
     
      
 
  }
  })
  
  


  }
  
//  let database=this.data



const withdraw=(req,acno1,password1,amnt1)=>{

  var amount=parseInt(amnt1)

  return db.User.findOne({
    acno1,
   password: password1
  }).then(user=>{
    if(req.currentacno != acno1){
      return  {
        status: false,
        statuscode:401,
        message:"operation denied!!!"
    }

    }
    if(!user){
      return  {
        status: false,
        statuscode:401,
        message:"invalid username or password!!!"
    }

    }
    if(user.balance<amount){
      return  {
        status: false,
        statuscode:401,
        message:"insufficient balance!!!"
    }

    }
    user.balance -=amount
    user.transaction.push({
      type:"debit",
      amount:amount
    })
    user.save()
    return {
      status:  true,
      statuscode:200,
      message:amount+"is debited and your balance is:"+user.balance
     
      
 
  }
  })
//  let database=this.data



}
const getTransaction=(acno)=>{
  return db.User.findOne({acno})
  .then(user=>{
    if(!user){
      return  {
        status: false,
        statuscode:401,
        message:"user does not exist!!!"
    }
    }
    else{
      return{
        status:true,
        statuscode:200,
        transaction:user.transaction
      }
    }
  })

}

const deleteAcc=(acno)=>{
 return db.User.deleteOne({
    acno
  }).then(user=>{
    if(!user){
      return  {
        status: false,
        statuscode:401,
        message:"user does not exist!!!"
    }

    }
    return {
      status:  true,
      statuscode:200,
      message:"Account number"+acno+"deleted successfully"
     
      
 
  }
  })
}

  module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction,
    deleteAcc
  }
