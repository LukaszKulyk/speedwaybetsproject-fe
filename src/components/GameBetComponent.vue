<template>
    <b-form inline @submit="testMethod" @reset="onReset">
        <div>
            <label><strong>{{ game.homeTeam }} - {{ game.awayTeam }}</strong></label>
            <b-form-input size="sm" type="number" min="15" max="75" v-model="bet.homeTeamPoints" required :disabled="game.gameStatus === 'inprogress'"></b-form-input>
            <!--<label><strong>:</strong></label>-->
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
            betHasBeenJustSend: false
        }
    },
    /*data: {
        bet: {
            hasBeenAlreadyBet: false,
            homeTeamPoints: '',
                awayTeamPoints: '',
                //hasBeenAlreadyBet: false,
                betId: '',
        }
    },*/
    
    created(){
        //this.$store.dispatch('getSpecificGameBet', this.game);
        //this.$store.dispatch('getAllUserBetsForCurrentGameWeek');
        this.checkIfGameWasAlreadyBet(this.game, this.bet);
        //this.bet.homeTeamPoints = this.$store.getters.getAllUserBetsForCurrentGameWeek.data.bets[0].homeTeamPoints
        
    },
    /*watch:{
        checkIfGameWasAlreadyBet(this.game, this.bet);
    },*/
    methods: {

        async testMethod() {
            try{
                console.log('Checking if gameStatus lets us to bet...')
                if(this.game.gameStatus === 'scheduled'){
                    if(this.bet.hasBeenAlreadyBet == true) {
                        const response = await this.$store.dispatch('updateExistingBet', {
                            betId: this.bet.betId,
                            homeTeamPoints: this.bet.homeTeamPoints,
                            awayTeamPoints: this.bet.awayTeamPoints,
                        })
                        //console.log('Bet status has been changed.');
                        //return response;
                        .then(response => {
                            this.betHasBeenJustSend = true;
                            //console.log('Bet status has been changed.');
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
                        //console.log(response);
                        //return response;
                        .then(response => {
                            this.betHasBeenJustSend = true;
                            console.log('Ok now it is in then chain')
                            console.log('New bet has been added.');
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

        onSubmit(event) {

            console.log('Checking if gameStatus lets us to bet...')
            if(this.game.gameStatus === 'scheduled'){
                if(this.bet.hasBeenAlreadyBet == true) {
                    this.$store.dispatch('updateExistingBet', {
                        betId: this.bet.betId,
                        homeTeamPoints: this.bet.homeTeamPoints,
                        awayTeamPoints: this.bet.awayTeamPoints,
                    })
                    .then(() => {
                        this.betHasBeenJustSend = true;
                    })
                    .catch(err => {
                        console.log(err);
                    });
                }
                else{
                    this.$store.dispatch('createNewBet', {
                        gameId: this.game._id,
                        homeTeamPoints: this.bet.homeTeamPoints,
                        awayTeamPoints: this.bet.awayTeamPoints,
                    })
                    .then(() => {
                        this.betHasBeenJustSend = true;
                        console.log('Ok now it is in then chain')
                    })
                    .catch(err => {
                        console.log(err);
                    });
                }
            }
            else{
                console.log('Sorry but this game is already played or in progress.')
            }
            this.checkIfGameWasAlreadyBet(this.game, this.bet);
        },
        onReset(event) {
            this.bet.homeTeamPoints = '',
            this.bet.awayTeamPoints = ''
        },
        checkIfGameWasAlreadyBet(game, bet){
            console.log('Current Games which was already beted:')
            let test = this.$store.getters.getAllUserBetsForCurrentGameWeek.data.bets;
            console.log(test);
            this.$store.dispatch('getAllUserBetsForCurrentGameWeek')
                .then(result => {
                    let allUserBetsForCurrentGameWeek = this.$store.getters.getAllUserBetsForCurrentGameWeek.data.bets;
                    console.log('Games which was already beted after next bet..')
                    console.log(allUserBetsForCurrentGameWeek)
                    allUserBetsForCurrentGameWeek.forEach(function(b){
                        if (b.gameId === game._id) {
                            bet.hasBeenAlreadyBet = true;
                            bet.homeTeamPoints = b.homeTeamPoints;
                            bet.awayTeamPoints = b.awayTeamPoints;
                            bet.betId = b._id;
                        }
                    })
                    //console.log(result.data);
                })
            

            /*let allUserBetsForCurrentGameWeek = this.$store.getters.getAllUserBetsForCurrentGameWeek.data.bets;
            console.log('Im getting all user bets for current game week...')
            allUserBetsForCurrentGameWeek.forEach(function(b){
                console.log('Im in forEach loop and checking each bet...')
                if (b.gameId === game._id) {
                    console.log('Ok I found matching ID...')
                    bet.hasBeenAlreadyBet = true;
                    bet.homeTeamPoints = b.homeTeamPoints;
                    bet.awayTeamPoints = b.awayTeamPoints;
                    bet.betId = b._id;
                    console.log('Current hasBeenAlreadyBet value is...' + bet.hasBeenAlreadyBet)
                }
                console.log('AGAIN Current hasBeenAlreadyBet value is...' + bet.hasBeenAlreadyBet)
            })
            console.log('I have finished my work. Curren value is...' + bet.hasBeenAlreadyBet)*/
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
