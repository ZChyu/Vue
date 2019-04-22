<template>
  <div class="deit">
    <div class="crumbs">
      <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-date"></i> 数据管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="cantainer">
					        <el-table 
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            fit
            :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%" ref="multipleTable" tooltip-effect="dark">
            <!--勾选框-->
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <!--索引-->
            <!-- <el-table-column type="index" :index="indexMethod"></el-table-column> -->
            <el-table-column prop="id" label="编号" ></el-table-column>
            <el-table-column prop="name" label="用户名" ></el-table-column>
            <el-table-column prop="password" label="密码" ></el-table-column>
            <el-table-column prop="age" label="年龄" ></el-table-column>
            <el-table-column prop="date" label="日期" :formatter="dateFormat" sortable></el-table-column>
            <el-table-column label="编辑">
                <template slot-scope="scope">
                    <router-link to="/updateBlog">
                      <el-button type="primary" icon="el-icon-edit" size="mini" @click.prevent="updateBlog(scope.$index, scope.row)">编辑</el-button>
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column label="删除">
                <template slot-scope="scope">
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click.prevent="deleteBlog(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
						<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="currentPage"
							:page-sizes="[5, 10, 20, 40]"
							:page-size="pagesize"
							layout="total, sizes, prev, pager, next, jumper"
							:total="userList.length">
					</el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userlist',
  data () {
      return {
				currentPage:1, //初始页
				pagesize:10,    //	每页的数据
				userList: []
      }
  },
	created() {
		this.handleUserList()
	},
	methods: {
		// 初始页currentPage、初始每页数据数pagesize和数据data
		handleSizeChange: function (size) {
				this.pagesize = size;
				console.log(this.pagesize)
		},
		handleCurrentChange: function(currentPage){
				this.currentPage = currentPage;
				console.log(this.currentPage)
		},
		handleUserList() {
      this.axios.get("http://localhost:8080/demo/superadmin/listuser").then(data => {
        var res=data.data;
        if(res.code==0){
        this.userList=res['data'];
        return this.userList  
        }else{
      localStorage.clear()
          this.$router.push('/login')
          this.$notify({
            title:"登录超时！请重新登录！",
            message:res.msg,
            type:"failure",
            duration:1000
          })
        }

      })
		},
	dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "未填";
      }
      return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
    }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
