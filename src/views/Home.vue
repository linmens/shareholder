<template>
    <div class="layout">

        <Menu mode="horizontal" theme="dark" active-name="1">

            <div class="layout-logo">{{collapsed?'':sysName}}</div>

            <div class="layout-nav">

                <Menu-item name="1">

                    <Icon type="ios-navigate"></Icon>

                    导航一

                </Menu-item>

                <Menu-item name="2">

                    <Icon type="ios-keypad"></Icon>

                    导航二

                </Menu-item>

                <Menu-item name="3">

                    <Icon type="ios-analytics"></Icon>

                    导航三

                </Menu-item>


            </div>

            <div class="rightUser">

                <Dropdown trigger="hover">

                    <a href="javascript:void(0)"><img :src="this.sysUserAvatar" /> {{sysUserName}}</a>

                    <Dropdown-menu slot="list">

                        <Dropdown-item>我的消息</Dropdown-item>

                        <Dropdown-item ><span @click="openset()" style="display:block">设置</span></Dropdown-item>

                        <Dropdown-item>退出登录</Dropdown-item>

                    </Dropdown-menu>

                </Dropdown>

            </div>



        </Menu>

        <div class="layout-content">

            <Row>

                <i-col span="5">

                    <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">

    									<Menu  :active-name="$route.name" router  width="auto" :open-names="['' + index]">

    								<!--{{$router.options.routes}}-->



    											<Submenu :name="index + ''" >

    													<template slot="title">

    														<i :class="item.iconCls"></i>

    															{{item.name}}
</template>
<router-link active-class="ivu-menu-item-active ivu-menu-item-selected" :name="child.name" tag="li" v-for="child in item.children" :to="child.path" class="ivu-menu-item">{{child.name}}</router-link>
</Submenu>

</Menu>

</template>
</i-col>
<i-col span="19">
    <div class="layout-content-main">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>

    </div>
</i-col>
</Row>
</div>
<div class="layout-copy">
    2011-2016 &copy; TalkingData
</div>
<Modal v-model="settingmodal" width="600" class="setting">
  <p slot="header" style="color:#ff9900;text-align:center">
    <Icon type="information-circled"></Icon>
    <span class="modal-title">个人设置</span>
  </p>
<div class="setImg">
  <p style="text-align:center">
    <img src="1.jpg" width="50" height="50"/>
  </p>
  <p style="text-align:center">
    <span>linmens</span>
    <span>李长兴</span>
  </p>
</div>
<div class="setOther">
    <p style="text-align:left">
      <span class="setlist"><span style="display:inline-block">用户名、姓名、电子邮件</span><Input class=""></Input></span>
      <span class="setlist">用户名、姓名、电子邮件</span>
    </p>

</div>
</Modal>

</div>

</template>

<script>
    export default {

        data() {

            return {
    settingmodal:false,
                sysName: 'A10STORE',

                collapsed: false,

                sysUserName: '',

                sysUserAvatar: '',

                form: {

                    name: '',

                    region: '',

                    date1: '',

                    date2: '',

                    delivery: false,

                    resource: '',

                    desc: ''

                }

            }

        },

        methods: {

            onSubmit() {

                console.log('submit!');

            },
            openset(){
              this.settingmodal = true
              console.log(  this);
            },

            handleopen() {

                //console.log('handleopen');

            },

            handleclose() {

                //console.log('handleclose');

            },

            handleselect: function(a, b) {},

            //退出登录

            logout: function() {

                var _this = this;

                this.$confirm('确认退出吗?', '提示', {

                    //type: 'warning'

                }).then(() => {

                    sessionStorage.removeItem('user');

                    _this.$router.push('/login');

                }).catch(() => {



                });





            },

            //折叠导航栏

            collapse: function() {

                this.collapsed = !this.collapsed;

            },

            showMenu(i, status) {

                this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';

            }

        },

        mounted() {

            var user = sessionStorage.getItem('user');

            if (user) {

                user = JSON.parse(user);

                this.sysUserName = user.name || '';

                this.sysUserAvatar = user.avatar || '';

            } else {



            }



        },



    }
</script>

<style>
.setting .ivu-modal-body{
  padding: 0!important;
}
.setImg{
  background: #f7f7f7;
  padding-top: 20px;
  padding-bottom: 20px;

}
.setImg p{
  border-radius: 50%
}

.setOther p{
  padding: 10px;
  padding-right: 0;
border-top: 1px solid  #e3e8ee;
  margin-bottom: 10px;
}
.setOther p .setlist{
    border-bottom: 1px solid  #e3e8ee;
    width: 100%;
    display: block;
    padding-bottom: 5px;
padding-top: 5px;

}

.setOther p .setlist Input{
  border-radius:0;
  border:0;
}
    .layout-logo {

        width: 100px;

        height: 30px;

        background: #5b6270;

        border-radius: 3px;

        float: left;

        position: relative;

        top: 15px;

        left: 20px;

        line-height: 30px;

        color: white;

        text-align: center;

    }



    .rightUser {

        float: right;

    }



    .rightUser .ivu-dropdown-menu {

        line-height: 20px

    }



    .rightUser a img {

        float: right;

        border-radius: 50%;

        height: 50px;

        vertical-align: middle;

        margin: 5px;

    }



    .layout {

        border: 1px solid #d7dde4;

        background: #f5f7f9;

    }



    .layout-logo {

        width: 100px;

        height: 30px;

        background: #5b6270;

        border-radius: 3px;

        float: left;

        position: relative;

        top: 15px;

        left: 20px;

    }



    .layout-nav {

        width: 1190px;

        margin: 0 auto;

    }



    .layout-assistant {

        width: 300px;

        margin: 0 auto;

        height: inherit;

    }



    .layout-breadcrumb {

        padding: 10px 15px 0;

    }



    .layout-content {

        min-height: 200px;

        margin: 15px;

        overflow: hidden;

        background: #fff;

        border-radius: 4px;

    }



    .layout-content-main {

        padding: 10px;

    }



    .layout-copy {

        text-align: center;

        padding: 10px 0 20px;

        color: #9ea7b4;

    }
</style>
