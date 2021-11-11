<template>
    <div data-test-id="bets-page">
        <b-container>
            <h1>{{ $t('betsPage.title') }}</h1>
            <div v-if="loadingStatus" class="loading-div">
                <vue-spinner />
            </div>
            <div v-else>
                <div v-if="loggedIn()">
                    <div v-if="checkIfNextGameWeekIsAvailable() > 0">
                        <div v-for="(game, index) in nextGameWeekGames()" :key="index">
                            <GameBetComponent :data-test-id="'game-bet-'+index" :game="game"></GameBetComponent>
                        </div>
                    </div>
                    <div v-else>
                        <h2>{{ $t('betsPage.noGameWeekScheduledYet') }}</h2>
                    </div>
                </div>
                <div v-else data-test-id="not-logged-bets-page">
                    <h2>{{ $t('betsPage.userNotLoggedIn') }}</h2>
                    <router-link to="/login">{{ $t('betsPage.loginButton') }}</router-link>
                    <router-link to="/register">{{ $t('betsPage.registerButton') }}</router-link>
                </div>
            </div>
        </b-container>
    </div>
</template>

<script>
/* eslint-disable */
import Spinner from 'vue-simple-spinner'
import GameBetComponent from '../GameBetComponent'

export default {
    components: {
        vueSpinner: Spinner,
		GameBetComponent
	},
    data() {
        return {
            translations: {
                eng: 'Game Week',
                pol: 'Kolejka',
                lem: 'Teper'
            },
            submitted: false,
            allUserBetsForCurrentGameWeek: []
        }
    },
    created(){
        this.$store.dispatch('getNextGameWeekGames');
        this.$store.dispatch('getAllUserBetsForCurrentGameWeek');
    },
    computed: {
        loadingStatus() {
            return this.$store.getters.loadingStatus;
        }
    },
    methods: {
        loggedIn(){
			return this.$store.getters.loggedIn
		},
		nextGameWeekGames(){
			return this.$store.getters.getNextGameWeekGames.data.schedule;
		},
        checkIfNextGameWeekIsAvailable(){
            return this.$store.getters.getNextGameWeekGames.data.count;
        },
        setAllUserBets(){
            this.$store.dispatch('getAllUserBetsForCurrentGameWeek')
                .then(response => {
                    console.log(response);
                })
        }
    }
}
</script>
<style>
* {box-sizing: border-box;}

.container {
  display: block;
  margin:auto;
  text-align: center;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 60%;
  margin-top: 5px;
  margin-bottom: 5px;
}

label {
  float: left;
}

input[type=text], [type=email], textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

input[type=reset] {
  background-color: #dd211a;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=reset]:hover {
  background-color: #b91904;
}

label {
    padding: 5px;
}

.score-input-size {
    size: "sm";
}

b-form-row {
    width: 100%;
}

div {
    width: 100%;
}

</style>
