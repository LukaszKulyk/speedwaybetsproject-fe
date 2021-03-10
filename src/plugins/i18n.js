/* eslint-disable */
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
    'en': {
        homePage: {
            title: 'SpeedwayBets'
        },
        test: 'English test value'
    },
    'pl': {
        homePage: {
            title: 'SpeedwayBets'
        },
        test: "Polska wartość testowa"
    },
    'lem': {
        homePage: {
            title: 'SpeedwayBets'
        },
    }
}

const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'pl', // set fallback locale
  messages // set locale messages
})

export default i18n
