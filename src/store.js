/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
		//domain
		domain: 'http://localhost:3003/',

        //Users
        token: localStorage.getItem('token') || null,
		username: localStorage.getItem('username') || null,
		userId: localStorage.getItem('userId') || null,
		isAdmin: localStorage.getItem('isAdmin') || null,

        //values
        lastGameWeekWhichHasBeenPlayed: 1,
		currentGameWeek: 2,

        //schedule
        fullSchedule: [],
        lastGameWeekPlayed: [],
        //allGameWeeksScheduled: [],
        lastGameWeekResults: [],
		nextGameWeekToBeBet: 2,
		nextGameWeekGames: [],

        //standings
        allStandings: [],
        lastStandingsTable: [],

        //player standings
        lastPlayerStandings: [],

		//bets
		specificGameBet: {},
		allUserBetsForCurrentGameWeek: {},

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
		getNextGameWeekGames(state) {
			return state.nextGameWeekGames;
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
		}

    },
    mutations: {
        //Users
        retrieveToken(state, token) {
			state.token = token;
		},
		destroyToken(state) {
			state.token = null;
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
		setNextGameWeekGames(state, nextGameWeekGames) {
			state.nextGameWeekGames = nextGameWeekGames;
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
        },

		//Bets
		setSpecificGameBet(state, game) {
			state.specificGameBet = game;
		},
		setAllUserBetsForCurrentGameWeek(state, bets) {
			state.allUserBetsForCurrentGameWeek = bets;
		},

    },
    actions: {
        //Users
        createNewUser(context, user) {
			axios.post(this.state.domain + 'user/signup', {
				email: user.email,
				userName: user.userName,
				password: user.password,
			})
				.then(response => {
					console.log(response)
				})
				.catch(error => {
					return error;
				})
		},
		retrieveToken(context, credentials) {
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

					localStorage.setItem('token', token);
					context.commit('retrieveToken', token);
					context.commit('setUsername', username);
					context.commit('setUserId', userId);
                    context.commit('setIsAdmin', isAdmin);
				})
		},
		destroyToken(context) {

			axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token; //needed to logout on server site

			if (context.getters.loggedIn) {
				return new Promise((resolve, reject) => {
					axios.post('/logout')
						.then(response => {
							localStorage.removeItem('token');
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
        getLastGameWeekResults(context) {
			axios.get(this.state.domain + 'schedule/played/last/game_week/' + this.state.lastGameWeekWhichHasBeenPlayed)
				.then(lastPlayed => {
					//return response;
					//console.log(standings);
					context.commit('setLastGameWeekResults', lastPlayed);
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
				gameWeek: this.state.currentGameWeek,
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
					console.log(response)
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
			axios.get(this.state.domain + 'bet/user/' + this.state.userId + '/game-week/' + this.state.currentGameWeek)
				.then(bets => {
					//return response;
					//console.log(standings);
					context.commit('setAllUserBetsForCurrentGameWeek', bets);
				})
        },
    }
});