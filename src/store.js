/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
		//domain
		domain: 'https://speedway-wrold-api.herokuapp.com/',
		//domain: 'http://localhost:3000/',

        //Users
        token: localStorage.getItem('token') || null,
		username: localStorage.getItem('username') || null,
		userId: localStorage.getItem('userId') || null,
		isAdmin: localStorage.getItem('isAdmin') || null,

		//registerStatus
		registerStatus: null,

        //values
        //lastGameWeekWhichHasBeenPlayed: 1,
		currentGameWeek: 1,

        //schedule
        fullSchedule: [],
        lastGameWeekPlayed: [],
        //allGameWeeksScheduled: [],
        lastGameWeekResults: [],
		nextGameWeekToBeBet: 1,
		nextGameWeekGames: [],
		allPlayedGamesResults: [],

        //standings
        allStandings: [],
        lastStandingsTable: [],

        //player standings
        lastPlayerStandings: [],

		//bets
		specificGameBet: {},
		allUserBetsForCurrentGameWeek: [],
		allUserBets: {},

		//new authoriaztion approach
		status: ''

    },
    getters: {
        //Users
        loggedIn(state) {
			return state.token !== null;
		},
		currentDetailsPanelState(state) {
			return state.detailsPanelState;
		},
		getUsername(state) {
			return state.username;
		},
		getUserId(state) {
			return state.userId;
		},
		getIsAdmin(state) {
			return state.isAdmin;
		},

        //schedule
        getFullSchedule(state) {
			return state.fullSchedule;
        },
        getLastGameWeekPlayed(state) {
			return state.lastGameWeekPlayed;
        },
        getLastGameWeekResults(state) {
            return state.lastGameWeekResults;
        },
		getInfoAboutNextGameWeekWhichShouldBePlayed(state) {
			return state.nextGameWeekToBeBet;
		},
		getNextGameWeekGames(state) {
			return state.nextGameWeekGames;
		},
		getAllPlayedGamesResults(state) {
			return state.allPlayedGamesResults;
		},
        
        //standings
        getAllStandings(state) {
			return state.allStandings;
        },
        getLastStandingsTable(state) {
            return state.lastStandingsTable;
        },

        //player standings
        getLastPlayerStandings(state) {
            return state.lastPlayerStandings;
        },

		//Bet
		getSpecificGameBet(state) {
			return state.specificGameBet;
		},
		getAllUserBetsForCurrentGameWeek(state) {
			return state.allUserBetsForCurrentGameWeek;
		},
		getAllUserBets(state) {
			return state.allUserBets;
		},

		getCurrentAuthStatus(state){
			return state.status;
		}

    },
    mutations: {
        //Users
        retrieveToken(state, token) {
			state.token = token;
		},
		destroyToken(state) {
			state.token = null;
			state.username = null;
			state.userId = null;
			state.isAdmin = null;
		},
		setUsername(state, username) {
			state.username = username;
		},
		setUserId(state, userId) {
			state.userId = userId;
		},
        setIsAdmin(state, isAdmin) {
			state.isAdmin = isAdmin;
		},

		//registerStatus
		setRegisterStatus(state, registerStatus) {
			state.registerStatus = registerStatus;
		},

        //schedule
        setFullSchedule(state, schedule) {
			state.fullSchedule = schedule;
        },
        setLastGameWeekPlayed(state, lastPlayed) {
			state.lastGameWeekPlayed = lastPlayed;
        },
        setLastGameWeekResults(state, lastGameWeekResults) {
			state.lastGameWeekResults = lastGameWeekResults;
        },
		setInfoAboutNextGameWeekWhichShouldBePlayed(state, nextGameWeekInfo) {
			state.nextGameWeekToBeBet = nextGameWeekInfo;
		},
		setNextGameWeekGames(state, nextGameWeekGames) {
			state.nextGameWeekGames = nextGameWeekGames;
		},
		setAllPlayedGamesResults(state, allPlayedGamesResults) {
			state.allPlayedGamesResults = allPlayedGamesResults;
		},
        
        //standings
        setAllStandings(state, standings) {
			state.allStandings = standings;
        },
        setLastStandingsTable(state, standingsTable) {
            state.lastStandingsTable = standingsTable;
        },

        //player standings
        setLastPlayerStandings(state, playerStandings) {
            state.lastPlayerStandings = playerStandings;
			//console.log(playerStandings.data.playerResultsTable[0].gameWeek);
			state.nextGameWeekToBeBet = playerStandings.data.playerResultsTable[0].gameWeek + 1;
        },

		//Bets
		setSpecificGameBet(state, game) {
			state.specificGameBet = game;
		},
		setAllUserBetsForCurrentGameWeek(state, bets) {
			state.allUserBetsForCurrentGameWeek = bets;
		},
		setAllUserBets(state, bets){
			state.allUserBets = bets;
		},

		//new authorization handling
		auth_request(state) {
			state.status = 'loading'
		},
		auth_error(state) {
			state.status = 'error'
		},
		registration_success(state){
			state.status = 'success'
		}

    },
    actions: {
        //Users
        createNewUser(context, user) {
			return new Promise((resolve, reject) => {
				context.commit('auth_request')
				axios.post(this.state.domain + 'user/signup', {
					email: user.email,
					userName: user.userName,
					password: user.password,
				})
					.then(response => {
						context.commit('registration_success')
						resolve(response)
					})
					.catch(error => {
						context.commit('auth_error', error)
						reject(error);
					})
			})
		},
		retrieveToken(context, credentials) {
			return new Promise((resolve, reject) => {
				context.commit('auth_request')
				axios.post(this.state.domain + 'user/login', {
					email: credentials.email,
					userName: credentials.userName,
					password: credentials.password
				})
					.then(response => {
						const token = response.data.token;
						const username = response.data.username;
						const userId = response.data._id;
						const isAdmin = response.data.isAdmin;

						console.log(token)
						console.log(username)
						console.log(userId)
						console.log(isAdmin)

						localStorage.setItem('token', token);
						context.commit('retrieveToken', token);
						localStorage.setItem('username', username);
						context.commit('setUsername', username);
						localStorage.setItem('userId', userId);
						context.commit('setUserId', userId);
						localStorage.setItem('isAdmin', isAdmin);
						context.commit('setIsAdmin', isAdmin);

						axios.defaults.headers.common['Authorization'] = token

						context.commit('registration_success')

						//context.dispatch('getAllUserBetsForCurrentGameWeek');

						resolve(response);
					})
					.catch(error => {
						localStorage.removeItem('token');
						context.commit('destroyToken');
						context.commit('auth_error', error)
						reject(error);
					})
				})
		},
		destroyToken(context) {

			axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token; //needed to logout on server site

			if (context.getters.loggedIn) {
				return new Promise((resolve, reject) => {
					axios.post('/logout')
						.then(response => {
							localStorage.removeItem('token');
							localStorage.removeItem('username');
							localStorage.removeItem('userId');
							localStorage.removeItem('isAdmin');
							//this.state.allUserBetsForCurrentGameWeek = null;
							//this.state.userId = null;
							//this.state.isAdmin = null;
							context.commit('destroyToken');
							resolve(response);
						})
						.catch(error => {
							localStorage.removeItem('token');
							context.commit('destroyToken');
							reject(error);
						})
				})
			}
		},

        //schedule
        getFullSchedule(context) {
			axios.get(this.state.domain + 'schedule')
				.then(schedule => {
					//return response;
					//console.log(standings);
					context.commit('setFullSchedule', schedule);
				})
        },
        getLastGameWeekPlayed(context) {
			axios.get(this.state.domain + 'schedule/played/last')
				.then(lastPlayed => {
					//return response;
					//console.log(standings);
					context.commit('setLastGameWeekPlayed', lastPlayed);
				})
        },
        /*getLastGameWeekResults(context) {
			axios.get(this.state.domain + 'schedule/played/last/game_week/' + this.state.lastGameWeekWhichHasBeenPlayed)
				.then(lastPlayed => {
					//return response;
					//console.log(standings);
					context.commit('setLastGameWeekResults', lastPlayed);
				})
        },*/
		getInfoAboutNextGameWeekWhichShouldBePlayed(context) {
			axios.get(this.state.domain + 'schedule/scheduled/next')
				.then(nextGameWeekInfo => {
					//return response;
					//console.log(standings);
					context.commit('setInfoAboutNextGameWeekWhichShouldBePlayed', nextGameWeekInfo.data.schedule[0].gameWeek);
				})
        },
		getNextGameWeekGames(context) {
			axios.get(this.state.domain + 'schedule/scheduled/next/game_week/' + this.state.nextGameWeekToBeBet)
				.then(nextGameWeekGames => {
					//return response;
					//console.log(standings);
					context.commit('setNextGameWeekGames', nextGameWeekGames);
				})
        },
		getAllPlayedGamesResults(context) {
			axios.get(this.state.domain + 'schedule/played/all')
				.then(allPlayedGamesResults => {
					context.commit('setAllPlayedGamesResults', allPlayedGamesResults)
				})
		},
        
        //standings
        getAllStandings(context) {
			axios.get(this.state.domain + 'standings')
				.then(standings => {
					//return response;
					//console.log(standings);
					context.commit('setAllStandings', standings);
				})
        },
        getLastStandingsTable(context) {
            axios.get(this.state.domain + 'standings/table/last')
				.then(standingsTable => {
					//return response;
					//console.log(standings);
					context.commit('setLastStandingsTable', standingsTable);
				})
        },

        //player standings
        getLastPlayerStandings(context) {
            axios.get(this.state.domain + 'players/results/last')
                .then(playerStandings => {
                    context.commit('setLastPlayerStandings', playerStandings);
                })
        },

		//Bets
		createNewBet(context, bet) {
			axios.post(this.state.domain + 'bet', {
				gameId: bet.gameId,
				userId: this.state.userId,
				gameWeek: this.state.nextGameWeekToBeBet,
				homeTeamPoints: bet.homeTeamPoints,
				awayTeamPoints: bet.awayTeamPoints
			},
			{
				headers: {
					'Authorization': 'Bearer ' + this.state.token
				}
			}
			)
				.then(response => {
					console.log(response);
					//return response;
					context.dispatch('getAllUserBetsForCurrentGameWeek');
				})
				.catch(error => {
					return error;
				})
		},
		//takes userId and gameId and checks if user made a bet before for this specific game
		getSpecificGameBet(context, game) {
			axios.get(this.state.domain + 'bet/user/' + this.state.userId + '/game/' + game._id)
				.then(game => {
					context.commit('setSpecificGameBet', game)
				})
		},
		getAllUserBetsForCurrentGameWeek(context) {
			axios.get(this.state.domain + 'bet/user/' + this.state.userId + '/game-week/' + this.state.nextGameWeekToBeBet)
				.then(bets => {
					//return response;
					//console.log(standings);
					context.commit('setAllUserBetsForCurrentGameWeek', bets);
					//return bets.data.bets;
				})
        },
		updateExistingBet(context, bet) {

			let data = [];
			let homeTeamPoints = { 
				propName: 'homeTeamPoints', 
				value: bet.homeTeamPoints  
			}
			let awayTeamPoints = { 
				propName: 'awayTeamPoints', 
				value: bet.awayTeamPoints 
			}

			data.push(homeTeamPoints);
			data.push(awayTeamPoints);

			axios.patch(this.state.domain + 'bet/' + bet.betId, data,
			{
				headers: {
					'Authorization': 'Bearer ' + this.state.token
				}
			}
			)
				.then(response => {
					console.log(response)
					context.dispatch('getAllUserBetsForCurrentGameWeek');
				})
				.catch(error => {
					return error;
				})
		},

		getAllUserBets(context) {
			axios.get(this.state.domain + 'bet/user/' + this.state.userId + '/all')
				.then(bets => {
					context.commit('setAllUserBets', bets)
				})
		},

		//new idea
		/*isUserLoggedIn(context) {
			if(this.state.token !== null) {
				//this.getAllUserBets;
				this.actions.getAllUserBets();
				console.log('User is logged in');
			}
			else {
				console.log('user is not logged in');
				return null;
			}
		}*/
    }
});