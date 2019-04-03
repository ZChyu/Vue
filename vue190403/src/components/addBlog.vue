<template>
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item label="ID">
                <el-input v-model="id"></el-input>
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
            <el-form-item label="日期">
                <el-input v-model="date"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addBlog">立即添加</el-button>
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
      date: ""
    };
  },
  methods: {
    addBlog() {
      this.$http
        .get("adduser",{params: {
          id: this.id,
          name: this.name,
          password: this.password,
          age: this.age,
          date: this.date

        }})
        .then(result => {
          var result = result.body;
          console.log(result);
          if (result.code === 0) {
            alert("添加成功！");
            this.id=""
            this.name = "";
            this.password = "";
            this.age = "";
            this.date=""
          } else {
            // 失败了
            alert("添加失败！");
          }
        });
    }
  }
};
</script>
