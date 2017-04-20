<template>
    <section>
        <!--工具条-->
        <Row>
            <Col span="24" class="toolbar">
            <Form :model="filters" inline>
                <Form-item>
                    <Input v-model="filters.name" placeholder="请输入..."></Input>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="getUsers">查询</Button>
                </Form-item>
            </Form>
            </Col>
        </Row>
    
        <!--列表-->
        <Row>
            <Col span="24">
            <Table :columns="columns1" highlight-current-row :data="data1" @on-selection-change="selsChange" @on-row-click="rowClick"></Table>
            <div class="toolbar">
                <Button type="error" @click="batchRemove" :disabled="this.sels.length===0"><Icon type="trash-a"></Icon>批量删除</Button>
                <Page @on-change="handleCurrentChange" :total="total" style="float:right;" show-sizer></Page>
            </div>

            </Col>
        </Row>
        <!--工具条-->
        <!--<Row>
            <Col span="24" class="toolbar">
           
            </Col>
        </Row>-->
        <!--编辑界面-->
        <!-- <Modal v-model="editFormVisible" title="编辑" width="1000">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline :label-width="80">
    
            </Form>
        </Modal> -->
        <!--新增界面-->
    </section>
</template>

<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import {
        getUserListPage,
        removeUser,
        batchRemoveUser,
        editUser,
        addUser
    } from '../../api/api';
    import lodash from 'lodash'
    export default {
        data() {
            return {
                total_num: 0,
                answer: [],
                SaoMa: '',
                columns1: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                        title: '条形码',
                        key: 'tiaoxinma'
                    }, {
                        title: '规格',
                        key: 'guige'
                    }, {
                    title: '台账库存',
                    key: 'taizhang_sku'
                },{
                        title: '产品编号',
                        key: 'bianhao'
                    }, {
                    title: '在售店铺',
                    key: 'onshop'
                }, {
                    title: '市场价',
                    key: 'shichang_price'
                }, {
                    title: '在售价',
                    key: 'onsale_price'
                }],
                
                formInline: {
                    ruku_beizhu: '',
                    rukudanhao: '',
                    select1: '',
                    select2: ''
                },
                ruleInline: {
                    user: [{
                        required: true,
                        message: '请填写用户名',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请填写密码',
                        trigger: 'blur'
                    }, {
                        type: 'string',
                        min: 6,
                        message: '密码长度不能小于6位',
                        trigger: 'blur'
                    }]
                },
    
                yewu_options: [{
                    value: 'all',
                    label: '全部'
                }, {
                    value: 'caigou',
                    label: '采购入库'
                }, {
                    value: 'other',
                    label: '其他入库'
                }],
                ruku_options: [{
                    value: 'all',
                    label: '全部'
                }, {
                    value: 'caigou',
                    label: '采购入库'
                }, {
                    value: 'zhengchang',
                    label: '正常入库'
                }],
                filters: {
                    name: ''
                },
                users: [],
                total: 40,
                page: 1,
                listLoading: false,
                sels: [], //列表选中列
    
                editFormVisible: false, //编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    pinpai: '',
                    guige: '',
                    pic: '',
                },
    
                addFormVisible: false, //新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [{
                        required: true,
                        message: '请输入品名',
                        trigger: 'blur'
                    }],
                    pinpai: [{
                        required: true,
                        message: '请输入品牌',
                        trigger: 'blur'
                    }]
                },
            }
        },
        watch: {
            // 如果 question 发生改变，这个函数就会运行
            SaoMa: function(newQuestion, old) {
                // console.log('new'+newQuestion);
                // console.log('old'+old);
    
                if (newQuestion == "") {
                    return
                }
                this.senDsaoma()
    
    
    
            }
        },
        methods: {
            rowClick(row) {
                console.log(row)
            },
            senDsaoma: _.debounce(function(s) {
                    var joinIndex = 0
                    var pushData = {
                        name: '品牌',
                        bianhao: '0909090',
                        guige: 'kjk',
                        chima: '213123',
                        yanse: '123123',
                        fenlei: 'sd',
                        tiaoxinma: 'llzlzlzl',
                        jinhuo_price: 'jinhuo',
                        ruku_num: joinIndex,
                        yewu_leixing: 'kjs',
                        kucun: 'cku'
                    }
                    this.total_num++
                        var httpjson = [{
                            formHead: this.formInline,
                            post: pushData
                        }]
                    console.log(httpjson)
                    this.answer.push(this.SaoMa)
                    console.log(this);
                    var sel = this
                    this.addFormdata.unshift(pushData)
                    this.SaoMa = ''
                },
                // 这是我们为用户停止输入等待的毫秒数
                500
            ),
        },
           
       
           
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            //获取用户列表
            getUsers() {
                let para = {
                    page: this.page,
                    name: this.filters.name
                };
                this.listLoading = true;
                //NProgress.start();
                // GET /someUrl
                this.$http.get('/someUrl').then(response => {
                    console.log('no');
                }, response => {
                    // error callback
                });
    
                console.log(para);
                getUserListPage(para).then((res) => {
                    this.total = res.data.total;
                    this.users = res.data.users;
                    console.log(this.users);
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
      
         
        
       
            selsChange: function(sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function() {
                // var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {
                        ids: ids
                    };
                    batchRemoveUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {
    
                });
            },
    
        mounted() {
            console.log(lodash);
            // this.getUsers();
        }
    }
</script>

<style scoped>
    table {
        width: 100%!important
    }
    
    .ivu-table-fixed,
    .ivu-table-fixed-right {
        bottom: 0
    }
    
    .toolbar {
        background: #f2f2f2;
        padding: 10px;
        margin: 10px 0px;
    }
    .ivu-icon{
        margin-right: 5px;
    }
</style>

<!---->