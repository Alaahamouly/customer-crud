<template>
  <div id="app">
    <LogoutButton />
    <router-view/>
  </div>
</template>
<script>
import LogoutButton from './components/LogoutButton'
export default {
  components: { LogoutButton }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
