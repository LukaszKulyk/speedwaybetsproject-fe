<template>
    <div>
        <b-container>
            <h1>{{ $t('schedulePage.title') }}</h1>
            <div v-if="this.$store.getters.loggedIn">
                <div v-if="checkIfUserBetsAlreadyExists">
                    <b-table striped hover responsive :items="getAllNeededValuesFromUserBets()" :fields="scheduleTableColumnsForLoggedUser"></b-table>
                </div>
                <div v-else>
                    <!--<h2>{{ $t('schedulePage.scheduleNotReadyYet') }}</h2>-->
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
                    <b-table striped hover responsive :items="getAllScheduleDataNeededForNOTLoggedInViewer()" :fields="scheduleTableColumnsDefault"></b-table>
                </div>
                <div v-else>
                    <h2>{{ $t('schedulePage.scheduleNotReadyYet') }}</h2>
                </div>
            </div>
        </b-container>
    </div>
</template>

<script>
/* eslint-disable */
export default {
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

            //return arrayOfValuesForLoggedInUser;
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
        }
    }
    
}
</script>