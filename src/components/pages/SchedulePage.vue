<template>
    <div>
        <b-container>
            <h1>Schedule</h1>
            <div v-if="this.$store.getters.loggedIn">
                <div v-if="getAllNeededValuesFromUserBets().length > 0">
                    <b-table striped hover responsive :items="getAllNeededValuesFromUserBets()" :fields="scheduleTableColumnsForLoggedUser"></b-table>
                </div>
                <div v-else>
                    <h2>Schedule for this season is not prepared yet. Please come again later. We promise, we are working on that!</h2>
                </div>
            </div>
            <div v-else>
                <div v-if="getAllScheduleDataNeededForNOTLoggedInViewer().length > 0">
                    <b-table striped hover responsive :items="getAllScheduleDataNeededForNOTLoggedInViewer()" :fields="scheduleTableColumnsDefault"></b-table>
                </div>
                <div v-else>
                    <h2>Schedule for this season is not prepared yet. Please came again later. We promise, we are working on that!</h2>
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
        this.getAllScheduleDataNeededForNOTLoggedInViewer();
        this.getAllNeededValuesFromUserBets();
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

            fullSchedule.forEach(function(game){

                    allBets.forEach(function(bet){
                        if(bet.gameId === game._id){
                            if(game.isGamePlayed === true){
                                const valuesToTable = {
                                    week: game.gameWeek,
                                    date: game.scheduledGameDate.replace(/\T.*/,''),
                                    status: game.gameStatus,
                                    game: game.homeTeam + ' - ' + game.awayTeam,
                                    result: game.gameResult.homeTeamPoints + ' : ' + game.gameResult.awayTeamPoints,
                                    bet: bet.homeTeamPoints + ':' + bet.awayTeamPoints,
                                    points: bet.collectedPoints
                                }
                                arrayOfValuesForLoggedInUser.push(valuesToTable);
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
                        }
                    })
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
        }
    }
    
}
</script>