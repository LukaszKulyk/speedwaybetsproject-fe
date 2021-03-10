<template>
    <b-form inline @submit="onSubmit" @reset="onReset">
        <div>
            <label><strong>{{ game.homeTeam }} - {{ game.awayTeam }}</strong></label>
            <b-form-input size="sm" type="number" min="15" max="75" id="home-team-points" v-model="bet.homeTeamPoints" required></b-form-input>
            <label><strong>:</strong></label>
            <b-form-input size="sm" type="number" min="15" max="75" id="away-team-points" v-model="bet.awayTeamPoints" required></b-form-input>
            <b-button type="submit">Send</b-button>
        </div>
    </b-form>
</template>

<script>
/* eslint-disable */
export default {
	props: ['game'],
    data() {
        return {
            bet: {
                homeTeamPoints: '',
                awayTeamPoints: '',
                hasBeenAlreadyBet: false,
                betId: '',
            }
        }
    },
    
    created(){
        this.$store.dispatch('getSpecificGameBet', this.game);
        this.checkIfGameWasAlreadyBet(this.game, this.bet);
        
    },
    methods: {
        onSubmit(event) {

            if(this.bet.hasBeenAlreadyBet == true) {
                this.$store.dispatch('updateExistingBet', {
                    betId: this.bet.betId,
					homeTeamPoints: this.bet.homeTeamPoints,
					awayTeamPoints: this.bet.awayTeamPoints,
				})
                .then(this.checkIfGameWasAlreadyBet(this.game, this.bet))
            }
            else{
                this.$store.dispatch('createNewBet', {
                    gameId: this.game._id,
					homeTeamPoints: this.bet.homeTeamPoints,
					awayTeamPoints: this.bet.awayTeamPoints,
				})
                .then(this.checkIfGameWasAlreadyBet(this.game, this.bet))
            }
        },
        onReset(event) {
            this.bet.homeTeamPoints = '',
            this.bet.awayTeamPoints = ''
        },
        checkIfGameWasAlreadyBet(game, bet){
            this.$store.dispatch('getAllUserBetsForCurrentGameWeek');
            let allUserBetsForCurrentGameWeek = this.$store.getters.getAllUserBetsForCurrentGameWeek.data.bets;
            allUserBetsForCurrentGameWeek.forEach(function(b){
                if (b.gameId === game._id) {
                    bet.hasBeenAlreadyBet = true;
                    bet.homeTeamPoints = b.homeTeamPoints;
                    bet.awayTeamPoints = b.awayTeamPoints;
                    bet.betId = b._id;
                }
            })
        }
    },
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

b-button {
    margin: 5px;
}

</style>
