<template>
  <div class="container">
    <!-- 第一行 -->
    <div id="line1">
      <el-button type="primary" id="newFlagBtn" @click="generateFlag">
        生成Flag
      </el-button>
      <!-- <el-button type="primary"> 导出题目Flag</el-button> -->

      <!-- <div id="qusBtnDiv">
      <el-button circle id="questBtn" />
      <img src="../source/img/quest.png" id="questImg" />
    </div> -->
    </div>
    <!-- 第一行结束 -->

    <div id="line1plus">
      <el-form-item label="所属轮次" id="turnSelectLabel" class="selectLabel">
        <el-input placeholder="请输入轮次" v-model="round"></el-input>
      </el-form-item>

      <el-form-item label="所属队伍" id="teamSelectLabel" class="selectLabel">
        <el-select v-model="teamId" placeholder="请选择队伍">
          <el-option
              v-for="(obj, index) in teamData"
              :key="index"
              :label="obj.Name"
              :value="obj.ID"
          />
        </el-select>
      </el-form-item>

      <el-form-item
          label="所属题目"
          id="challengeSelectLabel"
          class="selectLabel"
      >
        <el-select v-model="challengeId" placeholder="请选择题目">
          <el-option
              v-for="(obj, index) in quizData"
              :key="index"
              :label="obj.Name"
              :value="obj.ID"
          />
        </el-select>

        <el-button
            type="primary"
            :icon="SearchIcon"
            round
            id="searchChallengeBtn"
            @click="search"
        >Search
        </el-button
        >
      </el-form-item>
    </div>

    <div class="table_pagination">
      <!-- 列表内容 -->
      <el-table style="width: 100%" :data="tableData">
        <el-table-column prop="ID" label="ID" width="80"/>
        <el-table-column prop="TeamId" label="所属队伍id" width="180"/>
        <el-table-column prop="ChallengeID" label="所属题目id" width="200"/>
        <!-- <el-table-column prop="targetDrone" label="所属靶机" width="180" /> -->
        <el-table-column prop="Round" label="所属轮次" width="180"/>
        <el-table-column prop="Flag" label="Flag"/>
      </el-table>

      <div class="pagination">
        <el-pagination
            v-model:page-size="pageSize"
            :current-page="currentPage"
            layout="prev, pager, next"
            @current-change="handlePageChange"
            @size-change="handleSizeChange"
            :total="total"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'
import { reactive } from 'vue'
// import { SearchIcon } from "@vue-icons/feather";
export default {
  name: 'managerFlag',
  data () {
    return {
      // 所属轮次
      round: null,
      // 查询的队伍的id
      teamId: null,
      //查询的题目的id
      challengeId: null,
      total: 100,
      pageSize: 10,
      currentPage: 1,
      addFlagVisible: false,
      // 存放队伍信息
      teamData: [],
      teamMap: new Map,
      //存放题目信息
      quizData: [],
      quizMap: new Map,
      tableData: [],
    }
  },
  mounted () {
    //获取队伍信息
    axios.get('/manager/team').then(
        (res) => {
          let data = res.data
          this.teamData = data.data.teams
          this.teamMap.clear()
          this.teamData.forEach((item) => {
            this.teamMap.set(item.ID, item.Name)
          })
        },
        (err) => {
          console.log(err)
        }
    )
    //获取题目信息
    axios.get('/manager/challenge').then(
        (response) => {
          let data = response.data
          this.quizData = data.data.challenges
          this.quizMap.clear()
          this.quizData.forEach((item) => {
            this.quizMap.set(item.ID, item.Title)
          })
        },
        (error) => {
          console.log(error)
        }
    )
    this.getFlag(1, 10)
  },
  methods: {
    getFlag (currentPage, pageSize) {
      axios
          .post('/manager/flag', {
            pageNum: currentPage,
            pageSize: pageSize,
          })
          .then(
              (response) => {
                let data = response.data
                this.tableData = data.data.flags
                this.total = data.data.count
                this.tableData.forEach((item) => {
                  item.teamName = this.teamMap.get(item.TeamId)
                  item.challengeName = this.quizMap.get(item.ChallengeID)
                })
                this.currentPage = currentPage
              },
              (error) => {
                console.log(error)
              }
          )
    },
    search () {
      axios.post('/manager/flag', {
        pageNum: 1,
        pageSize: parseInt(this.pageSize),
        round: parseInt(this.round),
        teamId: parseInt(this.teamId),
        challengeId: parseInt(this.challengeId)
      }).then(response => {
        console.log(response)
      }, error => {
        console.log(error)
      })
    },
    //处理当前页变化
    handlePageChange (page) {
      this.getFlag(page, 10)
    },
    //生成flag
    generateFlag () {
      axios.get('/manager/flag/generate').then(
          (response) => {
            let data = response.data
            this.getFlag(1, 10)
            alert(data.msg)
          },
          (error) => {
            console.log(error)
          }
      )
    },
  },
}
</script>

<!-- 为了引用"所属队伍"等下拉栏所写 -->
<script setup>
const form = reactive({
  name: '',
  region1: '',
  region2: '',
  region3: '',
})
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

#newFlagBtn {
  margin: 0 15px;
}

#searchChallengeBtn {
  margin-left: 20px;
}

/* 第一行结束 */
#line1plus {
  width: 100%;
  height: 50px;
}

#line1plus .selectLabel {
  width: 280px;
  float: left;
}

#line1plus #challengeSelectLabel {
  width: 400px;
}

.table_pagination {
  height: 70%;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
}

.container {
  height: 100%;
}

.table_pagination .pagination {
  align-self: center;
}
</style>
