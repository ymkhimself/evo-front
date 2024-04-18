<template>
  <!-- 获取轮数，比赛剩余事件，头像，名字 -->
  <el-container>
    <el-container>
      <el-aside>
        <el-descriptions
          direction="vertical"
          title="信息表"
          :column="2"
          :size="size"
          border
        >
          <el-descriptions-item label="Username">
            <el-avatar :src="teamInfo.teamImg" id="teamLogo" />
            <p>{{ teamInfo.teamName }}</p>
          </el-descriptions-item>
          <el-descriptions-item label="比赛剩余时间">
            <el-tag size="">
              <div id="countdown">
                {{ remainTime.hour }} h : {{ remainTime.minute }} min :
                {{ remainTime.seconds }} s
              </div>
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="总分数" :span="2">
            <p>

              {{ teamInfo.score }}
            </p>
          </el-descriptions-item>
          <el-descriptions-item label="轮次">
            <p>第{{ teamInfo.round }}轮</p>
          </el-descriptions-item>
          <!-- <el-descriptions-item label="Address">No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
          </el-descriptions-item> -->
        </el-descriptions>
        <!-- <div id="team">
        <el-avatar :src="teamInfo.teamImg" id="teamLogo" />
        <p id="teamName">{{ teamInfo.teamName }}</p>
      </div>
      <div id="leftTime">
        <p>比赛剩余时间</p>
        <div id="countdown">
          {{ remainTime.hour }} h : {{ remainTime.minute }} min :
          {{ remainTime.seconds }} s
        </div>
      </div>
      <div id="score">
        <p>总分数：</p>
        <p id="round">
          {{ teamInfo.score }}
        </p>
      </div>
      <div id="roundOfcompetition">
        <p>轮次</p>
        <p id="round">第{{ teamInfo.round }}轮</p>
      </div> -->
      </el-aside>

      <el-main class="main-in-palyer_target">
        <div id="rightChallenges">
          <challenge
            v-for="(challenge, index) in boxesData"
            :key="index"
            :challenge="challenge"
            class="challenge"
          />
          <!-- <div style="background-color: #959a99; min-height: 100px; border-radius: 10px;">没有数据，占个位置先</div> -->
          <div style="margin-bottom: 10px"></div>
        </div>
        <el-descriptions
          class="margin-top"
          title="信息表"
          :column="1"
          :size="size"
          border
        >
          <div id="postFormat"></div>
          <el-descriptions-item>
            <template #label> flag </template>
            <div id="postFormatL1" class="lineRules">
              <!-- <p id="postTxt">POST</p> -->
              <p id="flagTxt">POST /flag</p>
            </div>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> Header </template>
            <div class="lineRules">
              <p id="postBoxL2">
                Content-Type:application/json
                <br />Authorization:sdfasdfasdfadf/asdfasf/asdfa
              </p>
            </div>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> Body </template>
            <div class="lineRules">
              <p>{"flag": "your_flag_here"}</p>
            </div>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> 也这样提交 </template>
            <div class="lineRules">
              <p>
                curl X POST http://172.17.0.1:19999/api/flag || "Authorization
                : sdfasdfasdfadf/asdfasf/asdfa" -d "{ \"flag\" : \"
                your_flag_here\" }"
              </p>
            </div>
          </el-descriptions-item>
        </el-descriptions>

        <!-- <div id="rightChallenges">
        <challenge v-for="(challenge, index) in boxesData" :key="index" :challenge="challenge" class="challenge" />
      </div>

      <div id="rightFlag">
        <div id="submitFlagBigbox">
          <p id="submitText">提交Flag</p>
          <div id="submitBox">
            <el-input v-model="submitFlag" placeholder="Please input your flag" />
          </div>
          <el-button id="submitBtn" type="primary" @click="subFlag">提交</el-button>
        </div>

        <div id="postFormat">
          <div id="postFormatL1" class="lineRules">
            <p id="postTxt">POST</p>
            <p id="flagTxt" class="blueBox">/flag</p>
          </div>
          <div class="lineRules">
            <p>Header</p>
            <p class="blueBox" id="postBoxL2">
              Content-Type:application/json
              <br />Authorization:sdfasdfasdfadf/asdfasf/asdfa
            </p>
          </div>
          <div class="lineRules">
            <p>Body</p>
            <p class="blueBox">{"flag": "your_flag_here"}</p>
          </div>
          <div class="lineRules">
            <p class="blueBox">
              curl X POST http://172.16.10.10:19999/api/flag || "Authorization :
              sdfasdfasdfadf/asdfasf/asdfa" -d "{ \"flag\" : \" your_flag_here\"
              }"
            </p>
          </div>
        </div>
      </div> -->
        <div id="submitFlagBigbox">
          <div style="margin-top: 24px"></div>
          <p id="submitText">提交Flag</p>
          <div style="margin-top: 12px"></div>
          <div id="submitBox">
            <el-input
              v-model="submitFlag"
              placeholder="Please input your flag"
              maxlength="100"
            />
          </div>
          <div style="margin-top: 12px"></div>
          <el-button
            id="submitBtn"
            type="primary"
            @click=submitFlagFnc
            style="width: 100%"
            >提交</el-button
          >
        </div>
      </el-main>
    </el-container>
  </el-container>
  <!-- <div id="leftBar">
    <div id="team">
      <el-avatar :src="teamInfo.teamImg" id="teamLogo" />
      <p id="teamName">{{ teamInfo.teamName }}</p>
    </div>
    <div id="leftTime">
      <p>比赛剩余时间</p>
      <div id="countdown">
        {{ remainTime.hour }} h : {{ remainTime.minute }} min :
        {{ remainTime.seconds }} s
      </div>
    </div>
    <div id="score">
      <p>总分数：</p>
      <p id="round">
        {{ teamInfo.score }}
      </p>
    </div>
    <div id="roundOfcompetition">
      <p>轮次</p>
      <p id="round">第{{ teamInfo.round }}轮</p>
    </div>
  </div> -->
  <!-- <div id="rightBar">
    <div id="rightChallenges">
      <challenge
        v-for="(challenge, index) in boxesData"
        :key="index"
        :challenge="challenge"
        class="challenge"
      />
    </div>

    <div id="rightFlag">
      <div id="submitFlagBigbox">
        <p id="submitText">提交Flag</p>
        <div id="submitBox">
          <el-input v-model="submitFlag" placeholder="Please input your flag" />
        </div>
        <el-button id="submitBtn" type="primary" @click="subFlag"
          >提交</el-button
        >
      </div>

      <div id="postFormat">
        <div id="postFormatL1" class="lineRules">
          <p id="postTxt">POST</p>
          <p id="flagTxt" class="blueBox">/flag</p>
        </div>
        <div class="lineRules">
          <p>Header</p>
          <p class="blueBox" id="postBoxL2">
            Content-Type:application/json
            <br />Authorization:sdfasdfasdfadf/asdfasf/asdfa
          </p>
        </div>
        <div class="lineRules">
          <p>Body</p>
          <p class="blueBox">{"flag": "your_flag_here"}</p>
        </div>
        <div class="lineRules">
          <p class="blueBox">
            curl X POST http://172.16.10.10:19999/api/flag || "Authorization :
            sdfasdfasdfadf/asdfasf/asdfa" -d "{ \"flag\" : \" your_flag_here\"
            }"
          </p>
        </div>
      </div>
    </div>
  </div>-->
</template>

<script>
import axios from "@/axios";
import challenge from "../components/Challeng.vue";
export default {
  name: "playerTarget",
  components: { challenge },
  data() {
    return {
      boxesData: [],
      //提交的flag
      submitFlag: "",
      //队伍信息
      teamInfo: {
        // 比赛轮数
        round: 5,
        score: null,
        teamName: "hahaha",
        teamImg:
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      },
      //剩下的时间
      remainTime: {
        hour: 0,
        minute: 0,
        seconds: 0,
        timeDiffrence: 120, //单位是分钟,接口返回以秒为单位
      },
    };
  },
  methods: {
    // 获取靶机信息
    getBoxesData() {
      axios.get("/team/gameBox?teamId=" + sessionStorage.getItem("id")).then(
        (response) => {
          let data = response.data;
          this.boxesData = data.data.boxes;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //获取队伍信息
    getTeamInfo() {
      axios.get("/team/info?teamId=" + sessionStorage.getItem("id")).then(
        (response) => {
          let data = response.data;
          this.teamInfo.teamName = data.data.info.team.Name;
          this.teamInfo.teamImg =
            "http://172.0.17.1:8080" + data.data.info.team.Logo;
          this.teamInfo.score = data.data.info.team.Score;
          this.teamInfo.round = data.data.info.round;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    // 提交flag
    submitFlagFnc() {
      axios
        .post("/team/flag", {
          flag: this.submitFlag,
        })
        .then(
          (response) => {
            console.log(response);
            alert(response.data.msg);
          },
          (error) => {
            console.log(error);
          }
        );
    },
    //倒计时
    countDown(timeDiffrence) {
      this.remainTime.hour = parseInt(timeDiffrence / 60);
      if (timeDiffrence - this.remainTime.hour * 60 == 0) {
        this.remainTime.hour -= 1;
        this.remainTime.minute = 59;
        console.log("999");
        this.remainTime.seconds = 59;
      } else {
        console.log("888");
        this.remainTime.minute = timeDiffrence - this.remainTime.hour * 60 - 1;
        this.remainTime.seconds = 59;
      }
      let interval = setInterval(() => {
        if (this.remainTime.seconds == 0) {
          // this.remainTime.minute -= 1
          if (this.remainTime.minute == 0) {
            if (this.remainTime.hour == 0) {
              alert("时间到！");
              clearInterval(interval);
            } else {
              this.remainTime.hour -= 1;
              this.remainTime.minute = 59;
              this.remainTime.seconds = 59;
            }
          } else {
            this.remainTime.minute -= 1;
            this.remainTime.seconds = 59;
          }
          this.remainTime.seconds = 59;
        } else {
          this.remainTime.seconds -= 1;
        }

        if (
          this.remainTime.hour == 0 &&
          this.remainTime.minute == 0 &&
          this.remainTime.seconds <= 59
        ) {
        }
      }, 1000);
    },
  },
  mounted() {
    this.getTeamInfo();
    this.getBoxesData();
    this.countDown(this.remainTime.timeDiffrence);
  },
};
</script>

<style scoped>
#submitText {
  text-align: left;
  padding-left: 3px;
  font-weight: bold;
  font-size: medium;
  color: #303133;
}

.my-label {
  background: var(--el-color-success-light-9);
}

.my-content {
  background: var(--el-color-danger-light-9);
}

* {
  margin: 0;
  padding: 0;
}

.header-player_target {
  background-color: #f5f7fa;
  /* box-shadow:  20px 20px 60px #d9d9d9,
             -20px -20px 60px #ffffff; */
  border-radius: 10px;
  min-height: 160px;
  margin-bottom: 20px;
}

.el-aside {
  background-color: #f5f7fa;
  /* box-shadow:  20px 20px 60px #d9d9d9,
             -20px -20px 60px #ffffff; */
  padding: 20px;
  border-radius: 10px;
  margin-right: 10px;
  min-height: 520px;
}

.main-in-palyer_target {
  background-color: #f5f7fa;
  /* box-shadow:  20px 20px 60px #d9d9d9,
             -20px -20px 60px #ffffff; */
  padding: 20px;
  margin-left: 10px;
  border-radius: 10px;
  min-height: 520px;
}

p {
  color: #1c1c1c;
  text-align: center;
}
#rightChallenges {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 200px;
  overflow: scroll;
}
div::-webkit-scrollbar {
  display: none;
}
</style>

<!--
#leftBar {
  width: 20%;
  height: 600px;
  float: left;
  /* border: 1px solid green; */
  margin-top: 3%;
  border-right: 1px dotted black;
}

/* leftLine1 */
#team {
  height: 60px;
  /* border: 1px solid rgb(34, 82, 225); */
}

#teamLogo {
  width: 60px;
  height: 60px;
  float: left;
  background-size: contain;
}

#teamName {
  height: 60px;
  float: left;
  margin-left: 10px;
  /* color: #959a99; */
  color: #fff;
}

/* leftLine2 */
#leftTime {
  margin-top: 20px;
  /* color: #959a99; */
  color: #fff;
}

#countdown {
  height: 80px;
  margin-top: 5px;
  /* border: 1px solid sandybrown; */
}

/* leftLine3  */
#roundOfcompetition {
  margin-top: 20px;
  /* color: #959a99; */
  color: #fff;
}

#round {
  margin-top: 10px;
  margin-left: 30px;
}

/* leftLineFinished */
/* 分数 */
#score {
  /* color: #959a99; */
  color: #fff;
}

#rightBar {
  width: 70%;
  height: 800px;
  float: right;
  margin-right: 3%;
  margin-top: 3.5%;
  /* color: #959a99; */
  color: #fff;
  /* border: 1px solid blue; */
}

/* rightChallenges */
#rightChallenges {
  float: left;
  flex-direction: column;
  flex-wrap: wrap;
}

#rightChallenges .challenge {
  float: left;
  margin-left: 40px;
  margin-top: 10px;
}

/* rightFlag */
#rightFlag {
  width: 90%;
  height: 400px;
  float: left;
  margin-top: 20px;
  margin-left: 40px;
  /* border: 1px solid rgb(135, 217, 135); */
}

#submitFlagBigbox {
  width: 100%;
  height: 10%;
  /* border: 1px solid red; */
}

#submitText {
  font-size: large;
  float: left;
  margin-left: 20px;
}

#submitBox {
  width: 60%;
  float: left;
  margin-left: 3%;
}

#submitBtn {
  float: left;
  margin-left: 3%;
}

/* rightPOST */
.blueBox {
  float: left;
  height: 28px;
  color: #fff;
  background-color: #5b7290;
  border-radius: 13px;
  margin: 10px 0 10px 20px;
  padding: 5px 10px 0 10px;
}

.lineRules {
  margin-left: 20px;
  margin-bottom: 15px;
}

#postFormat {
  display: flex;
  flex-direction: column;
}

#postFormatL1 {
  height: 40px;
  /* border: 1px solid palevioletred; */
}

#postTxt {
  float: left;
  margin-top: 5px;
  font-size: larger;
}

#flagTxt {
  float: left;
  width: 50px;
}

#postBoxL2 {
  height: 50px;
}

/* rightBar finished */ -->
