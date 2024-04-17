<template>
  <div>
    <!-- XSNJiPzM -->
    <!-- YRZNoVET -->

    <player v-if="show1" />
    <manager v-if="show2" />
    <!-- <router-view> </router-view> -->
  </div>
</template>

<script>
import player from "./pages/player.vue";
import manager from "./pages/manager.vue";
import Login from "./pages/Login_manager.vue";
import LoginPlayer from "./pages/Login_player.vue";
export default {
  name: "App",
  components: { player, manager, Login, LoginPlayer },
  data() {
    return {
      show1: true,
      show2: false,
    };
  },
  watch:{
    $route:{
      //url不发生变化，也会执行
      immediate:true,
      handler(newVal, oldVal){
        //监听url变化，跳转到manager可以让manager的路由呈现出来
        let temp = newVal.fullPath.split("_")[0]
        if(temp == "/manager"){
          this.show1 = false
          this.show2 = true
        }
        console.log(temp);
      }
    }
  },
  methods: {
    // getPattern(value) {
    //   console.log("hahaha", value);
    //   if (value == 1) {
    //     this.show1 = false;
    //     this.show2 = true;
    //   }
    // },
  },
};
</script>

<style>
</style>
