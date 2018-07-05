/*
# 
*/

var Promise=require('bluebird')
var axios=require('axios')
var vue=require('vue')

module.exports={
    bootstrap:function(context){
        return Promise.resolve(axios.head(window.location.href))
        .then(function(result){
            var stage=result.headers['api-stage']
            return Promise.resolve(axios.get(`/${stage}`))
            .get('data')
            .then(x=>Object.assign(x,{stage})) 
        })
        .then(function(result){
            context.commit('info',result) 
        })
    }
}
