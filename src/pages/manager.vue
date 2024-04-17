<template>
  <div class="managerContainer">
    <ul class="nav">
      <span id="text1">AWD平台(管理端)</span>
      <div id="innerNav">
        <router-link to="/manager_main" @click="changeText1" :class="flag ? 'active' : ' '" active-class="active">主页</router-link>
        <router-link to="/manager_notice" @click="changeText1" active-class="active">公告管理</router-link>
        <router-link to="/manager_quiz" @click="changeText1" active-class="active">题目管理</router-link>
        <router-link to="/manager_flag" @click="changeText1" active-class="active">flag管理</router-link>
        <router-link to="/manager_target" @click="changeText1" active-class="active">靶机管理</router-link>
        <router-link to="/manager_team" @click="changeText1" active-class="active">队伍管理</router-link>
        <router-link to="/manager_screen" @click="changeText1" active-class="active">3D大屏管理</router-link>
        <!-- <router-link to="/manager_webhook" @click="changeText1" active-class="active">WebHook管理</router-link> -->
        <router-link to="/manager_config" @click="changeText1" active-class="active">配置管理</router-link>
        <router-link to="/manager_account" @click="changeText1" active-class="active">账号管理</router-link>
        <router-link to="/manager_mirror" @click="changeText1" active-class="active">镜像管理</router-link>
        <router-link to="/manager_monitor" @click="changeText1" active-class="active">系统监控</router-link>
        <a href="#" class="active1"></a>
      </div>
    </ul>
    <div class="content">
      <div class="top">
        <img src="../assets/img/列表形式.png" id="img1">
        <span id="text2">{{text}}</span>
      </div>
       <router-view></router-view>
    </div>
  </div>
</template>

<script>
import "animate.css"
import managerMain from "./manager_main.vue";
import managerFlag from "./manager_flag.vue";
import managerTarget from "./manager_target.vue";
import managerTeam from "./manager_team.vue";
import managerScreen from "./manager_screen.vue";
import managerWebhook from "./manager_webhook.vue";
import managerConfig from "./manager_config.vue";
import managerAccount from "./manager_account.vue";
import managerMirror from "./manager_mirror.vue";
import managerNotice from "./manager_notice.vue";
import managerQuiz from "./manager_quiz.vue";
import managerMonitor from "./manager_monitor.vue";
export default {
  name: "manager",
  data(){
    return{
      text:"主页",
      flag:true,
    }
  },
  methods:{
    changeText1(e){
      this.text = e.target.innerText
      this.flag = false
    },
  },
  components: {
    managerMain,
    managerFlag,
    managerTarget,
    managerTeam,
    managerScreen,
    managerWebhook,
    managerConfig,
    managerAccount,
    managerMirror,
    managerNotice,
    managerQuiz,
    managerMonitor,
  },
}
</script>

<style scoped>
*{
  padding:0;
  border: 0;
  margin: 0;
}
.managerContainer {
  display: flex;
  height: 800px;
  width: 1500px;
}
/* 导航栏 */
.managerContainer .nav {
  display: flex;
  flex-direction: column;
  text-align: center;
  flex: 1;
  background-color: #343A40;
  height: 100%;
}
#innerNav{
  position: relative;
  height: 720px;
  /* font-size: 10px; */
  /* background-color: antiquewhite; */
}
.managerContainer .nav #text1{
  color: white;
  font-weight: 1000;
  font-style:italic;
  font-size: 25px;
  margin-bottom: 2rem;
  margin-top: 2rem;
  z-index: 2;
}
.managerContainer .nav a{
  text-decoration: none;
  color: #959A99;
  font-size: 2rem;
  display: block;
  height: 6rem;
  line-height: 6rem;
  position: relative;
  z-index: 2;
}

.managerContainer .nav a.active{
  color: white;
  background-color: #23272B;
}
.managerContainer a:nth-child(1):hover~.active1{
  /* height: 5rem; */
  top: 0px;
}
.managerContainer a:nth-child(2):hover~.active1{
  /* height: 5rem; */
  top: 60px;
}
.managerContainer a:nth-child(3):hover~.active1{
  /* height: 5rem; */
  top: 120px;
}
.managerContainer a:nth-child(4):hover~.active1{
  /* height: 5rem; */
  top: 180px;
}
.managerContainer a:nth-child(5):hover~.active1{
  /* height: 5rem; */
  top: 240px;
}
.managerContainer a:nth-child(6):hover~.active1{
  /* height: 5rem; */
  top: 300px;
}
.managerContainer a:nth-child(7):hover~.active1{
  /* height: 5rem; */
  top: 360px;
}
.managerContainer a:nth-child(8):hover~.active1{
  top: 420px;
}
.managerContainer a:nth-child(9):hover~.active1{
  /* height: 5rem; */
  top: 480px;
}
.managerContainer a:nth-child(10):hover~.active1{
  /* height: 5rem; */
  top: 540px;
}
.managerContainer a:nth-child(11):hover~.active1{
  /* height: 5rem; */
  top: 600px;
}
.managerContainer a:nth-child(12):hover~.active1{
  /* height: 5rem; */
  top: 660px;
}


.managerContainer .nav .active1{
  color: white;
  background-color: #23272B;
  position:absolute;
  height: 60px;
  width: 100%;
  transition: all 0.3s;
  z-index: 1;
}

/* 内容区 */
.managerContainer .content{
  flex: 8;
  margin-left: 1rem;
}
.managerContainer .content .top{
  border: 0.1rem #9B9B9B solid;
  height: 6%;
  display: flex;
}
.managerContainer .content .top #text2{
  font-size: 1.6rem;
  color: #9B9B9B;
  margin-top: 1.3rem;
  margin-left: 3rem;
}
.managerContainer .content .top #img1{
  height: 3rem;
  margin-top: 0.9rem;
  margin-left: 4rem;
}
</style>