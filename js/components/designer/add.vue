<template lang="pug">
  span(class="wrapper")
    v-dialog(v-model="loading" persistent)
      v-card
        v-card-title(primary-title) Creating {{data.qid}}
        v-card-text
          v-subheader.error--text(v-if='error' id="add-error") {{error}}
          v-subheader.success--text(v-if='success' id="add-success") {{success}}
          v-progress-linear(v-if='!error && !success' indeterminate)
        v-card-actions
          v-spacer
            v-btn(@click='cancel' flat id="add-close") close
    v-dialog(persistent v-model='dialog' max-width='50%' ref="dialog")
      v-btn(slot="activator" @click='reset' id="add-question-btn") Add
      v-card(id="add-question-form")
        v-card-title(primary-title)
          .headline {{title}}
        v-card-text
          v-form(v-if="dialog")
            schema-input( 
              v-model="data"
              :valid.sync="valid"
              :schema="schema" 
              :pick="schema.required"
              path="add"
            )
            v-expansion-panel.elevation-0
              v-expansion-panel-content
                div( slot="header") Advanced
                schema-input( 
                  v-model="data"
                  :valid.sync="valid"
                  :schema="schema" 
                  :omit="schema.required"
                  path="add"
                )
          small *indicates required field
          v-subheader.error--text(v-if='error') {{error}}
        v-card-actions
          v-spacer
          v-btn(@click='cancel' id="add-question-cancel") Cancel
          v-btn(@click='add' :disabled='!valid' id="add-question-submit") Create
</template>

<script>
/*
# 
*/

var Vuex=require('vuex')
var saveAs=require('file-saver').saveAs
var Promise=require('bluebird')
var _=require('lodash')
var empty=require('./empty')

module.exports={
  data:function(){
    return {
      title:"Add New Item",
      error:'',
      success:'',
      dialog:false,
      loading:false,
      valid:false,
      data:{}
    }
  },
  components:{
    "schema-input":require('./input.vue')
  },
  computed:{
    schema:function(){
      return this.$store.state.data.schema
    }
  },
  methods:{
    cancel:function(){
      this.reset()
      this.loading=false
      this.dialog=false
      this.error=false
    },
    reset:function(){
      this.data=empty(this.schema) 
      this.$refs.dialog.$refs.dialog.scrollTo(0,0)
    },
    add:async function(){
      var self=this
      this.error=false
      if(this.valid){
        this.loading=true
        this.dialog=false
        try{ 
          var exists=await this.$store.dispatch('api/check',this.data.qid)
          if(exists){
            self.error='Question already exists'
            self.loading=false
            self.dialog=true
          }else{
            self.$refs.dialog.$refs.dialog.scrollTo(0,0)
            var out=clean(_.cloneDeep(self.data))
            console.log(out)
            await self.$store.dispatch('data/add',out)
            self.success='Success!'
            self.$store.commit('data/addQA',_.cloneDeep(self.data))
            self.reset()
          }
        }catch(e){
          console.log(e)
          self.error=e 
        }
      }
    }
  }
}
function clean(data){
  console.log(data)
  try{
    if(Array.isArray(data)){
      data=_.compact(data)
      data=_.forEach(data,clean)
    }else if(typeof data==='object'){
      data=_.pickBy(data,x=>x)
      data=_.mapValues(data,clean)
    }
  }catch(e){
    console.log(e)
    throw e
  }
  return data
}
</script>

<style lang='scss' scoped>
  .wrapper {
    display:inline-block;
  }
</style>

