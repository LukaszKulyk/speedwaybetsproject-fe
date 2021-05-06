/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/pages/HomePage'
import StandingsPage from '@/components/pages/StandingsPage'
import ResultsPage from '@/components/pages/ResultsPage'
import SchedulePage from '@/components/pages/SchedulePage'
import BetsPage from '@/components/pages/BetsPage'
import RegisterUserComponent from '@/components/RegisterUserComponent'
import LoginUserComponent from '@/components/LoginUserComponent'
import LogoutUserComponent from '@/components/LogoutUserComponent'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/standings',
      name: 'StandingsPage',
      component: StandingsPage
    },
    {
      path: '/results',
      name: 'ResultsPage',
      component: ResultsPage
    },
    {
      path: '/schedule',
      name: 'SchedulePage',
      component: SchedulePage
    },
    {
      path: '/bets',
      name: 'BetsPage',
      component: BetsPage
    },
    {
      path: '/register',
      name: 'RegisterUserComponent',
      component: RegisterUserComponent
    },
    {
      path: '/login',
      name: 'LoginUserComponent',
      component: LoginUserComponent
    },
    {
      path: '/logout',
      name: 'LogoutUserComponent',
      component: LogoutUserComponent
    }
  ]
})

router.beforeEach((to,from,next)=> {

  if(to.path == "/bets" && localStorage.token == null)
  {
    next('/login')
  }
  else
  {
    next()
  }
})


/*function checkTokenValidity(token) {
  console.log('We are here')
  if (token) {
      const decodedToken = jwt.decode(token)
      console.log(decodedToken)
      return decodedToken && (decodedToken.exp * 1000) > new Date().getTime()
  
  }
  return false
}*/

export default router 
