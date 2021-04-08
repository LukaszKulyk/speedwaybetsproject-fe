/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
		//domain
		domain: 'https://speedway-wrold-api.herokuapp.com/',

        //Users
        token: null,
		username: null,
		userId: null,
		isAdmin: null,

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
		}

    },
    actions: {

		//OnCreate
		onCreate(context){
			context.state.token = localStorage.getItem('token') || null,
			context.state.username = localStorage.getItem('username') || null,
			context.state.userId = localStorage.getItem('userId') || null,
			context.state.isAdmin =  localStorage.getItem('isAdmin') || null
		},
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
			return axios.post(this.state.domain + 'user/login', {
				email: credentials.email,
				password: credentials.password
			})
				.then(response => {
					const token = response.data.token;
					const username = response.data.username;
					const userId = response.data._id;
                    const isAdmin = response.data.isAdmin;

					localStorage.setItem('token', token);
					localStorage.setItem('username', username);
					localStorage.setItem('userId', userId);
					localStorage.setItem('isAdmin', isAdmin);

					context.state.token = token;
					context.state.username = username;
					context.state.isAdmin = isAdmin;
					context.state.userId = userId;
					return response;
				})
				.catch(error => {
					return error.response;
				})
		},
		destroyToken(context) {
			context.state.token = '';
			context.state.username = '';
			context.state.isAdmin = '';
			context.state.userId = '';
			localStorage.clear();
			console.log(context);
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