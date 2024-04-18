<template>
  <!-- <h2>我是公告管理</h2> -->
  <el-button id="addNoticeBtn" type="primary" @click="addNoticeVisible = true">
    发布新公告
  </el-button>

  <el-table style="width: 100%" :data="tableData">
    <el-table-column prop="ID" label="ID" width="80"/>
    <el-table-column prop="Title" label="标题" width="180"/>
    <el-table-column prop="Content" label="内容"/>
    <el-table-column prop="CreatedAt" label="创建时间" width="180"/>
    <el-table-column prop="actions" label="操作">
      <template #default="scope">
        <el-button
            type="primary"
            round
            @click="changeupNoticeVisible(scope.row)"
        >编辑
        </el-button
        >
        <el-popconfirm
            title="请确认是否删除该公告？"
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

  <!-- 添加公告的弹窗 -->
  <el-dialog
      v-model="addNoticeVisible"
      title="添加公告"
      :close-on-click-modal="false"
  >
    <el-form :model="newNotice">
      <el-form-item label="标题" :label-width="100">
        <el-input v-model="newNotice.title"/>
      </el-form-item>
      <el-form-item label="内容" :label-width="100">
        <el-input v-model="newNotice.content" type="textarea"/>
      </el-form-item>
      <!-- <el-form-item label="创建时间" :label-width="100">
        <el-date-picker
          v-model="newNotice.time"
          type="datetime"
          format="YYYY/MM/DD"
          placeholder="公告创建时间"
        />
      </el-form-item> -->
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="addNewNotice">提交</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 编辑公告的弹窗 -->
  <el-dialog
      v-model="updateNoticeVisible"
      title="编辑公告"
      :close-on-click-modal="false"
  >
    <el-form :model="newNotice">
      <el-form-item label="标题" :label-width="100">
        <el-input v-model="updateNotice.title"/>
      </el-form-item>
      <el-form-item label="内容" :label-width="100">
        <el-input v-model="updateNotice.content" type="textarea"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="updateNoticeInfo">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from '@/axios'

export default {
  name: 'managerNotice',
  data () {
    return {
      addNoticeVisible: false,
      updateNoticeVisible: false,
      //新增的公告
      newNotice: {
        title: '',
        content: '',
        time: '',
      },
      //编辑的公告
      updateNotice: {
        beNoticeID: 0,
        title: '',
        content: '',
      },
      tableData: [],
    }
  },
  mounted () {
    this.getNotifications()
  },
  methods: {
    //获取公告
    getNotifications () {
      axios.get('/manager/notification', {}).then(
          (response) => {
            let data = response.data
            //将ISO 8601时间转化为字符串
            for (let i = 0; i < data.data.notifications.length; i++) {
              const date = new Date(data.data.notifications[i].CreatedAt)
              const dateString = date.toLocaleString()
              data.data.notifications[i].CreatedAt = dateString
            }
            this.tableData = data.data.notifications
          },
          (error) => {
            console.log(error)
          }
      )
    },
    // 是否触发编辑公告的弹窗
    changeupNoticeVisible (row) {
      console.log('需要修改的公告ID', row.ID)
      this.updateNotice.beNoticeID = row.ID
      this.updateNotice.title = row.Title
      this.updateNotice.content = row.Content
      this.updateNoticeVisible = true
    },
    // 编辑公告
    updateNoticeInfo () {
      this.updateNoticeVisible = false
      axios
          .put('/manager/notification', {
            notificationId: this.updateNotice.beNoticeID,
            title: this.updateNotice.title,
            content: this.updateNotice.content,
          })
          .then(
              (response) => {
                let data = response.data.data
                console.log(data.message)
                this.getNotifications()
              },
              (error) => {
                console.log(error)
              }
          )
    },
    // 添加公告
    addNewNotice () {
      this.addNoticeVisible = false
      axios
          .post('/manager/notification', {
            title: this.newNotice.title,
            content: this.newNotice.content,
          })
          .then(
              (response) => {
                let data = response.data
                alert('成功添加公告')
                this.getNotifications()
              },
              (error) => {
                console.log(error)
              }
          )
    },
    // 删除公告
    Delete (noticeID) {
      console.log('noticeID', noticeID)
      axios
          .delete(
              '/manager/notification',
              {
                params: {
                  notificationId: noticeID
                }
              }
          )
          .then(
              (response) => {
                let data = response.data
                alert(data.msg)
                this.getNotifications()
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

#addNoticeBtn {
  margin: 15px;
}
</style>
