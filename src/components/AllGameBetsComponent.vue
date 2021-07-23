<template>
<div>
    <div v-if="gameStatus === 'played'">
        <div>
        <b-table striped hover sticky-header responsive :items="getAllBets()" :fields="allBetsTableColumns"></b-table>
    </div>
    </div>
    <div v-else>
        <h3>{{ $t('allGameBetsComponent.notPlayedGameWeekInfo') }}</h3>
    </div>
</div>
</template>
<script>
/* eslint-disable */
export default {
    props: ['gameId', 'gameStatus'],
    data() {
        return {
            allBetsTableColumns: ["username", "bet", "collectedPoints"],
            allBets: []
        }
    },
    created(){
        this.$store.dispatch('getAllGameBets', this.gameId)
    },
    methods: {
        getAllBets(){
            let arrayOfAllBets = [];
            let allGameBets = this.$store.getters.getAllGameBets.data.bets;

            allGameBets.forEach(game => {
                const valuesToTable = {
                    username: game.username,
                    bet: game.homeTeamPoints + ' - ' + game.awayTeamPoints,
                    collectedPoints: game.collectedPoints
                }
                arrayOfAllBets.push(valuesToTable);
            })
            return arrayOfAllBets;
        }
    }
}
</script>
