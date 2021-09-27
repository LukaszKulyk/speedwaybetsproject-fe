/* eslint-disable */
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
    'en': {
        navBarComponent: {
            home: 'Home',
            standings: 'Standings',
            results: 'Results',
            schedule: 'Schedule',
            bets: 'Bets',
            login: 'Login',
            register: 'Register',
            makeABet: 'Make a Bet',
            logout: 'Logout'
        },
        homePage: {
            title: 'SpeedwayWorld',
            infoAboutProject: 'This project is made for people who loves speedway and wants to make some bets just to have fun. During whole season each player can bet all games and earn points. After each week we will be updating Standing page and you can check how many points you have earned and on which position are you now.',
            comeandPlayWithUsInfo: 'We would like to encourage you to take a part in our game. It does not cost anything, you can join even during the season! All you need to do is register to our game by creating a free account. Bet every game, collect points and win one of awards! We guarantee great fun!',
            awards: {
                awardsInfo: 'To make our game more interesting we decided to reward the winners. This year first 3 playes at the end of the season will get from us:',
                award1: 'Two Ticket for selected by winner Speedway Game',
                award2: 'Ticket for selected by winner Speedway Game',
                award3: 'SpeedwayBusines game'
            },
            collectPointsInfo: 'How do we count points? You bet each game by guessing final results. Then after each week we sum all collected points and add them to you user. Points per game are awarded according to the table below:',
            drawInformation: 'WARNING! If you bet draw you can only have 10 points (if result is draw) or 0 points in any other cases!. That means if you bet 45:45 in one of games and result is 45:45 you have 10 points. Bu when you bet 45:45 and result is 46:44 you do NOT have points!. Please be careful with draw bets!',
        },
        standingsPage:{
            title: 'Standings',
            endSeasonText: 'Season 2021 has ended. Thank you all for playing with us! We hope you have spent really good time and you will join us next year as well. Thank you all one more time and see you soon!',
            seasonWinnersTableTitle: 'Season 2021 winners:',
            currentStandingsTitle: 'Current Standings',
            endSeasonStandingsTitle: 'Full 2021 Season Standings:',
            ifNotStandings: 'There is no current Standings yet. Season will start soon!',
            midWeekStandingsInfo: 'Mid-week table, only points up to date. Confirmed standings after gameweek.',
            confirmedGameWeekStandingsInfo: 'Current standings confirmed.',
        },
        resultsPage: {
            title: 'Results',
            tableTitle: 'Table',
            ifNoResultsYet: 'There is no results yet. Season will start soon!',
            playedGames: 'All played games so far'
        },
        schedulePage:{
            title: 'Schedule',
            scheduleNotReadyYet: 'Schedule for this season is not prepared yet. Please come again later. We promise, we are working on that!'
        },
        betsPage: {
            title: 'Bets',
            noGameWeekScheduledYet: 'There is no Game Week scheduled!',
            userNotLoggedIn: 'You need to be logged in to make a bet!',
            loginButton: 'Login',
            registerButton: 'Register',
            sendBetButton: 'Send'
        },
        allGameBetsComponent: {
            notPlayedGameWeekInfo: 'This game was not played yet so it is not possible to see user bets.'
        },
        registerPage: {
            registerSuccess: 'New User has been created succesfully! You can now login!',
            registerError: 'Something went wrong. Maybe email or username is already taken?'
        },
        loginPage: {
            loginError: 'Cannot login. Wrong email or password. Please try again!'
        }
    },
    'pl': {
        navBarComponent: {
            home: 'Start',
            standings: 'Ranking',
            results: 'Wyniki',
            schedule: 'Terminarz',
            bets: 'Zakłady',
            login: 'Zaloguj',
            register: 'Rejestracja',
            makeABet: 'Zakład',
            logout: 'Wyloguj'
        },
        homePage: {
            title: 'SpeedwayWorld',
            infoAboutProject: 'Ten projekt powstał dla ludzi, którzy kochają żużel i chcą pobawić się z nami w zakłady. Podczas trwania całego sezonu, każdy gracz może wysyłać swoje typy i zbierać punkty. Po każdym tygodniu rozgrywek będziemy podliczać punkty i wyniki razem z aktualną tabelą prezentować w zakładce standings. Tam możesz znaleźć informację ile punktów posiadasz i które masz miejsce.',
            comeandPlayWithUsInfo:'Gorąco zachęcamy do wzięcia udziału w naszej zabawie. Gra jest całkowicie darmowa, możesz dołączyć nawet w trakcie trwania sezonu! Wszystko co musisz zrobić to zarejstrować się do naszej gry poprzez założenie darmowego konta. Typuj każdy mecz, zbieraj punkty i wygraj jedną z nagród! Gwarantujemy świetną zabawę!',
            awards: {
                awardsInfo: 'To make our game more interesting we decided to reward the winners. This year first 3 playes at the end of the season will get from us:',
                award1: 'Dwa bilety na wybrany przez siebie mecz żużlowy',
                award2: 'Bilet na wybrany przez siebie mecz żużlowy',
                award3: 'Speedway Biznes - gra planszowa'
            },
            collectPointsInfo: 'Jak liczymy punkty? Obstawiasz każdy mecz poprzez zgadywanie dokładnego wyniku. Następnie po każdym tygodniu dodajemy wszystkie zdobyte punkty i dodajemy je do twojego konta. Punkty za każdy mecz są przyznawane zgodnie z tabelą poniżej:',
            drawInformation: 'UWAGA! Jeśli obstawiasz remis możesz zdobyć tylko 10 punktów (w przypadku, gdy taki wynik faktycznie padnie) lub 0 punktów, w każdym innym przypadku! Przykładowo jeśli obstawiasz wynik 45:45, a wynik końcowy to 45:45, dostajesz 10 punktów. Jeśli obstawiasz wynik 45:45, a wynik końcowy to 46:44, to nie dostajesz żadnych punjktów! Prosimy uważać z obstawianiem remisów!',
        },
        standingsPage:{
            title: 'Rezultaty',
            endSeasonText: 'Sezon 2021 się zakończył. Dziękujemy wszystkim za udział w naszej zabawie. Mamy nadzieję, że dobrze się bawiliście i dołączycie do nas ponownie za rok! Dziękujemy jeszcze raz i do zobaczenia wkrótce!',
            seasonWinnersTableTitle: 'Laureaci Sezonu 2021:',
            endSeasonStandingsTitle: 'Pełna tabela 2021:',
            currentStandingsTitle: 'Aktualne Rezultaty',
            ifNotStandings: 'Nie ma jeszcze żadnych rezultatów. Sezon zaczyna się wkrótce!',
            midWeekStandingsInfo: 'Ranking przejściowy, tylko punkty są dodawane. Potwierdzony ranking po kolejce.',
            confirmedGameWeekStandingsInfo: 'Potwierdzony aktualny ranking.',
        },
        resultsPage: {
            title: 'Wyniki',
            tableTitle: 'Tabela',
            ifNoResultsYet: 'Nie ma jeszcze żadnych wyników. Sezon zaczyna się wkrótce!',
            playedGames: 'Wszystkie rozegrane mecze'
        },
        schedulePage:{
            title: 'Terminarz',
            scheduleNotReadyYet: 'Terminarz na ten sezon nie jest jeszcze przygotowany. Pracujemy nad tym. Zapraszamy ponownie wkrótce!'
        },
        betsPage: {
            title: 'Zakłady',
            noGameWeekScheduledYet: 'Nie ma jeszcze żadnego meczu w terminarzu',
            userNotLoggedIn: 'Musisz być zalogowany, żeby móc obstawiać mecze!',
            loginButton: 'Zaloguj',
            registerButton: 'Rejestracja',
            sendBetButton: 'Wyślij'
        },
        allGameBetsComponent: {
            notPlayedGameWeekInfo: 'Ten mecz nie został jeszcze rozegrany więc nie można zobaczyć typów innych graczy.'
        },
        registerPage: {
            registerSuccess: 'Nowy użytkownik założony pomyślnie! Teraz możesz się zalogować!',
            registerError: 'Coś poszło nie tak. Może email albo username jest już zajęty przez innego użytkownika?'
        },
        loginPage: {
            loginError: 'Nie można się zalogować. Zły email lub hasło. Proszę spróbować ponownie!'
        }
    },
    'lem': {
        navBarComponent: {
            home: 'Xыжа',//'Hołowna',
            standings: 'Tабела',//'Ranking',
            results: 'Выніки',//'Wyniky',
            schedule: 'Роспыска',//'Terminar',
            bets: 'Заклади',//'Zaklady',
            login: 'Лоґін',//'Login',
            register: 'Рейстрация',//'Zarejestruj',
            makeABet: 'Заклади',//'Zaklad',
            logout: 'Bылoґуй',//'Wylohuj'
        },
        homePage: {
            title: 'SpeedwayWorld',
            infoAboutProject: 'Тот проєкт зістал зроблени для луди, котри любять жужел і мают охоту побавити ся з нами в закльади. B часьі цьілого сезоно, грач може висилати типи і збeрати пункти. По кожньім тьіжні будeмe рахували пункти, а виніки разом з актуалном табeлом будeмe заміщали в закладці виніки. Там можeтe найти інформацийы кіло матe пунктіл і котрe місцe заниматe.',
            comeandPlayWithUsInfo:'Горячо нагваріамe до взятя уділу в нашой забаві. Гра є чисто дармова, можна долучити тыж в часьі сeзону! Вшытко што трeба зробити то зарeйструвати ся до нашой гри чeрeс заложиня дармового конта. Типуй кожний мeчи, збeрай пункти та виграй єдну з нагород! Обіцюйeмe дужe доброй забави!',
            awards: {
                awardsInfo: "Жeби наша гра была іщи цєкавша, видумали'смe нагородити найліпших. В тім році 3 найліпших на кінeць сeзону дістанe від нас:",
                award1: 'Два листки на вибраний пeрeз тeбe мeч жужловий.',
                award2: 'Листок на вибраний пeрeз тeбe мeч жужловий.',
                award3: 'Спeeдваи Бусінeсс - гра планшова.' //'Кошик солодкым почастунком.'
            },
            collectPointsInfo: 'Як рахуємe пункти? Обставяш кожний мeчи пeрeз сгадуваня докладних винікіл. Потім по кожним тыжні додаємe вшитки згромаджeний пункти та додаємe до твойого конта. Пункти за кожний мeч сут признаваний згідні з табeльом понижe:',
            drawInformation: 'Увага! В припадку як обставяш рeміс можeш дістати лeм 10 пунктів (в припадку як трафиш добры) або 0 пунктів, в кожньім інчим припадку! Прикладово як обставяш винік 45:45 і такі винік фактичні будe то дістаєш 10 пунктів. як обставяш 45:45, а винік на кінeц будe 46:44 то нe дістаєш пунктів вцалі. Просимe уважати з обставяніом рeмісів!',
        },
        standingsPage:{
            title: 'Tабела',
            endSeasonText: "Закінчили'смe сeзoн 2021. Барс вшытким дякуємe за участ в нашoй забаві. Мамe надію жe стe ся добры бавили и возмeтe участ тиж за рік. Іщи раз дякуємe и запрашамe нeдoлгo!",
            seasonWinnersTableTitle: 'Выграни Сeзону 2021:',
            endSeasonStandingsTitle: 'Польна Tабела выникиль:',
            currentStandingsTitle: 'Актуална Tабела',
            ifNotStandings: 'Іщи нe є жаднoй табелы. Сeзон зачинат ся нeдoлгo!',
            midWeekStandingsInfo: 'Tабела лайв, лем пункти сут додавани. Потверджена табела по колейци.',
            confirmedGameWeekStandingsInfo: 'Потвeрджeна актуална табела',
        },
        resultsPage: {
            title: 'Выніки',
            tableTitle: 'Выніки',
            ifNoResultsYet: 'Іщи нe є жадных выніки. Сeзoн зачинат ся нeдoлгo!',
            playedGames: 'Вшытки рoзoграны мeчи'
        },
        schedulePage:{
            title: 'Роспыска',
            scheduleNotReadyYet: 'Рoзpиска на тoт сeзoн іщи нe є пририхтувана. Працюємe над тим, запрашамe нeдoлгo!'
        },
        betsPage: {
            title: 'Заклади',
            noGameWeekScheduledYet: 'Нe є іщи жаднoхo мeчу дo oбставліня!',
            userNotLoggedIn: 'Мусиш бити залoгувани жeби oбставіати мeчи!',
            loginButton: 'Лоґін',
            registerButton: 'Рейстрация',
            sendBetButton: 'Пуст'
        },
        allGameBetsComponent: {
            notPlayedGameWeekInfo: 'Меч іщи нe розограны. Нe можна справдити типіл інчих грачи.'
        },
        registerPage: {
            registerSuccess: 'Новий грач заложений! Тепер можеш ся залoгувати!',
            registerError: 'Штоси пішло не так. Може емаіл або імено є уж заняте през інчoгo грача?'
        },
        loginPage: {
            loginError: 'Нe можна ся залoгувати. Зьлі вписане емаіл або хасло. Прошу спрібувати іщи раз!'
        }
    }
}

const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'pl', // set fallback locale
  messages // set locale messages
})

export default i18n
