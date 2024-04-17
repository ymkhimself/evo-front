<template>
  <div id="myRoot">
    <div id="container">
      <p class="loginWord" id="oneOftheName">队伍名</p>
      <input type="text" class="loginInput" v-model="name" />
      <p class="loginWord">密码</p>
      <input type="password" class="loginInput" v-model="pwd" />
      <p id="forgetPwd">忘记密码</p>

      <el-button id="loginBtn" type="primary" @click="submit" plain >登录</el-button>
    </div>
    <img id="labLogo" src="../assets/img/lab_logo3.png" alt="">
  </div>
</template>
    
<script>
// import axios from "axios";
import axios from "@/axios";
import player from "./player.vue";
export default {
  name: "LoginPlayer",
  components: { player },
  data() {
    return {
      text: "队伍名",
      //为1表示是队伍状态
      pattern: 1,
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
        .post("/team/login", {
          //JSON格式传入两个参数
          name: this.name,
          pwd: this.pwd,
        })
        .then(
          (response) => {
            var data = response.data;
            console.log("data", response.data.msg);
            if (response.data.code == 200) {
              sessionStorage.setItem("Token", JSON.stringify(data.data.token));
              sessionStorage.setItem("id", JSON.stringify(data.data.id));
               this.$router.push(
                  '/player_notice'
                )
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
    
<style>
* {
  margin: 0;
  padding: 0;
}
#topTxt {
  font-size: 50px;
  color: white;
  text-align: center;
  margin-bottom: 20px;
}
/* 背景*/
#myRoot {
  content: '';
  position: fixed;
  background-image: linear-gradient(to bottom, #192028, #2e3f66);
  background-attachment: fixed;
  width: 100%;
  min-height: 100vh;
}
#myRoot::before{
  content: '';
  position: absolute;
  width: 100%;
  min-height: 100vh;
  z-index: -1;
  background-image: url(../assets/img/Stars.svg);
}
#myRoot::after{
  content: '';
  width: 105%;
  min-height: 50vh;
  z-index: -1;
  position: absolute;
  bottom: -40%;
  left: 0;
  background-image: url(../assets/img/Trees.svg);
  background-repeat: no-repeat;
  border-bottom: 300px solid #181d23;
}

/* 登录框部分 */
#container {
  width: 40%;
  height: 40%;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: 700px;
  margin-top: 160px;
  /* border: 1px solid blueviolet; */
}
.loginWord {
  margin-top: 45px;
  color: #fff;
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
  width: 180px;
  height: 35px;
  float: left;
  margin-top: 20px;
  margin-left: 35%;
}

/* labLogo */
#labLogo{
   width:450px;
   height: 450px;
   margin-left: 120px;
   margin-top: 120px;

}
</style>
