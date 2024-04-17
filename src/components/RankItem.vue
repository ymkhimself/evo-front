<template>
  <div class="rankItemContainer" :style="containerStyle">
      <div :style="firstStyle">{{obj.Rank}}</div>
      <div :style="secondStyle">{{obj.Name}}</div>
      <div class="lastDiv">{{obj.Score}}</div>
  </div>
</template>

<script>
export default {
    name:"rankItem",
    props:["obj", "containerWidth", "firstleft", "secondleft"],
    data(){
      return{
        containerStyle:{
          width:this.containerWidth + "px"
        },
        firstStyle:{
          marginLeft:this.firstleft + "px"
        },
        secondStyle:{
          marginLeft:this.secondleft + "px"
        }
      }
    }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  border: 0;
}
.rankItemContainer{
    display: flex;
    margin-top: 20px;
}
.rankItemContainer div{
    font-size: 20px;
    color:#8B8B8B;
}
 .rankItemContainer .lastDiv{
    margin-left:auto;
}
</style>