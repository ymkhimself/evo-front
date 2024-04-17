<template>
  <!-- 登陆页面 -->
  <div id="container">
    <p id="topTxt">登录</p>
    <div id="choice">
      <p id="user" class="chooseMe">管理员</p>
    </div>
    <el-input type="text" class="loginInput" v-model="name" />
    <p class="loginWord">密码</p>
    <el-input type="password" class="loginInput" v-model="pwd" />

    <el-button id="loginBtn" type="primary" @click="submit">登录</el-button>
  </div>
</template>
    
<script>
// import axios from "axios";
import axios from "@/axios";
import player from "./player.vue";
export default {
  name: "Login",
  components: { player },
  data() {
    return {
      nowIsUser: true,
      name: "",
      pwd: "",
      token: 0,
    };
  },
  methods: {
    //button点击事件登录
    submit() {
      axios
        .post("/manager/login", {
          //JSON格式传入两个参数
          name: this.name,
          pwd: this.pwd,
        })
        .then(
          (response) => {
            console.log("成功");
            var data = response.data;
            console.log("data", response.data.msg);
            if (response.data.code == 200) {
              sessionStorage.setItem("Token", JSON.stringify(data.data.token));
              // sessionStorage.setItem("id",JSON.stringify(data.id));
              //向App传递pattern参数，来确定登陆的是哪一端
                this.$router.push(
                  '/manager_main'
                );
            } else {
              alert("登陆失败");
            }
          },
          (error) => {
            alert("出现错误");
            console.log(error);
          }
        );
    },
  },
};
</script>
    
<style scoped>
* {
  margin: 0;
  padding: 0;
}
#topTxt {
  font-size: 50px;
  color: #427cb9;
  text-align: center;
  margin-bottom: 20px;
}
/* 第一行 */
#choice {
  display: flex;
}
.chooseMe {
  font-size: larger;
  color: #5b7290;
  margin-right: 10px;
  padding-bottom: 5px;
}
/* 登录框部分 */
#container {
  width: 40%;
  height: 40%;
  position: absolute;
  left: 0;
  right: 0;
  margin: 60px auto;
  /* border: 1px solid blueviolet; */
}
.loginWord {
  margin-top: 45px;
}
.loginInput {
  width: 100%;
  height: 35px;
  margin-top: 8px;
}
#forgetPwd {
  color: #427cb9;
  font-size: 9px;
  margin-top: 5px;
}
#loginBtn {
  width: 80px;
  height: 35px;
  float: right;
  margin-top: 5px;
}
</style>