<template>
    <div>
        <b-container>
            <div v-if="checkIfPlayerStandingsAlreadyExists() > 0">
                <h3>{{ translations.lem }}</h3>
                <div>
                    <b-table striped hover responsive :items="lastPlayerStandings()" :fields="fields"></b-table>
                </div>
            </div>
            <div v-else>
                <h2>There is no current Standings yet. Season will start soon!</h2>
            </div>
        </b-container>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    data() {
        return {
            translations: {
                eng: 'Current Standings',
                pol: 'Aktualna Tabela',
                lem: 'Aktualny wyniky'
            },
            fields: ['pos', 'username', 'points', 'arrow']
        }
    },
    created(){
        this.$store.dispatch('getLastPlayerStandings');  
    },
    methods: {
        lastPlayerStandings(){
			return this.$store.getters.getLastPlayerStandings.data.playerResultsTable[0].currentRank;
		},
        checkIfPlayerStandingsAlreadyExists(){
            return this.$store.getters.getLastPlayerStandings.data.count;
        }
    }
}
</script>
