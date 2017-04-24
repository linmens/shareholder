<template>
<section>
  <!--工具条-->
  <Row class="toolbar">
    <Col span="12">
    <Form :model="filters" inline>
      <Form-item>
        <Input v-model="filters.name" placeholder="请输入..."></Input>
      </Form-item>
      <Form-item>
        <!-- @click="getUsers" -->
        <Button type="primary">查询</Button>
      </Form-item>
      <Form-item>
        <Button type="warning" @click="handleZhichu">记录支出</Button>
      </Form-item>
      <Form-item>
        <Button type="success">记录收入</Button>
      </Form-item>
    </Form>
    </Col>
    <Col span="4" class="shuju">
    <span style="color:#657180">支出</span>
    <div class="income">
      <Icon type="minus"></Icon> <span>{{jsonBody.expenditure_all}}</span></div>

    </Col>
    <Col span="4">
    <span style="color:#657180">收入</span>
    <div class="income" style="font-size:30px">
      <Icon type="plus"></Icon> <span>{{jsonBody.income_all}}</span></div>
    </Col>
    <Col span="4">
    <span style="color:#464c5b">结余</span>
    <div class="income" style="font-size:30px;color:#464c5b">
      <Icon type="plus"></Icon> <span>{{jsonBody.balance}}</span></div>
    </Col>
  </Row>

  <!--列表-->
  <Row>
    <Col span="24">
    <Table :columns="columns1" highlight-current-row :data="data1" @on-selection-change="selsChange" @on-row-click="rowClick" :height="boxHeight"></Table>
    <div class="toolbar">
      <Button type="error" @click="batchRemove" :disabled="this.sels.length===0"><Icon type="trash-a"></Icon>批量删除</Button>
      <Page @on-change="handleCurrentChange" :total="total" style="float:right;" show-sizer></Page>
    </div>

    <br>
    </Col>
  </Row>

  <!--记录支出-->
  <Button>自定义页头和页脚</Button>
  <Modal v-model="modal2" width="600" class="entry-creator-modal-view">
    <p slot="header" style="color:#ff9900;text-align:center">
      <Icon type="information-circled"></Icon>
      <span class="modal-title">记录支出</span>
    </p>
    <div class="entry-creator-view fade ui-droppable in" @click="toClosePop($event)">
      <Form :model="zhichuItem" class="entry-creator-form">
        <div class="entry-category">
          <ul class="entry-category-select expense">
            <li v-for="(icon, index) in entry" :class="{ active: isActive == icon.type }" class="entry-category-option">
              <div class="entry-icon" :data-type="icon.type" @click="changeicon(icon)"></div>
              <span class="entry-category-title">{{icon.type}}</span>
            </li>

          </ul>
        </div>
        <Form-item>
          <Input v-model="zhichuItem.neirong" placeholder="交易对象"></Input>
        </Form-item>
        <Form-item>
          <Row>
            <Col span="11">
            <Input v-model="zhichuItem.price" placeholder="金额"></Input>
            </Col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="11">
            <Date-picker type="date" v-model="zhichuItem.date" placeholder="今天"></Date-picker>
            </Col>
          </Row>
        </Form-item>
        <Form-item>
          <Input v-model="zhichuItem.beizhu" type="textarea" :rows="4" placeholder="备注"></Input>
        </Form-item>

        <div class="entry-involve-set">
          <div class="involve-view">
            <div class="involve-header"> <span>参与者</span> </div>
            <Row type="flex" justify="start" class="code-row-bg">
              <Col span="24" class="involve-member">
              <!-- <img :src="users[0].avatar" class="avatar img-circle" width="24" v-if="users.length==1"> -->
              <img v-for="us in users" :src="us.avatar" class="avatar img-circle" width="24">
              <span @click="openmemberPop"><Icon type="plus-circled addhandle" data-type="更多"></Icon></span>
              </Col>
            </Row>
            <ul class="involve-members clearfix">
              <li class="involve-member hinted">
              </li>
            </ul>
          </div>
        </div>
      </Form>
    </div>



    <div slot="footer">
      <Button type="info" size="small" @click="submitAdd()">创建</Button>
    </div>

    <div class="popover popover-menu-view bottom in" v-if="isPop" style="width: 242px; z-index: 999; top: 150px; position: absolute;
right: 15px;" id="popover283313">
      <div class="popover-content thin-scroll">
        <div class="menu-input add-form"> <input class="add-input form-control" v-model="pushNewmenu" placeholder="添加类型">
          <button class="btn btn-link link-add-handler" @click="addNewmenu()">添加</button></div>
        <ul class="list-unstyled thin-scroll with-input">
          <li class="menu-item " @click="selectedMenu(item,$index)" v-for="(item,$index) in menuitem" :class="{selected:item.menuitemActive }"> <a>{{item.text}}</a>
            <Icon type="checkmark" class="icon-selected" v-show="item.menuitemActive"></Icon>
          </li>
        </ul>
      </div>
    </div>

    <div class="popover member-menu-view bottom in" v-if="isMemberPop" id="popover195322" style="width: 245px; z-index: 999; top: 150px;">
      <div class="popover-content thin-scroll">
        <div class="menu-input">
          <input class="filter-input form-control" placeholder="查找成员"></div>
        <ul class="list-unstyled thin-scroll">
          <li class="member-item all active" :class="{selected:allclick}" @click="toapendAll(allusers)">
            <a> <span class="icon icon-users icon-gray"></span> 所有成员 </a>
            <Icon type="checkmark" class="icon-selected" v-if="allclick"></Icon>
          </li>

          <li v-for="member in allusers" class="member-item one hinted" :class="{selected:member.selected}" @click="toapend(member,$index)">
            <a>
              <div class="avatar img-circle" :style="{backgroundImage: 'url(' + member.avatar + ')'}"></div>
              <!-- <Checkbox :label="member.name" class="popcheckbox">
              </Checkbox> -->
              <span>{{member.name}}</span>
            </a>

            <Icon type="checkmark" class="icon-selected" v-if="member.selected"></Icon>
          </li>

        </ul>
      </div>
    </div>
  </Modal>
  <Modal v-model="addFormVisible" title="添加入库单" width="1200" class-name="vertical-center-modal">
    <Row>
      <Col span="24" class="toolbar">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline :label-width="80">
        <Form-item label="业务类型">
          <Select v-model="formInline.select1" style="width:200px">
    			 <Option v-for="item in yewu_options" :value="item.value" :key="item">{{ item.label }}</Option>
    	 </Select>
        </Form-item>
        <Form-item label="入库类型">
          <Select v-model="formInline.select2" style="width:200px">
    			 <Option v-for="ruku in ruku_options" :value="ruku.value" :key="ruku">{{ ruku.label }}</Option>
    	 </Select>
        </Form-item>
        <Form-item label="入库单号">
          <Input v-model="formInline.rukudanhao" disabled></Input>
        </Form-item>
        <Form-item>
          <Input v-model="formInline.ruku_beizhu" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="入库备注"></Input>
        </Form-item>
      </Form>
      </Col>

    </Row>
    <Row>
      <Col span="5">
      <Input v-model="SaoMa" placeholder="扫码入库" style="width: 300px;margin-bottom: 10px;"></Input>{{ answer }}
      </Col>
    </Row>


  </Modal>
</section>
</template>

<script>
import util from '../../common/js/util'
import Vue from 'vue'
//  import '../../styles/common.css'
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
      users: [],
      allclick: false,
      mesele: 'linmens',
      allusers: [{
          name: 'linmens',
          selected: true,
          avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png'
        },
        {
          name: 'ein',
          selected: false,
          avatar: 'https://striker.teambition.net/thumbnail/110cd08dd69c864236237f5c69abeb893469/w/200/h/200'
        },
        {
          name: 'cmi',
          selected: false,
          avatar: 'https://striker.teambition.net/thumbnail/110c368fba8ff41a064151f70ca78c81e561/w/200/h/200'
        },
      ],
      jsonBody: [],
      menuitem: [{
        text: '购买设备'
      }, {
        text: '宽带费'
      }, {
        text: '备用金'
      }],
      menuitemActive: false,
      checkAll: false,
      isPop: false, //点击是否开关
      isClicked: false,
      isMemberPop: false, //谁参与了此次的金额
      pushNewmenu: '',
      checkAllGroup: ['香蕉', '西瓜'],
      modal2: false,
      total_num: 0,
      boxHeight: '',
      answer: [],
      SaoMa: '',
      isActive: '餐饮',
      zhichuItem: {
        neirong: '',
        price: '',
        date: '',
        beizhu: '',
        type: '',
        inuser: ''
      },
      entry: [{
        type: '餐饮',
        icon: ''
      }, {
        type: '差旅',
        icon: ''
      }, {
        type: '营销',
        icon: ''
      }, {
        type: '人事行政',
        icon: ''
      }, {
        type: '更多',
        icon: ''
      }],
      columns1: [{
        type: 'selection',
        width: 60,
        align: 'center'
      }, {
        title: '交易编号',
        key: 'id',
        render(row) {
          const color = row.status == 1 ? 'blue' : row.status == 2 ? 'green' : 'red';
          const text = row.status == 1 ? '未审核' : row.status == 2 ? '已审核' : '审核失败';
          return `<tag type="dot" color="${color}">${text}</tag>`;
        }
      }, {
        title: '交易时间',
        key: 'time_expense'
      }, {
        title: '收入',
        key: 'income'
      }, {
        title: '支出',
        key: 'expenditure',
        render(row) {
          return `<div class="expenditure"><Icon type="minus"></Icon> <span>{{row.expenditure}}</span></div>`;
        }
      }, {
        title: '上传时间',
        key: 'time_up'
      }, {
        title: '交易对象',
        key: 'target'
      }, {
        title: '交易备注',
        key: 'remark'
      }, {
        title: '文件档案号',
        key: 'file_no'
      }],
      data1: [],
      addFormdata: [{
        name: '合计',
        bianhao: '',
        guige: '',
        chima: '',
        yanse: '',
        fenlei: '',
        tiaoxinma: '',
        jinhuo_price: '',
        ruku_num: this.total_num,
        yewu_leixing: '',
        kucun: ''
      }],
      columnsaddForm: [{
          type: 'index',
          width: 60,
          align: 'center',


        }, {
          title: '品牌',
          key: 'name',

        }, {
          title: '产品编号',
          key: 'bianhao'
        }, {
          title: '规格',
          key: 'guige'
        }, {
          title: '尺码',
          key: 'chima'
        }, {
          title: '颜色',
          key: 'yanse'
        }, {
          title: '产品分类',
          key: 'fenlei'
        }, {
          title: '条形码',
          key: 'tiaoxinma'
        }, {
          title: '进货价',
          key: 'jinhuo_price'
        }, {
          title: '入库数量',
          key: 'ruku_num'
        }, {
          title: '业务类型',
          key: 'yewu_leixing'
        }, {
          title: '库存',
          key: 'kucun'
        }

      ],

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
    toapendAll(all) {
      var newJson = []
      all.click = !all.click
      var _this = this
      this.allclick = all.click
      console.log(this.allclick);
      //如果为true 则把所有状态更改为selected 并且push新数据
      if (all.click) {
        all.forEach(function(item) {　　　　　　　　　　
          Vue.set(item, 'selected', true);　　　　
          newJson.push(item)
        });
        console.log(newJson);
        this.users = newJson
      } else {
        all.forEach(function(item) {　　　　　　　　　　
          Vue.set(item, 'selected', false);　　　　　　　　
        });
        this.users = []
      }
      this.zhichuItem.inuser = this.users
    },
    toapend: function(user, index) {
      console.log(user);
      user.selected = !user.selected
      if (user.selected) {
        this.users.push(user)
      } else {
        this.users.splice(index, 1);
      }
      if (this.users.length == this.allusers.length) { //如果当前选中的长度与原始长度一样 则显示所有勾选状态
        console.log(this.allusers.length)
        this.allclick = true
      } else {
        this.allclick = false
      }
      this.zhichuItem.inuser = this.users
    },
    submitAdd() {
      console.log(this.zhichuItem);
    },
    rowClick(row) {
      console.log(row)
    },
    changeicon(e) {
      console.log(this.zhichuItem.type);
      this.zhichuItem.type = e.type
      this.isActive = e.type
      if (e.type == '更多') {
        this.isPop = true

      } else {
        this.isPop = false
      }
    },
    toClosePop(ev) { //如果不是点击更多展示pop的方法则隐藏
      console.log(ev);
      if (ev.target.getAttribute('data-type') != '更多') {
        this.isPop = false
        this.isMemberPop = false
      }
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
    addNewmenu() {
      var newItem = {
        text: this.pushNewmenu
      }
      this.menuitem.push(newItem)
    },
    openmemberPop() {
      this.isMemberPop = !this.isMemberPop
    },
    selectedMenu(item, index) {
      this.isClicked = true
      this.isPop = false　
      console.log(item);
      this.zhichuItem.type = item.text
      // this.zhichuItem.push(item)
      this.$nextTick(function() {　　　　　　　　
        this.menuitem.forEach(function(item) {　　　　　　　　　　
          Vue.set(item, 'menuitemActive', false);　　　　　　　　
        });　　　　　　　　
        Vue.set(item, 'menuitemActive', true);　　　　　　
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onSubmit() {
      console.log('submit!');
    },
    //性别显示转换
    formatSex: function(row, column) {
      return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
    },
    handleCurrentChange(val) {
      this.page = val;
      // this.getUsers();
    },
    //获取收支明细列表
    getList() {
      // let para = {
      //     page: this.page,
      //     name: this.filters.name
      // };
      this.listLoading = true;

      this.$http.get('http://shareholder.a10store.com/api/expense.list.get.php').then(response => {
        this.jsonBody = response.body
        this.data1 = response.body.expense_list
      }, response => {
        // error callback
      });

      // console.log(para);
      // getUserListPage(para).then((res) => {
      //     this.total = res.data.total;
      //     this.users = res.data.users;
      //     console.log(this.users);
      //     this.listLoading = false;
      //     //NProgress.done();
      // });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        //NProgress.start();
        let para = {
          id: row.id
        };
        removeUser(para).then((res) => {
          this.listLoading = false;
          //NProgress.done();
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          // this.getUsers();
        });
      }).catch(() => {

      });
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //显示支出界面
    handleZhichu: function() {
      this.modal2 = true
    },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.editForm);
            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
            editUser(para).then((res) => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['editForm'].resetFields();
              this.editFormVisible = false;
              // this.getUsers();
            });
          });
        }
      });
    },
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.addForm);
            console.log(this);
            console.log(para);
            this.$refs.upload.submit();
            // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
            addUser(para).then((res) => {
              this.addLoading = false;
              //NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['addForm'].resetFields();
              this.addFormVisible = false;
              // this.getUsers();
            });
          });
        }
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
          // this.getUsers();
        });
      }).catch(() => {

      });
    }
  },
  mounted() {
    this.getList()
    let user = JSON.parse(sessionStorage.getItem('user'));
    this.users.push(user)
    console.log(user);
    this.zhichuItem.inuser = this.users
    this.boxHeight = this.$store.state.boxHeight
  }
}
</script>

<style scoped>
.popcheckbox {
  width: 100%
}


.member-menu-view .popover-content li>a>.avatar,
.member-menu-view .popover-content li>a>.icon {
  width: 24px;
  height: 24px;
  float: left;
  margin-left: -2px;
  margin-right: 10px;
  text-align: center;
  background-size: 24px 24px;
  font-size: 18px;
  line-height: 24px;
}

.member-menu-view .popover-content .menu-input {
  position: relative;
  padding: 15px 15px 10px;
}

.member-menu-view .popover-content .form-control {
  width: 100%;
  height: auto;
  margin: 0;
  padding: 6px;
  line-height: 20px;
}

.member-menu-view .popover-content {
  padding: 0;
}

.member-menu-view .popover-content ul {
  padding: 0 0 5px;
  max-height: 200px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.member-menu-view .popover-content li:hover {
  background-color: #F7F7F7;
  font-weight: bold;
}

.icon-selected {
  position: absolute;
  top: 10px;
  right: 15px;
  height: 14px;
  width: 14px;
  color: #A6A6A6;
}

.addhandle {
  color: #3da8f5;
  /* display: block; */
  width: 24px;
  height: 24px;
  font-size: 24px;
  line-height: 24px;
  vertical-align: top;
  text-align: center;
  cursor: pointer;
}

.entry-creator-modal-view {
  position: relative
}

.popover-menu-view .popover-content .add-form {
  padding: 10px 60px 10px 15px;
  border-bottom: 1px solid #EEEEEE;
}

.popover-menu-view .popover-content .menu-input {
  position: relative;
  padding: 15px 15px 10px;
}

.popover {
  text-align: left;
}

.popover-menu-view .popover-content .add-form .add-input {
  padding: 6px 0;
  border: none;
}

.popover-menu-view .popover-content .form-control {
  width: 100%;
  height: auto;
  margin: 0;
  line-height: 20px;
}

input.form-control,
textarea.form-control {
  background-color: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 3px;
  line-height: 20px;
}

.popover-menu-view .popover-content {
  padding: 0;
}

.popover-content {
  padding: 15px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.popover-menu-view {
  border-radius: 4px;
  box-shadow: 0 7px 21px rgba(0, 0, 0, 0.1);
}

.popover {
  position: absolute;
  z-index: 106;
  width: 250px;
  max-width: none;
  padding: 0;
  text-align: left;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 3px;
  -webkit-box-shadow: 0 7px 21px rgba(0, 0, 0, .1);
  box-shadow: 0 7px 21px rgba(0, 0, 0, .1);
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
}

.popover-menu-view .popover-content .add-form .btn {
  position: absolute;
  top: 10px;
  right: 15px;
  padding: 5px 0;
}

.link-add-handler {
  color: #3da8f5 !important;
  transition: color 218ms ease;
}

.btn-link,
.btn-link:hover,
.btn-link:focus,
.btn-link:active {
  border-color: transparent;
}

.btn-link,
.btn-link:active,
.btn-link[disabled],
fieldset[disabled] .btn-link {
  background-color: transparent;
  box-shadow: none;
}

.btn-link {
  color: #808080;
  font-weight: normal;
  cursor: pointer;
  border-radius: 0;
}

.btn {
  display: inline-block;
  padding: 8px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  color: #383838;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid #D9D9D9;
  border-radius: 3px;
  background-color: #FFFFFF;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.btn-link,
.btn-link:hover,
.btn-link:focus,
.btn-link:active {
  border-color: transparent;
}

.btn-link,
.btn-link:active,
.btn-link[disabled],
fieldset[disabled] .btn-link {
  background-color: transparent;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.form-control {
  display: block;
  width: 100%;
  height: 38px;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #a6a6a6;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}

.form-control:focus {
  border-color: #A6A6A6;
  box-shadow: none;
  outline: 0;
}

.form-control {
  height: 40px;
  padding: 8px 12px;
  color: #383838;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.form-control {
  height: 38px;
  padding: 8px 12px;
  color: #383838;
  box-shadow: none;
}

.entry-icon {
  display: block;
  width: 50px;
  height: 50px;
  margin: auto;
  font-size: 20px;
  line-height: 46px;
  border: 2px solid #E5E5E5;
  border-radius: 25px;
  cursor: pointer
}

.entry-creator-modal-view .entry-category li {
  display: inline-block;
  text-align: center;
  margin: 0 20px;
  cursor: pointer;
}

.popover-menu-view .popover-content ul.with-input {
  padding-top: 0;
}

.popover-menu-view .popover-content ul {
  padding: 5px 0;
  min-height: 20px;
  max-height: 200px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.list-unstyled {
  padding-left: 0;
  list-style: none;
}

li {
  line-height: 20px;
  list-style: none;
}

.popover-menu-view .popover-content li>a {

  display: block;
  padding: 5px 35px 5px 15px;
  clear: both;
  line-height: 24px;
  color: #808080;
  outline: 0 none;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.popover-menu-view .popover-content li.selected::after {
  position: absolute;
  top: 8px;
  right: 15px;
  height: 14px;
  width: 14px;
  color: #A6A6A6;
}

.popover-menu-view .popover-content li>a:hover {
  background-color: #F7F7F7;
}

.entry-creator-modal-view .entry-category .expense li.active .entry-icon,
.entry-creator-modal-view .entry-category .expense li:hover .entry-icon {
  background-color: #ff9900;
  border-color: #ff9900;
}

.entry-creator-modal-view .entry-category li.active .entry-icon,
.entry-creator-modal-view .entry-category li:hover .entry-icon {
  color: #FFFFFF;
}

.entry-creator-modal-view .entry-category ul {
  display: inline-block;
}

.entry-creator-modal-view .entry-category {
  height: 90px;
  color: #A6A6A6;
  text-align: center;
}

.entry-creator-modal-view .entry-category .entry-icon {
  display: block;
  width: 50px;
  height: 50px;
  margin: auto;
  font-size: 20px;
  line-height: 46px;
  border: 2px solid #E5E5E5;
  border-radius: 25px;
}

.entry-creator-modal-view .entry-category li.active .entry-category-title,
.entry-creator-modal-view .entry-category li:hover .entry-category-title {
  color: #383838;
}

.entry-creator-modal-view .entry-category .entry-category-title {
  line-height: 30px;
}

.entry-creator-modal-view .entry-tags-set,
.entry-creator-modal-view .entry-involve-set {}

.involve-view {
  position: relative;
}

.involve-view .involve-header {
  color: #808080;
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 10px;
  border-bottom: 1px solid #E5E5E5;
}

.involve-view .involve-members>li {
  position: relative;
  float: left;

  cursor: pointer;
}

.involve-view .involve-members>li>.avatar {
  display: block;
  width: 24px;
  height: 24px;
  transition: -webkit-transform 2110ms ease-in-out;
}

.avatar {
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
}

.img-circle {
  border-radius: 50%;
  margin: 0px 3px 0 0;
}

.involve-view .add-involvement-handler {
  display: block;
  font-size: 24px;
  color: #A6A6A6;
}

.involve-view .add-involvement-handler .icon-circle-cross {
  color: #3da8f5;
  display: block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
}

.add-involvement-handler li>a>.avatar,
.add-involvement-handler li>a>.icon {
  width: 24px;
  height: 24px;
  float: left;
  margin-left: -2px;
  margin-right: 10px;
  text-align: center;
  background-size: 24px 24px;
  font-size: 18px;
  line-height: 24px;
}

.popover-content li>a {
  display: block;
  padding: 5px 35px 5px 15px;
  clear: both;
  line-height: 24px;
  color: #808080;
  outline: 0 none;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.popover-content li.selected {
  position: relative;
}

.popover-content ul {
  padding: 0 0 5px;
  max-height: 200px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

table {
  width: 100%!important
}

.shuju .income {
  font-size: 30px;
  color: #ff9900;
  font-weight: blod;
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

.ivu-icon {
  margin-right: 5px;
}
</style>

<!---->
