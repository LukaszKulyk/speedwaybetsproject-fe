<template>
  <div data-test-id="admin-page">
    <b-container>
      <div v-if="this.$store.getters.getIsAdmin !== true">
        <LoginUserComponent></LoginUserComponent>
      </div>
      <div v-else>
          <h1>Admin Page</h1>
          <!---<h2>Next steps:</h2>--->
          <!---<h3>Login -> if login ok -> component where admin is able to change nextGameWeek, gameStatus and gameResults.</h3>-->
          <p>Current GameWeek: {{this.$store.getters.getInfoAboutNextGameWeekWhichShouldBePlayed}}</p>
          <b-form inline @submit.prevent="onChange" @reset="onReset">
            <label><strong>Current GameWeek:</strong></label>
            <b-form-input size="sm" type="number" min="0" max="30" v-model="gameWeek" required></b-form-input>
            <b-button type="submit">Change</b-button>
          </b-form>
          <div v-if="checkIfNextGameWeekIsAvailable() > 0">
            <div v-for="(game, index) in nextGameWeekGames()" :key="index">
              <AdminGameBetComponent :data-test-id="'game-bet-'+index" :game="game"></AdminGameBetComponent>
            </div>
            </div>
            <div v-else>
              <h2>{{ $t('betsPage.noGameWeekScheduledYet') }}</h2>
            </div>
      </div>
    </b-container>
  </div>
</template>

<script>
/* eslint-disable */
import LoginUserComponent from '@/components/LoginUserComponent'
import AdminGameBetComponent from '@/components/admin/AdminGameBetComponent'

export default {
    components: {
        LoginUserComponent,
        AdminGameBetComponent
    },
    data() {
      return {
        gameWeek: this.$store.getters.getInfoAboutNextGameWeekWhichShouldBePlayed,
      }
    },
    created(){
        //this.$store.dispatch('getNextGameWeekGames');
        this.$store.dispatch('getCurrentGameWeekGamesAdminView');
    },
  methods:{
    async onChange() {
      try {
        const response = await this.$store.dispatch('updateGameWeekValue', {
          nextGameWeek: parseInt(this.gameWeek),
        })
        .then(response => {
           return response;
        })
        .catch(err => {
          console.log(err);
        });
      }
      catch(err) {
        console.log(err);
      }
    },
    onReset(event) {
      this.gameWeek = ''
    },
    checkIfNextGameWeekIsAvailable(){
      return this.$store.getters.getCurrentGameWeekGamesAdminView.data.count;
    },
    nextGameWeekGames(){
			return this.$store.getters.getCurrentGameWeekGamesAdminView.data.schedule;
		},
  }
}
</script>
