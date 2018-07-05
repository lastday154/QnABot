/*
# 
*/
var bowser=require('bowser')

document.addEventListener('DOMContentLoaded',function(){
    if( !bowser.chrome && !bowser.firefox ){
        alert("Warning: Unsupported Browser, please use Chrome or Firefox")
    }
})
