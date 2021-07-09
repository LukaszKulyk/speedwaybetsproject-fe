<template>
<div>
    <!--<b-card>
        <h1>hello</h1>
    </b-card>-->
    <!--<p>{{gameStatus}}</p>-->
    <div v-if="gameStatus === 'played'">
        <div>
        <!--<b-table striped hover sticky-header responsive :items="testItems" :fields="testFields"></b-table>-->
        <b-table striped hover sticky-header responsive :items="getAllBets()" :fields="allBetsTableColumns"></b-table>
    </div>
    </div>
    <div v-else>
        <h3>This game was not played yet so it is not possible to see user bets.</h3>
    </div>
</div>
</template>
<script>
/* eslint-disable */
export default {
    props: ['gameId', 'gameStatus'],
    data() {
        return {
            //gameId: this.gameId,
            testFields: ["user", "bet", "collectedPoints"],
            testItems:[{user: "falubazluki", bet: "50:40", collectedPoints: 10}, {user: "spaslak47", bet: "52:38", collectedPoints: 6}, {user: "testUser", bet: "40:50", collectedPoints: 0},
            {user: "falubazluki", bet: "50:40", collectedPoints: 10}, {user: "spaslak47", bet: "52:38", collectedPoints: 6}, {user: "testUser", bet: "40:50", collectedPoints: 0}],
            //proper
            allBetsTableColumns: ["username", "bet", "collectedPoints"],
            allBets: []
        }
    },
    created(){
        //this.$store.dispatch('getTest', this.gameId);
        //this.test(this.gameId);
        //this.getAllBets();
        this.$store.dispatch('getAllGameBets', this.gameId)
        //this.getAllBets();
    },
    methods: {
        getAllBets(){
            /*console.log('this is game status:' + this.gameStatus)
            if(gameStatus === "played"){
                console.log('nice!')
            }
            else {
                console.log('dupa')
            }*/
            let arrayOfAllBets = [];
            let allGameBets = this.$store.getters.getAllGameBets.data.bets;
            //console.log('#####' + allGameBets[0]._id)
            allGameBets.forEach(game => {
                const valuesToTable = {
                    username: game.username,
                    bet: game.homeTeamPoints + ' - ' + game.awayTeamPoints,
                    collectedPoints: game.collectedPoints
                }
                arrayOfAllBets.push(valuesToTable);
            })
            return arrayOfAllBets;
        },
        //we need to check if game was alredy played and then display only bets in case game is played
    }
}
</script>
