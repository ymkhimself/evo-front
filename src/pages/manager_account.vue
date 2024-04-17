<template>
  <!-- 账号管理页面 -->
  <div class="accountContainer">
    <!-- 添加账号按钮 -->
    <el-button
      color="#5B7290"
      :dark="isDark"
      class="btn01"
      @click="dialogVisible = true"
      >添加账号</el-button
    >

    <!-- 列表 -->
    <el-table
      style="width: 90%"
      height="600"
      :data="tableData"
      class="accountTable"
    >
      <el-table-column width="200" label="ID" prop="ID" />
      <el-table-column width="200" label="用户号" prop="Name" />
      <el-table-column width="550" label="Token" prop="Token" />
      <el-table-column label="操作" class="operations">
        <template #default="scope">
          <el-button
            type="primary"
            plain
            @click="changeAccVisible(scope.row)"
            >修改账号</el-button
          >
          <el-popconfirm
            title="请确认是否删除该账号？"
            confirm-button-type="danger"
            cancel-button-type="primary"
            @confirm="Delete(scope.row.ID)"
          >
            <template #reference>
              <el-button color="#5B7290" :dark="isDark" plain
                >删除账号</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改账号信息的弹窗 -->
    <el-dialog
      v-model="accountVisible"
      title="修改账号"
      :close-on-click-modal="false"
    >
      <el-form :model="updateAccount">
        <!-- <el-form-item label="ID名" :label-width="100">
          <el-input v-model="updateAccount.upAccountID" />
        </el-form-item> -->
        <el-form-item label="账号名" :label-width="100">
          <el-input v-model="updateAccount.upAccountName" />
        </el-form-item>
        <el-form-item label="密码" :label-width="100">
          <el-input v-model="updateAccount.upAccountPwd" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="updateAccountInfo">提交</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 添加账号触发的弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      title="添加账号"
      :close-on-click-modal="false"
    >
      <el-form :model="newAccount">
        <el-form-item label="账号名" :label-width="100">
          <el-input v-model="newAccount.newAccountName" />
        </el-form-item>
        <el-form-item label="密码" :label-width="100">
          <el-input v-model="newAccount.newPassword" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="addNewAccount">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "@/axios";
export default {
  name: "managerAccount",
  data() {
    return {
      // 是否触发添加账号弹窗
      dialogVisible: false,
      //是否触发修改账号信息弹窗
      accountVisible: false,
      //列表数据储存
      tableData: [],
      //添加账号储存
      newAccount: {
        newAccountName: "",
        newPassword: "",
      },
      //更新账号信息
      updateAccount: {
        //需要修改的账号的ID
        beAccountID: 0,
        upAccountName: "",
        upAccountPwd: "",
      },
    };
  },
  methods: {
    //获取账号列表
    getAccount() {
      axios.get("/manager/account", {}).then(
        (response) => {
          let data = response.data;
          this.tableData = data.data.admins;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    // 触发编辑账号的弹窗
    changeAccVisible(row) {
      this.accountVisible = true;
      this.updateAccount.beAccountID = row.ID;
      this.updateAccount.upAccountName = row.Name
    },
    //按钮二删除账号
    Delete(ID) {
      console.log("accountID:", ID);
      axios
        .delete("/manager/account", {
          params: {
            // URL query string parameters
            adminId: ID,
          },
        })
        .then(
          (response) => {
            this.getAccount();
            let data = response.data;
            alert(data.msg);
          },
          (error) => {
            console.log(error);
          }
        );
    },
    //按钮三添加新账号
    addNewAccount() {
      this.dialogVisible = false;
      axios
        .post(
          "http://172.17.0.1:8080/manager/account",
          {
            name: this.newAccount.newAccountName,
            pwd: this.newAccount.newPassword,
          },
          {
            headers: {
              //添加请求头
              Authorization:
                "Bearer " + JSON.parse(sessionStorage.getItem("Token")),
            },
          }
        )
        .then(
          (response) => {
            let data = response.data;
            alert(data.msg);
            this.getAccount();
          },
          (error) => {
            console.log(error);
          }
        );
    },
    //更新账号的信息
    updateAccountInfo() {
      this.accountVisible = false;
      axios({
        method: "put",
        url: "/manager/account",
        data: {
          // request body data in JSON format
          adminId: this.updateAccount.beAccountID,
          name: this.updateAccount.upAccountName,
          pwd: this.updateAccount.upAccountPwd,
          // ...
        },
      }).then(
        (response) => {
          let data = response.data;
          console.log("更新");
          this.getAccount();
          alert(data.msg);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  mounted() {
    //获取账号列表
    this.getAccount();
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  border: 0;
}
.accountContainer {
  display: flex;
  flex-direction: column;
}
/* 添加账号按钮 */
.accountContainer .btn01 {
  margin-left: 2rem;
  margin-top: 2rem;
  width: 10rem;
  border: 0.1rem #619ddd solid;
}
/* 列表部分 */
.accountContainer .accountTable {
  font-size: 18px;
  margin-top: 2rem;
  align-self: center;
  /* font-style: oblique; */
  color: #959a99;
}
/* 列表中的按钮部分 */
.accountContainer .accountTable .operations {
  display: flex;
}
.accountContainer .accountTable .operations button {
  width: 1;
  border: 0.1rem #89b3e1 solid;
}
</style>