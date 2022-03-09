<template>
<div>
    <b-form inline @submit.prevent="onUpdate" @reset="onDelete">
        <div data-test-id="game-bet-component-form">
            <label><strong>{{ game.homeTeam }} - {{ game.awayTeam }}</strong>({{ getDate() }})</label>
            <b-form-select v-model="game.gameStatus" :options="gameStatuses" size="sm"></b-form-select>
            <b-button type="submit" :disabled="betHasBeenJustSend === true">Update</b-button>
        </div>
    </b-form>
</div>
</template>

<script>
/* eslint-disable */
export default {
	props: ['game'],
    data() {
        return {
            currentGameStatus: '',
            gameStatuses: [
                { value: 'scheduled', text:'scheduled' },
                { value: 'inprogress', text:'inprogress' },
                { value: 'played', text:'played' },
            ],
            /*bet: {
                homeTeamPoints: '',
                awayTeamPoints: '',
                hasBeenAlreadyBet: false,
                betId: '',
            },
            betHasBeenJustSend: false,
            show: 'test'*/
        }
    },
    
    created(){  
        this.checkGameStatus();
    },
    mounted(){
        this.checkGameStatus();
    },
    methods: {
        checkGameStatus() {
            this.currentGameStatus = this.game.gameStatus
        },
        async onUpdate(){
            try {
                let isGamePlayed = false;
                //small if to verify if isGamePlayed is true for played game status
                if(this.game.gameStatus === 'played') {
                    isGamePlayed = true;
                }

                const response = await this.$store.dispatch('updateGameStatusWithoutCalculations', {
                    newGameStatus: this.game.gameStatus,
                    gameId: this.game._id,
                    isGamePlayed: this.isGamePlayed
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
        onDelete(event){
            console.log('onDelete has been clicked');
            this.show = 'delete'
        },
        getDate(){
            let d = new Date(this.game.scheduledGameDate)
            let scheduledGameDateStringFormat = (d.getDate()<10?'0':'') + d.getDate()  + "-" + (d.getMonth()<10?'0':'') + (d.getMonth()+1) + "-" + d.getFullYear() + " " + (d.getHours()<10?'0':'') + d.getHours() + ":" + (d.getMinutes()<10?'0':'') + d.getMinutes();
            return scheduledGameDateStringFormat
        },
    },
}
</script>
