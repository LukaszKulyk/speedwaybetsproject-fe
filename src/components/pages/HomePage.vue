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
            translations: {
                eng: 'SpeedwayBets',
                pol: 'SpeedwayBets',
                lem: 'SpeedwayBets',
                infoAboutProject: {
                    eng: 'This project is made for people who loves speedway and wants to make some bets just to have fun. During whole season each player can bet all games and earn points. After each week we will be updating Standing page and you can check how many points you have earned and on which position are you now.',
                    pol: 'Ten projekt powstał dla ludzi, którzy kochają żużel i chcą pobawić się z nami w zakłady. Podczas trwania całego sezonu, każdy gracz może wysyłać swoje typy i zbierać punkty. Po każdym tygodniu rozgrywek będziemy podliczać punkty i wyniki razem z aktualną tabelą prezentować w zakładce standings. Tam możesz znaleźć informację ile punktów posiadasz i które masz miejsce.'
                },
                comeAndPlayWithUs: {
                    eng: 'We would like to encourage you to take a part in our game. It does not cost anything, you can join even during the season! All you need to do is register to our game by creating a free account. Bet every game, collect points and win one of awards! We guarantee great fun!',
                    pol: 'Gorąco zachęcamy do wzięcia udziału w naszej zabawie. Gra jest całkowicie darmowa, możesz dołączyć nawet w trakcie trwania sezonu! Wszystko co musisz zrobić to zarejstrować się do naszej gry poprzez założenie darmowego konta. Typuj każdy mecz, zbieraj punkty i wygraj jedną z nagród! Gwarantujemy świetną zabawę!'
                },
                awardsInfo: {
                    eng: 'To make our game more interesting we decided to reward the winners. This year first 3 playes at the end of the season will get from us:',
                    pol: 'Żeby zrobić naszą grę bardziej interesującą, postanowiliśmy nagrodzić zwycięzców. W tym roku pierwsze 3 osoby na koniec sezonu dostaną od nas:'
                },
                awards: {
                    award1: {
                        eng: 'SpeedwayBusines game',
                        pol: 'Speedway Biznes - gra planszowa'
                    },
                    award2: {
                        eng: 'Ticket for selected by winner Speedway Game',
                        pol: 'Bilet na wybrany przez siebie mecz żużlowy'
                    },
                    award3: {
                        eng: 'Bastek of sweets',
                        pol: 'Koszyk słodyczy'
                    }
                    
                },
                collectPoints: {
                    eng: 'How do we count points? You bet each game by guessing final results. Then after each week we sum all collected points and add them to you user. Points per game are awarded according to the table below:',
                    pol: 'Jak liczymy punkty? Obstawiasz każdy mecz poprzez zgadywanie dokładnego wyniku. Następnie po każdym tygodniu dodajemy wszystkie zdobyte punkty i dodajemy je do twojego konta. Punkty za każdy mecz są przyznawane zgodnie z tabelą poniżej:'
                },
                drawInformation: {
                    eng: 'WARNING! If you bet draw you can only have 10 points (if result is draw) or 0 points in any other cases!. That means if you bet 45:45 in one of games and result is 45:45 you have 10 points. Bu when you bet 45:45 and result is 46:44 you do NOT have points!. Please be careful with draw bets!.',
                    pol: 'UWAGA! Jeśli obstawiasz remis możesz zdobyć tylko 10 punktów (w przypadku, gdy taki wynik faktycznie padnie) lub 0 punktów, w każdym innym przypadku! Przykładowo jeśli obstawiasz wynik 45:45, a wynik końcowy to 45:45, dostajesz 10 punktów. Jeśli obstawiasz wynik 45:45, a wynik końcowy to 46:44, to nie dostajesz żadnych punjktów! Prosimy uważać z obstawianiem remisów!'
                },
                pointsTableTranslations: {
                    eng: {
                        bet: 'Bet',
                        points: 'Points'
                    }
                }
            },
            awardsTableColumns: ['Position', 'Award'],
            awardsTableValues: [
                {
                    Position: 1,
                    Award: 'Speedway Biznes - gra planszowa'
                },
                {
                    Position: 2,
                    Award: 'Bilet na wybrany przez siebie mecz żużlowy'
                },
                {
                    Position: 3,
                    Award: 'Koszyk słodyczy'
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