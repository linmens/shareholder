<template>
<div>
<Row>
	
		<Col>
	
		<Input v-model="value13">
	
		<Select v-model="select3" slot="prepend" style="width: 80px">
	
	                <Option value="day">全部</Option>
	
	                <Option value="month">产品编号</Option>
	
	            </Select>
	
		<Button slot="append" icon="ios-search"></Button>
	
		</Input>
	
		</Col>
	
	</Row>
	
	<Table :columns="columns8" :data="gudong" :height="boxHeight"></Table>
	
	<br>
	
	<div class="toolbar">
	
		<Page :total="100" show-elevator show-total show-elevator></Page>
	
	</div>
</div>
	
</template>
<style>
	.ivu-row {
	
		padding-bottom: 10px
	
	}
	
	
	
	.income {
	
		color: #4bd649;
	
	}
	
	
	
	.demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-content {
	
		height: 100%;
	
		margin-top: -16px;
	
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
<script>
	export default {
	
	
	
		data() {
	
	
	
			return {
	
				value13: '',
	
				gudong: [],
	
				select3: 'day',
	
				boxHeight: '',
	
				columns8: [{
	
	
	
					"title": "出资人",
	
					"key": "shareholder",
	
					"width": 200
	
	
	
				}, {
	
	
	
					"title": "金额",
	
	
	
					"key": "money",
	
	
	
					"width": 150,
	
	
	
					"sortable": true,
	
				}, {
	
	
	
					"title": "占比",
	
	
	
					"key": "percent",
	
	
	
					"width": 150,
	
	
	
					"sortable": true
	
	
	
				}, {
	
	
	
					title: '文件档案',
	
	
	
					key: 'dangan'
	
	
	
				}]
	
			}
	
	
	
		},
	
		methods: {
	
			getgudong() {
	
				this.$http.get('http://shareholder.a10store.com/api/get_shares_percent_detail.php').then(response => {
	
					this.gudong = response.body.list;
	
				}, response => {});
	
	
	
			},
	
			reSize() {
	
				console.log(document.documentElement.clientHeight)
	
				this.boxHeight = document.documentElement.clientHeight - 250
	
			}
	
		},
	
		mounted() {
	
			this.getgudong()
	
			this.reSize()
	
		}
	
	
	
	}
</script>