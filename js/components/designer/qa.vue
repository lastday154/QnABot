<template lang='pug'>
  v-card(flat class="pa-0")
    span(v-show="false" :data-path="data.qid+'-.qid'") {{data.qid}}
    display(
      :schema="$store.state.data.schema"
      :path='data.qid+"-"'
      row
      v-model="topitems"
    )
    v-divider(v-if="extra")
    display(
      v-if="extra"
      :schema="$store.state.data.schema"
      :path='data.qid+"-"'
      column
      v-model="bottomitems"
    )
</template>

<script>
/*
# 
*/

var Vuex=require('vuex')
var Promise=require('bluebird')
var _=require('lodash')
module.exports={
  props:['data'],
  data:()=>{return {
    advanced:false,
    top:["q","a"]
  }},
  components:{
    display:require('./display.vue')
  },
  computed:{
    extra:function(){
      return _.values(_.pick(this.items,this.top)).length>0
    },
    items:function(){
      return _.omit(this.data,['qid'])
    },
    topitems:function(){
      return _.pick(this.items,this.top)
    },
    bottomitems:function(){
      return _.omit(this.items,this.top)
    }
  },
  methods:{}
}
</script>

<style lang='scss' scoped>
  ul {
    list-style:none;
  }
</style>
