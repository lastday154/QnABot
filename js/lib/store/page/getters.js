/*
# 
*/

var Promise=require('bluebird')

module.exports={
    pages(state){
        return Math.ceil(state.total/state.perpage)
    }
}
