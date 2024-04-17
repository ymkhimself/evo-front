<template>
  <div>
    <noticeItem
      v-for="(notice, index) in notifications"
      :key="index"
      :notice="notice"
    />
  </div>
</template>

<script>
import axios from "@/axios";
import noticeItem from "../components/NoticeItem.vue";
export default {
  name: "playerNotice",
  components: { noticeItem },
  data() {
    return {
      notifications: [],
    };
  },
  mounted() {
    axios.get("/team/notification").then(
      (response) => {
        let data = response.data;
        this.notifications = data.data.notifications;
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>

<style>
</style>