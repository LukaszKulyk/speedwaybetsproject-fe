<template>
    <div>
        <b-container>
            <h1>{{ $t('standingsPage.title') }}</h1>
            <div v-if="this.$store.getters.getLastPlayerStandings.data.count > 0">
                <h3>{{ $t('standingsPage.currentStandingsTitle') }}</h3>
                <div>
                    <b-table striped hover responsive :items="lastPlayerStandings()" :fields="fields"></b-table>
                </div>
            </div>
            <div v-else>
                <h2>{{ $t('standingsPage.ifNotStandings') }}</h2>
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
            fields: [{key: 'pos'}, {key: 'username'}, {key: 'points'}, {key: 'arrow', tdClass: 'setPosTdClass'}]
        }
    },
    created(){
        this.$store.dispatch('getLastPlayerStandings');  
    },
    methods: {
        lastPlayerStandings(){
			return this.$store.getters.getLastPlayerStandings.data.playerResultsTable[0].currentRank;
		},
        setPosTdClass(value){
            let firstChar = value.charAt(0);
            if(firstChar === '+'){
                return 'text-green';
            }
            else if(firstChar === '0'){
                return 'text-gray';
            }
            else if(firstChar === '-'){
                return 'text-red';
            }
        }
    }
}
</script>
<style>
.text-red {
  color: red;
  font-weight: bold;

}

.text-green {
  color: green;
  font-weight: bold;
}

.text-gray {
    color: gray;
    font-weight: bold;
}
</style>
