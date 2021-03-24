<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <NavBarComponent></NavBarComponent>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import NavBarComponent from '@/components/NavBarComponent'
import Footer from '@/components/Footer'

export default {
  components: {
    NavBarComponent,
    Footer
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
