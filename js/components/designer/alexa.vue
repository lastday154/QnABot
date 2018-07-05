<template lang="pug">
  v-dialog(v-model='dialog' max-width='50%')
    v-btn.block(flat slot="activator" @click='open') Alexa Update
    v-card(id="alexa-modal")
      v-card-title(primary-title)
        .headline Re-configure Alexa
      v-card-text
        p You only need to update the schema of your alexa skill.
      v-card-actions
        v-btn( :loading="loading"
          v-clipboard:copy="text"
          @click="copy"
        ) Copy Schema
        input(style="display:none"
          type="text"
          :value="text"
          id="alexa-schema"
        )
      v-card-actions
        v-spacer
        v-btn(@click='close') Close
</template>

<script>
/*
# 
*/

var Vuex=require('vuex')
var Promise=require('bluebird')
var _=require('lodash')

module.exports={
  data:function(){
    var self=this
    return {
      dialog:false,
      loading:false
    }
  },
  components:{
  },
  computed:{
    text:function(){
      console.log(this.$store.state.bot)
      return JSON.stringify(this.$store.state.bot.alexa,null,2)
    }
  },
  created:function(){
    this.$store.dispatch('data/botinfo').catch(()=>null) 
  },
  methods:{
    close:function(){
      this.dialog=false
    },
    open:function(){
      this.dialog=true
    },
    copy:function(){
      this.loading=true
      setTimeout(()=>this.loading=false,1000)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>

