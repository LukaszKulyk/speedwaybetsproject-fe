<template>
    <div>
        <b-container>
            <h2>Table</h2>
        <div>
            <b-table striped hover responsive :items="lastStandingsTable()" :fields="standingsTableColumns"></b-table>
        </div>
            <div v-if="allPlayedGamesResults().length > 0">
                <h3><strong>All Played Games so far:</strong></h3>
                <div v-for="game in allPlayedGamesResults()" :key="game">
                    <div>
                        <p><strong>{{ game.homeTeam }} - {{ game.awayTeam }}</strong></p>
                        <p><strong>{{ game.gameResult.homeTeamPoints }} : {{ game.gameResult.awayTeamPoints }}</strong></p>
                    </div>
                </div>
            </div>
        </b-container>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    data() {
        return {
            translations: {
                eng: 'Game Week ',
                pol: 'Kolejka I',
                lem: 'Runda I'
            },
            standingsTableColumns: ['pos', 'team', 'gamesPlayed', 'bigPoints', 'smallPoints', 'bonuses', 'wins', 'loses', 'draws','arrow'],
        }
    },
    created(){
        this.$store.dispatch('getLastStandingsTable');
        this.$store.dispatch('getAllPlayedGamesResults');  
    },
    methods: {
        lastStandingsTable(){
			return this.$store.getters.getLastStandingsTable.data.standings[0].currentRank;
		},
        allPlayedGamesResults() {
            return this.$store.getters.getAllPlayedGamesResults.data.schedule;
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
</style>
