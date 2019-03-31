<template>
    <div>
        <!-- <child v-model="value" ></child>
        <div>{{aaa}}</div> -->
        <child :name="name" @change="handleEventChange"></child>
    </div>
</template>
<script>
import child from '../components/common/child'
export default {
    name : 'father',
    components :{
        child
    },
    data () {
        return {
            value: "父组件默认值",
            name:'',
        }
    },
    methods: {
        handleEventChange(val) {
            this.name = val;
        }
    },
    // watch: {
    //     value(nweDate, oldDate){
    //         console.log(nweDate,'---',oldDate)
    //     }
    // }
    computed: {
        aaa () {
            // console.log(nweDate,'---',oldDate)
            return this.value
        }
    }
}
</script>
