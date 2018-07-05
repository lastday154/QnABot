<template lang='pug'>
  v-card
    v-progress-linear(indeterminate)
</template>

<script>
/*
# 
*/

var Vuex=require('vuex')
var Promise=require('bluebird')

module.exports={
  data:function(){
    return {}
  },
  components:{
  },
  created:function(){
    var self=this
    this.$store.dispatch('bootstrap')
    .then(()=>self.$store.dispatch('user/login'))
    .then(()=>self.$router.replace('/edit'))
    .tapCatch(console.log)
    .catch(()=>self.$router.replace('/error'))
  },
  methods:{
  }
}
</script>
