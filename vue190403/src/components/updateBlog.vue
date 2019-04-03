<template>
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item label="id">
                <el-input v-model="id" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="password"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
                <el-input v-model="age"></el-input>
            </el-form-item>
            <el-form-item label="显隐">
                <el-select v-model="tag" placeholder="请选择">
                <el-option label="显示" value="1"></el-option>
                <el-option label="隐藏" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updateBlog">立即修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  data() {
    return {
      id: "",
      name: "",
      password: "",
      age: "",
      tag: ""
    };
  },
  created() {
    this.$http.post("getuserbyid?Id=" + this.$route.params.id).then(result => {
      // 注意： 通过 $http 获取到的数据，都在 result.body 中放着
      var result = result.body;
      console.log(result);
      if (result.code === 0) {
        // 成功了
        this.id = result.data.id;
        this.name = result.data.name;
        this.password = result.data.password;
        this.age = result.data.age;
        this.tag = '';
      } else {
        // 失败了
        alert("获取数据失败！");
      }
    });
  },
  methods: {
    updateBlog() {
      this.$http
        .get("modifyuser",{params: {
          id: this.id,
          name: this.name,
          password: this.password,
          age: this.age
          }
        })
        .then(result => {
          var result = result.body;
          if (result.code === 0) {
            alert("修改成功！");
          } else {
            // 失败了
            alert("修改失败！");
          }
        });
    }
  }
};
</script>
