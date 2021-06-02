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
                        <b-table striped hover responsive :items="getAllNeededValuesFromUserBets()" :fields="scheduleTableColumnsForLoggedUser"></b-table>
                    </div>
                    <div v-else>
                        <div v-if="checkIfScheduleDataAlreadyExists">
                            <b-table striped hover responsive :items="getAllScheduleDataNeededForNOTLoggedInViewer()" :fields="scheduleTableColumnsDefault"></b-table>
                        </div>
                        <div v-else>
                            <h2>{{ $t('schedulePage.scheduleNotReadyYet') }}</h2>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div v-if="checkIfScheduleDataAlreadyExists">
                        <b-table striped hover responsive :items="getAllScheduleDataNeededForNOTLoggedInViewer()" :fields="scheduleTableColumnsDefault"  @row-clicked="onRowClicked">
                            <template slot="actions" slot-scope="row">
                                <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
                                <b-button size="sm" @click.stop="row.toggleDetails">
                                    {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                                </b-button>
                            </template>
                            <template slot="row-details" slot-scope="row">
                                   <!-- Your row details' content here -->
                                <!--<b-card>
                                    <h1>hello</h1>
                                </b-card>-->
                                <b-table striped hover sticky-header responsive :items="testItems" :fields="testFields"></b-table>
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

export default {
    components: {
        vueSpinner: Spinner
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
            testFields: ["user", "bet", "collectedPoints"],
            testItems:[{user: "falubazluki", bet: "50:40", collectedPoints: 10}, {user: "spaslak47", bet: "52:38", collectedPoints: 6}, {user: "testUser", bet: "40:50", collectedPoints: 0},
            {user: "falubazluki", bet: "50:40", collectedPoints: 10}, {user: "spaslak47", bet: "52:38", collectedPoints: 6}, {user: "testUser", bet: "40:50", collectedPoints: 0}]
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
            let testArray = [];

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
                            points: isBetOfThisGameTaken.collectedPoints
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
                            points: 0
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
                        points: '-'
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
            //console.log(arrayOfValuesForNOTLoggedInViewer)
            return arrayOfValuesForNOTLoggedInViewer;
        },
        checkIfUserBetsAlreadyExists(){
            return this.$store.getters.getAllUserBets;
        },
        checkIfScheduleDataAlreadyExists(){
            return this.$store.getters.getFullSchedule;
        },
        onRowClicked (item, index, event) {
            this.$store.dispatch('getAllGameBets');
            item._showDetails = !item._showDetails;
        }
    }
    
}
</script>