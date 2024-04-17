<template>
  <div class="configContainer">
    <div class="configItem">
      <span>比赛名</span>
      <div class="size">
        <el-input v-model="configs.name" placeholder="Please input" />
      </div>
    </div>

    <div class="configItem">
      <span>Flag前缀</span>
      <div class="size">
        <el-input v-model="configs.prefix" placeholder="Please input" />
      </div>
    </div>

    <div class="configItem">
      <span>Flag后缀</span>
      <div class="size">
        <el-input v-model="configs.suffix" placeholder="Please input"/>
      </div>
    </div>

    <div class="configItem">
      <span>比赛开始时间</span>
      <div class="size">
         <el-date-picker
        v-model="configs.starttime"
        type="datetime"
        value-format="YYYY-MM-DD HH:mm:ss"
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="请选择比赛开始时间"
      />
      </div>
    </div>

    <div class="configItem">
      <span>比赛结束时间</span>
      <div class="size">
         <el-date-picker
        v-model="configs.endtime"
        type="datetime"
        value-format="YYYY-MM-DD HH:mm:ss"
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="请选择比赛结束时间"
      />
      </div>
    </div>

    <div class="configItem">
      <span>每轮时间</span>
      <div class="size">
        <el-input-number v-model="configs.roundtime" :min="0" size="small" />
        <span>h</span>
        <!-- <el-input-number v-model="roundTimeMin" :min="0" :max="60" size="small" style="margin-left:3%"/> <span>min</span> -->
      </div>
    </div>

    <div class="configItem">
      <span>checkdown扣分</span>
      <div class="size">
        <el-input-number
          v-model="configs.downscore"
          :min="0"
          size="small"
          :controls="false"
          :precision="0"
        />
        <span>分</span>
      </div>
    </div>

    <div class="configItem">
      <span>攻击得分</span>
      <div class="size">
        <el-input-number
          v-model="configs.attackscore"
          :min="0"
          size="small"
          :controls="false"
          :precision="0"
        />
        <span>分</span>
      </div>
    </div>

    <!-- <div class="configItem">
      <span>更绚丽的3D大屏</span>
      <div class="size">
        <el-switch
          v-model="configs.starry"
          style="--el-switch-on-color: #5b7290; --el-switch-off-color: #efefef"
        />
      </div>
    </div> -->

    <!-- <div class="configItem">
      <span>靶机互相可见</span>
      <div class="size">
        <el-switch
          v-model="configs.boxvisible"
          style="--el-switch-on-color: #5b7290; --el-switch-off-color: #efefef"
        />
      </div>
    </div> -->

    <el-button color="#5B7290" :dark="isDark" class="btn01" @click="updateConfig"
      >修改配置</el-button
    >
  </div>
</template>

<script>
import axios from "@/axios";
export default {
  name: "managerConfig",
  data() {
    return {
      // startDate:"",
      // endDate:"",
      // roundTimeHour:0,
      // roundTimeMin:20,
      // attackscore: 30,
      // //宕机扣分
      // downscore: 0,
      // //比赛结束时间
      // endtime: null,
      // //比赛开始时间
      // starttime: null,
      // //flag
      // flag:"",
      // //flag前缀
      // prefix: "",
      // //flag后缀
      // suffix: "",
      // //每轮时间
      // roundtime: "",
      // //靶机是否互相可见
      // boxvisible: null,
      // // 比赛名字
      // name: "",
      // //大屏是否打开
      // starry: null,
      configs:{},
      //攻击得分
    };
  },
  mounted(){
    this.getConfig()
  },
  methods: {
    //获取配置
    getConfig(){
      axios
        .get("/manager/config")
        .then(
          (response) => {
            let data = response.data;
            if(data.code == 200){
              this.configs = data.data.configs;
              //后端返回的是字符串，前端展示不需要字符串
              this.configs.boxvisible = JSON.parse(data.data.configs.boxvisible)
              this.configs.starry = JSON.parse(data.data.configs.starry)
            }
          },
          (error) => {
            console.log(error);
          }
        );
    },
    //添加配置
    updateConfig() {
      //如果直接在请求中加上stringify会导致本来已经是字符串的值再次stringify,会加上/,出现bug
      if(typeof this.configs.downscore != "string"){
          this.configs.downscore = JSON.stringify(this.configs.downscore)
      }
      if(typeof this.configs.attackscore != "string"){
          this.configs.attackscore = JSON.stringify(this.configs.attackscore)
      }
      if(typeof this.configs.roundtime != "string"){
          this.configs.roundtime = JSON.stringify(this.configs.roundtime)
      }
      axios({
        method: "put",
        url: "/manager/config",
        data: {
          // request body data in JSON format
          name: this.configs.name,
          prefix: this.configs.prefix,
          suffix:this.configs.suffix,
          //大屏启用
          starry:JSON.parse(this.configs.starry),
          //靶机是否互见
          boxvisible:JSON.parse(this.configs.boxvisible),
          roundtime:this.configs.roundtime,
          starttime:this.configs.starttime,
          endtime:this.configs.endtime,
          downscore:this.configs.downscore,
          attackscore:this.configs.attackscore
        },
      }).then(
        (response) => {
          let data = response.data;
          this.getConfig()
          alert(data.msg);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>

<style scoped>
.configContainer {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 94%;
  align-items: center;
}
.configContainer .configItem {
  width: 50%;
  display: flex;
  margin-top: 2%;
}
/* 每个配置项的前缀 */
.configContainer .configItem span {
  font-size: 1.5rem;
  width: 20%;
  color: #959a99;
}
/* 控制输入框大小 */
.configContainer .configItem .size {
  width: 70%;
}
.configContainer .btn01 {
  margin-left: 2rem;
  margin-top: 2rem;
  width: 10rem;
  border: 0.1rem #89b3e1 solid;
}
</style>