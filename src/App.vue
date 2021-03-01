<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <NavBarComponent></NavBarComponent>
    <router-view/>
  </div>
</template>

<script>
import NavBarComponent from '@/components/NavBarComponent'

export default {
  components: {
    NavBarComponent
  },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
