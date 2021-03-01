<template>
    <div>
        <b-container>
            <!--<h3><strong>Game Week {{nextGameWeekGames.data.schedule[0].gameWeek}}</strong></h3>-->
            <h2>GAME WEEK {{nextGameWeekGames.data.schedule[0].gameWeek}}</h2>
            <div v-for="(game, index) in nextGameWeekGames.data.schedule" :key="index">
                <GameBetComponent :game="game"></GameBetComponent>
            </div>
<!------------------------------------------------------->
            <!--<div v-for="(game, index) in nextGameWeekGames.data.schedule" :key="index">-->
                <!--<b-form inline @submit="onSubmit" @reset="onReset">
                    <div>
                        <b-form-row>
                            <label><strong>{{ game.homeTeam }} - {{ game.awayTeam }}</strong></label>
                            <b-form-input size="sm" type="number" min="15" max="75" id="home-team-points" v-model="bet.games[index].homeTeamPoints" required></b-form-input>
                            <label><strong>:</strong></label>
                            <b-form-input size="sm" type="number" min="15" max="75" id="away-team-points" v-model="bet.games[index].awayTeamPoints" required></b-form-input>
                        </b-form-row>
                        <b-form-row>
                            <input type="submit" value="Send">
                            <input type="reset" value="Clear">
                        </b-form-row>
                    </div>
                </b-form>-->
            <!--</div>-->
                <!--<b-form inline @submit="onSubmit" @reset="onReset">
                        <div class="display-games-in-rows">
                            <b-form-row>
                                <input type="submit" value="Send">
                                <input type="reset" value="Clear">
                            </b-form-row>
                        </div>
                </b-form>-->
<!------------------------------------------------------->
        </b-container>
    </div>
</template>

<script>
/* eslint-disable */
import GameBetComponent from '../GameBetComponent'
export default {
    components: {
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
            //gameWeekGames: [],
            //allGameFromCurrentGameWeekWhichHassBeenBet: [],
        }
    },
    created(){
        this.$store.dispatch('getNextGameWeekGames');
        this.$store.dispatch('getAllUserBetsForCurrentGameWeek');
        //this.bet.games = this.preapreGamesBetObject();  
    },
    computed: {
		nextGameWeekGames(){
            //this.gameWeekGames = this.$store.getters.getNextGameWeekGames
			return this.$store.getters.getNextGameWeekGames;
		},
        allUserBetsForCurrentGameWeek(){
            //this.gameWeekGames = this.$store.getters.getNextGameWeekGames
			return this.$store.getters.getAllUserBetsForCurrentGameWeek;
		},
        /*checkIfGameHasAlreadybeenBetByUser(){

        }*/
        /*setAllGamesFormValues(){
            this.bet.test = preapreGamesBetObject();
        }*/
        //preapreGamesBetObject();
	},
    /*methods: {
        onSubmit(event) {
            //event.preventDefault()
            //alert(JSON.stringify(this.bet))
            const bets = this.bet.games;
            bets.forEach(function(bet){
                this.$store.dispatch('createNewBet', {
                    gameId: bet.gameId,
                    homeTeamPoints: bet.homeTeamPoints,
                    awayTeamPoints: bet.awayTeamPoints
                })
                .then(this.submitted = true);
            });
        },
        onReset(event) {
            this.bet.games.forEach(function(game){
                game.homeTeamPoints = ''
                game.awayTeamPoints = ''
            })
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        },
        preapreGamesBetObject() {
            let allGamesInCurrentGameWeek = this.$store.getters.getNextGameWeekGames.data.schedule;
            const arrayOfValuesForAllGamesInCurrentGameWeek = [];
            //return tst[0].gameWeek
            allGamesInCurrentGameWeek.forEach(function(game){
                const valuesToTable = {
                    gameId: game._id,
                    homeTeamPoints: '',
                    awayTeamPoints: ''
                }
                arrayOfValuesForAllGamesInCurrentGameWeek.push(valuesToTable);
                console.log(arrayOfValuesForAllGamesInCurrentGameWeek);
            });
            return arrayOfValuesForAllGamesInCurrentGameWeek;
            //this.bet.games = arrayOfValuesForAllGamesInCurrentGameWeek;
        }
    }*/
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
