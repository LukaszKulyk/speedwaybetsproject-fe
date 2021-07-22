<template>
    <div>
        <b-container>
            <h1>{{ $t('standingsPage.title') }}</h1>
            <div v-if="loadingStatus" class="loading-div">
                <vue-spinner />
            </div>
            <div v-else>
                <div v-if="this.$store.getters.getLastPlayerStandings.data.count > 0">
                    <h3>{{ $t('standingsPage.currentStandingsTitle') }}</h3>
                    <div>
                        <b-table striped hover responsive :items="lastPlayerStandings()" :fields="fields" foot-clone>
                        </b-table>
                    </div>
                </div>
                <div v-else>
                    <h2>{{ $t('standingsPage.ifNotStandings') }}</h2>
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
            translations: {
                eng: 'Current Standings',
                pol: 'Aktualna Tabela',
                lem: 'Aktualny wyniky'
            },
            fields: [{key: 'pos'}, {key: 'username'}, {key: 'points'}, {key: '+/-', tdClass: 'setPosTdClass'}]
        }
    },
    created(){
        this.$store.dispatch('getLastPlayerStandings');  
    },
    computed: {
        loadingStatus() {
            return this.$store.getters.loadingStatus;
        }
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
