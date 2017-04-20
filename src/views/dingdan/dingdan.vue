<template>
<Form :model="formItem" :label-width="80">
    <Row>
        <Col span="12">
        <Form-item label="商品ID">
            <Input v-model="formItem.input" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="宝贝名称">
            <Input v-model="formItem.input" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="订单编号">
            <Input v-model="formItem.input" placeholder="请输入"></Input>
        </Form-item>
        </Col>
        <Col span="12">
        <Form-item label="买家昵称">
            <Input v-model="formItem.input" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="订单状态">
            <Select v-model="formItem.select" placeholder="请选择">                                                                        <Option value="beijing">北京市</Option>                                                                        <Option value="shanghai">上海市</Option>                                                                        <Option value="shenzhen">深圳市</Option>                                                                    </Select> </Form-item>
        <Form-item label="成交时间">
            <Row>
                <Col span="11">
                <Date-picker type="date" placeholder="选择日期" v-model="formItem.date"></Date-picker>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                <Time-picker type="date" placeholder="选择时间" v-model="formItem.time"></Time-picker>
                </Col>
            </Row>
        </Form-item>
        </Col>
    </Row>
    <Form-item>
        <Button type="primary">查询</Button> </Form-item>
    <Row>
        <Col span="24" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;">
        <Tabs type="card">
            <Tab-pane label="近三个月订单">
                <Table  :columns="columns4" :data="data1">
               
                </Table>
            </Tab-pane>
            <Tab-pane label="等待买家付款"> </Tab-pane>
            <Tab-pane label="等待发货">标签三的内容</Tab-pane>
            <Tab-pane label="已发货">标签三的内容</Tab-pane>
            <Tab-pane label="退款中">标签三的内容</Tab-pane>
            <Tab-pane label="成功的订单">标签三的内容</Tab-pane>
            <Tab-pane label="关闭的订单">标签三的内容</Tab-pane>
            <Tab-pane label="三个月前的订单">标签三的内容</Tab-pane>
        </Tabs>
        </Col>
    </Row>
</Form>
</template><script>
export default {
    data() {
        return {
            formItem: {
                input: '',
                select: '',
                radio: 'male',
                checkbox: [],
                switch: true,
                date: '',
                time: '',
                slider: [20, 50],
                textarea: ''
            },
            columns4: [{
                title: '宝贝',
                key: 'goods',
                width: '35%',
                render(row, column, index) {
                    return `
                    <Row type="flex" justify="space-between" class="rH">
                    <i-col span="12">订单编号:656565656565656565</i-col>
                    <i-col span="12">成交时间:20187</i-col>
                    </Row>
                    <Row type="flex" justify="start" class="rB">
                    <i-col span="4"><img src="1.png" width="50" height="50"></i-col>
                    <i-col span="20">依布2016秋季新品中老年女装妈妈装花色套头针织衫打底衫y15a005
                    <br>
                    <span>颜色分类：紫色尺码：Lw</span>
                    <br>
                    <span>商家编码：Y6B014849803</span>
                    </i-col>
                    
                               </Row>`;
                }
            }, {
                title: '单价',
                key: 'price',
                   render(row, column, index) {
                    return `
                    <Row type="flex" justify="space-between" class="rH">
                    <i-col span="12">订单编号:656565656565656565</i-col>
                    <i-col span="12">成交时间:20187</i-col>
                    </Row>
                    `
                }
            }, {
                title: '数量',
                key: 'num',
                render(row, column, index) {
                    return `
                    <Row type="flex" justify="space-between" class="rH">
                    <i-col span="12">订单编号:656565656565656565</i-col>
                    <i-col span="12">成交时间:20187</i-col>
                    </Row>
                    `
                }
            }, {
                title: '售后',
                key: 'shouhou'
            }, {
                title: '买家',
                key: 'buyer'
            }, {
                title: '交易状态',
                key: 'status'
            }, {
                title: '实收款',
                key: 'all'
            }],
            data1: [{
                goods: '王小明',
                price: 18,
                num: '北京市朝阳区芍药居',
                shouhou: '北京市朝阳区芍药居',
                buyer: '北京市朝阳区芍药居',
                status: '北京市朝阳区芍药居',
                all: '北京市朝阳区芍药居'
            }, {
                goods: '王小明',
                price: 18,
                num: '北京市朝阳区芍药居',
                shouhou: '北京市朝阳区芍药居',
                buyer: '北京市朝阳区芍药居',
                status: '北京市朝阳区芍药居',
                all: '北京市朝阳区芍药居'
            }, ]
        }
    }
}
</script><style>
.rH{
    background:#3399ff;
    margin-top:10px;
    color:white;
    padding:10px
}
.rB{
    padding:10px
}
.demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-content {
    height: 100%;
    margin-top: -16px;
}

.tableHead {
    padding: 10px;
    margin-top: 5px;
    background: #3399ff;
    color: white
}

.code-row-bg {
    background: #e3e8ee;
    padding: 10px
}

.demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-content>.ivu-tabs-tabpane {
    background: #fff;
    padding: 16px;
}

.demo-tabs-style1>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
    border-color: transparent;
}

.demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
    border-color: #fff;
}
</style>
