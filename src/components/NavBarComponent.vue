<template>
    <div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">SpeedwayBets</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/standings">Standings</b-nav-item>
        <b-nav-item to="/results">Results</b-nav-item>
        <b-nav-item to="/schedule">Schedule</b-nav-item>
        <b-nav-item to="/bets">Bets</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!---<b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>--->

        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">ENG</b-dropdown-item>
          <b-dropdown-item href="#">POL</b-dropdown-item>
          <b-dropdown-item href="#">LEM</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em v-if="loggedIn">{{getUsername}}</em>
            <em v-else>User</em>
          </template>
          <b-dropdown-item v-if="!loggedIn" to="/login">Login</b-dropdown-item>
          <b-dropdown-item v-if="!loggedIn" to="/register">Register</b-dropdown-item>
          <b-dropdown-item v-if="loggedIn" to="/bets">Make a bet</b-dropdown-item>
          <b-dropdown-item v-if="loggedIn" to="/logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
  computed: {
    loggedIn () {
      return this.$store.getters.loggedIn
    },
    getUsername () {
      return this.$store.getters.getUsername
    }
  }
}
</script>
