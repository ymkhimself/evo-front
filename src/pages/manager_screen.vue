<template>
  <!-- <h2>我是大屏管理</h2> -->
  <div id="screenContainer">
    <!-- 设置轮数 -->
    <div class="screenItem">
      <span class="prefix">设置轮数</span>
      <div>
        <el-input-number v-model="round" :min="1" />
        <el-button type="primary" round class="screenItemBtn" @click="setRound"
          >发送</el-button
        >
      </div>
    </div>

    <!-- 设置剩余时间 -->
    <div class="screenItem">
      <span class="prefix">设置剩余时间</span>
      <div>
        <el-input-number v-model="remainMinutes" :min="1" />
        <el-button
          type="primary"
          round
          class="screenItemBtn"
          @click="setRemainMinutes"
          >发送</el-button
        >
      </div>
    </div>

    <!-- 是否发送排名 -->
    <div class="screenItem">
      <span class="prefix">发送排名</span>
      <el-button type="primary" round @click="sendRank">发送</el-button>
    </div>

    <!-- 刷新大屏队伍信息 -->
    <div class="screenItem">
      <span class="prefix">刷新所有队伍状态</span>
      <el-button type="primary" round @click="clearAll">刷新</el-button>
    </div>

    <!-- 刷新某一队伍 -->
    <div class="screenItem attack">
      <span class="prefix">刷新指定队伍状态</span>
      <div class="attackItem">
        <el-form-item label="队伍" class="subItem">
          <el-select v-model="clearTeam" placeholder="请选择队伍">
            <el-option
              v-for="(obj, index) in tableData"
              :key="index"
              :label="obj.Name"
              :value="obj.ID"
            />
          </el-select>
        </el-form-item>
      </div>
      <el-button type="primary" round class="btn" @click="clearOneTeam">发送</el-button>
    </div>

    <!-- 设置状态  -->
    <div class="screenItem region">
      <span class="prefix">设置状态</span>
      <div class="regionItem">
        <el-form-item label="队伍" class="subItem">
          <el-select v-model="region.id" placeholder="请选择队伍">
            <el-option
              v-for="(obj, index) in tableData"
              :key="index"
              :label="obj.Name"
              :value="obj.ID"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" class="subItem">
          <el-select v-model="region.state" placeholder="请选择状态">
            <el-option label="被攻击" value="attacked" />
            <el-option label="宕机" value="down" />
          </el-select>
        </el-form-item>
      </div>
      <el-button type="primary" round class="btn" @click="setRegion">发送</el-button>
    </div>

    <!-- 攻击 -->
    <div class="screenItem attack">
      <span class="prefix">攻击</span>
      <div class="attackItem">
        <el-form-item label="攻击方&nbsp&nbsp&nbsp" class="subItem">
          <el-select v-model="attack.from" placeholder="请选择攻击方">
             <el-option
              v-for="(obj, index) in tableData"
              :key="index"
              :label="obj.Name"
              :value="obj.ID"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="被攻击方" class="subItem">
          <el-select v-model="attack.to" placeholder="请选择被攻击方">
            <el-option
              v-for="(obj, index) in tableData"
              :key="index"
              :label="obj.Name"
              :value="obj.ID"
            />
          </el-select>
        </el-form-item>
      </div>
      <el-button type="primary" round class="btn" @click="setAttack">发送</el-button>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
import { reactive } from "vue";
export default {
  name: "managerScreen",
  data() {
    return {
      //轮数
      round: null,
      // 单位分钟
      remainMinutes: null,
      //刷新的队伍的ID
      clearTeam:null,
      //存放队伍的信息
      tableData: [],
      //设置状态
      region:{
        id:null,
        state:""
      },
      // 设置攻击
      attack:{
        from:null,
        to:null
      }
    };
  },
  mounted() {
    axios.get("/manager/team").then(
      (res) => {
        let data = res.data;
        this.tableData = data.data.teams;
      },
      (err) => {
        console.log(err);
      }
    );
  },
  methods: {
    //发送排名
    sendRank(){
      axios.post("/manager/starry/rank", {}).then(
        (response) => {
          let data = response.data;
          if (data.code == 200) {
            alert(data.msg);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    // 设置攻击
    setAttack(){
      axios
        .post("/manager/starry/attack", {
          from: this.attack.from,
          to:this.attack.to
        })
        .then(
          (response) => {
            let data = response.data;
            if (data.code == 200) {
              alert(data.msg);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    },
    //设置状态
    setRegion(){
      axios
        .post("/manager/starry/clear", {
          id: this.region.id,
          state:this.region.state
        })
        .then(
          (response) => {
            let data = response.data;
            if (data.code == 200) {
              alert(data.msg);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    },
    //刷新某个队伍的状态
    clearOneTeam(){
       axios
        .post("/manager/starry/clear", {
          id: this.clearTeam
        })
        .then(
          (response) => {
            let data = response.data;
            if (data.code == 200) {
              alert(data.msg);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    },
    // 设置轮数
    setRound() {
      axios
        .post("/manager/starry/round", {
          round: this.round,
        })
        .then(
          (response) => {
            let data = response.data;
            if (data.code == 200) {
              alert(data.msg);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    },
    //设置剩余时间
    setRemainMinutes() {
      axios
        .post("/manager/starry/time", {
          time: this.remainMinutes,
        })
        .then(
          (response) => {
            let data = response.data;
            if (data.code == 200) {
              alert(data.msg);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    },
    //刷新所有队伍的信息
    clearAll() {
      axios.post("/manager/starry/clearall", {}).then(
        (response) => {
          let data = response.data;
          if (data.code == 200) {
            alert(data.msg);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>

<!-- 为了引用"攻击方"等下拉栏所写 -->
<script setup>
const form = reactive({
  name: "",
  region1: "",
  region2: "",
  region3: "",
  region4: "",
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
}

#screenContainer {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;
  justify-content: space-around;
}

#screenContainer .screenItem {
  width: 50%;
  display: flex;
  margin-top: 2%;
  margin-left: 30%;
}
/* 每个配置项的前缀 */
#screenContainer .screenItem .prefix {
  font-size: 15px;
  width: 20%;
  color: #959a99;
}
/* 第一行和第二行按钮 */
.screenItemBtn {
  margin-left: 10px;
}

.attack,
.region {
  display: flex;
  flex-direction: column;
}
.attackItem,
.regionItem {
  margin-left: 20%;
}
.btn {
  margin-left: 20%;
  width: 200px;
}
</style>