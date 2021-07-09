<template>
    <div>
        <b-container>
            <h1>{{ $t('schedulePage.title') }}</h1>
            <div v-if="loadingStatus" class="loading-div">
                <vue-spinner />
            </div>
            <div v-else>
                <div v-if="this.$store.getters.loggedIn">
                    <div v-if="checkIfUserBetsAlreadyExists">
                        <b-table striped hover responsive :items="getAllNeededValuesFromUserBets()" :fields="scheduleTableColumnsForLoggedUser" @row-clicked="onRowClicked">
                            <template slot="row-details" slot-scope="row">
                                <AllGameBetsComponent :id="'row-id-' + row.index" :gameId="getAllScheduleDataNeededForNOTLoggedInViewer()[row.index].gameId" :gameStatus="getAllScheduleDataNeededForNOTLoggedInViewer()[row.index].status"></AllGameBetsComponent>
                            </template>
                        </b-table>
                    </div>
                    <div v-else>
                        <div v-if="checkIfScheduleDataAlreadyExists">
                            <b-table striped hover responsive :items="getAllScheduleDataNeededForNOTLoggedInViewer()" :fields="scheduleTableColumnsDefault"></b-table>
                                <template slot="row-details" slot-scope="row">
                                    <AllGameBetsComponent :id="'row-id-' + row.index" :gameId="getAllScheduleDataNeededForNOTLoggedInViewer()[row.index].gameId" :gameStatus="getAllScheduleDataNeededForNOTLoggedInViewer()[row.index].status" @row-clicked="onRowClicked"></AllGameBetsComponent>
                                </template>
                        </div>
                        <div v-else>
                            <h2>{{ $t('schedulePage.scheduleNotReadyYet') }}</h2>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div v-if="checkIfScheduleDataAlreadyExists">
                        <b-table striped hover responsive :items="getAllScheduleDataNeededForNOTLoggedInViewer()" :fields="scheduleTableColumnsDefault"  @row-clicked="onRowClicked">
                            <template slot="row-details" slot-scope="row">
                                <AllGameBetsComponent :id="'row-id-' + row.index" :gameId="getAllScheduleDataNeededForNOTLoggedInViewer()[row.index].gameId" :gameStatus="getAllScheduleDataNeededForNOTLoggedInViewer()[row.index].status"></AllGameBetsComponent>
                            </template>
                        </b-table>
                    </div>
                    <div v-else>
                        <h2>{{ $t('schedulePage.scheduleNotReadyYet') }}</h2>
                    </div>
                </div>
            </div>
        </b-container>
    </div>
</template>

<script>
/* eslint-disable */
import Spinner from 'vue-simple-spinner'
import AllGameBetsComponent from '../AllGameBetsComponent'

export default {
    components: {
        vueSpinner: Spinner,
        AllGameBetsComponent
    },
    data() {
        return {
            test: {
                gameWeekTitle: 'First'
            },
            scheduleTableColumnsForLoggedUser: ['week', 'date', 'status', 'game', 'result', 'bet', 'points'],
            scheduleTableColumnsDefault: ['week', 'date', 'status', 'game', 'result'],
            scheduleTableValuesForLoggedUser: [{week: 'week'}, {date: 'date'}, {status:'status'}, {game:'game'}, {result:'result'}, {bet:'bet'}, {points:'points'}],
            scheduleTableValuesDefault: [{week: 'week'}, {date: 'date'}, {status:'status'}, {game:'game'}, {result:'result'}],
        }
    },
    created(){
        this.$store.dispatch('getFullSchedule'); 
        this.getAllUserBetsIfIsLoggedIn();
        this.checkIfScheduleDataAlreadyExists();
    },
    computed: {
        loadingStatus() {
            return this.$store.getters.loadingStatus;
        }
    },
    methods: {
        getAllUserBetsIfIsLoggedIn(){
			if(this.$store.getters.loggedIn === true) {
                this.$store.dispatch('getAllUserBets');
            }
            else {
                return false;
            }
		},
        fullSchedule(){
			return this.$store.getters.getFullSchedule;
		},
        getAllNeededValuesFromUserBets(){
            let allBets = this.$store.getters.getAllUserBets.data.bets;
            let fullSchedule = this.$store.getters.getFullSchedule.data.schedule;
            let arrayOfValuesForLoggedInUser = [];

            //
            //let testArray = [];

            fullSchedule.forEach(function(game){

                if(game.isGamePlayed === true){
                    let isBetOfThisGameTaken = allBets.find(bet => bet.gameId === game._id);
                    if(isBetOfThisGameTaken !== undefined) {
                        const valuesToTable = {
                            week: game.gameWeek,
                            date: game.scheduledGameDate.replace(/\T.*/,''),
                            status: game.gameStatus,
                            game: game.homeTeam + ' - ' + game.awayTeam,
                            result: game.gameResult.homeTeamPoints + ' : ' + game.gameResult.awayTeamPoints,
                            bet: isBetOfThisGameTaken.homeTeamPoints + ':' + isBetOfThisGameTaken.awayTeamPoints,
                            points: isBetOfThisGameTaken.collectedPoints,
                            gameId: game._id,
                            _showDetails: false
                        }
                        arrayOfValuesForLoggedInUser.push(valuesToTable);
                    }
                    else{
                        const valuesToTable = {
                            week: game.gameWeek,
                            date: game.scheduledGameDate.replace(/\T.*/,''),
                            status: game.gameStatus,
                            game: game.homeTeam + ' - ' + game.awayTeam,
                            result: game.gameResult.homeTeamPoints + ' : ' + game.gameResult.awayTeamPoints,
                            bet: '-',
                            points: 0,
                            _showDetails: false
                        }
                        arrayOfValuesForLoggedInUser.push(valuesToTable);
                    }
                }
                else{
                    const valuesToTable = {
                        week: game.gameWeek,
                        date: game.scheduledGameDate.replace(/\T.*/,''),
                        status: game.gameStatus,
                        game: game.homeTeam + ' - ' + game.awayTeam,
                        result: '-',
                        bet: '-',
                        points: '-',
                        _showDetails: false
                    }
                    arrayOfValuesForLoggedInUser.push(valuesToTable);
                }
            });
            return arrayOfValuesForLoggedInUser;
        },
        getAllScheduleDataNeededForNOTLoggedInViewer(){
            let fullSchedule = this.$store.getters.getFullSchedule.data.schedule;
            let arrayOfValuesForNOTLoggedInViewer = [];

            fullSchedule.forEach(function(game){
                if(game.isGamePlayed === true){
                    const valuesToTable = {
                            week: game.gameWeek,
                            date: game.scheduledGameDate.replace(/\T.*/,''),
                            status: game.gameStatus,
                            game: game.homeTeam + ' - ' + game.awayTeam,
                            result: game.gameResult.homeTeamPoints + ' : ' + game.gameResult.awayTeamPoints,
                            gameId: game._id,
                            _showDetails: false
                        }
                    arrayOfValuesForNOTLoggedInViewer.push(valuesToTable);
                }
                else{
                    const valuesToTable = {
                            week: game.gameWeek,
                            date: game.scheduledGameDate.replace(/\T.*/,''),
                            status: game.gameStatus,
                            game: game.homeTeam + ' - ' + game.awayTeam,
                            result: '-',
                            _showDetails: false
                        }
                    arrayOfValuesForNOTLoggedInViewer.push(valuesToTable);
                }
            });
            return arrayOfValuesForNOTLoggedInViewer;
        },
        checkIfUserBetsAlreadyExists(){
            return this.$store.getters.getAllUserBets;
        },
        checkIfScheduleDataAlreadyExists(){
            return this.$store.getters.getFullSchedule;
        },
        onRowClicked (item, index, event) {
            let gameBetsDetails = document.querySelector(".b-table-has-details");

            if (gameBetsDetails === null) {
                item._showDetails = !item._showDetails;
            }
            else {
                if(item._showDetails === true){
                    item._showDetails = !item._showDetails;
                }
                else{
                    gameBetsDetails.click();
                    item._showDetails = !item._showDetails;
                }
            }
        }
    }
  
}
</script>