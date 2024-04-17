<template>
  <div>
      <iframe src="http://172.17.0.1:3000/d/BeCL9Q-4k/docker-monitoring?orgId=1&refresh=10s&kiosk" frameborder="0" class="monitor"></iframe>
  </div>
</template>

<script>
export default {
    name: "managerMonitor",
}
</script>

<style scoped>
div{
    height: 100%;
}
.monitor{
    height: 100%;
    width: 95%;
}
</style>