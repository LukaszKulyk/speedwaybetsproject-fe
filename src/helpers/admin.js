/* eslint-disable */

exports.calculateSmallPoints = (homeTeamPoints, awayTeamPoints) => {
    return Math.abs(homeTeamPoints - awayTeamPoints);
}

exports.selectTheWinnerTeam = (homeTeamAndResult, awayTeamAndResult) => {
    if(homeTeamAndResult.homeTeamPoints === awayTeamAndResult.awayTeamPoints) {
        return 'draw';
    }
    else if(homeTeamAndResult.homeTeamPoints > awayTeamAndResult.awayTeamPoints) {
        return homeTeamAndResult.homeTeam;
    }
    else if(homeTeamAndResult.homeTeamPoints < awayTeamAndResult.awayTeamPoints) {
        return awayTeamAndResult.awayTeam;
    }
    else{
        return 'Something went wrong. Please try again later.'
    }
}