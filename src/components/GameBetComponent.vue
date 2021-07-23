<template>
    <b-form inline @submit.prevent="onSend" @reset="onReset">
        <div>
            <label><strong>{{ game.homeTeam }} - {{ game.awayTeam }}</strong>({{ getDate() }})</label>
            <!---<label float:center>({{ getDate() }})</label>--->
            <b-form-input size="sm" type="number" min="15" max="75" v-model="bet.homeTeamPoints" required :disabled="game.gameStatus === 'inprogress'"></b-form-input>
            <b-form-input size="sm" type="number" min="15" max="75" v-model="bet.awayTeamPoints" required :disabled="game.gameStatus === 'inprogress'"></b-form-input>
            <b-button type="submit" :disabled="betHasBeenJustSend === true">{{ $t('betsPage.sendBetButton') }}</b-button>
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
            },
            betHasBeenJustSend: false,
            //testDate: new Date(),
            //aaa: this.testDate.replace(/\T.*/,'')
        }
    },
    
    created(){
        this.checkIfGameBetWasAlreadyMadeByUser();   
    },
    mounted(){
        this.checkIfGameBetWasAlreadyMadeByUser()
    },
    methods: {
        getDate(){
            let d = new Date(this.game.scheduledGameDate)
            let scheduledGameDateStringFormat = (d.getDate()<10?'0':'') + d.getDate()  + "-" + (d.getMonth()<10?'0':'') + (d.getMonth()+1) + "-" + d.getFullYear() + " " + (d.getHours()<10?'0':'') + d.getHours() + ":" + (d.getMinutes()<10?'0':'') + d.getMinutes();
            return scheduledGameDateStringFormat//.replace(/\T.*/,'')
        },

        checkIfGameBetWasAlreadyMadeByUser(){
            let allBets = this.$store.getters.getAllUserBetsForCurrentGameWeek.data.bets;
            let currentGameBet = allBets.find(bet => bet.gameId === this.game._id);
            if(currentGameBet === undefined) {
                this.bet.homeTeamPoints = '';
                this.bet.awayTeamPoints = '';
                this.bet.hasBeenAlreadyBet = false;
            }
            else{
                this.bet.homeTeamPoints = currentGameBet.homeTeamPoints;
                this.bet.awayTeamPoints = currentGameBet.awayTeamPoints;
                this.bet.hasBeenAlreadyBet = true;
                this.bet.betId = currentGameBet._id;
            }
        },

        async onSend() {
            try{
                if(this.game.gameStatus === 'scheduled'){
                    if(this.bet.hasBeenAlreadyBet == true) {
                        const response = await this.$store.dispatch('updateExistingBet', {
                            betId: this.bet.betId,
                            homeTeamPoints: this.bet.homeTeamPoints,
                            awayTeamPoints: this.bet.awayTeamPoints,
                        })
                        .then(response => {
                            this.betHasBeenJustSend = true;
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    }
                    else{
                        const response = await this.$store.dispatch('createNewBet', {
                            gameId: this.game._id,
                            homeTeamPoints: this.bet.homeTeamPoints,
                            awayTeamPoints: this.bet.awayTeamPoints,
                        })
                        .then(response => {
                            this.betHasBeenJustSend = true;
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    }
                }
            }
            catch(err) {
                console.log(err);
            }
        },
        onReset(event) {
            this.bet.homeTeamPoints = '',
            this.bet.awayTeamPoints = ''
        },
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
