
<template>
  <div class="playerContainer">
    <ul class="nav">
      <span id="text1">AWD平台</span>
      <router-link to="/player_notice" @click="isShow = false">公告</router-link>
      <router-link to="/player_target" @click="changeText2">靶机与题目</router-link>
      <router-link to="/player_rank" @click="changeText2">排名</router-link>
    </ul>
    <div id="text2" v-show="isShow">{{ text2 }}</div>

    <!-- 缓存路由 -->
    <!-- <router-view v-slot="{ Component }">
      <keep-alive include="Target">
        <component :is="Component"></component>
      </keep-alive>
    </router-view> -->
    <router-view></router-view>
  </div>
</template>

<script>
import playerNotice from "../pages/player_notice";
import playerRank from "../pages/player_rank";
import playerTarget from "../pages/player_target";
export default {
  name: "player",
  components: { playerNotice, playerRank, playerTarget },
  data() {
    return {
      text2: "",
      isShow: true,
    };
  },
  methods: {
    changeText2(e) {
      this.text2 = e.target.innerText;
      this.isShow = true;
    },
  },
};
</script>
  
<style scoped>
* {
  padding: 0;
  margin: 0;
  border: 0;
}
.nav {
  background-color: #343a40;
  height: 50px;
  padding-top: 20px;
}
.nav #text1 {
  color: white;
  margin-left: 10px;
  margin-right: 30px;
  font-weight: 1000;
  font-style: italic;
  font-size: 25px;
}
.nav a {
  text-decoration: none;
  margin: 0 30px;
  color: #959a99;
  font-size: 20px;
}
.nav a:hover {
  color: white;
}
.playerContainer #text2 {
  color: white;
  background-color: #343a40;
  font-size: 24px;
  text-align: center;
  line-height: auto;
  padding: 18px;
  /* height: 175px; */
  height: auto;
}
</style>