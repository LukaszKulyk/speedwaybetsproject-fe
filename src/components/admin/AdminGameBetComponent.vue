<template>
    <div>
        <b-form inline @submit.prevent="onUpdate" @reset="onDelete">
            <div data-test-id="game-bet-component-form">
                <label><strong>{{ game.homeTeam }} - {{ game.awayTeam }}</strong>({{ getDate() }})</label>
                <b-form-select v-model="game.gameStatus" :options="gameStatuses" size="sm"></b-form-select>
                <b-form-checkbox id="calculation-status" v-model="calculate" name="calulcation-checkbox" :value="true" :unchecked-value="false">Calculate</b-form-checkbox>
                <b-form-input size="sm" type="number" min="15" max="75" v-model="result.homeTeamPoints"></b-form-input>
                <b-form-input size="sm" type="number" min="15" max="75" v-model="result.awayTeamPoints"></b-form-input>
                <b-button type="submit" :disabled="betHasBeenJustSend === true">Update</b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
/* eslint-disable */

import adminHelpers from '../../helpers/admin';

export default {
	props: ['game'],
    data() {
        return {
            result: {
                homeTeamPoints: '',
                awayTeamPoints: ''
            },
            calculate: false,
            currentGameStatus: '',
            gameStatuses: [
                { value: 'scheduled', text:'scheduled' },
                { value: 'inprogress', text:'inprogress' },
                { value: 'played', text:'played' },
            ],
            gameCalculations: [
                { value: 'calculation', text:'calculation' },
                { value: 'no-calculation', text:'no-calculation' },
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
                if(this.calculate == false) {
                    console.log('We do not need calculations!')
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
                else if(this.calculate == true) {
                    console.log('Lets calculate!')

                    let smallPoints = adminHelpers.calculateSmallPoints(this.result.homeTeamPoints, this.result.awayTeamPoints)
                    console.log(smallPoints);
                    let teamsData = {
                        homeTeamData: {
                            homeTeam: this.game.homeTeam,
                            homeTeamPoints: this.result.homeTeamPoints
                        },
                        awayTeamData: {
                            awayTeam: this.game.awayTeam,
                            awayTeamPoints: this.result.awayTeamPoints
                        }
                    }

                    let winningTeam = adminHelpers.selectTheWinnerTeam(teamsData.homeTeamData, teamsData.awayTeamData)
                    console.log(winningTeam)
                    //let isGamePlayed = false;
                    //let isGameWeekPlayed = false;
                    //small if to verify if isGamePlayed is true for played game status
                    if(this.game.gameStatus === 'played') {
                        let isGamePlayed = false;
                        let isGameWeekPlayed = false;

                    }
                    const response = {//await this.$store.dispatch('updateGameStatusWithAllCalculations', {
                        newGameStatus: this.game.gameStatus,
                        gameId: this.game._id,
                        isGamePlayed: true,
                        isGameWeekPlayed: true,
                        gameResult: {
                            winner: winningTeam,
                            bigPoints: "",
                            isBonusPoint: false,
                            smallPoints: smallPoints,
                            homeTeamPoints: this.result.homeTeamPoints,
                            awayTeamPoints: this.result.awayTeamPoints,
                        }
                    }
                    console.log(response)
                    /*)
                    .then(response => {
                        console.log(response);
                        return response;
                    })
                    .catch(err => {
                        console.log(err);
                    });*/
                }
                else {
                    console.log('Something went wrong. Please try again!')
                }
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
