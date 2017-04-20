<template>
<div>
  <Row type="flex" justify="start" class="code-row-bg" inline>
    <Button type="primary">新增一条入股记录</Button>
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
</div>
</template>
<style>
.bookkeeping-total-normal {
  color: #808080;
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
      value13: '',
      all_touzi: '',
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


        this.gudong = response.body;
  this.all_touzi = response.body.all;
      }, response => {
        // error callback
      });

    }
  },
  mounted() {
    this.getgudong();
  }

}
</script>
