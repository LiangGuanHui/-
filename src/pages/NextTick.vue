<template>
    <div>
        <p ref="myWidth" v-if="showMe">{{ message }}</p>
        <p>{{message}}</p>
        <p v-text="message"></p>
        <p v-html="message"></p>
        <el-button @click="getMyWidth">获取p元素宽度</el-button>
        <div v-once>
            {{ message }}
        </div>
    </div>
</template>

<script>
export default {
    name:'nextTick',
    data () {
        return {
            showMe: false,
            message: '<span class="span">123</span>',
        }
    },
    mounted () {
            
    },
    methods: {
        getMyWidth() {
            this.showMe = true;
            // this.message = this.$refs.myWidth.offsetWidth;
            //报错 TypeError: this.$refs.myWidth is undefined
            this.$nextTick(()=>{
                //dom元素更新后执行，此时能拿到p元素的属性
                this.message = this.$refs.myWidth.offsetWidth;
                console.log(this.message)
            })

        }
        
    },
}
</script>

<style aa>
div p{
    background: #ccc;
    font-size: 20px;
    border-bottom: 2px solid #000;
    /* color:blue; */
}
div p span{
    color:red;
}
.span{
    color:red;
}
</style>


