/*
# 
*/

var Vuex=require('vuex')


module.exports={
    namespaced:true,
    state:{
        QAs:[],
        schema:{},
        filter:"",
    },
    mutations:require('./mutations'),
    getters:require('./getters'),
    actions:require('./actions'),
}
