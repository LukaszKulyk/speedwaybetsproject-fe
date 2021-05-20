/* eslint-disable */

exports.setTokenExpirationTime = (date, minutes) => {
    return new Date(date.getTime() + minutes*60000);
}

exports.isTokenValid = (tokenExpirationTime) => {
    const currentDate = new Date();
    const tokenExpDate = new Date(tokenExpirationTime)
    if(currentDate.getTime() > tokenExpDate.getTime()) {
        return false;
    }
    else{
        return true;
    }
}

exports.removeTokenFromLocalStorageWhenExpired = () => {
    localStorage.removeItem('tokenExpirationTime');
}