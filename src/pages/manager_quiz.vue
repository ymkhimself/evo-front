<template>
  <!-- <h2>我是题目管理</h2> -->
  <el-button id="addChallengeBtn" type="primary" @click="addQuizVisible = true">
    添加题目
  </el-button>
  <!-- <el-button id="addChallengeBtn" type="primary"> 从文件添加 </el-button> -->

  <el-table style="width: 100%" :data="tableData">
    <el-table-column prop="ID" label="ID" width="80" />
    <el-table-column prop="Title" label="题目名" width="150" />
    <el-table-column prop="Score" label="基础分数" width="150" />
    <el-table-column prop="Command" label="command" width="150" />
    <el-table-column prop="Visible" label="是否可见" width="150" />
    <el-table-column prop="AutoRefresh" label="自动更新flag" width="130" />
    <el-table-column prop="Desc" label="描述" width="200" />
    <el-table-column prop="actions" label="操作">
      <template #default="scope">
        <el-button type="primary" round @click="changeUpQuizVisible(scope.row)"
          >编辑</el-button
        >
        <el-button type="primary" round @click="setVisible(scope.row.ID)"
          >设置可见性</el-button
        >
        <el-popconfirm
          title="请确认是否删除该题目？"
          confirm-button-type="danger"
          cancel-button-type="primary"
          @confirm="Delete(scope.row.ID)"
        >
          <template #reference>
            <el-button type="danger" round>删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <!-- 添加题目的弹窗 -->
  <el-dialog
    v-model="addQuizVisible"
    title="添加题目"
    :close-on-click-modal="false"
  >
    <el-form :model="newQuiz">
      <el-form-item label="标题" :label-width="100">
        <el-input v-model="newQuiz.title" />
      </el-form-item>
      <el-form-item label="描述" :label-width="100">
        <el-input v-model="newQuiz.desc" />
      </el-form-item>
      <el-form-item label="基础分数" :label-width="100">
        <el-input v-model="newQuiz.score" />
      </el-form-item>
      <el-form-item label="command" :label-width="100">
        <el-input v-model="newQuiz.command" />
      </el-form-item>
      <el-form-item label="自动更新flag" :label-width="100">
        <el-radio-group v-model="newQuiz.autoRefresh">
          <el-radio label="true">true</el-radio>
          <el-radio label="false">false</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="addNewQuiz">提交</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 编辑题目的弹窗 -->
  <el-dialog
    v-model="updateQuizVisible"
    title="编辑题目"
    :close-on-click-modal="false"
  >
    <el-form :model="upQuiz">
      <el-form-item label="标题" :label-width="100">
        <el-input v-model="upQuiz.title" />
      </el-form-item>
      <el-form-item label="描述" :label-width="100">
        <el-input v-model="upQuiz.desc" />
      </el-form-item>
      <el-form-item label="基础分数" :label-width="100">
        <el-input v-model="upQuiz.score" />
      </el-form-item>
      <el-form-item label="command" :label-width="100">
        <el-input v-model="upQuiz.command" />
      </el-form-item>
      <el-form-item label="自动更新flag" :label-width="100">
        <el-radio-group v-model="upQuiz.autoRefresh">
          <el-radio label="true">true</el-radio>
          <el-radio label="false">false</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="updateQuizInfo">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from "@/axios";
export default {
  name: "managerMirror",
  data() {
    return {
      addQuizVisible: false,
      updateQuizVisible: false,
      //添加题目
      newQuiz: {
        desc: "",
        title: "",
        score: null,
        // visibility: "true",
        autoRefresh: null,
        command: "",
      },
      //编辑题目
      upQuiz: {
        beQuizID: 0,
        command: "",
        desc: "",
        title: "",
        score: null,
        autoRefresh:null
      },
      tableData: [],
    };
  },
  mounted() {
    this.getQuizs();
  },
  methods: {
    //设置题目可见
    setVisible(ID) {
      axios
        .post("/manager/challenge/visible?challengeId=" + ID)
        .then(
          (response) => {
            let data = response.data;
            this.getQuizs()
            alert(data.msg)
          },
          (error) => {
            console.log(error);
          }
        );
    },
    //获取题目
    getQuizs() {
      axios.get("/manager/challenge").then(
        (response) => {
          let data = response.data;
          this.tableData = data.data.challenges;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //编辑题目
    updateQuizInfo() {
      this.updateQuizVisible = false;
      axios
        .put("/manager/challenge", {
          challengeId: this.upQuiz.beQuizID,
          title: this.upQuiz.title,
          desc:this.upQuiz.desc,
          score: this.upQuiz.score,
          //给后端的不是字符串形式
          autoRefresh: JSON.parse(this.upQuiz.autoRefresh),
          command:this.upQuiz.command
        })
        .then(
          (response) => {
            let data = response.data;
            alert(data.msg);
            this.getQuizs()
          },
          (error) => {
            console.log(error);
          }
        );
    },
    //是否触发编辑题目的弹窗
    changeUpQuizVisible(row) {
      this.updateQuizVisible = true;
      this.upQuiz.title = row.Title
      this.upQuiz.beQuizID = row.ID;
      this.upQuiz.command = row.Command;
      this.upQuiz.desc = row.Desc;
      this.upQuiz.score = row.Score;
      //后端的autoRefresh不是字符串，所以页面展示的时候需要转为字符串形式
      this.upQuiz.autoRefresh = JSON.stringify(row.AutoRefresh);
    },
    //删除题目
    Delete(beQuizID) {
      console.log("删除的ID", beQuizID);
      axios
        .delete(
          "/manager/challenge",
          { params: { challengeId: beQuizID } }
        )
        .then(
          (response) => {
            let data = response.data;
            this.getQuizs()
            alert(data.msg);
          },
          (error) => {
            console.log(error);
          }
        );
    },
    //添加题目
    addNewQuiz() {
      this.addQuizVisible = false;
      axios
        .post("/manager/challenge", {
          title: this.newQuiz.title,
          desc: this.newQuiz.desc,
          score: JSON.parse(this.newQuiz.score),
          command: this.newQuiz.command,
          //前端的auto是字符串，后端不需要字符串
          autoRefresh: JSON.parse(this.newQuiz.autoRefresh),
        })
        .then(
          (response) => {
            let data = response.data;
            this.getQuizs();
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

<style>
* {
  margin: 0;
  padding: 0;
}
#addChallengeBtn {
  margin: 15px;
}
</style>
