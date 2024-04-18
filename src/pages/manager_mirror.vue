<template>
  <div class="mirrorContainer">
    <!-- 添加镜像按钮 -->
    <el-button
        color="#5B7290"
        :dark="isDark"
        class="btn01"
        @click="dialogFormVisible = true"
    >添加镜像
    </el-button
    >

    <!-- 列表 -->
    <el-table
        style="width: 90%"
        height="600"
        :data="tableData"
        class="mirrorTable"
    >
      <el-table-column width="550" label="ID" prop="Id"/>
      <el-table-column width="450" label="镜像名" prop="Tags"/>
      <el-table-column label="操作" width="350">
        <template #default="scope">
          <el-popconfirm
              title="请确认是否删除该镜像？"
              confirm-button-type="danger"
              cancel-button-type="primary"
              @confirm="Delete(scope.row.Id)"
          >
            <template #reference>
              <el-button type="danger" round>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加镜像触发的弹窗 -->
    <el-dialog
        v-model="dialogFormVisible"
        title="添加镜像"
        :close-on-click-modal="false"
    >
      <el-form :model="newMirror">
        <el-form-item label="镜像名" :label-width="100">
          <el-input v-model="newMirror.name"/>
        </el-form-item>
        <el-form-item label="附件" :label-width="100">
          <input type="file" ref="input" accept=".tar" @change="handleChange"/>
        </el-form-item>
        <el-form-item :label-width="550">
          <el-button color="#5B7290" @click="upload">上传</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
// import axios from "axios";
import axios from '@/axios'

export default {
  name: 'managerMirror',
  data () {
    return {
      file: null,
      tableData: [],
      dialogFormVisible: false,
      newMirror: {
        image: null,
        name: '',
      },
    }
  },

  mounted () {
    this.getMirrors()
  },
  methods: {
    //获取镜像
    getMirrors () {
      axios.get('/manager/image').then(
          (response) => {
            let data = response.data
            this.tableData = data.data.images
          },
          (error) => {
            console.log(error)
          }
      )
    },
    handleChange (e) {
      this.file = e.target.files[0]
    },
    //上传image文件
    upload () {
      const formData = new FormData()
      formData.append('image', this.file)
      formData.append('name', this.newMirror.name)
      axios
          .post('manager/image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(
              //处理响应后返回的数据
              (response) => {
                let data = response.data
                if (data.code == 200) {
                  alert('上传成功')
                }
              },
              (error) => {
                console.log(error)
              }
          )
    },
    //删除镜像
    Delete (Tags) {
      console.log('mirrorName:', Tags)
      axios
          .delete(
              '/manager/image',
              { params: { image: Tags } }
          )
          .then(
              (response) => {
                let data = response.data
                alert(data.msg)
              },
              (error) => {
                console.log(error)
              }
          )
    },
    //   //上传文件
    //   upload(){
    //     let image = this.$refs.input.files[0]
    //     let param = new FormData()
    //     //files只是一个文件
    //     param.append("image",image)
    //     param.append('name', this.newMirror.name)
    //     axios.post("https://www.fastmock.site/mock/c0c20739f50aeaa91f156ced25dd4663/awdtest/uploadMirror", param,
    //      { headers: { "Content-Type": 'multipart/form-data' } }).then(
    //        response=>{
    //          let data = response.data.data
    //          alert("模拟上传文件")
    //          console.log(data.message)
    //          this.dialogFormVisible = false
    //        },
    //        error=>{
    //          console.log(error)
    //        }
    //      )
    //   }
    // },
    // mounted() {
    //   axios
    //     .get(
    //       "https://www.fastmock.site/mock/c0c20739f50aeaa91f156ced25dd4663/awdtest/getMirror"
    //     )
    //     .then(
    //       (response) => {
    //         let data = response.data.data;
    //         this.tableData = data.tableData;
    //       },
    //       (error) => {
    //         console.log(error);
    //       }
    //     );
  },
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  border: 0;
}

.mirrorContainer {
  display: flex;
  flex-direction: column;
}

.mirrorContainer .btn01 {
  margin-left: 2rem;
  margin-top: 2rem;
  width: 10rem;
  border: 0.1rem #89b3e1 solid;
}

/* 列表部分 */
.mirrorContainer .mirrorTable {
  font-size: 1.5rem;
  margin-top: 2rem;
  align-self: center;
  /* font-style: oblique; */
  color: #959a99;
}

/* 弹窗部分 */
</style>
