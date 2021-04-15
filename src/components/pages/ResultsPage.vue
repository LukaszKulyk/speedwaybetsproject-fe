<template>
    <div>
        <b-container>
            <h1>{{ $t('resultsPage.title') }}</h1>
            <div v-if="loadingStatus" class="loading-div">
                <vue-spinner />
            </div>
            <div v-else>
                <div v-if="this.$store.getters.getLastStandingsTable">
                    <h2>{{ $t('resultsPage.tableTitle') }}</h2>
                    <div>
                        <b-table striped hover responsive :items="lastStandingsTable()" :fields="standingsTableColumns"></b-table>
                    </div>
                </div>
                <div v-else>
                    <h2>{{ $t('resultsPage.ifNoResultsYet') }}</h2>
                </div>
                <div v-if="this.$store.getters.getAllPlayedGamesResults">
                    <h3><strong>{{ $t('resultsPage.playedGames') }}</strong></h3>
                    <div v-for="(game, index) in allPlayedGamesResults()" :key="index">
                        <div>
                            <p><strong>{{ game.homeTeam }} - {{ game.awayTeam }}</strong></p>
                            <p><strong>{{ game.gameResult.homeTeamPoints }} : {{ game.gameResult.awayTeamPoints }}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </b-container>
    </div>
</template>

<script>
/* eslint-disable */
import Spinner from 'vue-simple-spinner'

export default {
    components: {
        vueSpinner: Spinner
    },
    data() {
        return {
            translations: {
                eng: 'Game Week ',
                pol: 'Kolejka I',
                lem: 'Runda I'
            },
            standingsTableColumns: ['pos', 'team', 'gamesPlayed', 'bigPoints', 'smallPoints', 'bonuses', 'wins', 'loses', 'draws',{ key: 'arrow', tdClass: 'setPosTdClass'}],
        }
    },
    created(){
        this.$store.dispatch('getLastStandingsTable');
        this.$store.dispatch('getAllPlayedGamesResults');  
    },
    computed: {
        loadingStatus() {
            return this.$store.getters.loadingStatus;
        }
    },
    methods: {
        lastStandingsTable(){
			return this.$store.getters.getLastStandingsTable.data.standings[0].currentRank;
		},
        allPlayedGamesResults() {
            return this.$store.getters.getAllPlayedGamesResults.data.schedule;
        },
        setPosTdClass(num){
            if(num > 0){
                return 'text-green';
            }
            else if(num === 0){
                return 'text-gray';
            }
            else if(num < 0){
                return 'text-red';
            }
        }
    }
}
</script>

<style>
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

p {
    display: inline-block;
}

div {
    width: 100%;
}

.text-red {
  color: red;
  font-weight: bold;

}

.text-green {
  color: green;
  font-weight: bold;
}

.text-gray {
    color: gray;
    font-weight: bold;
}
</style>
