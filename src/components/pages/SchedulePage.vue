<template>
    <div>
        <h1>Schedule</h1>
        <h3><strong>{{ test.gameWeekTitle }}</strong></h3>
        <div v-for="game in fullSchedule.data.schedule" :key="game">
            <div>
                <p><strong>{{ game.homeTeam }} - {{ game.homeTeam }}</strong></p>
                <p v-if="game.gameResult.homeTeamPoints"><strong>{{ game.gameResult.homeTeamPoints }} : {{ game.gameResult.awayTeamPoints }}</strong></p>
            </div>
        </div>
        <!--<div v-for="(game, index) in fullSchedule.data.schedule" :key="index">
            <div>
                <div v-if="index === 0">
                    <p>This is game 0</p>
                </div>
                <div v-else-if="game.gameWeek === gameWeek">
                    <p>This game matches</p>
                </div>
                <div v-else-if="game.gameWeek !== gameWeek">
                    <p>This game NOT matches</p>
                </div>
                <div v-else>
                    <p>Something went wrong</p>
                </div>
            </div>
        </div>-->
        <!--<div><p>{{splitScheduleByGameWeeks()}}</p></div>-->
    </div>
</template>

<script>
/* eslint-disable */
export default {
    data() {
        return {
            //gameWeek: 1,
            test: {
                gameWeekTitle: 'First'
            }
        }
    },
    created(){
        this.$store.dispatch('getFullSchedule');  
    },
    computed: {
		fullSchedule(){
			return this.$store.getters.getFullSchedule;
		},
        /*checkAndUpdateGameWeek(game){
            if (game !== gameWeek) {
                this.gameWeek = game
                return true;
            }
        }*/
	},
    methods: {
        splitScheduleByGameWeeks() {
            let allGames = this.$store.getters.getFullSchedule.data.schedule;
            console.log(allGames);
            const gameWeeksArray = [];
            let currentGameWeek = [];
            for (let i = 0; i <= allGames.length; i++) {
                if(i === 0){
                    currentGameWeek.push(allGames[i]);
                    //console.log(currentGameWeek);
                }
                else if(allGames[i].gameWeek === allGames[i - 1].gameWeek) {
                    currentGameWeek.push(allGames[i]);
                    //console.log(currentGameWeek);
                }
                else if(allGames[i].gameWeek !== allGames[i - 1]) {
                    gameWeeksArray.push(currentGameWeek);
                    currentGameWeek = [];
                    currentGameWeek.push(allGames[i]);
                    //console.log(currentGameWeek);
                }
                else {
                    console.log('something went wrong.');
                }
                //console.log(console.log(gameWeeksArray));
            }
            console.log(gameWeeksArray);
            //return currentGameWeek;
        }
    }
    
}
</script>