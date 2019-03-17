<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动时间">
                <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="即时配送">
                <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="活动性质">
                <el-checkbox-group v-model="form.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源">
                <el-radio-group v-model="form.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
        <div>
            <main-table 
                ref="mainTable"
                :columns="columns"
                :operates="operates"
                @selection-change="getIds"
            >
            </main-table>
        </div>
        <div>
            <el-table :data="users" stripe style="width:80%" align="center">
                <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>
                <el-table-column prop="age" label="年龄" width="180" align="center"></el-table-column>
                <el-table-column prop="birthday" label="出生日期" width="180" align="center"></el-table-column>
                <el-table-column prop="city" label="地址" width="180" align="center"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import MainTable from '../components/common/MainTable.vue'
import api from './../axios/api.js'
// import NewsCell from '../components/common/NewsCell.vue'
import bus from '../components/js/bus';

export default {
    // name: 'table',
    components :{
        MainTable
    },
    data () {
        return {
            users:[],
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            //复选框id
            multipleSelection: [],
            columns: [
                    {
                        prop: 'name',
                        label: '姓名',
                    },
                    {
                        prop: 'age',
                        label: '年龄',
                    },
                    // {
                    //     prop: 'devNum',
                    //     label: '设备编号',
                    //     width: 100,
                    // },
                    // {
                    //     prop: 'nodeName',
                    //     label: '关联区域',
                    //     width: 140,
                    // },
                    // {
                    //     prop: 'devNo',
                    //     label: '序列号',
                    //     width: 100,
                    // },
                    // {
                    //     prop: 'devType',
                    //     label: '设备类型',
                    //     width: 150,
                    //     formatter (row) {
                    //         if (row.devType === 0) {
                    //             return '通道机(机头)'
                    //         } else if (row.devType === 1) {
                    //             return '通道机(摄像头)'
                    //         } else if (row.devType === 2) {
                    //             return '通道(无感知)'
                    //         } else if (row.devType === 3) {
                    //             return '门禁(平板)'
                    //         } else if (row.devType === 4) {
                    //             return '门禁(摄像头)'
                    //         }
                    //     }
                    // },
                    // {
                    //     prop: 'devStatus',
                    //     label: '是否启用',
                    //     formatter (row) {
                    //         if (row.devStatus === 'online') {
                    //             return '启用'
                    //         } else if (row.devStatus === 'offline') {
                    //             return '禁用'
                    //         }
                    //     }
                    // }
                ],
                operates: {
                    width: 280,
                    list: [
                        {
                            label: '查看',
                            icon: '/static/img/Editing-equipment.png',
                            method: (index, row) => {
                                this.handleBasic(index, row)
                            }
                        },
                        {
                            label: '删除',
                            icon: '/static/img/trash.png',
                            method: (index, row) => {
                                this.handleDelete(index, row)
                            }
                        }
                    ]
                },
        }
    },
    created() {
        this.setNewsApi();
    },
    methods: {
        // 刷新table数据
        // setMainTable (data) {
        //     this.$refs.mainTable.setData(data)
        // },
        //头部查询(table数据展示)
        // searchFun () {
        //     this.$axios.post(this.url, this.$qs.stringify(this.form)).then((res) => {
        //         if (res.data.code == '0000') {
        //             // this.$emit('search', res.data.data)
        //             this.$refs.mainTable.setData = res.data.data
        //         } else {
        //             alert('error')
        //         }
        //     })
        // },
        setNewsApi () {
            axios.get('/api/users','name=123&id=2').then(res=>{
                console.log(res)
                this.users= res.data.user;

                this.$refs.mainTable.setData= res.data.user;
            })
        },
        onSubmit(){
            console.log("提交")
        },
        //复选框选中操作
        getIds(arr) {
            this.multipleSelection = arr
        },
    }
}
</script>

<style>

</style>

