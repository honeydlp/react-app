const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('../model/index')
const User = model.getModel('user')
const _filter = {'pwd':0,'__v':0}

Router.get('/list',function(req,res){
    User.find({},function(err,res){
        return res.json(res)
    })
})

Router.post('/login',function(req,res){
    const {user,pwd} = req.body
    User.findOne({
        user,pwd:md5Pwd(pwd)
    },_filter,function(err,doc){
        if(!doc){
            return res.json(
                {
                    code:1,
                    data:doc
                }
            )
        }
        res.cookie('userid',doc.id)
        return res.json({
            code:0,
            data:doc
        })
    })
})

Router.post('/register',function(req,res){
    const {user,pwd,type} = req.body
    User.findOne({user},function(err,doc){
        if(doc){
            return res.json({
                code:1,
                msg:'用户名重复'
            })
        }

        const userModel = new User({
            user,type,pwd:md5Pwd(pwd)
        })
        userModel.save(function(err,doc){
            if(err){
                return res.json({
                    code:1,
                    msg:'后端出错了'
                })
            }
            const {user,type,_id} = doc
            res.cookie('userid',_id)
            return res.json({
                code:0,
                data:{
                    user,type,_id
                }
            })
        })
    })
})

Router.post('/update',function(req,res){
    const userid = req.cookies.userid
    if(!userid){
        return res.json({
            code:1
        }) 
    }
    const body = req.body
    User.findOneAndUpdate(userid,body,function(err,doc){
        const data = Object.assign({},{
			user:doc.user,
			type:doc.type
		},body)
		return res.json({code:0,data})
    })
})

Router.get('/info',function(req,res){
    const {userid} = req.cookies
    if(!userid){
        return res.json({
            code:1
        })
    }
    User.findOne({
        _id:userid,
    },_filter,function(err,doc){
        if(err){
            return res.json({
                code:1,
                msg:'后端出错了'
            })
        }
        if(doc){
            return res.json({
                code:0,
                data:doc
            })
        }
    })
})

function md5Pwd(pwd){
    const salt = 'duanliangpeixxxxxqqqqqq8888800007466_/.,mm¥^-0'
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router