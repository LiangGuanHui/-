<template>
    <div>
       <binding-child :value="value" @input="value = arguments[0]">34</binding-child>


       <binding-child message="我是子组件一！"></binding-child>
       <!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
        <binding-child :message="a+b"></binding-child>
 
        <!-- 用一个变量进行动态赋值。-->
        <binding-child v-bind:message="msg"></binding-child>

        <p>原本显示: "{{ message }}"</p>
        <p>经过计算属性computed: "{{ reversedMessage }}"</p>

        <div id="demo">监听属性:{{ fullName }}</div>
    </div>
</template>

<script>

import BindingChild from '../components/common/BindingChild.vue'
export default {
    name: 'Binding',
    data(){
        return {
            value: '123',

            a:'我是子组件二！',
            b:112233,
            msg: '我是子组件三！'+ Math.random(),

            message: 'Hello', //计算属性

            //监听属性
            firstName: 'Foo',
            lastName: 'Bar',
            fullName: 'Foo Bar'
        }
    },
    components:{
        BindingChild
    },
    methods: {
        
    },
    computed: {
    // 计算属性的 getter
        reversedMessage: function () {
        // `this` 指向 vm 实例
        return this.message.split('').reverse().join('')
        }
    },
    watch: {
        firstName: function (val) {
        this.fullName = val + ' ' + this.lastName
        },
        lastName: function (val) {
        this.fullName = this.firstName + ' ' + val
        }
    }
}
</script>

<style scoped>
    
</style>
