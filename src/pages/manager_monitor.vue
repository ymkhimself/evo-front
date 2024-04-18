<template>
  <div>
      <iframe src="http://192.168.56.103:3000/d/BYN6sX-Sz/docker-and-system-monitoring?orgId=1&refresh=5m&from=now-3h&to=now&kiosk" frameborder="0" class="monitor"></iframe>
<!--  http://192.168.56.103:3000/d/BYN6sX-Sz/docker-and-system-monitoring?orgId=1&refresh=5m&kiosk-->
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
    width: 100%;
}
</style>
