<template>
    <div>
        <input type="text" @input="handleInput" @click="handleClick" value="123">
        <div>222222{{this.value}}</div>
        <h3>{{message}}</h3>
    </div>
</template>

<script>
// import bus from '../components/js/bus';
export default {
    props:{
        value:{
            type: String,
            // default:''
        },
        message:{
            type: String,
            // default:''
        },
    },
    data(){
        return {
            
        }
    },
    methods:{
        handleInput (e) { 
            this.$emit('input', e.target.value) 
            console.log(e.target.value)
        },
        handleClick(){
            // alert(1)
        }
    }
}
</script>


<style scoped>
    
</style>
