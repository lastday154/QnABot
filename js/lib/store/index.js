/*
# 
*/

var Vuex=require('vuex')


module.exports=new Vuex.Store({
    state:{
        info:{},
        bot:{
            status:"",
            message:"",
            utterances:[],
            alexa:{}
        },
        alexa:{},
        error:""
    },
    mutations:require('./mutations'),
    getters:require('./getters'),
    actions:require('./actions'),
    modules:{
        user:require('./user'),
        api:require('./api'),
        data:require('./data'),
        page:require('./page')
    }
})
