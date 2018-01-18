const mongoose = require('mongoose')
//conntect
const DB_URL = 'mongodb://localhost:27017/dll-chat'
mongoose.connect(DB_URL)

const models = {
    user:{
        'user':{
            type:String,
            require:true
        },
        'pwd':{
            type:String,
            require:true
        },
        'type':{
            type:String,
            require:true
        },
        //头像
        'avatar':{
            type:String
        },
        //简介
        'desc':{
            type:String
        },
        //职位名
        'title':{
            type:String
        },
        //boss plus
		'company':{'type':String},
		'money':{'type':String}  
    }
}

for(let k in models){
    mongoose.model(k,new mongoose.Schema(models[k]))
}

module.exports = {
    getModel(name){
        return mongoose.model(name)
    }
}