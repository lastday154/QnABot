/*
# 
*/

var Promise=require('bluebird')
var axios=require('axios')
var Vue=require('vue')
var Vuex=require('vuex').default
import Vuetify from 'vuetify'
var style=require('aws-lex-web-ui/dist/lex-web-ui.css')
var Auth=require('./lib/client-auth')

Vue.use(Vuex)
Vue.use(Vuetify);

var config = {
  cognito:{},
  lex: {
    initialText:"Ask a Question",
    initialSpeechInstruction:"",
    reInitSessionAttributesOnRestart: false
  },
  ui:{
    pageTitle:"QnABot Client",
    toolbarColor:"cyan",
    toolbarTitle:"QnABot",
    toolbarLogo:null,
    pushInitialTextOnRestart:false
  },
  recorder:{}
}
document.addEventListener('DOMContentLoaded', function(){
    var Config=Promise.resolve(axios.head(window.location.href))
    .then(function(result){
        var stage=result.headers['api-stage']
        return Promise.resolve(axios.get(`/${stage}`)).get('data')
    })
    .tap(console.log)
    .then(function(result){
        config.cognito.poolId=result.PoolId
        config.lex.botName=result.BotName
        return config
        console.log(config) 
    }) 

    Promise.join(
        Config,
        Auth(),
        System.import(/* webpackChunkName: "client-page" */'./client.vue')
    )
    .spread(function(config,auth,app){
        
        var LexWebUi=require('aws-lex-web-ui/dist/lex-web-ui.js')
        var store=new Vuex.Store(LexWebUi.Store)
        if(auth.username){
            config.ui.toolbarTitle+=":"+auth.username
        }
        store.state.Login=auth.Login
        store.state.Username=auth.username
        Vue.use(LexWebUi.Plugin,{
            config,
            awsConfig:auth.config,
            lexRuntimeClient:auth.lex,
            pollyClient:auth.polly
        })

        var App=new Vue({
            render:h=>h(app),
            store:store
        })
        App.$mount('#App')
    })
})   
