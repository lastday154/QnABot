/*
# 
*/

var ArchivePlugin = require('webpack-archive-plugin');
module.exports = {
    resolve:{
        alias:{
            vue$:'vue/dist/vue.js'
        }
    },
    plugins:[
        new ArchivePlugin({
            output:"../build/website",
            format:"zip"
        })
    ]
}

        
