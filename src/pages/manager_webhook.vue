<template>
  <div class="webHookContainer">
    <!-- 添加按钮 -->
    <el-button
      color="#5B7290"
      :dark="isDark"
      class="btn01"
      @click="addWebhookVisible = true"
      >添加WebHook</el-button
    >

    <!-- 列表部分 -->
    <el-table
      style="width: 90%"
      height="600"
      :data="tableData"
      class="webHookTable"
    >
      <el-table-column width="100" label="ID" prop="webhookID" />
      <el-table-column width="200" label="URL" prop="URL" />
      <el-table-column width="130" label="WebHook类型" prop="type" />
      <el-table-column width="200" label="Token" prop="Token" />
      <el-table-column width="120" label="请求重试次数" prop="repeat" />
      <el-table-column width="120" label="请求超时次数" prop="overtime" />
      <el-table-column label="操作" class="operations">
        <template #default="scope">
          <el-button
            color="#5B7290"
            round
            @click="changeEditWebhookVisible(scope.row.webhookID)"
            >编辑</el-button
          >
          <el-popconfirm
            title="请确认是否删除该WebHook？"
            confirm-button-type="danger"
            cancel-button-type="primary"
            @confirm="Delete(scope.row.webhookID)"
          >
            <template #reference>
              <el-button type="danger" round>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加webhook弹窗 -->
    <el-dialog
      v-model="addWebhookVisible"
      title="添加Webhook"
      :close-on-click-modal="false"
    >
      <el-form :model="newWebHook">
        <el-form-item label="题目名" :label-width="100">
          <el-input v-model="newWebHook.name" />
        </el-form-item>
        <el-form-item label="所属队伍" :label-width="100">
          <el-input v-model="newWebHook.team" />
        </el-form-item>
        <el-form-item label="题目IP" :label-width="100">
          <el-input v-model="newWebHook.IP" />
        </el-form-item>
        <el-form-item label="端口" :label-width="100">
          <el-input v-model="newWebHook.port" />
        </el-form-item>
        <el-form-item label="分数" :label-width="100">
          <el-input-number
            v-model="newWebHook.score"
            :controls="false"
            :precision="2"
          />
        </el-form-item>
        <el-form-item label="Down" :label-width="100">
          <el-radio-group v-model="newWebHook.down">
            <el-radio label="true">true</el-radio>
            <el-radio label="false">false</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="被攻陷" :label-width="100">
          <el-radio-group v-model="newWebHook.fall">
            <el-radio label="true">true</el-radio>
            <el-radio label="false">false</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="addWebHook">提交</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 编辑WebHook -->
    <el-dialog
      v-model="editWebhookVisible"
      title="编辑Webhook"
      :close-on-click-modal="false"
    >
      <el-form :model="updateWebHook">
        <el-form-item label="题目名" :label-width="100">
          <el-input v-model="updateWebHook.name" />
        </el-form-item>
        <el-form-item label="所属队伍" :label-width="100">
          <el-input v-model="updateWebHook.team" />
        </el-form-item>
        <el-form-item label="题目IP" :label-width="100">
          <el-input v-model="updateWebHook.IP" />
        </el-form-item>
        <el-form-item label="端口" :label-width="100">
          <el-input v-model="updateWebHook.port" />
        </el-form-item>
        <el-form-item label="分数" :label-width="100">
          <el-input-number
            v-model="updateWebHook.score"
            :controls="false"
            :precision="2"
          />
        </el-form-item>
        <el-form-item label="Down" :label-width="100">
          <el-radio-group v-model="updateWebHook.down">
            <el-radio label="true">true</el-radio>
            <el-radio label="false">false</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="被攻陷" :label-width="100">
          <el-radio-group v-model="updateWebHook.fall">
            <el-radio label="true">true</el-radio>
            <el-radio label="false">false</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="updateWebHookInfo">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "managerWebhook",
  data() {
    return {
      addWebhookVisible: false,
      editWebhookVisible: false,
      tableData: [
        {
          webhookID: 1,
          URL: "www.baidu.com",
          type: "比赛开始时",
          Token: "ghjkyyu",
          repeat: 2,
          overtime: 4,
        },
        {
          webhookID: 2,
          URL: "www.jingdong.com",
          type: "比赛结束时",
          Token: "gghjjuyia789sd",
          repeat: 1,
          overtime: 2,
        },
        {
          webhookID: 3,
          URL: "www.taobao.com",
          type: "比赛开始时",
          Token: "gh322jkyadsfayu",
          repeat: 2,
          overtime: 3,
        },
        {
          webhookID: 4,
          URL: "www.bilibili.com",
          type: "比赛开始时",
          Token: "123rt234tfxssa",
          repeat: 3,
          overtime: 3,
        },
      ],
      //新的webhook信息
      newWebHook: {
        name: "题目1",
        team: "hahaha",
        IP: "172.16.10.10",
        port: 8011,
        score: 100.0,
        down: "false",
        fall: "false",
      },
      //更改的webhook信息
      updateWebHook: {
        //需要更改的webhook的ID
        beWebhookID: 0,
        name: "题目2",
        team: "hahaha",
        IP: "172.16.10.10",
        port: 8011,
        score: 100.0,
        down: "false",
        fall: "false",
      },
    };
  },
  methods: {
    // 是否触发编辑webhook的窗口
    changeEditWebhookVisible(beWebhookID) {
      console.log("需要更改的webhook的ID", beWebhookID);
      this.editWebhookVisible = true;
      this.updateWebHook.beWebhookID = beWebhookID;
    },
    //编辑webhook
    updateWebHookInfo() {
      this.editWebhookVisible = false
      axios
        .put(
          "https://www.fastmock.site/mock/c0c20739f50aeaa91f156ced25dd4663/awdtest/webhook/editWebhook",
          {
            beWebhookID: this.updateWebHook.beWebhookID,
            name: this.updateWebHook.name,
            team: this.updateWebHook.team,
            IP: this.updateWebHook.IP,
            port: this.updateWebHook.port,
            score: this.updateWebHook.score,
            down: this.updateWebHook.down,
            fall: this.updateWebHook.fall,
          }
        )
        .then(
          (response) => {
            let data = response.data.data;
            alert("模拟更新webhook的信息！");
            console.log(data.message);
          },
          (error) => {
            console.log(error);
          }
        );
    },
    //添加webhook
    addWebHook() {
      this.addWebhookVisible = false;
      axios
        .post(
          "https://www.fastmock.site/mock/c0c20739f50aeaa91f156ced25dd4663/awdtest/webhook/addNewWebhook",
          {
            name: this.newWebHook.name,
            team: this.newWebHook.team,
            IP: this.newWebHook.IP,
            port: this.newWebHook.port,
            score: this.newWebHook.score,
            down: this.newWebHook.down,
            fall: this.newWebHook.fall,
          }
        )
        .then(
          (response) => {
            alert("模拟添加webhook");
            let data = response.data.data;
            console.log(data.message);
          },
          (error) => {
            console.log(error);
          }
        );
    },
    //删除webhook
    Delete(webhookID) {
      console.log("删除的webhookID", webhookID);
      axios
        .delete(
          "https://www.fastmock.site/mock/c0c20739f50aeaa91f156ced25dd4663/awdtest/webhook/deletWebhook",
          {},
          { params: { adminId: webhookID } }
        )
        .then(
          (response) => {
            let data = response.data.data;
            alert("模拟删除webhook");
            console.log(data.message);
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
.webHookContainer {
  display: flex;
  flex-direction: column;
}
.webHookContainer .btn01 {
  margin-left: 2rem;
  margin-top: 2rem;
  width: 10rem;
  border: 0.1rem #89b3e1 solid;
}
.webHookContainer .webHookTable {
  font-size: 15px;
  margin-top: 2rem;
  align-self: center;
  /* font-style: oblique; */
  color: #959a99;
}
.webHookContainer .webHookTable .operations {
  display: flex;
}
</style>