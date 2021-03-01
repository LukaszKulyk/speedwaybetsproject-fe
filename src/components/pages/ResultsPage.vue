<template>
    <div>
        <div>
            <b-table striped hover responsive :items="lastStandingsTable.data.standings[0].currentRank" :fields="standingsTableColumns"></b-table>
        </div>
        <!---<b-container>--->
            <h3><strong>{{ translations.eng + lastGameWeekPlayed.data.schedule[0].gameWeek}}</strong></h3>
            <div v-for="game in lastGameWeekResults.data.schedule" :key="game">
                <div>
                    <p><strong>{{ game.homeTeam }} - {{ game.awayTeam }}</strong></p>
                    <p><strong>{{ game.gameResult.homeTeamPoints }} : {{ game.gameResult.awayTeamPoints }}</strong></p>
                </div>
            </div>
            <div>
                <b-table striped hover responsive :items="preapreValuesForAllPlayedGames()" :fields="allPlayedGamesColumns"></b-table>
            </div>
            <!--<p>{{ preapreValuesForAllPlayedGames() }}</p>-->
            <!---<div>
                <p><strong>{{ lastGameWeekResults.data.schedule[1].homeTeam }} - {{ game.first.awayTeam }}</strong></p>
                <p><strong>{{ game.first.homeTeamPoints }} : {{ game.first.awayTeamPoints }}</strong></p>
            </div>
            <div>
                <p><strong>{{ game.second.homeTeam }} - {{ game.second.awayTeam }}</strong></p>
                <p><strong>{{ game.second.homeTeamPoints }} : {{ game.second.awayTeamPoints }}</strong></p>
            </div>
            <div>
                <p><strong>{{ game.third.homeTeam }} - {{ game.third.awayTeam }}</strong></p>
                <p><strong>{{ game.third.homeTeamPoints }} : {{ game.third.awayTeamPoints }}</strong></p>
            </div>
            <div>
                <p><strong>{{ game.fourth.homeTeam }} - {{ game.fourth.awayTeam }}</strong></p>
                <p><strong>{{ game.fourth.homeTeamPoints }} : {{ game.fourth.awayTeamPoints }}</strong></p>
            </div>-->
        <!---</b-container>--->
    </div>
</template>

<script>
/* eslint-disable */
export default {
    data() {
        return {
            //getFullSchedule: [],
            translations: {
                eng: 'Game Week ',
                pol: 'Kolejka I',
                lem: 'Runda I'
            },
            standingsTableColumns: ['pos', 'team', 'gamesPlayed', 'bigPoints', 'smallPoints', 'bonuses', 'wins', 'loses', 'draws','arrow'],
            /*game: {
                first: {
                    homeTeam: 'Falubaz Zielona Góra',
                    awayTeam: 'Włókniarz Częstochowa',
                    homeTeamPoints: 46,
                    awayTeamPoints: 44
                },
                second: {
                    homeTeam: 'Stal Gorzów',
                    awayTeam: 'Apator Toruń',
                    homeTeamPoints: 40,
                    awayTeamPoints: 50
                },
                third: {
                    homeTeam: 'Unia Leszno',
                    awayTeam: 'GKM Grudziądz',
                    homeTeamPoints: 52,
                    awayTeamPoints: 38
                },
                fourth: {
                    homeTeam: 'Motor Lublin',
                    awayTeam: 'Sparta Wrocław',
                    homeTeamPoints: 45,
                    awayTeamPoints: 45
                }
            }*/
            lastGameWeekResultsTest: 'lastGameWeekResults',
            test: null,
            allPlayedGamesColumns: ['gameWeek', 'gameDate', 'games', 'results'],
            /*allPlayedGamesValues: [
                {
                    gameWeek: 1,
                    scheduledGameDate: '2021-02-15T17:49:06.000Z',
                    teams: 'Falubaz Zielona Góra - Sparta Wrocław',
                    results: '50-40'
                }
            ],*/
        }
    },
    created(){
        this.$store.dispatch('getLastStandingsTable');
        this.$store.dispatch('getLastGameWeekPlayed');
        this.$store.dispatch('getLastGameWeekResults');
        //this.getLastPlayerStandings();   
    },
    computed: {
		lastStandingsTable(){
			return this.$store.getters.getLastStandingsTable;
		},
        lastGameWeekPlayed(){
            return this.$store.getters.getLastGameWeekPlayed;
        },
        lastGameWeekResults(){
            return this.$store.getters.getLastGameWeekResults;
        }
	},
    methods: {
        preapreValuesForAllPlayedGames() {
            let allPlayedGames = this.$store.getters.getLastGameWeekResults.data.schedule;
            const arrayOfValuesForAllPlayedGames = [];
            //return tst[0].gameWeek
            allPlayedGames.forEach(function(game) {
                const valuesToTable = {
                    gameWeek: game.gameWeek,
                    gameDate: game.scheduledGameDate.replace(/\T.*/,''),
                    games: game.homeTeam + ' - ' + game.awayTeam,
                    results: game.gameResult.homeTeamPoints + ' : ' + game.gameResult.awayTeamPoints
                }
                arrayOfValuesForAllPlayedGames.push(valuesToTable);
                //console.log(arrayOfValuesForAllPlayedGames);
            });
            return arrayOfValuesForAllPlayedGames;
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
