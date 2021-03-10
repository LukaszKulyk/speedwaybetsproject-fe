<template>
    <div>
        <b-container>
            <!--<h2>GAME WEEK {{nextGameWeekNumericValue() || null}}</h2>-->
            <div v-if="loggedIn()">
                <div v-if="checkIfNextGameWeekIsAvailable() > 0">
                    <div v-for="(game, index) in nextGameWeekGames()" :key="index">
                        <GameBetComponent :game="game"></GameBetComponent>
                    </div>
                </div>
                <div v-else>
                    <h2>There is no Game Week scheduled!</h2>
                </div>
            </div>
            <div v-else>
                <h2>You need to be logged in to make a bet!</h2>
                <router-link to="/login">Login</router-link>
                <router-link to="/register">Register</router-link>
            </div>
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
        }
    },
    created(){
        this.$store.dispatch('getNextGameWeekGames');
        this.$store.dispatch('getAllUserBetsForCurrentGameWeek');
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
