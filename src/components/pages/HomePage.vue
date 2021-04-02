<template>
    <b-container>
        <div>
            <h1>{{ $t('homePage.title') }}</h1>
            <p><strong>{{ $t('homePage.infoAboutProject') }}</strong></p>
            <p><strong>{{ $t('homePage.comeandPlayWithUsInfo') }}</strong></p>
            <p><strong>{{ $t('homePage.awards.awardsInfo') }}</strong></p>
            <div>
                <b-table striped hover responsive :items="awardsTableValues" :fields="awardsTableColumns"></b-table>
            </div>
            <!--<b-list-group>
                <b-list-group-item><strong>1. {{translations.awards.award1.pol}}</strong></b-list-group-item>
                <b-list-group-item><strong>2. {{translations.awards.award2.pol}}</strong></b-list-group-item>
                <b-list-group-item><strong>3. {{translations.awards.award3.pol}}</strong></b-list-group-item>
            </b-list-group>-->
            <p><strong>{{ $t('homePage.collectPointsInfo') }}</strong></p>
            <div>
                <b-table striped hover responsive :items="pointsTableValues" :fields="pointsTableColumns"></b-table>
            </div>
            <p><strong>{{ $t('homePage.drawInformation') }}</strong></p>
        </div>
    </b-container>
</template>
<script>
/* eslint-disable */
export default {
    data() {
        return {
            awardsTableColumns: ['Position', 'Award'],
            awardsTableValues: [
                {
                    Position: 1,
                    Award: 'Two Ticket for selected by winner Speedway Game'
                },
                {
                    Position: 2,
                    Award: 'SpeedwayBusines board game'
                },
                {
                    Position: 3,
                    Award: 'MCS Speedway Card Game'
                }
            ],
            pointsTableColumns: ['Bet', 'Points'],
            pointsTableValues: [
                {
                    Bet: 'perfect',
                    Points: 10,
                },
                {
                    Bet: '1 <= x <= 2 pkt ',
                    Points: 8,
                },
                {
                    Bet: '2 < x <= 4 pkt',
                    Points: 6,
                },
                {
                    Bet: '4 < x <= 8 pkt',
                    Points: 4,
                },
                {
                    Bet: '8 < x<= 12 pkt',
                    Points: 2,
                },
                {
                    Bet: 'x > 12 pkt',
                    Points: 0,
                },
            ]
        }
    }
    
}
</script>
<style>
.container {
  display: block;
  margin:auto;
  text-align: center;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 60%;
  margin-top: 5px;
  margin-bottom: 5px;
}

label {
  float: left;
}

p {
    display: inline-block;
}

div {
    width: 100%;
}

</style>