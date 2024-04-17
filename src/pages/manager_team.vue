<template>
  <!-- <h2>我是队伍管理</h2> -->
  <el-button id="addTeamBtn" type="primary" @click="addDialogVisible = true">
    添加队伍
  </el-button>
  <!-- <el-button id="addFileBtn" type="primary"> 从文件添加 </el-button> -->

  <el-table style="width: 100%" :data="tableData">
    <el-table-column prop="ID" label="ID" width="80"/>
    <el-table-column label="logo" width="180">
      <template #default="scope">
        <el-avatar shape="square" :size="50" :src="scope.row.Logo"/>
        <!-- <span style="margin-left: 10px">{{ scope }}</span> -->
      </template>
    </el-table-column>
    <el-table-column prop="Name" label="队伍名" width="180"/>
    <el-table-column prop="Score" label="分数" width="180"/>
    <el-table-column prop="Pwd" label="Pwd"/>
    <el-table-column prop="actions" label="操作">
      <template #default="scope">
        <el-button
            type="primary"
            round
            @click="changeEditTeamVisible(scope.row.ID)"
        >编辑
        </el-button
        >
        <el-button type="danger" round @click="resetPwd(scope.row.ID)"
        >重置密码
        </el-button
        >
        <el-popconfirm
            title="请确认是否删除该队伍？"
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

  <!-- 编辑队伍的弹窗 -->
  <el-dialog
      v-model="editTeamVisible"
      title="编辑队伍"
      :close-on-click-modal="false"
  >
    <el-form :model="updateTeam">
      <el-form-item label="队伍名" :label-width="100">
        <el-input v-model="updateTeam.upTeamName"/>
      </el-form-item>
      <!-- <el-form-item label="分数" :label-width="100">
        <el-input v-model="updateTeam.upTeamScore" />
      </el-form-item>
      <el-form-item label="Token" :label-width="100">
        <el-input v-model="updateTeam.upTeamToken" />
      </el-form-item> -->
      <el-form-item label="logo" :label-width="100">
        <input
            type="file"
            name="file"
            @change="updateLogo"
            id="inputUp"
            accept="image/png,image/jpeg"
        />
      </el-form-item>
      <el-form-item :label-width="100">
        <div>请上传jpg,png格式的图片</div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="updateTeamInfo">提交</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 添加队伍的弹窗 -->
  <el-dialog
      v-model="addDialogVisible"
      title="添加队伍"
      :close-on-click-modal="false"
  >
    <el-form :model="newTeam">
      <el-form-item label="队伍名" :label-width="100">
        <el-input v-model="newTeam.newTeamName"/>
      </el-form-item>
      <el-form-item label="logo" :label-width="100">

        <input
            type="file"
            name="file"
            @change="addLogo"
            id="inputUp"
            accept="image/png,image/jpeg"
        />
      </el-form-item>
      <el-form-item :label-width="100">
        <div>请上传jpg,png格式的图片</div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="addNewTeam">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>


<script>
import axios from '@/axios'

export default {
  name: 'managerTeam',
  data () {
    return {
      // 是否触发添加新的队伍的弹窗
      addDialogVisible: false,
      //是否触发编辑队伍的弹窗
      editTeamVisible: false,
      tableData: [],
      //新添加的队伍信息
      newTeam: {
        newTeamName: '',
        //后端返回的logo
        logo: null,
      },
      //编辑队伍
      updateTeam: {
        //需要修改的队伍ID beforeTeamID
        beTeamID: 0,
        upTeamName: '',
        logo: null,
      },
    }
  },

  mounted () {
    this.getTeam()
  },

  methods: {
    //重置密码
    resetPwd (beTeamID) {
      console.log('重置密码的ID', beTeamID)
      axios
          .get('/manager/team/reset', {
            params: {
              teamId: beTeamID,
            },
          })
          .then(
              (response) => {
                let data = response.data
                this.getTeam()
                alert(data.msg)
              },
              (error) => {
                console.log(error)
              }
          )
    },
    addLogo (e) {
      let file = e.target.files[0]
      const formData = new FormData()
      formData.append('logo', file)
      axios
          .post('/manager/team/logo', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(
              (response) => {
                let data = response.data
                this.newTeam.logo = data.data.path
              },
              (error) => {
                console.log(error)
              }
          )
    },
    //编辑队伍
    updateTeamInfo () {
      this.editTeamVisible = false
      axios
          .put(
              '/manager/team',
              {
                teamId: this.updateTeam.beTeamID,
                name: this.updateTeam.upTeamName,
                logo: this.updateTeam.logo,
              }
          )
          .then(
              (response) => {
                let data = response.data
                alert(data.msg)
                this.getTeam()
              },
              (error) => {
                console.log(error)
              }
          )
    },
    // 编辑队伍时上传logo
    updateLogo (e) {
      let file = e.target.files[0]
      const formData = new FormData()
      formData.append('logo', file)
      formData.append('teamId', this.updateTeam.beTeamID)
      axios.post('/manager/team/logo', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(
              (response) => {
                let data = response.data
                this.updateTeam.logo = data.data.path
              },
              (error) => {
                console.log(error)
              }
          )
    },
    //获取队伍
    getTeam () {
      axios.get('/manager/team').then(
          (res) => {
            let data = res.data
            for (let i = 0; i < data.data.teams.length; i++) {
              data.data.teams[i].Logo =
                  'http://172.17.0.1:8082' + data.data.teams[i].Logo
            }
            this.tableData = data.data.teams
            // alert(data.msg);
          },
          (err) => {
            console.log(err)
          }
      )
    },
    // 触发编辑队伍的弹窗
    changeEditTeamVisible (beTeamID) {
      console.log('需要修改的ID', beTeamID)
      this.updateTeam.beTeamID = beTeamID
      this.editTeamVisible = true
    },
    //添加队伍
    addNewTeam () {
      axios
          .post('/manager/team', {
            name: this.newTeam.newTeamName,
            logo: this.newTeam.logo,
          })
          .then(
              (response) => {
                let data = response.data
                alert(data.msg)
                this.getTeam()
              },
              (error) => {
                console.log(error)
              }
          )

      this.addDialogVisible = false
    },
    // 删除队伍
    Delete (teamID) {
      console.log('teamID:', teamID)
      axios.delete('/manager/team', { params: { teamId: teamID } }).then(
          (response) => {
            let data = response.data
            alert(data.msg)
            this.getTeam()
          },
          (error) => {
            console.log(error)
          }
      )
    },
  },
}
</script>


<style>
* {
  margin: 0;
  padding: 0;
}

#addTeamBtn {
  margin: 15px;
}

#inputUp {
  padding: 5px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
}

input[type="file"]::file-selector-button {
  font-weight: 500;
  padding: 5px;
  color: #fff;
  background-color: #409eff;
  border: none;
  border-radius: 3px;
  /* border-color: #409eff; */
}
</style>
