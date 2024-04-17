<template>
  <div class="noticeItemContainer">
    <div class="line">
      <img src="../assets/img/提醒.png" alt="" />
    </div>
    <div>
      <div class="title" cols="30" rows="10" disabled>{{ notice.Title }}</div>
      <textarea class="content" cols="30" rows="10" v-model="notice.Content" disabled></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "noticeItem",
  props: {
    notice: {
      type: Object
    }
  },
  data() {
    return {

    }
  }
};
</script>

<style>
.noticeItemContainer {
  display: flex;
  margin: 0 auto;
}

.noticeItemContainer .line {
  height: 110px;
  width: 1px;
  background-color: #8b8b8b;
  margin-top: 50px;
  margin-left: 200px;
  margin-right: 50px;
  position: relative;
}

.noticeItemContainer img {
  position: absolute;
  margin-left: -25px;
  top: 40%;
  position: absolute;
  height: 50px;
  width: 50px;
  background-color: white;
}

.noticeItemContainer .content {
  height: 100px;
  width: 700px;
  border: 1px solid #8b8b8b;
  border-radius: 20px;
  outline: none;
  font-size: 20px;
  box-shadow: 1px 1px 1px #999;
  padding: 10px;
  float: left;
}

.noticeItemContainer .title {
  height: 20px;
  width: 700px;
  float: left;
  font-style: Times New Roman;
}
</style>