<template>
    <div data-test-id="standings-page">
        <b-container>
            <h1>{{ $t('standingsPage.title') }}</h1>
            <div v-if="loadingStatus" class="loading-div">
                <vue-spinner />
            </div>
            <div v-else>
                <div v-if="this.$store.getters.getLastPlayerStandings.data.count > 0" data-test-id="standings-available">
                    <h3>{{ $t('standingsPage.currentStandingsTitle') }}</h3>
                    <div>
                        <b-table striped hover responsive :items="lastPlayerStandings()" :fields="fields">
                        </b-table>
                        <div v-if="isGameWeekConfirmed() === false" data-test-id="mid-week-table">
                            <p id="mid-week-table">{{ $t('standingsPage.midWeekStandingsInfo') }}</p>
                        </div>
                        <div v-if="isGameWeekConfirmed() === true" data-test-id="confirmed-table">
                            <p id="confirmed-week-table">{{ $t('standingsPage.confirmedGameWeekStandingsInfo') }}</p>
                        </div>
                    </div>
                </div>
                <div v-else data-test-id="no-standings-available-info">
                    <h2>{{ $t('standingsPage.ifNotStandings') }}</h2>
                </div>
            </div>
            <!--<h5>{{ $t('standingsPage.endSeasonText') }}</h5>-->
            <h3>{{ $t('standingsPage.secondSeasonWinnersTableTitle') }}</h3>
            <div>
                <b-table stripped hover responsive :items="secondSeasonWinnersData" :fields="secondSeasonWinnersFields"></b-table>
            </div>
            <h3>{{ $t('standingsPage.seasonWinnersTableTitle') }}</h3>
            <div>
                <b-table stripped hover responsive :items="seasonWinnersData" :fields="seasonWinnersFields"></b-table>
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
            fields: [{key: 'pos'}, {key: 'username'}, {key: 'points'}, {key: '+/-', tdClass: 'setPosTdClass'}],
            seasonWinnersFields: ['Position', 'Username', 'Award'],
            seasonWinnersData: [
                {
                    Position: '🥇',
                    Username: 'Bodziu_F.',
                    Award: 'Two Speedway Tickets'
                },
                {
                    Position: '🥈',
                    Username: 'mastyło',
                    Award: 'SpeedwayBusines board game'
                },
                {
                    Position: '🥉',
                    Username: 'Karolcia',
                    Award: 'MCS Speedway Card Game'
                }
            ],
            secondSeasonWinnersFields: ['Position', 'Username', 'Award'],
            secondSeasonWinnersData: [
                {
                    Position: '🥇',
                    Username: 'Karolcia',
                    Award: 'Two Speedway Tickets'
                },
                {
                    Position: '🥈',
                    Username: 'Jules',
                    Award: 'SpeedwayBusines board game'
                },
                {
                    Position: '🥉',
                    Username: 'falubazluki',
                    Award: 'MCS Speedway Card Game'
                }
            ]
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
        },
        isGameWeekConfirmed(){
            let isGameWeekConfirmed = this.$store.getters.getLastPlayerStandings.data.playerResultsTable[0].isGameWeekConfirmed

            if(isGameWeekConfirmed === true){
                return true;
            }
            else{
                return false;
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
#is-table-confirmed {
    background-color: orange;
}

#mid-week-table {
    background-color: orange;
    margin-bottom: 10px;
}

#confirmed-week-table {
    background-color:rgb(135, 214, 16);
    margin-bottom: 10px;
}
</style>
