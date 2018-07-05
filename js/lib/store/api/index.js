/*
# 
*/

var Vuex=require('vuex')
module.exports={
    namespaced: true,
    state:{ 
        loading:false
    },
    mutations:{
        loading:function(state,val){
            state.loading=val 
        }
    },
    getters:{},
    actions:require('./actions')
}
