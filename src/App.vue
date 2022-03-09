<template>
  <div id="app">
      <NavBarComponent></NavBarComponent>
      <AdminPage id="isAdmin" v-if="this.$route.fullPath === '/admin'"></AdminPage>
      <router-view v-else/>
      <Footer></Footer>
  </div>
</template>

<script>
/* eslint-disable */
import NavBarComponent from '@/components/NavBarComponent'
import Footer from '@/components/Footer'
import AdminPage from '@/components/admin/AdminPage'

export default {
  components: {
    NavBarComponent,
    Footer,
    AdminPage
  },
  name: 'App',
  /*watch: {
    $route (to, from) {
      // react to route changes...
      console.log('This is a route: ' + this.$route)
      console.log('This is a route path: ' + this.$route.path)
      console.log('This is a route full path: ' + this.$route.fullPath)
      if (this.$route.fullPath === '/admin') {
        console.log('This is a admin route.')
      }
    }
  }*/
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
