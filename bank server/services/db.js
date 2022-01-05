const mongoose=require('mongoose')

// connection server and mongoose

mongoose.connect('mongodb://localhost:27017/bank',{
    useNewUrlParser:true
})



// model creation

const User=mongoose.model('User',{
    acno:Number,
    uname:String,
    password:String,
    balance:Number,
    transaction:[]
})

const Transaction=mongoose.model('Transaction',{
    
"amount":Number,

"type":String

})
module.exports={
    User
}