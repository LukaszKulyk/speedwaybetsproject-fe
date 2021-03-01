<template>
    <div>
        <h3>{{ translations.lem }}</h3>
        <div>
            <b-table striped hover responsive :items="lastPlayerStandings.data.playerResultsTable[0].currentRank" :fields="fields"></b-table>
        </div>
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
        //this.getLastPlayerStandings();   
    },
    computed: {
		lastPlayerStandings(){
			return this.$store.getters.getLastPlayerStandings;
		}
	},
}
</script>
