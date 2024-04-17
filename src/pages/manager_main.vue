<template>
  <div>
    <!-- <h2>我是主页</h2> -->
    <h1 id="roundHead">第{{ round }}轮</h1>
    <p id="leftTime">比赛剩余时间：{{ leftTime }}</p>

    <!--  -->
    <!-- 旧-已废弃-通知信息栏 -->
    <!-- <div id="notice">
      <button @click="show = !show">通知内容1-【标题】</button>
      <Transition class="transition">
        <p v-if="show">内容1的【完整内容】</p>
      </Transition>
      <br />

      <button @click="show = !show">通知内容2-【标题】</button>
      <Transition class="transition">
        <p v-if="show">内容2的【完整内容】</p>
      </Transition>
      <br />

      <button @click="show = !show">通知内容3-【标题】</button>
      <Transition class="transition">
        <p v-if="show">内容3的【完整内容】</p>
      </Transition>
      <br />
    </div> -->

    <!-- 新通知栏-用折叠面板实现 -->
    <div id="notice-collapse">

      <el-collapse v-model="activeName" accordion>
        <!-- accordion是否折叠 -->
        <el-collapse-item
          v-for="(item, index) in notifications"
          :key="index"
          :title="item.Title"
          name="1"
        >
          {{ item.Content }}
        </el-collapse-item>
      </el-collapse>

      <!-- <el-collapse accordion>
        <div v-for="(notice, index) in notifications" :key="index">
          <el-collapse-item title={{notice.Title}} name="1">
            <div>通知内容1111</div>
            <div>通知内容1112</div>
          </el-collapse-item>
        </div> -->
        <!-- accordion是否折叠
        <el-collapse-item title="通知标题1" name="1">
          <div>通知内容1111</div>
          <div>通知内容111(2</div>
        </el-collapse-item>
        <el-collapse-item title="通知标题2" name="2">
          <div>通知内容2222</div>
          <div>通知内容222(2</div>
        </el-collapse-item>
        <el-collapse-item title="通知标题3" name="3">
          <div>通知内容3333</div>
          <div>通知内容333(2</div>
          <div>
            Easy to identify: the interface should be straightforward, which
            helps the users to identify and frees them from memorizing and
            recalling.
          </div>
        </el-collapse-item>
        <el-collapse-item title="通知标题4" name="4">
          <div>通知内容444</div>
          <div>
            Controlled consequences: users should be granted the freedom to
            operate, including canceling, aborting or terminating current
            operation.
          </div>
        </el-collapse-item> -->
      <!-- </el-collapse> -->
    </div>

    <!-- 排行榜 -->
    <div id="rank">
      <!-- 旧排行榜-已废弃 -->
      <!-- <ul id="rankNav">
        <li>排名</li>
        <li>队伍名</li>
        <li>分数</li>
      </ul>
      <ul id="rankList">
        <rankItem
          v-for="(obj, index) in rankList"
          :key="index"
          :obj="obj"
        ></rankItem>
      </ul> -->
      <el-table :data="rankTableData" stripe style="width: 100%">
        <el-table-column prop="Rank" label="排名" width="80"> </el-table-column>
        <el-table-column prop="Name" label="队伍名"> </el-table-column>
        <el-table-column prop="Score" label="得分" width="100">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
import rankItem from "../components/RankItem.vue";
export default {
  name: "managerMain",
  components: { rankItem },
  data() {
    return {
      round: 5,
      leftTime: "4h50min",
      rankTableData: [],
      notifications: [],
      // rankList: [
      //   { rank: 1, name: "hahahahahaha12", score: 9878 },
      //   { rank: 2, name: "12e2", score: 8888 },
      //   { rank: 3, name: "007", score: 6666 },
      // ],
      // show: true, //为了transition组件
    };
  },
  mounted() {
    this.getRank();
    this.getNotification();
    this.getTime();
  },
  methods: {
    getRank() {
      axios.get("/info/rank").then(
        (response) => {
          let data = response.data;
          this.rankTableData = data.data.rank;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getNotification() {
      axios.get("/manager/notification").then(
        (response) => {
          let data = response.data;
          this.notifications = data.data.notifications;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getTime() {
      axios.get("/info/time").then(
        (response) => {
          let data = response.data;
          this.round = data.data.time.NowRound;
          console.log(this.round)
          if (data.data.time.RemainTime <= 0) {
            this.leftTime = "比赛未进行"
          } else {
            // RemainTime = data.data.time.RemainTime;
            // hour = RemainTime % 3600
            // min = RoundRemainTime % 60;
            // sec = RoundRemainTime / 60;
            // this.leftTime = hour + "小时" + min + "分" + sec + "秒"
          }
        },
        (error) => {
          console.log(error);
        }
      )
    }
  },

};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  border: 0;
}

/* 轮次 */
#roundHead {
  margin: 15px;
  color: #4b4e4e;
}

/* 剩余时间 */
#leftTime {
  margin: 20px;
  color: #4b4e4e;
  font-size: larger;
}

/* 新通知栏 */
#notice-collapse {
  width: 50%;
  margin-left: 23px;
  float: left;
}

/* rank */
#rank {
  margin: 0;
  width: 550px;
  float: left;
  margin-left: 20px;
}

/* rank end*/

/* 旧通知，已废弃 */
/* #notice {
  border-right: 2px solid rgb(224, 222, 222);
  width: 42%;
  height: 610px;
  float: left;
  margin-left: 2%;
} */
/* 通知标题的按钮 */
/* #notice button {
  background-color: rgb(241, 240, 240);
  transition: background-color 0.5s;
  padding: 5px 12px;
  border: 1px solid rgb(224, 222, 222);
  border-radius: 8px;
  font-size: 0.9em;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
} */
/* 每个通知的内容所在框 */
/* #notice .transition {
  padding: 22px 24px;
  border-radius: 8px;
  box-shadow: var(--vt-shadow-2);
  margin-bottom: 1.2em;
  transition: background-color 0.5s ease;
} */
/* vue内置组件- transition */
/* .v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
} */
/* .v-enter-from,
.v-leave-to {
  opacity: 0;
} */
/* notice end*/

/* 旧排行榜-已废弃 */
/* 对组件里的css进行了修改,这里为了不影响原来的页面 将class改成了id */
/* #rankNav {
  height: 30px;
  width: 690px;
  display: flex;
  margin: 0 auto;
}
#rankNav li {
  margin: 0 60px;
  font-size: 20px;
  color: #8b8b8b;
  margin: 0 70px;
}

#rankNav li:last-child {
  float: right;
  margin: 0 130px;
}
#forManagerMain {
   这里会影响组件的rankItem!!!!!!!!!
  width: 635px;
} */
</style>
