/*
# 
*/

var store=require('./store')

module.exports={
    base:'/',
    routes:[
        {   path:'/alexa',
            name:"alexa",
            component:require('../components/alexa/index.vue')
        },
        {   path:'/hooks',
            name:"hooks",
            component:require('../components/hooks/index.vue')
        },
        {   path:'/import',
            name:"import",
            component:require('../components/import.vue')
        },
        {   path:'/export',
            name:"export",
            component:require('../components/export.vue')
        },
        {   path:'/edit',
            name:"edit",
            component:require('../components/designer/index.vue')
        },
        {   path:'/loading',
            component:require('../components/loading.vue')
        }
    ]
}

