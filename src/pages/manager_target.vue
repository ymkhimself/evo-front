<template>
  <!--  <h2>我是靶机管理</h2> -->
  <!-- 第一行 -->
  <div id="line1">
    <el-button
      type="primary"
      id="newTargetBtn"
      @click="addTargetVisible = true"
    >
      添加新靶机
    </el-button>
    <!-- <el-button type="primary" plain>从文件添加</el-button> -->
    <el-button type="primary" plain @click="testSSHAll">
      测试SSH连接
    </el-button>
    <el-button type="danger" plain @click="setAllTarget"
      >重置所有靶机分数</el-button
    >

<!--    <el-form-item-->
<!--      label="所属题目"-->
<!--      id="challengeSelectLabel"-->
<!--      class="selectLabel"-->
<!--    >-->
<!--      <el-select v-model="form.region3" placeholder="请选择题目">-->
<!--        <el-option label="题目1" value="第1题" />-->
<!--        <el-option label="题目2" value="第2题" />-->
<!--      </el-select>-->
<!--    </el-form-item>-->

<!--    <el-form-item label="所属队伍" id="teamSelectLabel" class="selectLabel">-->
<!--      <el-select v-model="form.region2" placeholder="请选择队伍">-->
<!--        <el-option label="Oops队" value="Oops队" />-->
<!--        <el-option label="haha队" value="haha队" />-->
<!--      </el-select>-->
<!--    </el-form-item>-->
  </div>
  <!-- 第一行结束 -->

  <!-- 列表内容 -->
  <el-table style="width: 100%" :data="tableData">
    <el-table-column prop="ID" label="ID" width="60" />
    <el-table-column prop="TeamName" label="所属队伍" width="100" />
    <el-table-column prop="challengeName" label="题目名" width="100" />
    <el-table-column prop="CName" label="容器名" width="100" />
    <el-table-column prop="port" label="端口" width="100" />
    <el-table-column prop="sshPort" label="ssh端口" width="100" />
    <el-table-column prop="sshPwd" label="ssh密码" width="100" />
    <el-table-column prop="score" label="分数" width="100" />
    <el-table-column prop="isDown" label="Down" width="100" />
    <el-table-column prop="isAttack" label="被攻陷" width="100" />
    <el-table-column prop="actions" label="操作" width="320">
      <template #default="scope">
        <el-button type="primary" round @click="testSSH(scope.row.ID)"
          >测试SSH连接</el-button
        >
        <el-popconfirm
          title="删除容器有关的所有东西"
          confirm-button-type="danger"
          cancel-button-type="primary"
          @confirm="Delete(scope.row.ID)"
        >
          <template #reference>
            <el-button type="danger" round>删除容器</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <!-- 添加靶机的弹窗 -->
  <el-dialog
    v-model="addTargetVisible"
    title="添加靶机"
    :close-on-click-modal="false"
  >
    <el-form :model="newTarget">
      <el-form-item label="所属队伍" :label-width="100">
        <el-select v-model="newTarget.teamBelongID" placeholder="请选择队伍">
          <el-option
            v-for="(obj, index) in teamData"
            :key="index"
            :label="obj.Name"
            :value="obj.ID"
          />
        </el-select>
      </el-form-item>

      <!-- 将题目信息储存进一个数组
      {
        challengeID
        port
      }
       -->
      <el-form-item label="题目" :label-width="100">
        <el-table
          :data="newTarget.challeng"
          style="width: 100%"
          max-height="150"
        >
          <!-- 题目 -->
          <el-table-column label="题目名" width="150">
            <template #default="scope">
              <el-select
                v-model="scope.row.challengID"
                placeholder="请选择题目"
              >
                <!-- 遍历问题列表动态生成el-option -->
                <el-option
                  v-for="(obj, index) in quizData"
                  :key="index"
                  :label="obj.Title"
                  :value="obj.ID"
                />
              </el-select>
            </template>
          </el-table-column>
          <!-- 端口 -->
          <el-table-column label="端口" prop="port" width="150">
            <!-- 写成动态模式才能动态绑定 -->
            <template #default="scope">
              <el-input placeholder=" 请输入端口" v-model="scope.row.port" />
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column fixed="right" label="Operations" width="150">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click.prevent="deleteRow(scope.$index)"
              >
                Remove
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button style="width: 100%" @click="onAddChalleng" type="primary"
          >Add Item</el-button
        >
      </el-form-item>
      <el-form-item label="基于镜像" :label-width="100">
        <el-select v-model="newTarget.image" placeholder="请选择镜像">
          <!-- 遍历问题列表动态生成el-option -->
          <el-option
            v-for="(obj, index) in imageData"
            :key="index"
            :label="obj.Tags"
            :value="obj.Id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="SSH账号" :label-width="100">
        <el-input v-model="newTarget.SSHAccount" />
      </el-form-item>
      <el-form-item label="SSH密码" :label-width="100">
        <el-input v-model="newTarget.SSHPwd" />
      </el-form-item>
      <el-form-item label="SSH端口" :label-width="100">
        <el-input v-model="newTarget.SSHPort" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="addNewTarget">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive } from "vue";
import axios from "@/axios";
export default {
  name: "managerTarget",
  data() {
    return {
      addTargetVisible: false,
      //新靶机
      newTarget: {
        //所属队伍
        teamBelongID: "",
        // 靶机基于的镜像
        image: "",
        SSHAccount: "",
        SSHPwd: "",
        SSHPort: "",
        //存储题目信息的map
        challengMap: null,
        //存储添加题目信息
        challeng: [
          {
            //题目ID
            challengID: "",
            //端口
            port: "",
          },
        ],
      },
      //存储靶机信息
      tableData: [],
      //题目信息
      quizData: [],
      //队伍信息
      teamData: [],
      //镜像信息
      imageData: [],
    };
  },
  mounted() {
    // 让上一次的map都指向null,释放
    this.newTarget.challengMap = null;
    this.newTarget.challengMap = new Map();
    // 获取镜像信息
    axios.get("/manager/image").then(
      (response) => {
        let data = response.data;
        this.imageData = data.data.images;
      },
      (error) => {
        console.log(error);
      }
    );
    //获取队伍信息
    axios.get("/manager/team").then(
      (res) => {
        let data = res.data;
        this.teamData = data.data.teams;
        // //将队伍名字与队伍ID储存进一个map
        // for (let i = 0; i < data.data.teams.length; i++) {
        //   this.teamMap.set(data.data.teams[i].ID, data.data.teams[i].Name);
        // }
        // console.log(this.teamMap);
      },
      (err) => {
        console.log(err);
      }
    );
    //获取题目信息
    axios.get("/manager/challenge").then(
      (response) => {
        let data = response.data;
        this.quizData = data.data.challenges;
        // this.quizMap.clear();
        // //将题目名字与题目ID储存进一个map
        // for (let i = 0; i < data.data.challenges.length; i++) {
        //   this.quizMap.set(
        //     data.data.challenges[i].ID,
        //     data.data.challenges[i].Title
        //   );
        // }
      },
      (error) => {
        console.log(error);
      }
    );
    this.getTargets();
  },
  methods: {
    // 测试靶机的SSH
    testSSH(ID) {
      axios.get("/manager/box/test?boxId=" + ID).then(
        (response) => {
          let data = response.data;
          alert(data.msg);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //重置所有靶机分数
    setAllTarget() {
      axios.get("/manager/box/reset").then(
        (response) => {
          let data = response.data;
          alert(data.msg);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    // 测试所有SSH连接
    testSSHAll() {
      axios.get("/manager/box/testall").then(
        (response) => {
          let data = response.data;
          alert(data.msg);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //获取靶机
    getTargets() {
      axios.get("/manager/box").then(
        (response) => {
          let data = response.data;
          //通过队伍ID得到队伍名字
          // data.data.boxes.forEach((item) => {
          //   item.TeamName = this.teamMap.get(item.TeamId);
          // });
          this.tableData = data.data.boxes;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //添加靶机弹窗删除题目
    deleteRow(index) {
      this.newTarget.challeng.splice(index, 1);
    },
    //添加靶机窗口添加题目
    onAddChalleng() {
      this.newTarget.challeng.push({
        //题目ID
        challengID: "",
        //端口
        port: null,
      });
    },
    //是否出发修改题目的弹窗
    changeUpTargetVisible(beTargetID) {
      this.upTargetVisible = true;
      console.log("需要修改的target", beTargetID);
      this.updateTarget.beTargetID = beTargetID;
    },
    //添加靶机
    addNewTarget() {
      this.addTargetVisible = false;
      //清除上一轮添加了信息的Map
      this.newTarget.challengMap.clear();
      // 将chanllenge的信息存储进一个map
      for (let i = 0; i < this.newTarget.challeng.length; i++) {
        this.newTarget.challengMap.set(
          this.newTarget.challeng[i].challengID,
          this.newTarget.challeng[i].port
        );
      }
      axios
        .post("/manager/box", {
          teamId: this.newTarget.teamBelongID,
          image: this.newTarget.image,
          sshUser: this.newTarget.SSHAccount,
          sshPwd: this.newTarget.SSHPwd,
          sshPort: this.newTarget.SSHPort,
          // 将地图转变为普通对象,发给后端
          challengePort: Object.fromEntries(this.newTarget.challengMap),
        })
        .then(
          (response) => {
            let data = response.data;
            alert(data.msg);
            this.getTargets();
          },
          (error) => {
            console.log(error);
          }
        );
    },
    //删除靶机
    Delete(ID) {
      axios
        .delete("/manager/box", {
          params: {
            // URL query string parameters
            gameBoxId: ID,
          },
        })
        .then(
          (response) => {
            let data = response.data;
            this.getTargets();
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

<!-- 为了引用"所属队伍"等下拉栏所写 -->
<script setup>
const form = reactive({
  name: "",
  region1: "",
  region2: "",
  region3: "",
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
/* 第一行 */
.selectLabel {
  margin: 0 10px;
}
#line1 {
  display: flex;
  margin: 15px 0;
}
#newTargetBtn {
  margin-left: 15px;
}
#challengeSelectLabel {
  margin-left: 80px;
}
/* 第一行结束 */

.btn_addTarget_addChalleng {
  margin-top: 10px;
}
</style>
