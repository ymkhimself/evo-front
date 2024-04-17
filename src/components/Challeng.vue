<template>
  <div class="challengeContainer" @click="challengeInfoVisible = true">
    <p class="challengeName">题目名：{{challenge.challengeName}}</p>
    <p class="challengeLocation">端口：{{challenge.Port}}</p>
    <el-button class="stateBtn" type="warning" plain disabled>Attacked</el-button>
    <el-button class="stateBtn" type="danger" plain disabled>Down</el-button>
    <p class="challengeScore">得分情况：{{challenge.Score}}/{{challenge.challengeScore}}</p>
    <el-dialog
      v-model="challengeInfoVisible"
      title="题目信息"
      :close-on-click-modal="false"
    >
      <div class="boxContainer">
        <p>端口：{{ challenge.Port }}</p>
        <br/>
        <p>sshPort：{{ challenge.SshPort }}</p>
        <br/>
        <p>sshUser：{{ challenge.SshUser }}</p>
        <br/>
        <p>sshPwd：{{ challenge.SshPwd }}</p>
        <br/>
        <p>题目描述：{{challenge.desc}}</p>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="challengeInfoVisible = false">
            关闭
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "challenge",
  props:{
    challenge:{
      type:Object
    }
  },
  data() {
    return {
      challengeInfoVisible: false,
      challengeName: "题目名称",
      challengeLocation: "172.17.0.1:8011/ctf:12...",
      challengeScore: "1000分",
      state: "Attacked",
    };
  },
};
</script>

<style>
.challengeContainer {
  width: 300px;
  height: 130px;
  background-color: #343a40;
  border: 1px solid #707070;
  color: #ffffff;
}
.challengeContainer .challengeName {
  margin-left: 12px;
  margin-top: 8px;
}
.challengeContainer .challengeLocation {
  margin-left: 20px;
  margin-top: 10px;
}
.challengeContainer .stateBtn {
  border-radius: 90px;
  float: right;
  margin-right: 10px;
  margin-top: 15px;
}
.challengeContainer .challengeScore {
  margin-left: 20px;
  margin-top: 8px;
}

/* 弹窗的样式 */
.boxContainer{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
</style>