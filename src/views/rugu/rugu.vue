<template>
<div>
  <Row type="flex" justify="start" class="code-row-bg" inline>
    <Button type="primary"  @click="modal1 = true">新增一条入股记录</Button>
  </Row>

  <Table :columns="columns1" :data="gudong" height="350"></Table>
  <div class="content-footer">
    <div class="income">
      <span class="bookkeeping-total-normal">总入股</span>
      <span class="bookkeeping-amount">{{all_touzi}}</span>
    </div>
  </div>
  <br>
  <div class="toolbar">
    <Page :total="100" show-elevator show-total show-elevator></Page>
  </div>
  <Modal
       v-model="modal1"
       title=""
       @on-ok="ok"
       @on-cancel="cancel">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="出资人" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
        </Form-item>
        <Form-item label="入股金额" prop="price">
            <Input v-model="formValidate.price" placeholder="请输入金额"></Input>
        </Form-item>
        <Form-item label="入股时间" prop="date">
          <Date-picker type="date" placeholder="选择日期" v-model="formValidate.date"></Date-picker>
        </Form-item>
      </Form>
   </Modal>
</div>


</template>
<style>
.bookkeeping-total-normal {
  color: #808080;
}
.code-row-bg{
  margin-bottom: 10px;
}
.ivu-row {

  padding-bottom: 10px
}

.income {
  color: #4bd649;
}

.content-footer {
  height: 100px;
  padding: 20px 30px;
  background-color: #FFFFFF;
}

.bookkeeping-amount {
  position: relative;
  display: inline-block;
  padding-left: 24px;
  font-size: 30px;
  line-height: 40px;
}
</style>
<script>
export default {

  data() {

    return {
      formValidate: {
                   name: '',
                   price: '',
                   date: '',
               },
      value13: '',
      all_touzi: '',
      modal1:false,
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
      columns1: [{

        title: '出资人',

        key: 'shareholder'

      }, {

        title: '金额',
        "sortable": true,
        key: 'money',
        render(row, column, index) {
          return `<div class="income"><Icon type="plus-round"></Icon> <strong >${row.money}</strong></div>`;
        }
      }, {

        title: '时间',
        key: 'time_date'

      }],
      gudong: [],
      select3: 'day',
    }

  },

  methods: {
    getgudong() {
      this.$http.get('http://shareholder.a10store.com/api/get_buy_shares_list.php').then(response => {


        this.gudong = response.body.list;
  this.all_touzi = response.body.all;
      }, response => {
        // error callback
      });

    },
    ok () {
               this.$Message.info('点击了确定');
           },
           cancel () {
               this.$Message.info('点击了取消');
           }
  },
  mounted() {
    this.getgudong();
  }

}
</script>
