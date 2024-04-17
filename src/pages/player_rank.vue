<template>
  <div>
    <ul class="rankNav">
      <li>排名</li>
      <li>队伍名</li>
      <li>分数</li>
    </ul>
    <hr>
    <ul class="rankList">
     <rankItem v-for="(obj , index) in rankList" :key=index :obj="obj" 
     :containerWidth="920" 
     :firstleft="90"
     :secondleft="175"></rankItem>
    </ul>
  </div>
</template>

<script>
import axios from "@/axios";
import rankItem from "../components/RankItem.vue"
export default {
  name: "playerRank",
  components:{rankItem},
  data(){
    return {
      rankList:[]
    }
  },
  mounted(){
    //获取排名的数据
    axios.get("/info/rank").then(
      response=>{
        let data = response.data
        this.rankList = data.data.rank
      },
      error=>{console.log(error)}
    )
  }
};
</script>

<style scoped>
* {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 0;
}
.rankNav {
  display: flex;
  margin: 0 auto;
  margin-top: 70px;
  width: 1000px;
}
.rankNav li{
  margin: 0 80px;
  font-size: 20px;
  color: #8B8B8B;
}
/* .rankNav li:first-child{
  margin-left: 65px;
} */
.rankNav li:last-child{
  margin-left: auto;
}
hr {
  height: 1px;
  background-color: #8B8B8B;
  margin: 25px auto;
  width: 1000px;
}
.rankList{
  width: 1000px;
  margin:0 auto;
}
</style>