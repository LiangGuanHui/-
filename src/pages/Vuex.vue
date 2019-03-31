<template>
  <div>
    <div>{{count}}</div>
    <my-addbtn></my-addbtn>
    <my-removebtn></my-removebtn>
  </div>
</template>


<script>
import Vuex from 'vuex'
var store = new Vuex.Store({
  state : {
    count: 0
  },
  mutations: {
    add (state) {
      state.count++
    },
    remove(state){
      state.count--
    }
  }
})
export default {
  name: 'Vuex',
  data () {
    return {
      // count: 0
    }
  },
  computed : {
    count : function () {
      return store.state.count
    }
  },
  components : {
    'my-addbtn' : {
      template : '<button @click="setCount">+</button>',
      methods: {
        setCount () {
          store.commit('add')
        }
      }
    },
    'my-removebtn' : {
      template : '<button @click="remove">-</button>',
      methods : {
        remove () {
          store.commit('remove')
        }
      }
    }
  }
}
</script>

<style>

</style>
