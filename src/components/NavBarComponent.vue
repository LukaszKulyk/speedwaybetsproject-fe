<template>
    <div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">SpeedwayWorld</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">{{ $t('navBarComponent.home') }}</b-nav-item>
        <b-nav-item to="/standings">{{ $t('navBarComponent.standings') }}</b-nav-item>
        <b-nav-item to="/results">{{ $t('navBarComponent.results') }}</b-nav-item>
        <b-nav-item to="/schedule">{{ $t('navBarComponent.schedule') }}</b-nav-item>
        <b-nav-item to="/bets">{{ $t('navBarComponent.bets') }}</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

          <div class="locale-switcher">
              <select v-model="$i18n.locale">
                <option value="en">English</option>
                <option value="pl">Polski</option>
                <option value="lem">Лемко</option>
              </select>
          </div>

        <b-nav-item-dropdown right>
          <template #button-content>
            <!--<em v-if="loggedIn()">{{getUsername()}}</em>-->
            <!--<em v-else>User</em>-->
            <em>{{getUsername()}}</em>
          </template>
          <b-dropdown-item v-if="!loggedIn()" to="/login">{{ $t('navBarComponent.login') }}</b-dropdown-item>
          <b-dropdown-item v-if="!loggedIn()" to="/register">{{ $t('navBarComponent.register') }}</b-dropdown-item>
          <b-dropdown-item v-if="loggedIn()" to="/bets">{{ $t('navBarComponent.makeABet') }}</b-dropdown-item>
          <b-dropdown-item v-if="loggedIn()" to="/logout">{{ $t('navBarComponent.logout') }}</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
/* eslint-disable */
export default {
  data(){
    return {
      languages: {
        english: 'en',
        polish: 'pl',
        lemko: 'lem'
      }
    }
  },
  computed: {
  },
  methods: {
    loggedIn () {
      return this.$store.getters.loggedIn
    },
    getUsername () {
      //return this.$store.getters.getUsername
      if(this.$store.getters.getUsername) {
        return this.$store.getters.getUsername
      }
      else {
        return 'User'
      }
    }
  }
}
</script>
<style>
select {
  background-color: #343A40;
  border: none;
  color: #96999C;
  font-style: italic;
  margin-top: 8px;
}

.locale-switcher{
  color: #96999C;
}
</style>
