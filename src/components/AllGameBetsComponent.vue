<template>
<div>
    <!--<b-card>
        <h1>hello</h1>
    </b-card>-->
    <p>{{gameId}}</p>
    <div>
        <!--<b-table striped hover sticky-header responsive :items="testItems" :fields="testFields"></b-table>-->
        <b-table striped hover sticky-header responsive :items="getAllBets()" :fields="allBetsTableColumns"></b-table>
    </div>
</div>
</template>
<script>
/* eslint-disable */
export default {
    props: ['gameId'],
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
        this.getAllBets();
    },
    methods: {
        getAllBets(){
            let arrayOfAllBets = [];
            let allGameBets = this.$store.getters.getAllGameBets.data.bets;
            console.log('#####' + allGameBets)
            allGameBets.forEach(game => {
                const valuesToTable = {
                    username: game._id,
                    bet: game.homeTeamPoints + ' - ' + game.awayTeamPoints,
                    collectedPoints: game.collectedPoints
                }
                arrayOfAllBets.push(valuesToTable);
            })
            return arrayOfAllBets;
        },
        /*test(gameId){
            let result = this.$store.dispatch('getTest', gameId);
            console.log(result)
        }*/
    }
}
</script>
