<template>
    <div class="base-table">
        <el-table
            :data="tableData"
            :max-height="options.maxHeight"
            :stripe="options.stripe ? options.stripe : ''"
            ref="table"
            @selection-change="handleSelectionChange"
            class="border-table"
            :border="options.border?options.border:false"
            >

            <el-table-column v-if="options.mutiSelect" type="selection" width="50">
            </el-table-column>

            <!--序号-->
            <el-table-column v-if="options.index" label="序号" type="index" width="80" align="center" class="column-first"></el-table-column>

            <!--数据列-->
            <template v-for="column in showColumns">
                <el-table-column :prop="column.prop"
                                 :key="column.prop"
                                 :label="column.label"
                                 :align="column.align || 'center'"
                                 :width="column.width"
                                 :fixed="column.fixed"
                                 show-overflow-tooltip>
                    <template slot-scope="scope">

                        <template v-if="!column.render">
                            <!--<template v-if="column.formatter && column."></template>-->
                            <template v-if="column.formatter" >
                                <!--<el-tooltip class="item" effect="dark" :content="column.tooltip" placement="top-start" :disabled="column.tooltip ? false || true">-->
                                    <span v-html="column.formatter(scope.row, column)"></span>
                                <!--</el-tooltip>-->
                            </template>
                            <template v-else>
                                <span>{{scope.row[column.prop]}}</span>
                            </template>
                        </template>

                    </template>
                </el-table-column>
            </template>

            <!-- 按钮操作组-->
            <el-table-column v-if="operates" ref="fixedColumn" label="操作" align="center"
                             :width="operates.width" :fixed="operates.fixed">
                <template slot-scope="scope">
                    <div class="operate-group">
                        <template v-for="(btn, key) in operates.list">
                            <el-tooltip class="item" :key="key" effect="dark" :content="btn.label" placement="top-start" >
                                <img :src="btn.icon" class="img-btn" @click="btn.method(scope.$index, scope.row)" />
                            </el-tooltip>
                        </template>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination">
            <span class="el-pagination__pagecount">每页
                <el-select class="el-pagination__editor is-in-pagination"
                        v-model="pageSize" @change="changePageSize">
                    <el-option v-for="size in [5, 10, 20, 50, 100]" :key="size" :value="size">
                    </el-option>
                </el-select> 条
            </span>
            <el-pagination @current-change="currentChange" layout="jumper,total,prev, pager, next "
                        :total="rawData.length" :totals="changeTotal" :current-page="currentPage" :page-size="pageSize">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MainTable',
        data () {
            let checkData = this.initCheckList()
            return {
                rawData: [],
                currentPage: 1,
                pageSize: 10,
                setUpVisible: false,
                checkList: checkData.checkList,
                checkboxArr: checkData.checkboxArr
            }
        },
        props: {
            newsDate: Object,
            idProp:{
                type: String,
                default: 'id'
            },
            columns: {
                type: Array,
                default: () => [] // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
            },
            operates: {
                type: Object,
                default: () => {
                    // width:按钮列宽，fixed：是否固定（left,right）,按钮集合 === label: 文本，type :类型（primary / success / warning / danger / info / text
                    // show：是否显示，icon：按钮图标，plain：是否朴素按钮，disabled：是否禁用，method：回调方法
                }
            },
            options: {
                type: Object,
                default: () => {
                    return {
                        mutiSelect: true,
                        index: false
                    }
                }
            } // table 表格的控制参数
        },
        computed: {
            showColumns () {
                return this.columns.filter(c => c.show)
            },
            tableData () {
                return this.rawData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
            }
        },
        watch: {
            columns () {
                let checkData = this.initCheckList()
                this.checkList = checkData.checkList
                this.checkboxArr = checkData.checkboxArr
            }
        },
        methods: {
            changePageSize (pageSize) {
                this.pageSize = pageSize
            },
            changeTotal (total) {
                this.total = res.data.data.total;
            },
            currentChange (pageNo) {
                this.currentPage = pageNo
            },
            setData (data) {
                this.rawData = data
            },
            //返回复选框选中的id
            handleSelectionChange (arr) {
                var idArr = arr.map(item => item[this.idProp])
                this.$emit('selection-change', idArr)
            },
            //对表格的一些操作
            operate (eventName, data) {
               if (eventName == 'clearSelection') {
                   this.$refs.table.clearSelection()
               } else if (eventName == 'toggleRowSelection') {
                   this.$refs.table.toggleRowSelection(data.row, data.selected)
               }
            },
            //打开设置弹窗
            openModal () {
                this.setUpVisible = true
                let arr = this.columns
                let checkList = []
                let checkboxArr = arr.map(function (item, index, thisArr) {
                    if(thisArr[index].show === true){
                        checkList.push(item.prop)
                    }
                })
                this.checkList = checkList
            },
            comfirmOperate () {
                let chechedArr = this.checkList
                this.columns.map(function (item, index, thisArr) {
                    item.show = false
                    chechedArr.map(function (item1,i) {
                        if (item.prop === item1) {
                            item.show = true
                        }
                    })
                })
                this.setUpVisible = false
            },
            //初始化控制列
            initCheckList () {
                let arr = this.columns
                let checkList = []
                let checkboxArr = arr.map(function (item, index, thisArr) {
                    if(thisArr[index].show === undefined){
                        thisArr[index].show = true
                        checkList.push(item.prop)
                    }else if(thisArr[index].show){
                        checkList.push(item.prop)
                    }
                    return {
                        value: item.prop,
                        txt: item.label
                    }
                })
                return {
                    checkList: checkList,
                    checkboxArr: checkboxArr
                }
            }
        },
    }
</script>

